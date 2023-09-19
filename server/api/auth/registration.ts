import userService from "~/service/user-service";
import * as Yup from "yup";

export default defineEventHandler(async (event) => {
  // was fix connectToDB(); and Model Token
  try {
    // connectToDB();

    const {
      email,
      password,
      name,
    }: { email: string; password: string; name: string } = await readBody(
      event
    );

    const validateSchema = Yup.object({
      email: Yup.string().required().email(),
      password: Yup.string().required().trim().min(3).max(40),
      name: Yup.string().required().min(3),
    });

    await validateSchema.validate({ email, password, name });

    const userData = await userService.registration(email, password, name);

    setCookie(event, "refreshToken", userData.refreshToken, {
      httpOnly: true,
      maxAge: 30 * 24 * 60 * 60 * 1000,
    });

    return userData;
  } catch (error) {
    console.log(error);
    return error;
  }
});
