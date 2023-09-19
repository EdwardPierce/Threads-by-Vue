<script setup>
import { useStore } from "~/client/store/pinia-store";
import { useThreadCards } from "~/client/store/threadCard";
import ThreadCard from "~/components/cards/ThreadCard.vue";
import Comment from "~/components/forms/Comment.vue";

const userId = useState(() => "");

const threadArr = useThreadCards();

onMounted(async () => {
  if (localStorage.getItem("token")) {
    await store.checkAuth();

    if (!store.isAuth) {
      await navigateTo("/login");
    }

    userId.value = localStorage.getItem("userId");
  }
});
const store = useStore();
const route = useRoute();
const id = route.params.id;

const { data: thread, refresh } = await useFetch(
  "/api/thread/get-thread-by-id",
  {
    method: "POST",
    body: { id },
  }
);

if (!route.params.id) {
  await navigateTo("/");
}
threadArr.addThread(thread.value);
console.log("threadArr: ", threadArr.threadsArr);
</script>

<template>
  <div>
    <ThreadCard
      :id="thread._id"
      :author="thread.author"
      :text="thread.text"
      :refresh="refresh"
    />

    <div class="mt-7">
      <Comment :threadId="id" :currentUserId="userId" :refresh="refresh" />
    </div>

    <div class="mt-10">
      <ThreadCard
        v-for="childPost in thread.children"
        :key="childPost._id"
        :id="childPost._id"
        :author="childPost.author"
        :text="childPost.text"
        :refresh="refresh"
      />
    </div>
  </div>
</template>
