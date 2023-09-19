import ThreadModel from "~/service/models/thread";

export default defineEventHandler(async (event) => {
  try {
    const { threadId, commentText, userId } = await readBody(event);

    const originalThread = await ThreadModel.findById(threadId);

    if (!originalThread) {
      throw new Error("Thread not found");
    }

    const commentThread = await ThreadModel.create({
      text: commentText,
      author: JSON.parse(userId),
      parentId: threadId,
    });

    originalThread.children.push(commentThread._id);

    return await originalThread.save();
  } catch (error) {
    throw createError({
      status: 500,
      statusMessage: "Unable to add comment " + error,
    });
  }
});
