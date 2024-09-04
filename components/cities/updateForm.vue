<script setup>
import { ref, onMounted, computed } from "vue";
import { useCityStore } from "@/store/cities";
const cityStore = useCityStore();
import { storeToRefs } from "pinia";
const { cities } = storeToRefs(cityStore);
const { fetchCities, updateCity } = cityStore;
const route = useRoute();
const cityParamID = route.params.cityID;


const cityItem = computed(() => {
  return (
    cityStore.citiesAsArray.find((item) => item.cityID === cityParamID) || {}
  );
});

// const cityData = ref({
//   city: cityItem.value.city,
//   accommodation: cityItem.value.accommodation,
//   accommodationType: cityItem.value.accommodationType,
//   accommodationCost: cityItem.value.accommodationCost,
//   accommodationAddress: cityItem.value.accommodationAddress,
//   transportType: cityItem.value.transportType,
//   destinationBudget: cityItem.value.destinationBudget,
//   to: cityItem.value.to,
//   from: cityItem.value.from,
//   duration: cityItem.value.duration,
//   cityRating: cityItem.value.cityRating,
//   cityComments: cityItem.value.cityComments,
// });

const updateCityHandler = async () => {
  try {
     
    await updateCity(cityParamID, cityItem.value);
  } catch (error) {
    console.error("Error updating city:", error);
    alert("An error occurred while updating the city. Please try again later.");
  }
};

onMounted(async () => {
  await fetchCities();
  const cityItem = cityStore.citiesAsArray.find((item) => item.cityID === cityParamID);
  if (cityItem) {
    cityData.value = { ...cityItem };
  }
});
</script>

<template>
  <div class="form-wrapper">
    {{ cityItem.city }}
    <form class="row g-3" @submit.prevent="submitForm">
      <h3 class="mb-4">Update City</h3>

      {{ cityItem }}

      <div>
        <label for="inputPassword4" class="form-label">City</label>
        <input
          type="input"
          v-model.trim="cityItem.city"
          class="form-control"
          id="name-input"
        />
      </div>
      <div>
        <div class="">
          <label for="transportType" class="form-label"
            >Accommodation Type</label
          >

          <select
            class="form-select"
            v-model="cityItem.accommodation"
            aria-label="Default select example"
          >
            <option>Airbnb</option>
            <option>Hotel</option>
            <option>Hostel</option>
            <option>Home</option>
            <option>Other</option>
            <option>N/A</option>
          </select>
        </div>
        <div class="+">
          <label for="inputPassword4" class="form-label"
            >Accommodation Price</label
          >
          <input
            type="number"
            v-model.trim="cityItem.accommodationCost"
            class="form-control"
            id="name-input"
          />
          {{ cityItem.accommodationAddress }}
          <div>
            <label for="inputPassword4" class="form-label">Address</label>
            <input
              type="input"
              v-model.trim="cityItem.accommodationAddress"
              class="form-control"
              id="name-input"
            />
          </div>
        </div>
        <label for="transportType" class="form-label"
          >Transportation Type</label
        >

        <select
          class="form-select"
          v-model="cityItem.transportType"
          aria-label="Default select example"
        >
          <option>Plane</option>
          <option>Train</option>
          <option>Car</option>
          <option>Cruise</option>
          <option>Other</option>
        </select>
      </div>

      <div>
        <label for="inputPassword4" class="form-label">Budget</label>
        <input
          type="number"
          v-model.trim="cityItem.destinationBudget"
          class="form-control"
          id="name-input"
        />
      </div>

      <div class="col-6">
        <label for="inputPassword4" class="form-label">From: </label>
        <input
          type="date"
          v-model.trim="cityItem.from"
          class="form-control"
          id="name-input"
        />
      </div>
      <!-- {{formatDate(from)}} -->

      <div class="col-6">
        <label for="inputPassword4" class="form-label">To: </label>
        <input
          type="date"
          v-model.trim="cityItem.to"
          class="form-control"
          id="name-input"
        />
      </div>
      <div class="col-6">
        <label for="inputPassword4" class="form-label">Duration</label>
        <input
          type="number"
          v-model.trim="cityItem.duration"
          class="form-control"
          id="name-input"
        />
      </div>

      <div class="col-6">
        <label for="inputPassword4" class="form-label">Rating</label>

        <input
          type="number"
          v-model.trim="cityItem.cityRating"
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
          v-model="cityItem.tripComments"
          aria-label="With textarea"
          placeholder="Comments"
        />
      </div>

      <div>
        <button
          type="submit"
          class="btn btn-primary py-2 px-4"
          @click="updateCityHandler"
        >
          Submit
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
