<script setup>
import { useExpenseStore } from "@/store/expenses";
const expenseStore = useExpenseStore();
import { storeToRefs } from "pinia";
import {
  calculateTotalDuration,
  calculateDaysRemaining,
} from "../../utils/date-conversion";
const {} = storeToRefs(expenseStore);
const { addExpense } = expenseStore;

const route = useRoute(); //route object

const destId = route.params.destinationID;
const cityId = route.params.cityID;

// initiate
const expense = ref("");
const category = ref("");
const cost = ref();
const location = ref("");
const priority = ref("");
const date = ref();
const isCompleted = ref();
const placeRating = ref();
const comments = ref("");
const duration = ref(0); // Store calculated duration
const daysRemainingForExpense = ref(0); // Store calculated days remaining
const expectedExpenseDate = ref();

// Watch for changes in startTime and endTime
watch(
  [startTime, endTime],
  () => {
    if (startTime.value && endTime.value) {
      duration.value = calculateTotalDuration(startTime.value, endTime.value);
    }
  },
  { immediate: true }
);

// COMPUTED PROPERTIES
const submitForm = async () => {
  const expenseData = {
    parentCityID: cityId,
    parentDestinationID: destId,
    expense: expense.value,
    category: category.value,
    startTime: startTime.value,
    cost: cost.value,
    isExpensePaid: false,
    location: location.value,
    duration: duration.value,
    isCompleted: isCompleted.value,
    daysRemainingForExpense: daysRemainingForExpense.value,
    placeRating: placeRating.value,
    priority: priority.value,
    date: new Date(),
    comments: comments.value,
    expectedExpenseDate: expectedExpenseDate.value,
  };

  await addExpense({ ...expenseData, parentCityID: cityId });
  navigateTo(`/destinations/${destId}/cities-${cityId}`);
};

// Automatically calculate days remaining based on a fixed date
watch(
  date,
  () => {
    daysRemainingForExpense.value = calculateDaysRemaining(date.value);
  },
  { immediate: true }
);

const showPrice = computed(() => {
  return !["N/A", "Landmarks", "Other"].includes(category.value);
});
</script>
<template>
  <div class="form-wrapper">
    <form class="row g-3" @submit.prevent="submitForm">
      <h3 class="mb-4">Add Expense</h3>

      <div>
        <label for="expense" class="form-label">Expense</label>
        <input v-model="expense" class="form-control" id="expense" />
      </div>

      <div class="col-6">
        <label for="category" class="form-label">Expense Type</label>
        <select v-model="category" class="form-select" id="category">
          <option></option>
          <option>Food/Drinks</option>
          <option>Attractions</option>
          <option>Souvenirs</option>
          <option>Store Purchase</option>
          <option>Landmarks</option>
          <option>Transportation</option>
          <option>Rentals</option>
          <option>Other</option>
          <option>N/A</option>
        </select>
      </div>

      <div class="col-6" v-if="showPrice">
        <label for="cost" class="form-label">Price</label>
        <input type="number" v-model="cost" class="form-control" id="cost" />
      </div>

      <!-- <div class="col-6">
        <label for="startTime" class="form-label">Start Time (AM/PM)</label>
        <input type="time" v-model="startTime" class="form-control" />
        <p>{{ formattedStartTime }}</p>
      </div>

      <div class="col-6">
        <label for="endTime" class="form-label">End Time (AM/PM)</label>
        <input type="time" v-model="endTime" class="form-control" />
        <p>{{ formattedEndTime }}</p>
      </div>

      <div class="col-6">
        <label for="duration" class="form-label">Duration (hours)</label>
        <input :value="duration" class="form-control" readonly />
      </div> -->

      <div class="col-6">
        <label for="placeRating" class="form-label">Rating</label>
        <input
          type="number"
          v-model="placeRating"
          class="form-control"
          min="0"
          max="5"
          step="0.1"
        />
      </div>

      <div class="col-6">
        <label for="priority" class="form-label">Visit Priority</label>
        <select v-model="priority" class="form-select" id="priority">
          <option></option>
          <option>Must visit</option>
          <option>Nice to visit</option>
          <option>Backup options</option>
          <option>Optional</option>
        </select>
      </div>
      <div class="col-6">
        <label for="inputPassword4" class="form-label">Date Booked: </label>
        <input
          type="date"
          v-model.trim="expectedExpenseDate"
          class="form-control"
          id="date-input"
        />
      </div>

      <div>
        <label for="location" class="form-label">Location</label>
        <input v-model="location" class="form-control" />
      </div>

      <div>
        <textarea
          v-model="comments"
          class="form-control"
          placeholder="Comments"
        ></textarea>
      </div>

      <div>
        <button type="submit" class="btn btn-primary">Submit</button>
      </div>
    </form>
  </div>
</template>

<style scoped>
.form-wrapper {
  background-color: white;
  max-width: 32rem;
  border-radius: 7px;
  border: solid rgb(143, 143, 143, 0.2) 1px;
  margin: 1rem auto;
  padding: 2.7rem 1.5rem;
}

label {
  color: rgb(77, 73, 73);
  font-weight: 400;
  font-size: 1rem;
  margin: 0.5rem 0;
}

/* 
 */
.input-container {
  max-width: 500px;
  margin: 0 auto;
  padding: 1rem;
  border: 1px solid #ccc;
  border-radius: 8px;
  border-radius: 8px;
  background-color: #f9f9f9;
}

.form-label {
  font-weight: bold;
  margin-bottom: 0.5rem;
}

.form-control {
  width: 100%;
  padding: 0.5rem;
  margin-bottom: 1rem;
}

a {
  color: #0066cc;
  text-decoration: none;
}

a:hover {
  text-decoration: underline;
}
</style>
