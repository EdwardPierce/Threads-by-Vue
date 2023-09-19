<script setup>
import { useStore } from "~/client/store/pinia-store";
import ThreadCard from "~/components/cards/ThreadCard.vue";

useHead({
  title: "Threads",
});

onMounted(async () => {
  if (localStorage.getItem("token")) {
    await store.checkAuth();

    if (!store.isAuth) {
      await navigateTo("/login");
    }
  }
});

const store = useStore();

const { data: posts, refresh } = await useFetch("/api/thread/get-threads");

const excludedCommentsPosts = computed(() => {
  const arr = posts.value.filter((post) => !post.parentId);

  return arr;
});
</script>

<template>
  <div>
    <div v-if="posts.length === 0" class="text-3xl text-center pt-6">
      No threads found
    </div>

    <ThreadCard
      v-else
      v-for="post in excludedCommentsPosts"
      :key="post._id"
      :id="post._id"
      :author="post.author"
      :text="post.text"
      :refresh="refresh"
    />
  </div>
</template>
