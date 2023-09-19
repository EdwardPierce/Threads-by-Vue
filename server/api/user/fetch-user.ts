import UserInfoModel from "~/service/models/user-info";

export default defineEventHandler(async (event) => {
  try {
    const { id } = await readBody(event);

    const user = await UserInfoModel.findById(id);
    return user;
  } catch (error: any) {
    throw new Error(`Failed to delete thread. Error message: ${error.message}`);
  }
});
