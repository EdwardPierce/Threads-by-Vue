import { _AsyncData } from "nuxt/dist/app/composables/asyncData";
import $api from "../http";
import { IUser } from "../types/IUser";

export default class UserService {
  static async fetchUsers(): Promise<_AsyncData<IUser[] | null, Error | null>> {
    const userServiceApi = await useAsyncData(() =>
      $api<IUser[]>("/api/auth/users")
    );
    return userServiceApi;
  }
}
