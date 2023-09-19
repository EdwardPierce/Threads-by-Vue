import { defineStore } from "pinia";
import { IUser } from "../types/IUser";
import AuthService from "../service/AuthService";

export const useStore = defineStore("store", {
  state: () => {
    return {
      isAuth: false,
      user: {} as IUser | undefined,
      isLoading: false,
      loginErrorMessage: null,
      userInfo: {},
    };
  },
  actions: {
    async login(email: string, password: string) {
      try {
        const res = await AuthService.login(email, password);

        if (res.data.value.message) {
          this.loginErrorMessage = res.data.value.message;
        } else {
          localStorage.setItem("token", res.data.value.accessToken);
          this.isAuth = true;
          this.user = res.data.value?.user;
          this.userInfo = res.data.value.userInfo;
          localStorage.setItem("userId", res.data.value.userInfo._id);
        }
      } catch (error) {
        console.log(error);
      }
    },

    async registration(email: string, password: string, name: string) {
      try {
        const res = await AuthService.registration(email, password, name);

        localStorage.setItem("token", res.data.value.accessToken);
        this.isAuth = true;
        this.user = res.data.value?.user;
        this.userInfo = res.data.value.userInfo;
      } catch (error) {
        console.log(error);
      }
    },

    async logout() {
      try {
        const res = await AuthService.logout();
        localStorage.removeItem("token");
        localStorage.removeItem("userId");
        this.isAuth = false;
        this.user = {} as IUser;
      } catch (error) {
        console.log(error);
      }
    },

    async checkAuth() {
      this.isLoading = true;
      try {
        if (process.browser) {
          const res = await $fetch("/api/auth/refresh", {
            credentials: "include",
          });

          if (res.accessToken) {
            localStorage.setItem("token", res.accessToken);

            this.isAuth = true;
            this.user = res.user;
          }
        }
      } catch (error) {
        console.log(error);
      } finally {
        this.isLoading = false;
      }
    },
  },
});

// const res = await useFetch("/api/auth/refresh", {
//   // async onRequest({ request, options }) {
//   //   options.headers = options.headers || {};
//   //   options.headers.authorization = `Bearer ${localStorage.getItem(
//   //     "token"
//   //   )}`;
//   // },
//   credentials: "include",
// });
