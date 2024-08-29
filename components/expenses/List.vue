<script setup>
import { useDestinationStore } from "@/store/destination";
const store = useDestinationStore();
import { storeToRefs } from "pinia";

const { expenses } = storeToRefs(store);
const props = defineProps([
    "expensesID",
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
]);
</script>

<template>
  <div class="projects">
    <UITitle title="Projects" class="container border-bottom" />

    <div class="container">

    </div>
    <ExpensesItem
      v-for="expense in expenses"
      :key="expense.expenseID"
      :destinationParentID="expense.destinationParentID"
      :cityParentID="expense.cityParentID"
      :expenseID="expense.expenseID"
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
    />
  </div>
</template>

<style scoped>

</style>
