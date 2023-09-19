import { connectToDB } from "~/utils1/mongoose";

export default defineEventHandler((event) => {
  const { pathname } = getRequestURL(event);

  if (pathname.startsWith("/api")) {
    try {
      connectToDB();
    } catch (error: any) {
      throw new Error(
        `Failed to connect database. Error message: ${error.message}`
      );
    }
  }
});
