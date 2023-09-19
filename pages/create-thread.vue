<script setup>
import { useStore } from "~/client/store/pinia-store";
import PostThread from "~/components/forms/PostThread.vue";

useHead({
  title: "Create Thread",
});

const userId = useState(() => "");

onMounted(() => {
  userId.value = localStorage.getItem("userId");
});
</script>

<template>
  <div>
    <PostThread :id="userId" />
  </div>
</template>
