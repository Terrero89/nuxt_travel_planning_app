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
    LENGTH:
    {{
      getDataFilter(
        cityId,
        filterByPriority,
        filterByCategory,
        filterByMisc,
        filterByStatus
      ).length
    }}
    {{
      getDataFilter(
        cityId,
        filterByPriority,
        filterByCategory,
        filterByMisc,
        filterByStatus
      )
    }}
    {{ filterByCategory }}
    <UICard class="mt-5">
      {{ filterByPriority }}-
      {{ filterByCategory }}
      {{ filterByMisc }}-
      {{ filterByStatus }}
      <UIExpensesFilter
        v-model:filter1="filterByPriority"
        v-model:filter2="filterByCategory"
        v-model:filter3="filterByMisc"
        v-model:filter4="filterByStatus"
      />
    </UICard>
    <UICard class="mt-1 mb-1 py-4">
      <div class="row">
        <div class="col">
          <UButton
            class="mx-2"
            label="Add Expense"
            variant="outline"
            color="indigo"
            to=""
          ></UButton>
        </div>
        <div class="col">Filter or other features</div>
      </div>
    </UICard>

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
