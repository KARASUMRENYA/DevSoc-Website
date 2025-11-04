import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  users: defineTable({
    externalId: v.string(), // Prisma User.id (uuid)
    email: v.string(),
    name: v.string(),
    image: v.optional(v.string()),
    role: v.union(
      v.literal("USER"),
      v.literal("ADMIN"),
      v.literal("SUBCOMMITTEE")
    ),
    createdAt: v.number(),
    updatedAt: v.number(),
  })
    .index("by_externalId", ["externalId"])
    .index("by_email", ["email"]),
});
