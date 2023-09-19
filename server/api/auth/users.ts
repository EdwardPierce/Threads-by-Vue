import userService from "~/service/user-service";

export default defineEventHandler(async (event) => {
  try {
    const users = await userService.getAllUsers();
    return users;
  } catch (error) {
    throw error;
  }
});
