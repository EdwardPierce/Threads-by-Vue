import userService from "~/service/user-service";

export default defineEventHandler(async (event) => {
  try {
    const refreshToken = getCookie(event, "refreshToken");
    const tokenInfo = await userService.logout(refreshToken);
    deleteCookie(event, "refreshToken");

    return tokenInfo;
  } catch (error) {
    console.log(error);
  }
});
