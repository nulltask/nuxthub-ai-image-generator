<script setup>
const images = await $fetch("/api/images");
</script>

<template>
  <div
    class="flex flex-col items-center justify-center min-h-screen gap-4 text-center w-full max-w-[420px] mx-auto p-4 lg:p-0"
  >
    <NuxtLink
      :to="{ name: 'index' }"
      class="mt-4 text-left text-sm text-blue-500"
      >← Back to index</NuxtLink
    >

    <div v-for="image in images">
      <div class="mb-4">
        <UCard>
          <img :src="image.pathname" :alt="image.prompt" />

          <template #footer>
            <p class="text-sm">{{ image.prompt }}</p>
          </template>
        </UCard>
      </div>
    </div>
    <NuxtLink
      :to="{ name: 'index' }"
      class="mb-4 text-left text-sm text-blue-500"
      >← Back to index</NuxtLink
    >
  </div>
</template>
