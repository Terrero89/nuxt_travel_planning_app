<template>
  <div>
    <NuxtLayout>
    <h3>navbar here</h3>
    <NuxtPage />
    <h3>footer</h3>
    </NuxtLayout>
  </div>
</template>

<style>
.page-enter-active,
.page-leave-active {
  transition: all 0.4s
}
.page-enter-from,
.page-leave-to {
  opacity: 0;
  filter: blur(0.5rem);
}
</style>