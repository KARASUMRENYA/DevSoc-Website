import { query } from "./_generated/server.js";
import { v } from "convex/values";

export const getUserByExternalId = query({
  args: { externalId: v.string() },
  handler: async (ctx: any, args: any) => {
    return await ctx.db
      .query("users")
      .withIndex("by_externalId", (q: any) =>
        q.eq("externalId", args.externalId)
      )
      .first();
  },
});

export const getUserByEmail = query({
  args: { email: v.string() },
  handler: async (ctx: any, args: any) => {
    return await ctx.db
      .query("users")
      .withIndex("by_email", (q: any) =>
        q.eq("email", args.email.toLowerCase())
      )
      .first();
  },
});

export const getAllUsers = query({
  args: {},
  handler: async (ctx: any) => {
    return await ctx.db.query("users").collect();
  },
});
