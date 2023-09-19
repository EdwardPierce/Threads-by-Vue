<script setup>
import { useStore } from "~/client/store/pinia-store";
import ThreadCard from "~/components/cards/ThreadCard.vue";

onMounted(async () => {
  if (localStorage.getItem("token")) {
    await store.checkAuth();

    if (!store.isAuth) {
      await navigateTo("/login");
    }
  }
});
const store = useStore();
const route = useRoute();

const id = route.params.id;

const { data: thread } = await useFetch("/api/thread/get-thread-by-id", {
  method: "POST",
  body: { id },
});

if (!route.params.id) {
  await navigateTo("/");
}
console.log(thread);
</script>

<template>
  <div>
    <ThreadCard
      :id="thread._id"
      :author="thread.author"
      :text="thread.text"
      :refresh="refresh"
    />
  </div>
</template>
