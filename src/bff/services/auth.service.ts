import * as jwt from 'jsonwebtoken';
import * as bcrypt from 'bcrypt';
import { UserRepository } from '../repositories/user.repository';
import type { User, UserDto } from '../types';

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface JWTPayload {
  userId: number;
  email: string;
  role: string;
  iat?: number;
  exp?: number;
}

export interface LoginResult {
  success: boolean;
  user?: User;
  token?: string;
  error?: string;
}

export class AuthService {
  private _userRepository?: UserRepository;
  private jwtSecret: string;
  private jwtExpiresIn: string;

  constructor() {
    // In production, use environment variables
    this.jwtSecret = process.env.JWT_SECRET || 'your-super-secret-jwt-key-change-in-production';
    this.jwtExpiresIn = process.env.JWT_EXPIRES_IN || '24h';
  }

  /**
   * Lazy-load UserRepository to avoid Prisma initialization during middleware startup
   */
  private get userRepository(): UserRepository {
    if (!this._userRepository) {
      this._userRepository = new UserRepository();
    }
    return this._userRepository;
  }

  /**
   * Authenticate user with email and password
   */
  async login(credentials: LoginCredentials): Promise<LoginResult> {
    try {
      const { email, password } = credentials;

      // Find user by email (get unsafe version with password)
      const userWithPassword = await this.userRepository.findByEmail(email) as UserDto;
      
      if (!userWithPassword) {
        return {
          success: false,
          error: 'Invalid email or password'
        };
      }

      // Check if user is active
      if (userWithPassword.status === 'disabled') {
        return {
          success: false,
          error: 'Account is disabled'
        };
      }

      // Verify password
      const isPasswordValid = await this.verifyPassword(password, userWithPassword.password);
      
      if (!isPasswordValid) {
        return {
          success: false,
          error: 'Invalid email or password'
        };
      }

      // Get safe user data (without password)
      const safeUser = await this.userRepository.findById(userWithPassword.id, true) as User;
      
      if (!safeUser) {
        return {
          success: false,
          error: 'User data retrieval failed'
        };
      }

      // Generate JWT token
      const token = this.generateToken({
        userId: safeUser.id,
        email: safeUser.email,
        role: safeUser.role?.name || 'user'
      });

      return {
        success: true,
        user: safeUser,
        token
      };

    } catch (error) {
      console.error('Error in AuthService.login:', error);
      return {
        success: false,
        error: 'Authentication failed'
      };
    }
  }

  /**
   * Generate JWT token
   */
  generateToken(payload: Omit<JWTPayload, 'iat' | 'exp'>): string {
    return jwt.sign(
      payload as object, 
      this.jwtSecret, 
      {
        expiresIn: this.jwtExpiresIn,
        issuer: 'rmo-inocs-odp',
        audience: 'rmo-inocs-users'
      }
    );
  }

  /**
   * Verify JWT token
   */
  verifyToken(token: string): JWTPayload | null {
    try {
      const decoded = jwt.verify(token, this.jwtSecret, {
        issuer: 'rmo-inocs-odp',
        audience: 'rmo-inocs-users'
      }) as JWTPayload;
      
      return decoded;
    } catch (error) {
      console.error('JWT verification failed:', error);
      return null;
    }
  }

  /**
   * Verify password against hash
   */
  async verifyPassword(plainPassword: string, hashedPassword: string): Promise<boolean> {
    try {
      // In development mode, if passwords aren't hashed yet, do simple comparison
      // This is temporary until all existing passwords are properly hashed
      if (!hashedPassword.startsWith('$2b$') && !hashedPassword.startsWith('$2a$')) {
        console.warn('Password not hashed - using plain text comparison (DEV ONLY)');
        return plainPassword === hashedPassword;
      }
      
      return await bcrypt.compare(plainPassword, hashedPassword);
    } catch (error) {
      console.error('Password verification failed:', error);
      return false;
    }
  }

  /**
   * Hash password using bcrypt
   */
  async hashPassword(plainPassword: string): Promise<string> {
    try {
      const saltRounds = 12;
      return await bcrypt.hash(plainPassword, saltRounds);
    } catch (error) {
      console.error('Password hashing failed:', error);
      throw new Error('Password hashing failed');
    }
  }

  /**
   * Validate token and get user data
   */
  async validateTokenAndGetUser(token: string): Promise<User | null> {
    try {
      const payload = this.verifyToken(token);
      
      if (!payload) {
        return null;
      }

      // Get fresh user data from database
      const user = await this.userRepository.findById(payload.userId, true) as User;
      
      if (!user || user.status === 'disabled') {
        return null;
      }

      return user;
    } catch (error) {
      console.error('Token validation failed:', error);
      return null;
    }
  }

  /**
   * Generate secure cookie options for JWT
   */
  getSecureCookieOptions() {
    return {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict' as const,
      maxAge: 24 * 60 * 60 * 1000, // 24 hours in milliseconds
      path: '/'
    };
  }
}