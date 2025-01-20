import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  templates: defineTable({
    user: v.id("users"),
    header: v.object({
      imgUrl: v.string(),
      title: v.string(),
    }),
    sections: v.array(
      v.object({
        name: v.string(),
        label: v.string(),
        items: v.array(
          v.object({
            name: v.string(),
            price: v.union(v.string(), v.null()),
            itemImage: v.string(),
          })
        ),
      })
    ),
    combos: v.array(
      v.object({
        title: v.string(),
        description: v.string(),
        imgUrl: v.array(
          v.object({
            url: v.string(),
            storageId: v.union(v.id("_storage"), v.string()),
          })
        ),
        price: v.union(v.string(), v.null()),
        id: v.string(),
      })
    ),
    contact: v.array(
      v.object({
        title: v.string(),
        url: v.string(),
        enabled: v.boolean(),
      })
    ),
    layout: v.object({
      bgColor: v.string(),
      textsColor: v.string(),
      templateLayout: v.string(),
    }),
    paymentMethods: v.array(
      v.object({
        label: v.string(),
        active: v.boolean(),
        comments: v.optional(v.string()),
      })
    ),
    deliverMethods: v.array(
      v.object({
        label: v.string(),
        active: v.boolean(),
        comments: v.optional(v.string()),
      })
    ),
    test: v.boolean(),
    active: v.boolean(),
    widgets: v.array(
      v.object({
        type: v.string(),
        title: v.string(),
        enabled: v.boolean(),
        widgetHandler: v.string(),
        id: v.string(),
        data: v.optional(
          v.object({
            value: v.optional(v.string()),
            url: v.optional(v.string()),
          })
        ),
      })
    ),
    lastBuild: v.boolean(),
  }),
  users: defineTable({
    email: v.string(),
    imageUrl: v.string(),
    clerkId: v.string(),
    name: v.string(),
    phone: v.optional(v.string()),
    username: v.optional(v.string()),
    isPremium: v.optional(v.boolean()),
  }),
});
