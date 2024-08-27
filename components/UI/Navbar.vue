import dashboard from '../../../../FullStack/next_productity_app/src/app/dashboard/page';
<script setup></script>

<template>
  <div>
    <nav class="navbar navbar-expand-md navbar-dark py-3">
      <div class="container-fluid">
        <NuxtLink class="nav-link active" aria-current="page" to="/"
          >Travel Planner App</NuxtLink
        >
        <div class="flex links">
          <NuxtLink class="nav-link mx-2" to="/destinations">Destinations</NuxtLink>
          <NuxtLink class="nav-link mx-2" to="/cities">Cities</NuxtLink>
          <NuxtLink class="nav-link mr-2" to="/expenses">Expenses</NuxtLink>
          <NuxtLink class="nav-link mr-2" to="/Dashboard">Dashboard</NuxtLink>
        </div>
      </div>
    </nav>
  </div>
</template>

<style scoped>
.mr {
  margin-left: auto;
}
.navbar {
  background-color: #1a4870;
}

.nav-link {
  color: white;
}

@media (max-width: 450px) {
  .links {
    display: none;
  }
}
</style>
