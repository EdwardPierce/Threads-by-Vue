<script setup>
const { id, author, text, refresh } = defineProps([
  "id",
  "author",
  "text",
  "refresh",
]);

const deletePost = async (id) => {
  await useFetch("/api/thread/delete-thread", {
    method: "delete",
    body: { id },
  });

  refresh();
};
</script>

<template>
  <div class="max-w-4xl mx-auto px-4 my-6 w-full">
    <section class="flex flex-col gap-y-10 mt-8">
      <article
        class="flex flex-col w-full bg-slate-900 rounded-xl p-6 shadow shadow-slate-900/50"
      >
        <div class="flex items-start gap-6">
          <img src="/assets/logo.svg" alt="user-image" />
          <div
            class="flex flex-col w-full gap-y-2 pl-4 border-l-2 border-slate-400/50"
          >
            <div class="font-semibold">{{ author.name }}</div>
            <div class="text-lg">{{ text }}</div>
            <div class="flex mt-4 w-full">
              <div class="flex gap-x-2 w-full">
                <img src="/assets/heart-gray.svg" alt="post-option" />
                <NuxtLink :to="`/thread/${id}`">
                  <img src="/assets/reply.svg" alt="post-option" />
                </NuxtLink>
                <img src="/assets/repost.svg" alt="post-option" />
                <img src="/assets/share.svg" alt="post-option" />
              </div>

              <button
                @click="deletePost(id)"
                class="opacity-60 hover:opacity-100"
              >
                <img src="/assets/delete.svg" alt="post-option" />
              </button>
            </div>
          </div>
        </div>
      </article>
    </section>
  </div>
</template>
