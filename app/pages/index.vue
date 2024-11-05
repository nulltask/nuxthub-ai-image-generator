<script setup>
const toast = useToast();
const prompt = ref("");
const steps = ref(4);
const src = ref("");

const imageGenerating = ref(false);
const promptGenerating = ref(false);
const saving = ref(false);
const saved = ref(false);

const style = ref("none");

async function generateImage() {
  if (imageGenerating.value || !prompt.value) return;

  imageGenerating.value = true;

  const { pathname } = await $fetch("/api/generate", {
    method: "POST",
    body: {
      prompt: prompt.value,
      style: style.value,
      steps: steps.value,
    },
  })
    .catch((error) => {
      toast.add({
        title: "Error",
        description: error.message,
        color: "red",
      });
    })
    .finally(() => {
      imageGenerating.value = false;
    });

  saved.value = false;
  src.value = `/images/${pathname}`;
}

async function generatePrompt() {
  if (promptGenerating.value) return;

  promptGenerating.value = true;

  const { response } = await $fetch("/api/prompt")
    .catch((error) => {
      toast.add({
        title: "Error",
        description: error.message,
        color: "red",
      });
    })
    .finally(() => {
      promptGenerating.value = false;
    });

  prompt.value = response;
}

async function save() {
  if (imageGenerating.value || !prompt.value || saved.value) return;

  imageGenerating.value = true;

  await $fetch("/api/images", {
    method: "POST",
    body: {
      pathname: src.value,
      prompt: prompt.value,
    },
  })
    .then((res) => {
      toast.add({
        title: "Saved",
        description: "Image saved successfully",
        color: "blue",
      });

      return res;
    })
    .catch((error) => {
      toast.add({
        title: "Error",
        description: error.message,
        color: "red",
      });
    })
    .finally(() => {
      imageGenerating.value = false;
    });

  saved.value = true;
}
</script>

<template>
  <div
    class="flex flex-col items-center justify-center min-h-screen gap-4 text-center w-full max-w-[420px] mx-auto p-4 lg:p-0"
  >
    <h1 class="text-3xl font-bold">NuxtHub Image Generator</h1>
    <form class="w-full" @submit.prevent="generateImage()">
      <UFormGroup label="Image prompt" class="mt-4 mb-4">
        <UTextarea
          v-model="prompt"
          placeholder="A beautiful landscape with a river and mountains"
          class="w-full mb-4"
          autoresize
        />
        <UButton
          type="button"
          color="black"
          block
          :loading="promptGenerating"
          @click.prevent="generatePrompt()"
        >
          Generate Prompt
        </UButton>
      </UFormGroup>
      <UFormGroup label="Image style" class="mb-4">
        <USelect
          v-model="style"
          :options="[
            'none',
            'photorealistic',
            'comic-book',
            'neon-punk',
            'isometric',
            'line-art',
            'pixel-art',
            '3d-model',
          ]"
          icon="i-heroicons-paint-brush"
          block
        />
      </UFormGroup>
      <UFormGroup :label="`Number of steps (${steps})`" class="mb-4">
        <URange v-model="steps" :min="4" :max="8" size="sm" />
      </UFormGroup>
      <UButton
        type="submit"
        color="black"
        block
        :loading="imageGenerating"
        :disabled="!prompt"
      >
        Generate Image
      </UButton>
    </form>
    <div v-if="src">
      <img v-if="src" :src="src" class="w-full max-w-[420px]" />
      <UButton
        class="mt-4"
        type="button"
        color="blue"
        block
        :loading="saving"
        :disabled="!prompt || saved"
        @click="save()"
      >
        Save
      </UButton>
    </div>

    <div>
      <NuxtLink
        :to="{ name: 'images' }"
        class="mt-4 text-left text-sm text-blue-500"
        >View saved images →</NuxtLink
      >
    </div>
  </div>
</template>
