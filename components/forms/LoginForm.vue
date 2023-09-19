<script setup lang="ts">
import UserService from "~/client/service/UserService";
import { useStore } from "~/client/store/pinia-store";
import { IUser } from "~/client/types/IUser";

const email = useState(() => "lili@mail.ru");
const password = useState(() => "123456");

const users = useState(() => []);

const store = useStore();

const getUsers = async () => {
  try {
    const res = await UserService.fetchUsers();
    users.value = res.data.value;
  } catch (error) {
    console.log(error);
  }
};

const handleLogin = async () => {
  await store.login(email.value, password.value);
};
</script>

<template>
  <div v-if="store.isLoading">Loading</div>
  <div v-else>
    <div
      v-if="!store.isAuth"
      class="flex flex-col gap-y-6 items-center justify-center h-[70vh]"
    >
      <p class="text-3xl font-semibold pt-4">
        {{ !store.isAuth && "Login" }}
      </p>
      <form
        @submit.prevent=""
        class="flex flex-col gap-5 bg-slate-800/50 px-8 py-6 rounded-lg max-w-md w-full"
      >
        <input
          class="text-black text-lg p-2 rounded-lg focus:outline-none focus:ring-1 focus:ring-slate-400"
          v-model="email"
          type="text"
          placeholder="Email"
        />

        <input
          class="text-black text-lg p-2 rounded-lg focus:outline-none focus:ring-1 focus:ring-slate-400"
          v-model="password"
          type="text"
          placeholder="Password"
        />

        <div v-if="store.loginErrorMessage" class="w-96 text-base text-red-500">
          {{ store.loginErrorMessage }}
        </div>

        <button
          @click="handleLogin"
          class="bg-indigo-500 transition w-1/2 py-1 mx-auto text-2xl rounded-lg hover:opacity-90 active:scale-90"
        >
          Login
        </button>

        <div class="text-lg font-light">
          Don't have account,
          <NuxtLink to="/registration" class="font-medium hover:underline"
            >Create</NuxtLink
          >
        </div>
      </form>
    </div>
    <div v-else>
      <p class="text-3xl font-semibold pt-4">
        {{
          store.isAuth
            ? `The user is authorized ${store.user?.email} `
            : "Login"
        }}
      </p>
      <!-- <h2 class="text-2xl font-medium">
        {{
          !store.user?.isActivated
            ? `The account is confimed by mail`
            : "Confirm account!!!"
        }}
      </h2> -->
      <button @click="getUsers">Get users</button>
      <ul>
        <li v-for="user in users" :key="user.email">
          {{ user.email }}
        </li>
      </ul>
      <button @click="() => store.logout()">Logout</button>
    </div>
  </div>
</template>
