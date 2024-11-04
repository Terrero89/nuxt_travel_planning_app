<script setup>
import { useExpenseStore } from "@/store/expenses";

import { storeToRefs } from "pinia";
import { ref, computed, onMounted } from "vue";

// Access the expense store
const expenseStore = useExpenseStore();
// Extracting state and methods using storeToRefs for reactivity
const { fetchExpenses, getDataFilter, expensesAsArray } = expenseStore;
const { expenses } = storeToRefs(expenseStore);

const count = computed(() => {
  let expenseWithNoPrice = expensesAsArray.filter(
    (item) => item.cost === null
  );
  let expenseWithNoLocation = expensesAsArray.filter(
    (item) => item.location === null || item.location === ""
  );
  let expenseWithNoDate = expensesAsArray.filter(
    (item) => !item.expectedExpenseDate || item.expectedExpenseDate === ""
  );
  let expenseIsCompleted = expensesAsArray.filter(
    (item) => item.isCompleted === false
  );
  let expenseWithNoRating = expensesAsArray.filter((item) => !item.placeRating);
  let expenseWithNoDuration = expensesAsArray.filter((item) => item.duration === null);
  let expenseWithNoDate2 = expensesAsArray.filter((item) => !item.expectedExpensesData);
  return {
    expenseWithNoPrice,
    expenseWithNoLocation,
    expenseWithNoDate,
    expenseIsCompleted,
    expenseWithNoRating,
    expenseWithNoDuration,
    expenseWithNoDate2
  };
});
onMounted(async () => {
  await fetchExpenses();
  await expensesAsArray;
});
</script>

<template>
  <div>

    <ExpensesItem
      v-for="expense in expenses"
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
