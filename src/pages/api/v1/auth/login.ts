import type { APIRoute } from "astro";
import { AuthService } from "../../../../bff/services/auth.service";

const authService = new AuthService();

export const POST: APIRoute = async ({ request, cookies }) => {
  try {
    const contentType = request.headers.get("content-type");

    // Validate content type
    if (!contentType || !contentType.includes("application/json")) {
      return new Response(
        JSON.stringify({
          success: false,
          error: "Content-Type must be application/json",
        }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    const loginData = await request.json();

    // Validate required fields
    if (!loginData.email || !loginData.password) {
      return new Response(
        JSON.stringify({
          success: false,
          error: "Email and password are required",
        }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(loginData.email)) {
      return new Response(
        JSON.stringify({
          success: false,
          error: "Invalid email format",
        }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    // Attempt login
    const loginResult = await authService.login({
      email: loginData.email.trim().toLowerCase(),
      password: loginData.password,
    });

    if (!loginResult.success) {
      return new Response(
        JSON.stringify({
          success: false,
          error: loginResult.error || "Login failed",
        }),
        {
          status: 401,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    // Set secure HTTP-only cookie with JWT token
    const cookieOptions = authService.getSecureCookieOptions();
    cookies.set("auth-token", loginResult.token!, cookieOptions);

    // Return success response without token (it's in HTTP-only cookie)
    return new Response(
      JSON.stringify({
        success: true,
        message: "Login successful",
        user: {
          id: loginResult.user!.id,
          email: loginResult.user!.email,
          name: loginResult.user!.name,
          role: loginResult.user!.role,
          status: loginResult.user!.status,
        },
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }
    );

  } catch (error) {
    console.error("Error in POST /api/v1/auth/login:", error);

    return new Response(
      JSON.stringify({
        success: false,
        error: "Internal server error",
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
};

// Handle preflight OPTIONS requests for CORS if needed
export const OPTIONS: APIRoute = async () => {
  return new Response(null, {
    status: 204,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
    },
  });
};
