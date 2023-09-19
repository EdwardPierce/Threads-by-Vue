const $api = $fetch.create({
  async onRequest({ request, options }) {
    options.headers = options.headers || {};
    options.headers.authorization = `Bearer ${localStorage.getItem("token")}`;
  },

  async onResponse({ request, response, options }) {
    if (response.status === 401) {
      console.log("response.status: 401");
      try {
        const res = await useFetch("/api/auth/refresh", {
          credentials: "include",
        });

        localStorage.setItem("token", res.data.value.accessToken);
        return;
      } catch (error) {
        console.log("Error message: ", error);
      }
    }
  },
});

export default $api;
