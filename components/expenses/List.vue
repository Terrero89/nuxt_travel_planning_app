<script setup>
import { useExpenseStore } from "@/store/expenses";
import { useCityStore } from "@/store/cities";
import { storeToRefs } from "pinia";
import { ref, computed, onMounted } from "vue";
import { useRoute } from "vue-router"; // Import route object

// Access the expense store
const expenseStore = useExpenseStore();
const cityStore = useCityStore();
const { fetchCities } = cityStore;
// Extracting state and methods using storeToRefs for reactivity
const { fetchExpenses, getDataFilter } = expenseStore;
const { expenses } = storeToRefs(expenseStore);

// Define reactive filters
const filterByPriority = ref("");
const filterByCategory = ref("");
const filterByMisc = ref("");
const filterByStatus = ref("");

// Get route parameters
const route = useRoute();
const cityId = route.params.cityID;
const destId = route.params.destinationID;

// Fetch expenses on mount
onMounted(async () => {
  await fetchExpenses();
  await fetchCities();
});

// Create a computed property to filter expenses based on the filters and cityID
const filtered = computed(() => {
  return expenseStore.filteredExpensesStats(
    cityId,
    filterByPriority.value,
    filterByCategory.value,
    filterByMisc.value,
    filterByStatus.value
  );
});

// Update the stats computed property to use the correct filter values
const stats = computed(() => {
  const filteredExpenses = getDataFilter(
    cityId,
    filterByPriority.value, // Accessing the value of ref
    filterByCategory.value,
    filterByMisc.value,
    filterByStatus.value
  );

  const totalCost = filteredExpenses.reduce(
    (sum, expense) => sum + expense.cost,
    0
  );
  const totalRatings = filteredExpenses.reduce(
    (sum, expense) => sum + (expense.placeRating || 0),
    0
  );
  const totalDurationAttractions= filteredExpenses.reduce(
    (sum, expense) => sum + (expense.duration || 0),
    0
  );
  const avgRating =
    filteredExpenses.length > 0 ? totalRatings / filteredExpenses.length : 0;

  return {
    totalCost,
    numberOfItems: filteredExpenses.length,
    avgRating,
    totalDurationAttractions,
  };
});

// Computed property for creating link to add new expenses
const addExpenseLink = computed(
  () => `/destinations/${destId}/cities-${cityId}/createExpense`
);
</script>
<template>
  <div class="projects">
    <UIExpensesFilter
      v-model:filter1="filterByPriority"
      v-model:filter2="filterByCategory"
      v-model:filter3="filterByMisc"
      v-model:filter4="filterByStatus"
    />
 <!-- Display Stats -->
 {{stats}}

    <!-- highest type of category | how many in priority | total cost | no. of booked items| rating average from all of ratings | total duration |  -->
    <ExpensesStatsCard
      :numOfExpenses="stats.numberOfItems"
      :totalCost="stats.totalCost"
     
      :averageRating="stats.avgRating.toFixed(2)"
      :totalDuration="stats. totalDurationAttractions"
    />
    <ExpensesItem
      v-for="expense in getDataFilter(
        cityId,
        filterByPriority,
        filterByCategory,
        filterByMisc,
        filterByStatus
      )"
      :key="expense.expenseID"
      :expenseID="expense.expenseID"
      :destinationParentID="expense.destinationParentID"
      :cityParentID="expense.cityParentID"
      :expense="expense.expense"
      :category="expense.category"
      :startTime="expense.startTime"
      :endTime="expense.endTime"
      :from="expense.from"
      :to="expense.to"
      :cost="expense.cost"
      :isExpensePaid="expense.isExpensePaid"
      :location="expense.location"
      :duration="expense.duration"
      :date="expense.date"
      :isCompleted="expense.isCompleted"
      :daysRemainingForExpense="expense.daysRemainingForExpense"
      :placeRating="expense.placeRating"
      :comments="expense.comments"
      :priority="expense.priority"
      :expectedExpenseDate="expense.expectedExpenseDate"
    />
    <UICard class="mt-5"></UICard>
    
  </div>
</template>

<style scoped></style>
