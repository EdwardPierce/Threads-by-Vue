import ThreadModel from "~/service/models/thread";
import UserInfoModel from "~/service/models/user-info";

export default defineEventHandler(async (event) => {
  try {
    const { text, author } = await readBody(event);

    const createdThread = await ThreadModel.create({ text, author });

    await UserInfoModel.findByIdAndUpdate(author, {
      $push: { threads: createdThread._id },
    });
  } catch (error: any) {
    throw new Error(`Failed to create thread. Error message: ${error.message}`);
  }
});
