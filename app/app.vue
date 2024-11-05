<script setup>
useSeoMeta({
  title: "NuxtHub Image Generator",
  description: "Generate images and save them to your Cloudflare R2 bucket",
});
</script>

<template>
  <NuxtRouteAnnouncer />
  <NuxtLoadingIndicator />
  <NuxtPage />
  <UNotifications />
</template>
