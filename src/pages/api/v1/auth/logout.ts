import type { APIRoute } from "astro";

export const POST: APIRoute = async ({ cookies }) => {
  try {
    // Clear the auth token cookie
    cookies.delete("auth-token", {
      path: "/",
    });

    return new Response(
      JSON.stringify({
        success: true,
        message: "Logged out successfully",
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    console.error("Error in POST /api/v1/auth/logout:", error);

    return new Response(
      JSON.stringify({
        success: false,
        error: "Logout failed",
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
};
