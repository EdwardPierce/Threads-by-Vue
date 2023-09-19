import UserModel from "~/service/models/user";
import * as bcrypt from "bcrypt";
import * as uuid from "uuid";
// import mailService from "./mail-service";
import UserDto from "~/service/dtos/user-dto";
import tokenService from "./token-service";
import MailService from "./mail-service";
import ApiError from "~/service/exceptions/api-error";
import { ITokens } from "./types/ITokens";
import UserInfoModel from "./models/user-info";

class UserService {
  async registration(email: string, password: string, name: string) {
    console.log("registration in process");
    console.log("email: ", email);
    console.log("password: ", password);

    const candidate = await UserModel.findOne({ email });

    if (candidate) {
      throw createError({
        statusCode: 400,
        statusMessage: `This user with email ${email} already exists`,
      });
    }

    const hashPassword = await bcrypt.hash(password, 3);

    const activationLink = uuid.v4();

    const user = await UserModel.create({
      email,
      password: hashPassword,
      activationLink,
      onboarded: true,
    });

    const userInfo = await UserInfoModel.create({
      user: user._id,
      name,
    });

    // const mail = new MailService();
    // await mail.sendActivationMail(
    //   email,
    //   `${process.env.API_URL}/api/auth/activate/${activationLink}`
    // );

    const userDto = new UserDto(user);

    const tokens = tokenService.generateTokens({ ...userDto });
    await tokenService.saveToken(userDto.id, tokens.refreshToken);

    return { ...tokens, user: userDto, userInfo };
  }

  async activate(activationLink: string | undefined) {
    const user = await UserModel.findOne({ activationLink });
    if (!user) {
      throw createError({
        statusCode: 400,
        statusMessage: "Incorrect the link activation",
      });
      // throw new Error("Incorrect link activation");
    }

    user.isActivated = true;
    await user.save();
  }

  async login(email: string, password: string) {
    const user = await UserModel.findOne({ email });
    if (!user) {
      return {
        message:
          "The user with this email was not found. Please pass registration",
      };
      // throw ApiError.BadRequest(
      //   "The user with this email was not found. Please pass registration"
      // );
    }

    const userInfo = await UserInfoModel.findOne({user:user._id})

    const isPasswordEquals = await bcrypt.compare(password, user.password);
    if (!isPasswordEquals) {
      throw ApiError.BadRequest("Invalid password");
    }

    const userDto = new UserDto(user);

    const tokens = tokenService.generateTokens({ ...userDto });

    await tokenService.saveToken(userDto.id, tokens.refreshToken);

    return { ...tokens, user: userDto, userInfo };
  }

  async logout(refreshToken: string | undefined) {
    const token = await tokenService.removeToken(refreshToken);
    return token;
  }

  async refresh(refreshToken: string | undefined) {
    if (!refreshToken) {
      throw ApiError.UnauthorizedError();
    }
    const userData = tokenService.validateRefreshToken(refreshToken);
    const tokenFromDb = await tokenService.findToken(refreshToken);

    if (!userData) {
      throw ApiError.UnauthorizedError("Token invalid");
    }

    if (!tokenFromDb) {
      throw ApiError.UnauthorizedError("Token not found in DB");
    }

    const user = await UserModel.findById(userData.id);
    const userDto = new UserDto(user);
    const tokens = tokenService.generateTokens({ ...userDto });
    await tokenService.saveToken(userDto.id, tokens.refreshToken);
    return { ...tokens, user: userDto };
  }

  async getAllUsers() {
    const users = await UserModel.find();
    return users;
  }
}
export default new UserService();
