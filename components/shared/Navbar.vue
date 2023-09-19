<template>
  <nav class="bg-slate-900/50 sticky top-0 z-10 backdrop-blur-lg">
    <div
      class="w-full px-4 sm:px-6 lg:px-8 border-b border-white border-opacity-20"
    >
      <div class="flex h-16 justify-between">
        <div class="flex items-center">
          <NuxtLink to="/" class="flex opacity-100 hover:opacity-90">
            <img
              src="/assets/logo.svg"
              alt="img"
              width="28"
              height="28"
              loading="lazy"
              decoding="async"
            />
            <span class="ml-2 self-center font-bold text-xl md:text-2xl"
              >Threads</span
            >
          </NuxtLink>
        </div>

        <button class="flex items-center text-xl font-medium">
          <NuxtLink to="/login" class="hover:opacity-90">Login</NuxtLink>
        </button>
      </div>
    </div>
  </nav>
</template>
