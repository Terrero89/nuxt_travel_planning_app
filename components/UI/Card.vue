<template>
  <div class="container wrapper">
    <slot />
  </div>
</template>

<style scoped>
.wrapper {
 max-width: 60rem;
  /* min-height:43rem; */

  margin: 1rem auto 3rem auto;
  /* border-radius: 5px;
  box-shadow: 0px 6px 40px 15px rgba(0, 0, 0, 0.05);  */
}
</style>
