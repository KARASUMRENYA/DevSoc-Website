import { ConvexHttpClient } from "convex/browser";
import { api } from "../../convex/_generated/api.js";

const convexUrl = process.env.CONVEX_URL;
if (!convexUrl) {
  throw new Error("CONVEX_URL environment variable is required");
}

// Type assertion after null check
const CONVEX_URL: string = convexUrl;

export const convex = new ConvexHttpClient(CONVEX_URL);

// Helper function to sync user data to Convex
export async function syncUserToConvex(user: {
  id: string;
  email: string;
  name: string;
  image?: string | null;
  role: "USER" | "ADMIN" | "SUBCOMMITTEE";
  createdAt: Date;
  updatedAt: Date;
}) {
  const adminKey = process.env.CONVEX_ADMIN_KEY;
  if (!adminKey) {
    throw new Error("CONVEX_ADMIN_KEY environment variable is required");
  }

  try {
    // Use fetch directly to call the Convex action endpoint
    const response = await fetch(`${CONVEX_URL}/api/actions`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${adminKey}`,
      },
      body: JSON.stringify({
        path: "userActions:upsert",
        args: {
          id: user.id,
          email: user.email,
          name: user.name,
          image: user.image,
          role: user.role,
          createdAt: user.createdAt.toISOString(),
          updatedAt: user.updatedAt.toISOString(),
        },
      }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result = await response.json();
    return result;
  } catch (error) {
    console.error("Failed to sync user to Convex:", error);
    throw error;
  }
}

// Helper function to get user from Convex
export async function getUserFromConvex(externalId: string) {
  try {
    return await convex.query(api.userQueries.getUserByExternalId, {
      externalId,
    });
  } catch (error) {
    console.error("Failed to get user from Convex:", error);
    throw error;
  }
}
