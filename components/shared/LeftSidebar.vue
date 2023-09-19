<script setup>
import { sidebarLinks } from "@/constants/index.ts";
import { Form } from "vee-validate";

const route = useRoute();

const pathname = computed(() => {
  return route.path;
});
</script>

<template>
  <section
    class="sticky top-0 h-screen w-56 pt-5 border-r border-white/20 bg-slate-900/50 backdrop-blur-lg overflow-auto">
    <ul class="flex flex-col gap-6 px-6 w-full">
      <li v-for="link in sidebarLinks" :key="link.label" class="group">
        <NuxtLink :to="link.route" :class="`flex px-4 py-2 rounded-lg transition ${pathname === link.route
            ? 'bg-indigo-500 hover:bg-indigo-500/90'
            : ' text-gray-400 hover:text-white hover:font-medium'
          }`">
          <img :src="link.imgURL" :alt="link.label" width="24" height="24" class="group-hover:scale-105 transition" />
          <span class="ml-3">{{ link.label }} </span>
        </NuxtLink>
      </li>
    </ul>
  </section>
</template>
