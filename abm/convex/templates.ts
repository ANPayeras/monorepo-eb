import { ConvexError, v } from "convex/values";
import {
  internalMutation,
  internalQuery,
  mutation,
  MutationCtx,
  query,
} from "./_generated/server";
import schema from "./schema";
import { internal } from "./_generated/api";
import { Id } from "./_generated/dataModel";

export const createTemplate = mutation({
  args: {
    layout: v.string(),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) {
      throw new ConvexError("User not authenticated");
    }

    const user = await ctx.db
      .query("users")
      .filter((q) => q.eq(q.field("email"), identity.email))
      .collect();

    if (user.length === 0) {
      throw new ConvexError("User not found");
    }

    const lastBuildTemplate = await ctx.db
      .query("templates")
      .filter((q) => q.eq(q.field("lastBuild"), true))
      .first();

    if (lastBuildTemplate) {
      await ctx.db.patch(lastBuildTemplate._id, { lastBuild: false });
    }

    return await ctx.db.insert("templates", {
      user: user[0]._id,
      header: {
        imgUrl: { localImg: "", uploadImgUrl: "", storageId: "" },
        title: "",
      },
      sections: [],
      combos: Array.from({ length: 4 }, (_, i) => ({
        description: "",
        imgUrl: [{ url: "", storageId: "" }],
        price: null,
        title: "",
        id: `combo ${i + 1}`,
      })),
      contact: [],
      layout: {
        bgColor: "#ffffff",
        textsColor: "#000000",
        templateLayout: args.layout,
        backgroundImg: {
          localImg: "",
          uploadImgUrl: "",
          storageId: "",
        },
        backgroundVideo: {
          localVideo: "",
          uploadVideoUrl: "",
          storageId: "",
        },
      },
      paymentMethods: [],
      active: false,
      deliverMethods: [],
      test: false,
      widgets: [],
      lastBuild: true,
    });
  },
});

export const createTemplateTest = mutation({
  args: {
    templateId: v.id("templates"),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) {
      throw new ConvexError("User not authenticated");
    }

    const user = await ctx.db
      .query("users")
      .filter((q) => q.eq(q.field("email"), identity.email))
      .collect();

    if (user.length === 0) {
      throw new ConvexError("User not found");
    }

    const testTemplate = await ctx.db
      .query("templates")
      .filter((q) =>
        q.and(q.eq(q.field("user"), user[0]._id), q.eq(q.field("test"), true))
      )
      .first();

    if (testTemplate?._id === args.templateId) {
      await ctx.scheduler.cancel(testTemplate.testScheduledTimeId!);
    }

    const scheduledId = await scheduleTemplateTest(
      ctx,
      3600000,
      args.templateId
    );

    testTemplate && (await ctx.db.patch(testTemplate._id, { test: false }));

    return {
      test: true,
      testScheduledTimeId: scheduledId,
    };
  },
});

export const listTemplates = query({
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) {
      throw new ConvexError("User not authenticated");
    }

    const user = await ctx.db
      .query("users")
      .filter((q) => q.eq(q.field("email"), identity.email))
      .collect();

    if (user.length === 0) {
      throw new ConvexError("User not found");
    }

    return await ctx.db
      .query("templates")
      .filter((q) => q.eq(q.field("user"), user[0]._id))
      .collect();
  },
});

export const getTemplateTest = query({
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) {
      throw new ConvexError("User not authenticated");
    }

    const user = await ctx.db
      .query("users")
      .filter((q) => q.eq(q.field("email"), identity.email))
      .collect();

    const template = await ctx.db
      .query("templates")
      .filter((q) =>
        q.and(q.eq(q.field("user"), user[0]._id), q.eq(q.field("test"), true))
      )
      .collect();

    return template;
  },
});

export const getTemplateById = query({
  args: {
    templateId: v.string(),
  },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("templates")
      .filter((q) => q.eq(q.field("_id"), args.templateId))
      .first();
  },
});

export const getLastTemplateBuild = query({
  args: {
    user: v.id("users"),
  },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("templates")
      .filter((q) =>
        q.and(
          q.eq(q.field("user"), args.user),
          q.eq(q.field("lastBuild"), true)
        )
      )
      .first();
  },
});

export const updateTemplate = mutation({
  args: {
    ...schema.tables.templates.validator.fields,
    _id: v.id("templates"),
    _creationTime: v.number(),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) {
      throw new ConvexError("User not authenticated");
    }

    const user = await ctx.db
      .query("users")
      .filter((q) => q.eq(q.field("email"), identity.email))
      .collect();

    if (user.length === 0) {
      throw new ConvexError("User not found");
    }

    const lastBuildTemplate = await ctx.db
      .query("templates")
      .filter((q) => q.eq(q.field("lastBuild"), true))
      .first();

    if (lastBuildTemplate?._id === args._id) {
      await ctx.db.patch(args._id, {
        ...args,
        lastBuild: true,
        layout: {
          ...args.layout,
          backgroundImg: {
            storageId: args.layout.backgroundImg.storageId,
            uploadImgUrl: args.layout.backgroundImg.uploadImgUrl,
          },
          backgroundVideo: {
            storageId: args.layout.backgroundVideo?.storageId || "",
            uploadVideoUrl: args.layout.backgroundVideo?.uploadVideoUrl || "",
          },
        },
      });
    } else {
      await ctx.db.patch(args._id, {
        ...args,
        lastBuild: true,
        layout: {
          ...args.layout,
          backgroundImg: {
            storageId: args.layout.backgroundImg.storageId,
            uploadImgUrl: args.layout.backgroundImg.uploadImgUrl,
          },
          backgroundVideo: {
            storageId: args.layout.backgroundVideo?.storageId || "",
            uploadVideoUrl: args.layout.backgroundVideo?.uploadVideoUrl || "",
          },
        },
      });
      lastBuildTemplate &&
        (await ctx.db.patch(lastBuildTemplate._id, {
          lastBuild: false,
        }));
    }
  },
});

export const deleteTemplate = mutation({
  args: {
    templateId: v.id("templates"),
  },
  handler: async (ctx, args) => {
    const template = await ctx.db.get(args.templateId);

    if (!template) {
      throw new ConvexError("Template not found");
    }

    const userTemplates = await ctx.db
      .query("templates")
      .filter((q) => q.eq(q.field("user"), template.user))
      .collect();

    if (template.lastBuild && userTemplates.length) {
      await ctx.db.patch(userTemplates[0]._id, { lastBuild: true });
    }

    return await ctx.db.delete(args.templateId);
  },
});

export const activeTemplate = mutation({
  args: {
    templateId: v.id("templates"),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) {
      throw new ConvexError("User not authenticated");
    }

    const user = await ctx.db
      .query("users")
      .filter((q) => q.eq(q.field("email"), identity.email))
      .collect();

    if (user.length === 0) {
      throw new ConvexError("User not found");
    }

    const currentActiveTemplate = await ctx.db
      .query("templates")
      .filter((q) =>
        q.and(q.eq(q.field("active"), true), q.eq(q.field("user"), user[0]._id))
      )
      .first();

    if (currentActiveTemplate) {
      if (currentActiveTemplate._id === args.templateId) {
        return await ctx.db.patch(currentActiveTemplate._id, { active: false });
      }
      await ctx.db.patch(currentActiveTemplate._id, { active: false });
    }

    return await ctx.db.patch(args.templateId, { active: true });
  },
});

export const getActiveTemplate = query({
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) {
      throw new ConvexError("User not authenticated");
    }

    const user = await ctx.db
      .query("users")
      .filter((q) => q.eq(q.field("email"), identity.email))
      .collect();

    if (user.length === 0) {
      throw new ConvexError("User not found");
    }

    return await ctx.db
      .query("templates")
      .filter((q) =>
        q.and(q.eq(q.field("user"), user[0]._id), q.eq(q.field("active"), true))
      )
      .collect();
  },
});

export const getActiveTemplateByClerkId = internalQuery({
  args: {
    clerkId: v.string(),
  },
  handler: async (ctx, args) => {
    const user = await ctx.db
      .query("users")
      .filter((q) => q.eq(q.field("clerkId"), args.clerkId))
      .collect();

    if (user.length === 0) {
      throw new ConvexError("User not found");
    }

    return await ctx.db
      .query("templates")
      .filter((q) =>
        q.and(q.eq(q.field("user"), user[0]._id), q.eq(q.field("active"), true))
      )
      .collect();
  },
});

export const getActiveTemplateByClerkIdPublic = query({
  args: {
    clerkId: v.string(),
  },
  handler: async (ctx, args) => {
    const user = await ctx.db
      .query("users")
      .filter((q) => q.eq(q.field("clerkId"), args.clerkId))
      .collect();

    if (user.length === 0) {
      throw new ConvexError("User not found");
    }

    return await ctx.db
      .query("templates")
      .filter((q) =>
        q.and(q.eq(q.field("user"), user[0]._id), q.eq(q.field("active"), true))
      )
      .collect();
  },
});

export const getUrl = mutation({
  args: {
    storageId: v.id("_storage"),
  },
  handler: async (ctx, args) => {
    return await ctx.storage.getUrl(args.storageId);
  },
});

export const deleteUrl = mutation({
  args: {
    storageId: v.id("_storage"),
  },
  handler: async (ctx, args) => {
    return await ctx.storage.delete(args.storageId);
  },
});

export const getTemplateByUser = query({
  args: {
    user: v.id("users"),
  },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("templates")
      .filter((q) =>
        q.and(q.eq(q.field("user"), args.user), q.field("active"), true)
      )
      .first();
  },
});

export const getLastBuildTemplate = query({
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) {
      throw new ConvexError("User not authenticated");
    }

    const user = await ctx.db
      .query("users")
      .filter((q) => q.eq(q.field("email"), identity.email))
      .collect();

    if (user.length === 0) {
      throw new ConvexError("User not found");
    }

    return await ctx.db
      .query("templates")
      .filter((q) =>
        q.and(
          q.eq(q.field("user"), user[0]._id),
          q.eq(q.field("lastBuild"), true)
        )
      )
      .first();
  },
});

export const getTemplate = query({
  args: {
    user: v.string(),
    test: v.boolean(),
  },
  handler: async (ctx, args) => {
    const user = await ctx.db
      .query("users")
      .filter((q) => q.eq(q.field("username"), args.user))
      .first();

    if (!user) {
      throw new ConvexError("User not found");
    }

    const template = await ctx.db
      .query("templates")
      .filter((q) =>
        q.and(
          q.eq(q.field("user"), user._id),
          q.field(args.test ? "test" : "active"),
          true
        )
      )
      .collect();

    return { template, user };
  },
});

export const getUser = query({
  args: {
    user: v.string(),
  },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("users")
      .filter((q) => q.eq(q.field("username"), args.user))
      .collect();
  },
});

export const deleteTemplateTest = internalMutation({
  args: {
    templateId: v.id("templates"),
  },
  handler: async (ctx, args) => {
    await ctx.db.patch(args.templateId, { test: false });
  },
});

const scheduleTemplateTest = async (
  ctx: MutationCtx,
  time: number,
  templateId: Id<"templates">
): Promise<Id<"_scheduled_functions">> => {
  return await ctx.scheduler.runAfter(
    time,
    internal.templates.deleteTemplateTest,
    {
      templateId,
    }
  );
};

// View
export const getTemplateView = query({
  args: {
    user: v.string(),
    test: v.boolean(),
  },
  handler: async (ctx, args) => {
    const user = await ctx.db
      .query("users")
      .filter((q) => q.eq(q.field("username"), args.user))
      .first();

    const template = await ctx.db
      .query("templates")
      .filter((q) =>
        q.and(
          q.eq(q.field("user"), user?._id),
          q.field(args.test ? "test" : "active"),
          true
        )
      )
      .collect();

    return { template, user };
  },
});
