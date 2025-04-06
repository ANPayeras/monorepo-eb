import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  templates: defineTable({
    user: v.id("users"),
    header: v.object({
      imgUrl: v.object({
        localImg: v.optional(v.string()),
        uploadImgUrl: v.string(),
        storageId: v.union(v.id("_storage"), v.string()),
      }),
      title: v.string(),
    }),
    sections: v.array(
      v.object({
        name: v.string(),
        label: v.string(),
        items: v.array(
          v.object({
            id: v.string(),
            name: v.string(),
            price: v.union(v.string(), v.null()),
            itemImage: v.object({
              localImg: v.optional(v.string()),
              uploadImgUrl: v.string(),
              storageId: v.union(v.id("_storage"), v.string()),
            }),
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
      backgroundImg: v.object({
        localImg: v.optional(v.string()),
        uploadImgUrl: v.string(),
        storageId: v.union(v.id("_storage"), v.string()),
      }),
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
    testScheduledTimeId: v.optional(v.id("_scheduled_functions")),
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
            resizables: v.optional(
              v.array(
                v.object({
                  id: v.number(),
                  size: v.number(),
                  img: v.optional(
                    v.object({
                      localImg: v.optional(v.string()),
                      uploadImgUrl: v.string(),
                      storageId: v.union(v.id("_storage"), v.string()),
                    })
                  ),
                  value: v.optional(v.string()),
                  textColor: v.optional(v.string()),
                  url: v.optional(v.string()),
                })
              )
            ),
            textColor: v.optional(v.string()),
            img: v.optional(
              v.object({
                localImg: v.optional(v.string()),
                uploadImgUrl: v.string(),
                storageId: v.union(v.id("_storage"), v.string()),
              })
            ),
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
    suscriptionId: v.optional(v.id("suscriptions")),
    freeTrial: v.optional(
      v.object({
        active: v.boolean(),
        startDate: v.string(),
        endDate: v.string(),
      })
    ),
  }),
  suscriptions: defineTable({
    user: v.id("users"),
    status: v.string(),
    adminUrl: v.string(),
    payerId: v.number(),
    subscriptionPreapprovalPlanId: v.optional(v.string()),
    subscriptionPreapprovalId: v.optional(v.string()),
    subscriptionAuthorizedPaymentId: v.optional(v.string()),
    paymentId: v.optional(v.string()),
  }),
  plans: defineTable({
    type: v.string(),
    premium: v.boolean(),
    title: v.string(),
    description: v.optional(v.string()),
    features: v.array(v.string()),
    monthly: v.optional(
      v.object({
        price: v.string(),
        id: v.string(),
      })
    ),
    anual: v.optional(
      v.object({
        price: v.string(),
        id: v.string(),
      })
    ),
  }),
  flags: defineTable({
    key: v.string(),
    active: v.boolean(),
  }),
});
