import ApiError from "~/service/exceptions/api-error";
import tokenService from "~/service/token-service";

export default defineEventHandler((event) => {
  const { pathname } = getRequestURL(event);
  //   pathname: '/api/auth/users'

  if (pathname.startsWith("/users", 9)) {
    // may add || pathname.startsWith("/refresh", 9)
    const requestHeaders = getRequestHeaders(event);
    const authorizationHeader = requestHeaders.authorization;

    if (!authorizationHeader) {
      console.log("authorizationHeader is null");
      throw ApiError.UnauthorizedError();
    }

    const accessToken = authorizationHeader.split(" ")[1];
    if (!accessToken) {
      console.log("accessToken is null");
      throw ApiError.UnauthorizedError();
    }

    const userData = tokenService.validateAccessToken(accessToken);
    if (!userData) {
      console.log("tokenService.validateAccessToken(accessToken) return null");
      throw ApiError.UnauthorizedError();
    }
  }
});
