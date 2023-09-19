<script setup>
import { useStore } from "~/client/store/pinia-store";
import * as Yup from "yup";
import { useForm } from "vee-validate";

const formMessage = useState(() => "");

const store = useStore();

const { errors, defineInputBinds, handleSubmit } = useForm({
  validationSchema: Yup.object({
    email: Yup.string().required().email(),
    password: Yup.string().required().trim().min(3).max(40),
    name: Yup.string().required().min(3),
  }),
});

const email = defineInputBinds("email");
const password = defineInputBinds("password");
const name = defineInputBinds("name");

const handleResgistration = handleSubmit(async (values) => {
  await store.registration(values.email, values.password, values.name);

  if (store.user.email) {
    await navigateTo("/");
  } else {
    formMessage.value = "Something's wrong. Please try again";
  }
});
</script>

<template>
  <div>
    <div class="flex flex-col gap-y-6 items-center">
      <h1 class="text-3xl font-semibold text-center pt-4">Registration</h1>
      <form
        @submit.prevent="handleResgistration"
        class="flex flex-col justify-center gap-4 bg-slate-800/50 px-8 py-6 rounded-lg max-w-md w-full"
      >
        <div class="flex flex-col gap-1">
          <label for="email">E-mail</label>
          <input
            name="email"
            class="text-black text-lg p-2 rounded-lg focus:outline-none focus:ring-1 focus:ring-slate-400"
            v-bind="email"
            type="text"
            placeholder="Email"
          />
          <p class="text-base text-red-500">{{ errors.email }}</p>
        </div>

        <div class="flex flex-col gap-1">
          <label for="password">Password</label>
          <input
            name="password"
            class="text-black text-lg p-2 rounded-lg focus:outline-none focus:ring-1 focus:ring-slate-400"
            v-bind="password"
            type="text"
            placeholder="Password"
          />
          <p class="text-base text-red-500">{{ errors.password }}</p>
        </div>

        <div class="flex flex-col gap-1">
          <label for="name">Name</label>
          <input
            name="name"
            class="text-black text-lg p-2 rounded-lg focus:outline-none focus:ring-1 focus:ring-slate-400"
            v-bind="name"
            type="text"
            placeholder="Name"
          />
          <p class="text-base text-red-500">{{ errors.name }}</p>
        </div>

        <p class="text-base text-red-500">{{ formMessage }}</p>
        <button
          class="bg-indigo-500 transition w-3/4 py-1 mx-auto text-2xl rounded-lg hover:opacity-90 active:scale-90"
          type="submit"
        >
          Registration
        </button>
      </form>
    </div>
  </div>
</template>
