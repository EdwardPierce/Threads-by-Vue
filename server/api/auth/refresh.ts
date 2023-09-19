import userService from "~/service/user-service";

export default defineEventHandler(async (event) => {
  // const refreshToken = getCookie(event, "refreshToken");
  const { cookie } = getRequestHeaders(event);
  const refreshToken = cookie?.split("=")[1];

  const userData = await userService.refresh(refreshToken);

  setCookie(event, "refreshToken", userData.refreshToken, {
    maxAge: 30 * 24 * 60 * 60 * 1000,
    httpOnly: true,
  });

  return userData;
});
