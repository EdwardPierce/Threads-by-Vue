<script setup>
import { useForm } from "vee-validate";
import * as Yup from "yup";

const { threadId, currentUserId, refresh } = defineProps([
  "threadId",
  "currentUserId",
  "refresh",
]);

const { errors, defineInputBinds, handleSubmit, resetForm } = useForm({
  validationSchema: Yup.object({
    comment: Yup.string().required().min(3),
  }),
});

const comment = defineInputBinds("comment");

const handleComment = handleSubmit(async (values) => {
  const { data } = await useFetch("/api/thread/add-comment", {
    method: "POST",
    body: {
      threadId,
      commentText: values.comment,
      userId: JSON.stringify(currentUserId),
    },
  });
  refresh();
  resetForm();
});
</script>

<template>
  <div class="max-w-4xl mx-auto px-4 w-full">
    <form @submit.prevent="handleComment">
      <div
        class="flex items-center justify-between w-full px-4 border-y border-gray-500"
      >
        <input
          class="px-3 py-6 w-4/5 bg-transparent focus:outline-none"
          name="comment"
          v-bind="comment"
          type="text"
          placeholder="Comment..."
        />
        <button
          class="bg-indigo-500 px-6 py-2 rounded-3xl hover:opacity-90"
          type="submit"
        >
          Reply
        </button>
      </div>

      <div class="text-red-500">{{ errors.comment }}</div>
    </form>
  </div>
</template>
