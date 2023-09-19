import { defineStore } from "pinia";

export const useThreadCards = defineStore("useThreadCards", {
  state: () => {
    return {
      threadsArr: [],
    };
  },
  actions: {
    addThread(posts: any) {
      this.threadsArr = posts;
    },
  },
});
