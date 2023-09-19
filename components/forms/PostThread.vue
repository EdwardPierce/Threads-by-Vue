<script setup>
import { useForm } from "vee-validate";
import * as Yup from "yup";

const props = defineProps({
  id: String,
});

const { values, errors, defineInputBinds, meta, handleSubmit, isSubmitting } =
  useForm({
    validationSchema: Yup.object({
      content: Yup.string().required().min(3),
    }),
  });

const textThread = defineInputBinds("content");

const onInvalidSubmit = ({ values, errors, results }) => {
  console.log(values); // current form values
  console.log(errors); // a map of field names and their first error message
  console.log(results); // a detailed map of field names and their validation results
};

const onSuccess = async (values) => {
  await useFetch("/api/thread/create-thread", {
    method: "POST",
    body: { text: values.content, author: props.id },
  });
  await navigateTo("/");
};

const onSubmit = handleSubmit(onSuccess, onInvalidSubmit);
</script>

<template>
  <div class="max-w-4xl mx-auto my-6 px-4 w-full">
    <h1 class="text-3xl font-semibold">Create Thread</h1>

    <form @submit="onSubmit" class="flex flex-col gap-y-4 mt-6">
      <label for="textOfThread" class="text-lg font-light">Content</label>
      <textarea
        name="textOfThread"
        class="text-white px-3 py-2 border border-slate-800 bg-slate-900/20 rounded-lg focus:outline-none focus:ring-1 focus:ring-slate-900"
        v-bind="textThread"
        rows="15"
        placeholder="Write here your thread"
      ></textarea>

      <p class="text-red-600 font-medium">{{ errors.content }}</p>

      <button
        type="submit"
        class="mt-4 text-center text-lg font-medium bg-indigo-500 hover:bg-indigo-500/90 rounded-md py-2"
      >
        {{ isSubmitting ? "Creating Thread..." : "Create Thread" }}
      </button>
    </form>
  </div>
</template>
