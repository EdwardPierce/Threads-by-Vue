import jwt from "jsonwebtoken";
import TokenModel from "~/service/models/token";

class TokenService {
  generateTokens(payload: any) {
    const accessToken: string = jwt.sign(
      payload,
      //@ts-ignore
      process.env.JWT_ACCESS_SECRET,
      {
        expiresIn: "30m",
      }
    );
    const refreshToken: string = jwt.sign(
      payload,
      //@ts-ignore
      process.env.JWT_REFRESH_SECRET,
      {
        expiresIn: "7d",
      }
    );

    return {
      accessToken,
      refreshToken,
    };
  }

  //TODO
  // if user login throught another device, in first device will be forced logout.
  //To fix that need create some logic
  // Also do clear database , from unneeded tokens

  async saveToken(userId: string, refreshToken: string) {
    const tokenData = await TokenModel.findOne({ user: userId });
    if (tokenData) {
      tokenData.refreshToken = refreshToken;
      return await tokenData.save();
    }

    if (!userId || !refreshToken) {
      throw new Error(
        `userId or refreshToken is null:${userId} & ${refreshToken} `
      );
    }

    const token = await TokenModel.create({ user: userId, refreshToken });
    // throw new Error("token service.ts. Error codeline 33: " + token);
    return token;
  }

  async removeToken(refreshToken: string | undefined) {
    const tokenData = await TokenModel.deleteOne({ refreshToken });
    return tokenData;
  }

  async findToken(refreshToken: string | undefined) {
    const tokenData = await TokenModel.findOne({ refreshToken });
    return tokenData;
  }

  validateAccessToken(token: string) {
    try {
      //@ts-ignore
      const userData = jwt.verify(token, process.env.JWT_ACCESS_SECRET);
      return userData;
    } catch (error) {
      return null;
    }
  }

  validateRefreshToken(token: string) {
    try {
      //@ts-ignore
      const userData = jwt.verify(token, process.env.JWT_REFRESH_SECRET);
      return userData;
    } catch (error) {
      return null;
    }
  }
}

export default new TokenService();
