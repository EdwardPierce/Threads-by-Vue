import { _AsyncData } from "nuxt/dist/app/composables/asyncData";
import $api from "../http";
import { AuthResponse } from "../types/AuthResponse";

// example
//const { data } = await useAsyncData("item", () => $fetch("/api/item"));
//shortcart
// const { data } = await useFetch("/api/item")

export default class AuthService {
  static async login(
    email: string,
    password: string
  ): Promise<_AsyncData<AuthResponse | null, Error | null>> {
    const authServiceApi = await useAsyncData<AuthResponse>(() =>
      $api("/api/auth/login", {
        method: "POST",
        body: { email, password },
      })
    );
    return authServiceApi;
  }

  static async registration(
    email: string,
    password: string,
    name: string
  ): Promise<_AsyncData<AuthResponse | null, Error | null>> {
    const authServiceApi = await useAsyncData<AuthResponse>(() =>
      $api("/api/auth/registration", {
        method: "POST",
        body: { email, password, name },
      })
    );
    return authServiceApi;
  }

  static async logout(): Promise<
    _AsyncData<
      { deletedCount: number; acknowledged: boolean } | null,
      Error | null
    >
  > {
    const authServiceApi = await useAsyncData(() =>
      $api("/api/auth/logout", {
        method: "POST",
      })
    );
    return authServiceApi;
  }
}
