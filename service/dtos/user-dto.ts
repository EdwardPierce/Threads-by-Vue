import { IUser } from "~/service/types/IUser";

export default class UserDto implements IUser {
  email: string;
  id: string;
  isActivated: boolean;
  onboarded: boolean;

  constructor(model: { email: string; _id: string; isActivated: boolean,onboarded:boolean }) {
    this.email = model.email;
    this.id = model._id;
    this.isActivated = model.isActivated;
    this.onboarded = model.onboarded;
  }
}
