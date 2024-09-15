<script setup>
import { useExpenseStore } from "@/store/expenses";
const expenseStore = useExpenseStore();
import { storeToRefs } from "pinia";

const { fetchExpenses, getDataFilter } = expenseStore;
const { expenses } = storeToRefs(expenseStore);
const route = useRoute(); //route object
const cityId = route.params.cityID;
const destId = route.params.destinationID;

const { expensesAsArray } = expenseStore;

const props = defineProps([
  "expenseID",
  "destinationParentID",
  "cityParentID",
  "expense", // food, landmarks, transport, uber, plane, hotel, attractions,
  "category",
  "startTime",
  "endTime",
  "from",
  "to",
  "cost",
  "isExpensePaid",
  "location",
  "duration",
  "date",
  "isCompleted",
  "daysRemainingForExpense",
  "placeRating",
  "priority",
  "comments",
  "expectedExpenseDate",
]);

const filterByPriority = ref("");
const filterByCategory = ref("");
const filterByMisc = ref("");
const filterByStatus = ref("");

onMounted(async () => {
  await fetchExpenses();
  expenseStore.expensesAsArray.value;
});

const getExpensesByCityID = computed(() => expenseStore.filterItemById); // this is working!
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

      <!-- highest type of category | how many in priority | total cost | no. of booked items| rating average from all of ratings | total duration |  -->
    <ExpensesStatsCard  
 
      :numOfExpenses="9"
      :totalCost="991"
      :bookedItems="2"
      :averageRating="4.5"
      :totalDuration="48"
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
  </div>
</template>

<style scoped></style>
