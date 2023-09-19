import userService from "~/service/user-service";

export default defineEventHandler(async (event) => {
  try {
    const { email, password } = await readBody(event);

    const userData = await userService.login(email, password);

    if (userData.message) {
      return userData
    }
    setCookie(event, "refreshToken", userData.refreshToken, {
      httpOnly: true,
      maxAge: 30 * 24 * 60 * 60 * 1000,
    });

    return userData;
  } catch (error) {
    console.log(error);
  }
});
