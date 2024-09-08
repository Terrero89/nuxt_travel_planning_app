<script setup>
import { ref, computed } from "vue";
import { useDestinationStore } from "@/store/destination";
import { storeToRefs } from "pinia";
import { useRoute } from 'vue-router';

const store = useDestinationStore();
const { addDestination } = store;
const route = useRoute();

const destinationName = ref("");
const transportType = ref("");
const destinationBudget = ref();
const from = ref("");
const to = ref("");
const tripRating = ref(10);
const tripComments = ref("");
const numOfPeople = ref(0);


// Computed property for trip duration
const tripDuration = computed(() => {
  if (!from.value || !to.value) {
    return 0;
  }
  const fromDate = new Date(from.value);
  const toDate = new Date(to.value);
  const duration = (toDate - fromDate) / (1000 * 60 * 60 * 24); // Calculate difference in days
  return duration > 0 ? duration : 0; // Ensure non-negative duration
});

// Computed property for days remaining for trip
const daysRemainingForTrip = computed(() => {
  if (!from.value) return 0;
  const currentDate = new Date();
  const fromDate = new Date(from.value);
  const daysRemaining = (fromDate - currentDate) / (1000 * 60 * 60 * 24);
  return Math.ceil(daysRemaining); // Round up to the nearest whole number
});

const submitForm = () => {
  const tripData = {
    destination: destinationName.value,
    transportType: transportType.value,
    destinationBudget: destinationBudget.value,
    isTripComplete: false,
    from: from.value,
    to: to.value,
    tripDuration: tripDuration.value,
    daysRemainingForTrip: daysRemainingForTrip.value,
    tripRating: tripRating.value,
    tripComments: tripComments.value,
    date: new Date(),
    numOfPeople: numOfPeople.value  ,
  };

  addDestination(tripData);
  navigateTo("/destinations");
};
</script>

<template>
  <div class="form-wrapper">
    <form class="row g-3" @submit.prevent="submitForm">
      <h3 class="mb-4">Create Destination</h3>

      <div>
        <label for="destinationName" class="form-label">Destination</label>
        <input
          type="text"
          v-model.trim="destinationName"
          class="form-control"
          id="destinationName"
        />
      </div>

      <div>
        <label for="destinationName" class="form-label">Number of people</label>
        <input
          type="number"
          v-model.trim="numOfPeople"
          class="form-control"
          id="destinationTravelers"
        />
      </div>
      <div>
        <label for="transportType" class="form-label">Transportation Type</label>
        <select
          class="form-select"
          v-model="transportType"
          id="transportType"
        >
          <option>Plane</option>
          <option>Train</option>
          <option>Car</option>
          <option>Cruise</option>
        </select>
      </div>

      <div>
        <label for="destinationBudget" class="form-label">Budget</label>
        <input
          type="number"
          v-model.trim="destinationBudget"
          class="form-control"
          id="destinationBudget"
        />
      </div>

      <div class="col-6">
        <label for="fromDate" class="form-label">From</label>
        <input
          type="date"
          v-model="from"
          class="form-control"
          id="fromDate"
        />
      </div>

      <div class="col-6">
        <label for="toDate" class="form-label">To</label>
        <input
          type="date"
          v-model="to"
          class="form-control"
          id="toDate"
        />
      </div>

      <div class="col-6">
        <label for="tripDuration" class="form-label">Duration (Days)</label>
        <input
          type="number"
          :value="tripDuration"
          class="form-control"
          id="tripDuration"
          readonly
        />
      </div>

      <div class="col-6">
        <label for="daysRemainingForTrip" class="form-label">Days Remaining</label>
        <input
          type="number"
          :value="daysRemainingForTrip"
          class="form-control"
          id="daysRemainingForTrip"
          readonly
        />
      </div>

      <div class="col-6">
        <label for="tripRating" class="form-label">Rating</label>
        <input
          type="number"
          v-model="tripRating"
          class="form-control"
          id="tripRating"
          min="0"
          max="5"
          step="0.1"
        />
      </div>

      <div>
        <label for="tripComments" class="form-label">Comments</label>
        <textarea
          class="form-control"
          v-model="tripComments"
          id="tripComments"
        ></textarea>
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
</style>
