<script setup>
const text = ref("");

const createThread = async () => {
  const { data } = await useFetch("/api/thread/create-thread", {
    method: "post",
    body: { text: text.value },
  });

  console.log(data);
};
</script>

<template>
  <h1>Create Thread</h1>
  <input v-model="text" class="text-black" />
  <button @click="createThread">Create Thread</button>

  <p>{{ text }}</p>
</template>

<script setup>
import { Form, useField } from "vee-validate";
import * as Yup from "yup";
import { toRef } from "vue";

const schema = Yup.object().shape({
  textThread: Yup.string().min(3).required(),
});

function onSubmit(values) {
  // alert(JSON.stringify(values, null, 2));
  console.log("fff");
}

const {
  value: inputValue,
  errorMessage,
  handleBlur,
  handleChange,
  meta,
} = useField("textThread", undefined, {
  initialValue: "123",
});
</script>

<template>
  <div>
    <Form @submit="onSubmit" :validation-schema="schema">
      <div :class="{ 'has-error': !!errorMessage, success: meta.valid }">
        <label for="textThread">{{ "textThdreadd" }}</label>
        <input
          name="textThread"
          id="textThread"
          type="text"
          v-model="inputValue"
          @input="handleChange"
          @blur="handleBlur"
          class="text-black"
        />

        <p class="help-message" v-show="errorMessage || meta.valid">
          {{ errorMessage || "successMessage" }}
        </p>
      </div>
      <button type="submit">Create Thread</button>
    </Form>
  </div>
</template>
