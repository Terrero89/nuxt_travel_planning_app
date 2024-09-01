<script setup>
import { useDestinationStore } from "@/store/destination";
const store = useDestinationStore();
import { storeToRefs } from "pinia";
const {} = storeToRefs(store);
const { addDestination } = store;
const props = defineProps(["destinationParamID"]);

const destinationName = ref("");
const transportType = ref("");
const destinationBudget = ref();
const from = ref("");
const to = ref(new Date(""));
const duration = ref();
const tripRating = ref();
const tripComments = ref("");

const submitForm = () => {
  const tripData = {
    destination: destinationName.value,
    transportType: transportType.value,
    destinationBudget: destinationBudget.value,
    isTripComplete: false,
    from: from.value,
    to: to.value,
    tripDuration: calculateDaysRangeDuration(from.value, to.value),
    daysRemainingForTrip: 0,
    tripRating: 0.0,
    tripComments: "",
    date: formatDate(new Date()),
  };

  addDestination(tripData); //add project to pinia
  // addHistory(projectData); //add history to pinia
  // projectAddedToActions(props.param); //add project to actions
  navigateTo("/destinations"); //after, go to projects
  console.log(tripData);
};

// };
</script>

<template>
  <div class="form-wrapper">
    <form class="row g-3" @submit.prevent="submitForm">
      <h3 class="mb-4">Create Destination</h3>
      {{ props.destinationParamID }}
      <div>
        <label for="inputPassword4" class="form-label">Destination</label>
        <input
          type="input"
          v-model.trim="destinationName"
          class="form-control"
          id="name-input"
        />
      </div>
      <div>
        <label for="transportType" class="form-label"
          >Transportation Type</label
        >
        {{ from }}

        <select
          class="form-select"
          v-model="transportType"
          aria-label="Default select example"
        >
          <option>Plane</option>
          <option>Train</option>
          <option>Car</option>
          <option>Cruise</option>
        </select>
      </div>
      <div>
        <label for="inputPassword4" class="form-label">Budget</label>
        <input
          type="number"
          v-model.trim="destinationBudget"
          class="form-control"
          id="name-input"
        />
      </div>

      <div class="col-6">
        <label for="inputPassword4" class="form-label">From: </label>
        <input
          type="date"
          v-model.trim="from"
          class="form-control"
          id="name-input"
        />
      </div>
      <!-- {{formatDate(from)}} -->

      <div class="col-6">
        <label for="inputPassword4" class="form-label">To: </label>
        <input
          type="date"
          v-model.trim="to"
          class="form-control"
          id="name-input"
        />
      </div>
      <div class="col-6">
        <label for="inputPassword4" class="form-label">Duration</label>
        <input
          type="number"
          v-model.trim="duration"
          class="form-control"
          id="name-input"
        />
      </div>

      <div class="col-6">
        <label for="inputPassword4" class="form-label">Rating</label>

        <input
          type="number"
          v-model.trim="tripRating"
          class="form-control"
          id="name-input"
          min="0"
          max="5"
          step="0.1"
        />
      </div>

      <div>
        <textarea
          class="form-control"
          v-model="tripComments"
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
</style>
