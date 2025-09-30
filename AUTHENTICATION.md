# Authentication System Documentation

This document describes the JWT-based authentication system implemented for the RMO INOCS SUM ODP Frontend.

## Architecture Overview

The authentication system follows SOLID principles and clean architecture patterns:

```
Authentication Flow:
├── Frontend (React Components)
│   ├── LoginForm.tsx - User login interface
│   └── SignupForm.tsx - User registration interface
├── API Layer (Astro API Routes)
│   ├── /api/v1/auth/login - Authentication endpoint
│   └── /api/v1/auth/logout - Session termination
├── Business Logic (Services)
│   └── AuthService - JWT operations, password verification
├── Data Access (Repositories)
│   └── UserRepository - Database operations
└── Security (Middleware)
    └── middleware.ts - Route protection and token validation
```

## Security Features

### JWT Token Management
- **Secure Storage**: Tokens stored in HTTP-only cookies
- **CSRF Protection**: Same-site cookie policy
- **Token Validation**: Proper issuer/audience claims
- **Expiration**: Configurable token lifetime (default: 24h)

### Password Security
- **Bcrypt Hashing**: Industry-standard password hashing (12 rounds)
- **Backward Compatibility**: Fallback for existing plain-text passwords
- **Secure Comparison**: Constant-time password verification

### Route Protection
- **Middleware-based**: Automatic protection for `/lab-admin/*` routes
- **Public Routes**: Configurable exceptions (`/lab-admin/login`, `/lab-admin/signup`)
- **Automatic Redirect**: Unauthenticated users redirected to login

## API Endpoints

### POST /api/v1/auth/login
Authenticates user credentials and sets JWT cookie.

**Request:**
```json
{
  "email": "user@example.com",
  "password": "userpassword"
}
```

**Response (Success):**
```json
{
  "success": true,
  "message": "Login successful",
  "user": {
    "id": 1,
    "email": "user@example.com",
    "name": "User Name",
    "role": { "name": "admin" },
    "status": "active"
  }
}
```

**Response (Error):**
```json
{
  "success": false,
  "error": "Invalid email or password"
}
```

### POST /api/v1/auth/logout
Terminates user session by clearing JWT cookie.

**Response:**
```json
{
  "success": true,
  "message": "Logged out successfully"
}
```

## Environment Configuration

Create a `.env` file with the following variables:

```env
# JWT Configuration
JWT_SECRET=your-super-secret-jwt-key-change-in-production
JWT_EXPIRES_IN=24h

# Node Environment
NODE_ENV=production
```

**Security Note**: Always use a strong, randomly generated JWT secret in production.

## Protected Routes

The following routes require authentication:
- `/lab-admin` - Dashboard (redirects to login if not authenticated)
- `/lab-admin/dashboard` - Main dashboard
- `/lab-admin/kpis` - KPI management
- `/lab-admin/measures` - Measures management
- `/lab-admin/modal-split` - Modal split data

**Public Routes** (accessible without authentication):
- `/lab-admin/login` - Login page
- `/lab-admin/signup` - Registration page

## Usage Examples

### Checking Authentication Status
```typescript
// In an Astro page
const user = Astro.locals.user;
if (user) {
  // User is authenticated
  console.log('Welcome', user.name);
}
```

### Manual JWT Operations
```typescript
import { AuthService } from '../bff/services/auth.service';

const authService = new AuthService();

// Generate token
const token = authService.generateToken({
  userId: 1,
  email: 'user@example.com',
  role: 'admin'
});

// Verify token
const payload = authService.verifyToken(token);
```

## User Experience

### Login Flow
1. User accesses protected route
2. Middleware detects missing authentication
3. User redirected to `/lab-admin/login`
4. User enters credentials
5. API validates credentials and sets JWT cookie
6. User redirected to intended destination

### Logout Flow
1. User clicks logout (when implemented)
2. Frontend calls `/api/v1/auth/logout`
3. Server clears JWT cookie
4. User redirected to login page

## Database Requirements

The authentication system expects the following database structure:

```sql
-- Users table
CREATE TABLE users (
  id INT PRIMARY KEY AUTO_INCREMENT,
  email VARCHAR(255) UNIQUE NOT NULL,
  name VARCHAR(255) NOT NULL,
  password VARCHAR(255) NOT NULL,
  role_id INT NOT NULL,
  status ENUM('signup', 'active', 'disabled') DEFAULT 'signup',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (role_id) REFERENCES roles(id)
);

-- Roles table
CREATE TABLE roles (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(50) NOT NULL,
  description TEXT
);
```

## Testing

The system has been tested for:
- ✅ JWT token generation and verification
- ✅ Route protection and redirection
- ✅ Login page UI and navigation
- ✅ Public route accessibility
- ✅ Cross-page navigation links

## Future Enhancements

Consider implementing:
- Password reset functionality
- Remember me option
- Session management dashboard
- Multi-factor authentication
- Role-based permissions beyond route protection
- Rate limiting for login attempts
- Audit logging for authentication events

## Troubleshooting

### Common Issues

**Middleware errors**: Ensure Prisma is properly initialized or use lazy loading
**Token not persisting**: Check cookie settings and HTTPS configuration
**Route protection not working**: Verify middleware configuration and protected/public route arrays

### Debug Mode

Enable debug logging by setting:
```env
NODE_ENV=development
```

This will provide detailed console logs for authentication flows.