<script setup lang="ts">
import { useStore } from "~/client/store/pinia-store";
import LoginForm from "~/components/forms/LoginForm.vue";

useHead({
  title: "Login",
});

onMounted(async () => {
  if (localStorage.getItem("token")) {
    await store.checkAuth();
  }
});

const store = useStore();
</script>

<template>
  <LoginForm />
</template>
