<script setup>
import { useDestinationStore } from "@/store/destination";
import { useCityStore } from "@/store/cities";
const cityStore = useCityStore();
import { storeToRefs } from "pinia";
const { cities } = storeToRefs(cityStore);
const props = defineProps(["destinationParamID"]);
const route = useRoute(); //route object
const destId = route.params.destinationID;
const cityId = route.params.expensesID;


// initiate
const cityID = ref();
const parentDestinationID = ref();
const city = ref();
const accommodation = ref();
const isAccommodationPaid = ref(false);
const totalCost = ref();
const from = ref();
const to = ref();
const isThisCityVisited = ref(false);
const cityDuration = ref();
const daysRemainingForCity = ref();
const expenseIncludedOnCity = ref();
const cityComments = ref();
const date = ref();
const cityRating = ref();
const submitForm = async () => {
  const cityData = {
    city: destinationName.value,
    parentDestinationID : parentDestinationID, 
    city: city.value,
    accommodation: accommodation.value,
    isAccommodationPaid: isAccommodationPaid.value,
    totalCost: totalCost.value,
    from: from.value,
    to: to.value,
    isThisCityVisited: isThisCityVisited.value,
    cityDuration: cityDuration.value,
    daysRemainingForCity: daysRemainingForCity.value,
    expenseIncludedOnCity: expenseIncludedOnCity.value,
    cityComments: cityComments.value,
    cityRating: cityRating.value,
    date: formatDate(new Date()),
  };

  await addDestination(cityData); //add project to pinia
  navigateTo("/destinations/trip1"); //after, go to projects
  console.log(cityData);
};

// };
</script>

<template>
  <div class="form-wrapper">
    <form class="row g-3" @submit.prevent="submitForm">
      <h3 class="mb-4">Add a City</h3>
 
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
