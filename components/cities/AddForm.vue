<script setup>
import { useDestinationStore } from "@/store/destination";
import { useCityStore } from "@/store/cities";
const cityStore = useCityStore();
import { storeToRefs } from "pinia";
const {} = storeToRefs(cityStore);
const { addCity } = cityStore;
const props = defineProps(["destinationParamID"]);
const route = useRoute(); //route object

const destId = route.params.destinationID;

// initiate

const city = ref();
const accommodation = ref("Hotel");
const accommodationCost = ref(150);
const isAccommodationPaid = ref(false);
const totalCost = ref(550);
const from = ref("2024-11-27");
const to = ref("2024-11-30");
const isThisCityVisited = ref(false);
const cityDuration = ref();
const daysRemainingForCity = ref();
const expenseIncludedOnCity = ref();
const cityComments = ref();
const date = ref();
const cityRating = ref();
const submitForm = async () => {
  const cityData = {
    city: city.value,
    parentDestinationID: destId,
    accommodation: accommodation.value,
    accommodationCost: accommodationCost.value,
    isAccommodationPaid: false,
    totalCost: 0,
    from: from.value,
    to: to.value,
    isThisCityVisited: false,
    cityDuration: cityDuration.value,
    daysRemainingForCity: 72,
    expenseIncludedOnCity: 5,
    cityComments: cityComments.value,
    cityRating: cityRating.value,
    date: formatDate(new Date()),
  };
  console.log(cityData);

  await addCity(cityData); //add project to pinia
  //   navigateTo("/destinations/trip1"); //after, go to projects
  console.log(cityData);
};

// };
</script>

<template>
  <div class="form-wrapper">
    <form class="row g-3" @submit.prevent="submitForm">
      <h3 class="mb-4">Add a City</h3>

      <div>
        <label for="inputPassword4" class="form-label">City</label>
        <input
          type="input"
          v-model.trim="city"
          class="form-control"
          id="name-input"
        />
      </div>
      <div class="col-6">
        <label for="transportType" class="form-label">Accommodation Type</label>

        <select
          class="form-select"
          v-model="accommodation"
          aria-label="Default select example"
        >
          <option>Airbnb</option>
          <option>Hotel</option>
          <option>Hostel</option>
          <option>Home</option>
        </select>
      </div>
      <div class="col-6">
        <label for="inputPassword4" class="form-label"
          >Accommodation Price</label
        >
        <input
          type="number"
          v-model.trim="accommodationCost"
          class="form-control"
          id="name-input"
        />
      </div>
      <div>
        <label for="inputPassword4" class="form-label">Total Cost</label>
        <input
          type="number"
          v-model.trim="totalCost"
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
          v-model.trim="cityDuration"
          class="form-control"
          id="name-input"
        />
      </div>

      <div class="col-6">
        <label for="inputPassword4" class="form-label">Rating</label>

        <input
          type="number"
          v-model.trim="cityRating"
          class="form-control"
          id="name-input"
        />
      </div>

      <div>
        <textarea
          class="form-control"
          v-model="cityComments"
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
