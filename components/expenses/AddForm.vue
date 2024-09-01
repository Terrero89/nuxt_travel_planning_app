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
const startTime = ref("");
const endTime = ref("");
const cost = ref();
const location = ref("");
const address = ref("");
const date = ref();
const isCompleted = ref();
const placeRating = ref();
const comments = ref();

//COMPUTED PROPERTIES

const submitForm = async () => {
  const expenseData = {
    // parentCityID: cityId,
    // parentCityID: "O5UMyVb-zRSDBSu-xcJ",
    parentCityID: cityId,
    parentDestinationID: destId,
    expense: expense.value,
    category: category.value,
    startTime: startTime.value,
    endTime: endTime.value,
    cost: cost.value,
    isExpensePaid: false,
    location: location.value,
    duration: duration.value,
    date: new Date(),
    isCompleted: isCompleted.value,
    daysRemainingForExpense: daysRemainingForExpense.value,
    placeRating: placeRating.value,
    date: formatDate(new Date()),
  };

  await addExpense({ ...expenseData, parentCityID: cityId }); //add project to pinia
  //   navigateTo("/destinations/trip1"); //after, go to projects
  console.log({ ...expenseData, parentCityID: cityId, parentDestinationID:destId });
};

const duration = computed(() => {
  if (!startTime.value || !endTime.value) {
    return 0;
  }
  return calculateTotalDuration(startTime.value, endTime.value);
});

const daysRemainingForExpense = computed(() => {
  return calculateDaysRemaining("11-07-2024");
});
</script>

<template>
  <div class="form-wrapper">
    <form class="row g-3" @submit.prevent="submitForm">
      <h3 class="mb-4">Add Expense</h3>
      {{cityID}}

      <div>
        <label for="inputPassword4" class="form-label">Expense</label>
        <input
          type="input"
          v-model.trim="expense"
          class="form-control"
          id="name-input"
        />
      </div>

      <div class="col-6">
        <label for="transportType" class="form-label">Expense Type</label>

        <select
          class="form-select"
          v-model="category"
          aria-label="Default select example"
        >
          <option></option>
          <option>Food/Drinks</option>
          <option>Attractions</option>
          <option>Souvenirs</option>
          <option>Store Purchase</option>
          <option>Landmarks</option>
          <option>Transportation</option>
          <option>Rentals</option>
          <option>Other</option>
        </select>
      </div>

      <div class="col-6">
        <label for="inputPassword4" class="form-label">Price</label>
        <input
          type="number"
          v-model.trim="cost"
          class="form-control"
          id="name-input"
        />
      </div>

      <div class="col-6">
        <label for="inputPassword4" class="form-label">Start Time: </label>
        <input
          type="time"
          v-model.trim="startTime"
          class="form-control"
          id="time-input"
        />
      </div>
      <div class="col-6">
        <label for="inputPassword4" class="form-label">End time: </label>
        <input
          type="time"
          v-model.trim="endTime"
          class="form-control"
          id="time-input"
        />
      </div>

      <div class="col-6">
        <label for="inputPassword4" class="form-label">Duration</label>
        <input
          type="number"
          v-model.trim="duration"
          class="form-control"
          id="duration-input"
        />
      </div>

      <div class="col-6">
        <label for="inputPassword4" class="form-label">Rating</label>

        <input
          type="number"
          v-model.trim="placeRating"
          class="form-control"
          id="placeRating-input"
          min="0"
          max="5"
          step="0.1"
        />
      </div>
      <div>
        <label for="inputPassword4" class="form-label">Location</label>
        <input
          type="input"
          v-model.trim="location"
          @input="generateGoogleMapsLink"
          class="form-control"
          id="name-input"
        />
      </div>

      <div>
        <label for="inputPassword4" class="form-label">Address</label>
        <input
          type="input"
          v-model.trim="address"
          class="form-control"
          id="name-input"
        />
      </div>
      <div>
        <textarea
          class="form-control"
          v-model="comments"
          aria-label="With textarea"
        />
      </div>

      <div>
        <button type="submit" class="btn btn-primary py-2 px-4">Submit</button>
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
