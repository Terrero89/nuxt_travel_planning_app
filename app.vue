<template>
  <div  >
    <UINavbar />
    <UICard class="mt-5 mb-2"> 
      <div>MAIN SECTION STATIC</div>
      <div>Up coming attractions</div>
      <div>more to come</div>
    </UICard>
    <NuxtPage  />
    <UIFooter />
  </div>
</template>

<style>
.page-enter-active,
.page-leave-active {
  transition: all 0.4s;
}
.page-enter-from,
.page-leave-to {
  opacity: 0;
  filter: blur(0.5rem);
}


</style>
