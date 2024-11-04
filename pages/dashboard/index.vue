<script setup>
import { useExpenseStore } from "@/store/expenses";
import { useCityStore } from "@/store/cities";
import { useDestinationStore } from "@/store/destination";
import { storeToRefs } from "pinia";
import { ref, computed, onMounted } from "vue";

const store = useDestinationStore();
const expenseStore = useExpenseStore();
const cityStore = useCityStore();

const { fetchCities } = cityStore;
const { fetchDestinations } = store;
const { fetchExpenses } = expenseStore;
///=============================================
const { destination, isLoading } = storeToRefs(store);
const {} = expenseStore;
const {} = storeToRefs(cityStore);
// Access the expense store

//==============================================================

// Extracting state and methods using storeToRefs for reactivity
const { expenses } = storeToRefs(expenseStore);

onMounted(async () => {
  await fetchExpenses();
  await fetchCities();
  await fetchDestinations();
});
</script>

<template>
  <div>
   
    <UICard> </UICard>
    <UICard>
      <div>DASHBOARD</div>
      <div class="box">
        <DashboardCard
          title="Destinations"
          :totals="store.destinationsStats.arrayLength"
          :completed="store.destinationsStats.pendingTotals"
          :percentage="store.destinationsStats.percentage"
          :progress="store.destinationsStats.progress"
          :pending="store.destinationsStats.pending"
        />
        <DashboardCard
          title="Cities"
          :totals="cityStore.cityStats.arrayLength"
          :completed="cityStore.cityStats.pendingTotals"
          :percentage="cityStore.cityStats.pendingTotals"
          :progress="cityStore.cityStats.progress"
          :pending="cityStore.cityStats.pending"
        />
        <DashboardCard
          title="Expenses"
          :totals="expenseStore.expensesStats.arrayLength"
          :completed="expenseStore.expensesStats.completedExpenses"
          :progress="expenseStore.expensesStats.progressExpenses"
          :pending="expenseStore.expensesStats.pendingExpenses"
          :percentage="expenseStore.expensesStats.percentage.toFixed(2)"
          category="Food/Drinks"
        />
      </div>
    </UICard>
 
  </div>
</template>

/*
<style scoped>
.box {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  max-width: 60rem;
  margin: auto 0;
}
</style>
*/
