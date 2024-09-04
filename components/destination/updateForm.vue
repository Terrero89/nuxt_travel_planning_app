<script setup>
import { ref, onMounted, computed, watch } from "vue";
import { useDestinationStore } from "@/store/destination";
import { storeToRefs } from "pinia";

// Initialize store
const store = useDestinationStore();
const { editDestination, updateDestination, fetchDestinations } = store;
const { destination } = storeToRefs(store);
const route = useRoute();
const destinationParamID = route.params.destinationID;

// Define props
const props = defineProps(["paramDestinationID"]);

// Computed property to find the specific destination
const dest = computed(() => {
  return (
    destination.value.find(
      (item) => item.destinationID === destinationParamID
    ) || {}
  );
});

// Computed property for trip duration
const tripDuration = computed(() => {
  if (dest.value.from && dest.value.to) {
    const fromDate = new Date(dest.value.from);
    const toDate = new Date(dest.value.to);
    const duration = (toDate - fromDate) / (1000 * 60 * 60 * 24); // Calculate difference in days
    return duration > 0 ? duration : 0; // Ensure non-negative duration
  }
  return 0;
});

// Computed property for days remaining for the trip
const daysRemainingForTrip = computed(() => {
  if (dest.value.from) {
    const fromDate = new Date(dest.value.from);
    const currentDate = new Date();
    const remainingDays = (fromDate - currentDate) / (1000 * 60 * 60 * 24); // Calculate difference in days
    return remainingDays > 0 ? Math.ceil(remainingDays) : 0; // Round up and ensure non-negative value
  }
  return 0;
});

// Watch for changes in from/to dates and update tripDuration and daysRemainingForTrip accordingly
watch([() => dest.value.from, () => dest.value.to], () => {
  dest.value.tripDuration = tripDuration.value;
  dest.value.daysRemainingForTrip = daysRemainingForTrip.value;
});

const updateDestinationHandler = async () => {
  try {
    await updateDestination(destinationParamID, {
      ...dest.value,
      tripDuration: tripDuration.value,
      daysRemainingForTrip: daysRemainingForTrip.value,
    });
    navigateTo("/destinations");
  } catch (error) {
    console.error("Error updating destination:", error);
    alert("An error occurred while updating the destination. Please try again later.");
  }
};

onMounted(async () => {
  await fetchDestinations();
});
</script>
<template>
  <div class="form-wrapper" v-if="Object.keys(dest).length > 0">
    <form class="row g-3" @submit.prevent="submitForm">
      <h3 class="mb-4">Update Destination</h3>
      {{ dest.tripDuration }}
      <div>
        <label for="destinationName" class="form-label">Destination</label>
        <input
          type="input"
          v-model.trim="dest.destination"
          class="form-control"
          id="destinationName"
        />
      </div>

      <div>
        <label for="transportType" class="form-label"
          >Transportation Type</label
        >
        <select
          class="form-select"
          v-model="dest.transportType"
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
          v-model.trim="dest.destinationBudget"
          class="form-control"
          id="destinationBudget"
        />
      </div>

      <div class="col-6">
        <label for="fromDate" class="form-label">From</label>
        <input
          type="date"
          v-model.trim="dest.from"
          class="form-control"
          id="fromDate"
        />
      </div>

      <div class="col-6">
        <label for="toDate" class="form-label">To</label>
        <input
          type="date"
          v-model.trim="dest.to"
          class="form-control"
          id="toDate"
        />
      </div>
{{dest.to}}
      <div class="col-6">
        <label for="duration" class="form-label">Duration</label>
        <input
          type="number"
          v-model.trim="dest.tripDuration"
          class="form-control"
          id="duration"
          readonly
        />
      </div>

      <div class="col-6">
        <label for="tripRating" class="form-label">Rating</label>
        <input
          type="number"
          v-model.trim="dest.tripRating"
          class="form-control"
          id="tripRating"
        />
      </div>

      <div>
        <label for="tripComments" class="form-label">Comments</label>
        <textarea
          class="form-control"
          v-model="dest.tripComments"
          id="tripComments"
        />
      </div>
      {{ dest.tripComments }}

      <div>
        <button
          type="submit"
          class="btn btn-primary py-2 px-4"
          @click="updateDestinationHandler"
        >
          Update
        </button>
      </div>
    </form>
  </div>
</template>

<style scoped>
.form-wrapper {
  background-color: white;
  max-width: 32rem;
  border-radius: 7px;
  border: solid rgba(143, 143, 143, 0.2) 1px;
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
