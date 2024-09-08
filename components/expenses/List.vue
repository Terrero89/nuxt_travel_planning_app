<script setup>
import { useExpenseStore } from "@/store/expenses";
const expenseStore = useExpenseStore();
import { storeToRefs } from "pinia";
const { fetchExpenses } = expenseStore;
const { expenses } = storeToRefs(expenseStore);
const route = useRoute(); //route object
const cityId = route.params.cityID;

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
onMounted(async () => {
  await fetchExpenses();
  expenseStore.expensesAsArray.value;
});

const getExpensesByCityID = computed(() => expenseStore.filterItemById); // this is working!
</script>

<template>
  <div class="projects">
    <UICard class="mt-5 mb-1 py-4">
      <div class="row">
        <div class="col">
      
          <UButton class="mx-2" label="Add Expense" variant="outline" color="indigo":to="createCityLink"></UButton>
        </div>
        <div class="col">
          Filter or other features
        </div>
      </div>


    </UICard>

    <!-- <div v-for="expense in expenses">{{expense.expenseID}}</div> -->
    <ExpensesItem
      v-for="expense in getExpensesByCityID(cityId)"
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
