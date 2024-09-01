<script setup>
import { ref, onMounted } from 'vue';
import { useDestinationStore } from "@/store/destination";
import { storeToRefs } from "pinia";
import { useRouter } from 'vue-router';

// Initialize store
const store = useDestinationStore();

// Extract `destination` array from store using `storeToRefs`
const { destination } = storeToRefs(store);

const router = useRouter(); 

// Define props
const props = defineProps(["paramDestinationID"]);

// Reactive form fields
const destinationName = ref("");
const transportType = ref("");
const destinationBudget = ref(0);
const duration = ref(0);
const from = ref(new Date("Nov 7, 2024"));
const to = ref(new Date("Nov 19, 2024"));
const tripRating = ref(0);
const tripComments = ref("");

// Populate the form with existing destination data when component is mounted
onMounted(() => {
  const selectedDestination = destination.value.find(dest => dest.id === props.destinationID);
  if (selectedDestination) {
    destinationName.value = selectedDestination.destination;
    transportType.value = selectedDestination.transportType;
    destinationBudget.value = selectedDestination.destinationBudget;
    duration.value = selectedDestination.tripDuration;
    from.value = selectedDestination.from;
    to.value = selectedDestination.to;
    tripRating.value = selectedDestination.tripRating;
    tripComments.value = selectedDestination.tripComments;
  } else {
    console.error('Destination not found');
  }
});

// Function to handle form submission
const submitForm = async () => {
  const tripData = {
    id: props.destinationID,
    destination: destinationName.value,
    transportType: transportType.value,
    destinationBudget: destinationBudget.value,
    isTripComplete: false,
    tripDuration: duration.value,
    from: from.value,
    to: to.value,
    daysRemainingForTrip: 0,
    tripRating: tripRating.value,
    tripComments: tripComments.value,
    date: new Date(),
  };

  try {
    await store.updateDestination(tripData);
    console.log('Destination updated successfully:', tripData);
    NavigateTo('/destinations'); // Navigate back to the destinations list
  } catch (error) {
    console.error('Error updating destination:', error);
  }
};
</script>
<template>
    <div class="form-wrapper">
      <form class="row g-3" @submit.prevent="submitForm">
        <h3 class="mb-4">Update Destination</h3>
  
        <!-- Form Fields -->
        <div>
          <label for="destinationName" class="form-label">Destination</label>
          <input
            type="input"
            v-model.trim="destinationName"
            class="form-control"
            id="destinationName"
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
            v-model.trim="from"
            class="form-control"
            id="fromDate"
          />
        </div>
  
        <div class="col-6">
          <label for="toDate" class="form-label">To</label>
          <input
            type="date"
            v-model.trim="to"
            class="form-control"
            id="toDate"
          />
        </div>
  
        <div class="col-6">
          <label for="duration" class="form-label">Duration</label>
          <input
            type="number"
            v-model.trim="duration"
            class="form-control"
            id="duration"
          />
        </div>
  
        <div class="col-6">
          <label for="tripRating" class="form-label">Rating</label>
          <input
            type="number"
            v-model.trim="tripRating"
            class="form-control"
            id="tripRating"
          />
        </div>
  
        <div>
          <label for="tripComments" class="form-label">Comments</label>
          <textarea
            class="form-control"
            v-model="tripComments"
            id="tripComments"
          />
        </div>
  
        <div>
          <button type="submit" class="btn btn-primary py-2 px-4">Update</button>
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