import ThreadModel from "~/service/models/thread";
import UserInfoModel from "~/service/models/user-info";

export default defineEventHandler(async (event) => {
  try {
    const { id } = await readBody(event);

    const thread = await ThreadModel.findById(id)
      .populate({
        path: "author",
        model: UserInfoModel,
        select: "_id name",
      })
      .populate({
        path: "children",
        populate: [
          {
            path: "author",
            model: UserInfoModel,
            select: "_id name",
          },
          {
            path: "children",
            model: ThreadModel,
            populate: [
              {
                path: "author",
                model: UserInfoModel,
                select: "_id name",
              },
            ],
          },
        ],
      })
      .exec();

    return thread;
  } catch (error) {
    throw createError({
      status: 500,
      statusMessage: "Unable to fetch thread " + error,
    });
  }
});
