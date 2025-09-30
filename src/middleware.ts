import { defineMiddleware } from "astro:middleware";

// Routes that require authentication
const PROTECTED_ROUTES = ['/lab-admin'];

// Routes that should be accessible without authentication (even under protected paths) 
const PUBLIC_ROUTES = [
  '/lab-admin/login',
  '/lab-admin/signup'
];

let authService: any = null;

export const onRequest = defineMiddleware(async (context, next) => {
  const { url, cookies, redirect } = context;
  const pathname = url.pathname;

  // Check if the current route needs protection
  const isProtectedRoute = PROTECTED_ROUTES.some(route => 
    pathname.startsWith(route)
  );

  // Check if it's a route that should remain public
  const isPublicRoute = PUBLIC_ROUTES.some(route => 
    pathname === route || pathname.startsWith(route + '/')
  );

  // If it's a protected route but not public, check authentication
  if (isProtectedRoute && !isPublicRoute) {
    const token = cookies.get("auth-token")?.value;

    if (!token) {
      // No token found, redirect to login
      console.log(`Authentication required for ${pathname}, redirecting to login`);
      return redirect('/lab-admin/login');
    }

    try {
      // Lazy-load AuthService to avoid Prisma initialization issues
      if (!authService) {
        const { AuthService } = await import('./bff/services/auth.service');
        authService = new AuthService();
      }

      // Validate token and get user
      const user = await authService.validateTokenAndGetUser(token);

      if (!user) {
        // Invalid token, clear cookie and redirect
        console.log(`Invalid token for ${pathname}, redirecting to login`);
        cookies.delete("auth-token", { path: "/" });
        return redirect('/lab-admin/login');
      }

      // User is authenticated, add user info to context for use in pages
      context.locals.user = user;

    } catch (error) {
      console.error('Auth middleware error:', error);
      cookies.delete("auth-token", { path: "/" });
      return redirect('/lab-admin/login');
    }
  }

  // If user is authenticated and trying to access login page, redirect to dashboard
  if (pathname === '/lab-admin/login') {
    const token = cookies.get("auth-token")?.value;
    
    if (token) {
      try {
        // Lazy-load AuthService
        if (!authService) {
          const { AuthService } = await import('./bff/services/auth.service');
          authService = new AuthService();
        }

        const user = await authService.validateTokenAndGetUser(token);
        if (user) {
          console.log('User already authenticated, redirecting to dashboard');
          return redirect('/lab-admin');
        }
      } catch (error) {
        // Invalid token, clear it
        cookies.delete("auth-token", { path: "/" });
      }
    }
  }

  return next();
});