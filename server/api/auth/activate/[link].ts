import userService from "~/service/user-service";

export default defineEventHandler(async (event) => {
  try {
    // connectToDB();

    const activationLink = getRouterParam(event, "link");
    await userService.activate(activationLink);

    return sendRedirect(event, "http://127.0.0.1:3000/login");
  } catch (error) {
    console.log(error);
  }
});
