<script setup>
// import { ref, onMounted, computed, watch } from "vue";
// import { useCityStore } from "@/store/cities";
// import { storeToRefs } from "pinia";
// import { useExpenseStore } from "@/store/expenses";
// const expenseStore = useExpenseStore();
// const { fetchExpenses, getAvgRatingForCity, getTotalAccommodationsNumbers } =
//   expenseStore;
// const { expenses } = storeToRefs(expenseStore);
// const cityStore = useCityStore();
// const { cities } = storeToRefs(cityStore);
// const { fetchCities, updateCity } = cityStore;
// const route = useRoute();
// const cityParamID = route.params.cityID;
</script>

<template>
  <div>

    <ExpensesUpdateForm />
  </div>
</template>
