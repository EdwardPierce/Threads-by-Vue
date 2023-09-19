import ThreadModel from "~/service/models/thread";
import UserInfoModel from "~/service/models/user-info";

export default defineEventHandler(async (event) => {
  try {
    // connectToDB();

    const threads = await ThreadModel.find()
      .populate({
        path: "author",
        model: UserInfoModel,
      })
      .exec();

    return threads;
  } catch (error: any) {
    throw new Error(
      `Failed to fetch all threads. Error message: ${error.message}`
    );
  }
});
