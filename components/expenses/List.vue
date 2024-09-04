<script setup>
import { useExpenseStore } from "@/store/expenses";
const expenseStore = useExpenseStore();
import { storeToRefs } from "pinia";
const { fetchExpenses } = expenseStore;
const { expenses } = storeToRefs(expenseStore);
const route = useRoute(); //route object
const cityId = route.params.cityID;

const {expensesAsArray} = expenseStore;
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
  "comments"
]);
onMounted(async() => {
  await fetchExpenses();
  expenseStore.expensesAsArray.value
});


const getExpensesByCityID = computed(() => expenseStore.filterItemById); // this is working!
</script>

<template>
  <div class="projects">
    <UITitle title="Projects" class="container border-bottom" />

    <div class="container">
    
    </div>
    {{expenseStore.expensesAsArray[0]}}
 <!-- <div v-for="expense in expenses">{{expense.expenseID}}</div> -->
    <ExpensesItem
      v-for="expense in getExpensesByCityID(cityId)"
      :key="expense.expenseID"
      :expenseID="expense.cityID"
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
     
    />
  </div>
</template>

<style scoped></style>
