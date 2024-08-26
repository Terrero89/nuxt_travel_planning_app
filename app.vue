<template>
  <div>
    <NuxtRouteAnnouncer />
 <UAccordion class="acc"
     open-icon="i-heroicons-plus"
    close-icon="i-heroicons-minus"
    :items="[{ label: '1. What is Nuxt UI?', content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit' }, { label: '2. Getting Started', content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit' }, { label: '3. Theming', content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit' }, { label: '4. Components', content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit' }]"
  />
  </div>
</template>

<style scoped>


</style>