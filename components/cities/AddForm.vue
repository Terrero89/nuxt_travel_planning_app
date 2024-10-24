<script setup>
import { ref, computed } from "vue";
import { useCityStore } from "@/store/cities";
import { useRoute } from "vue-router";

const cityStore = useCityStore();
const { addCity } = cityStore;
const route = useRoute();
const destId = route.params.destinationID;

const city = ref("");
const accommodation = ref("");
const accommodationCost = ref(0);
const isAccommodationPaid = ref("");
const accommodationAddress = ref("");
const totalCost = ref(0);
const from = ref("");
const to = ref("");
const cityRating = ref(0);
const cityComments = ref("");

// Validation state
const errors = ref({});

const validateForm = () => {
  errors.value = {};

  if (!city.value) errors.value.city = "City is required";
  if (!accommodation.value)
    errors.value.accommodation = "Accommodation is required";
  if (!accommodationCost.value || accommodationCost.value < 0)
    errors.value.accommodationCost = "Valid accommodation cost is required";
  if (!isAccommodationPaid.value)
    errors.value.isAccommodationPaid = "Reservation status is required";
  if (!accommodationAddress.value)
    errors.value.accommodationAddress = "Accommodation address is required";
  if (!totalCost.value || totalCost.value < 0)
    errors.value.totalCost = "Valid total cost is required";
  if (!from.value) errors.value.from = "From date is required";
  if (!to.value) errors.value.to = "To date is required";
  if (cityRating.value < 0 || cityRating.value > 5)
    errors.value.cityRating = "Rating must be between 0 and 5";

  return Object.keys(errors.value).length === 0;
};

// Computed property for city duration
const cityDuration = computed(() => {
  if (!from.value || !to.value) {
    return 0;
  }
  const fromDate = new Date(from.value);
  const toDate = new Date(to.value);
  const duration = (toDate - fromDate) / (1000 * 60 * 60 * 24); // Calculate difference in days
  return duration > 0 ? duration : 0; // Ensure non-negative duration
});

// Computed property for days remaining for city
const daysRemainingForCity = computed(() => {
  if (!from.value) return 0;
  const currentDate = new Date();
  const fromDate = new Date(from.value);
  const daysRemaining = (fromDate - currentDate) / (1000 * 60 * 60 * 24);
  return Math.ceil(daysRemaining); // Round up to the nearest whole number
});

const submitForm = async () => {
  if (!validateForm()) return; // Stop if validation fails

  const cityData = {
    city: city.value,
    parentDestinationID: destId,
    accommodation: accommodation.value,
    accommodationCost: accommodationCost.value,
    isAccommodationPaid: "Pending",
    accommodationAddress: accommodationAddress.value,
    totalCost: totalCost.value,
    from: from.value,
    to: to.value,
    cityDuration: cityDuration.value,
    daysRemainingForCity: daysRemainingForCity.value,
    cityComments: cityComments.value,
    cityRating: cityRating.value,
    date: new Date(),
  };

  await addCity(cityData);
};
</script>

<template>
  <div class="form-wrapper">
    <form class="row g-3" @submit.prevent="submitForm">
      <h3 class="mb-4">Add a City</h3>

      <div>
        <label for="city" class="form-label">City</label>
        <input
          type="text"
          v-model.trim="city"
          :class="{ 'is-invalid': errors.city }"
          class="form-control"
          id="city"
        />
        <small v-if="errors.city" class="text-danger">{{ errors.city }}</small>
      </div>

      <div class="col-6">
        <label for="accommodation" class="form-label">Accommodation Type</label>
        <select
          class="form-select"
          v-model="accommodation"
          :class="{ 'is-invalid': errors.accommodation }"
          id="accommodation"
        >
          <option value="">Select</option>
          <option>Airbnb</option>
          <option>Hotel</option>
          <option>Hostel</option>
          <option>Home</option>
          <option>Other</option>
          <option>N/A</option>
        </select>
        <small v-if="errors.accommodation" class="text-danger">{{
          errors.accommodation
        }}</small>
      </div>

      <div class="col-6">
        <label for="accommodationCost" class="form-label"
          >Accommodation Price</label
        >
        <input
          type="number"
          v-model.trim="accommodationCost"
          :class="{ 'is-invalid': errors.accommodationCost }"
          class="form-control"
          id="accommodationCost"
        />
        <small v-if="errors.accommodationCost" class="text-danger">{{
          errors.accommodationCost
        }}</small>
      </div>

      <div>
        <label for="totalCost" class="form-label">Total Cost</label>
        <input
          type="number"
          v-model.trim="totalCost"
          :class="{ 'is-invalid': errors.totalCost }"
          class="form-control"
          id="totalCost"
        />
        <small v-if="errors.totalCost" class="text-danger">{{
          errors.totalCost
        }}</small>
      </div>

      <div>
        <label for="transportType" class="form-label">Reservation Status</label>
        <select
          class="form-select"
          v-model="isAccommodationPaid"
          :class="{ 'is-invalid': errors.isAccommodationPaid }"
          aria-label="Default select example"
        >
          <option value="">Select</option>
          <option>Reserved</option>
          <option>Half Reserved</option>
          <option>Pending</option>
        </select>
        <small v-if="errors.isAccommodationPaid" class="text-danger">{{
          errors.isAccommodationPaid
        }}</small>
      </div>

      <div>
        <label for="accommodationAddress" class="form-label">Address</label>
        <input
          type="text"
          v-model.trim="accommodationAddress"
          :class="{ 'is-invalid': errors.accommodationAddress }"
          class="form-control"
          id="accommodationAddress"
        />
        <small v-if="errors.accommodationAddress" class="text-danger">{{
          errors.accommodationAddress
        }}</small>
      </div>

      <div class="col-6">
        <label for="from" class="form-label">From</label>
        <input
          type="date"
          v-model="from"
          :class="{ 'is-invalid': errors.from }"
          class="form-control"
          id="from"
        />
        <small v-if="errors.from" class="text-danger">{{ errors.from }}</small>
      </div>

      <div class="col-6">
        <label for="to" class="form-label">To</label>
        <input
          type="date"
          v-model="to"
          :class="{ 'is-invalid': errors.to }"
          class="form-control"
          id="to"
        />
        <small v-if="errors.to" class="text-danger">{{ errors.to }}</small>
      </div>

      <div class="col-6">
        <label for="cityDuration" class="form-label">Duration (Days)</label>
        <input
          type="number"
          :value="cityDuration"
          class="form-control"
          id="cityDuration"
          readonly
        />
      </div>

      <div class="col-6">
        <label for="daysRemainingForCity" class="form-label"
          >Days Remaining</label
        >
        <input
          type="number"
          :value="daysRemainingForCity"
          class="form-control"
          id="daysRemainingForCity"
          readonly
        />
      </div>

      <div class="col-6">
        <label for="cityRating" class="form-label">Rating</label>
        <input
          type="number"
          v-model="cityRating"
          :class="{ 'is-invalid': errors.cityRating }"
          class="form-control"
          id="cityRating"
          min="0"
          max="5"
          step="0.1"
        />
        <small v-if="errors.cityRating" class="text-danger">{{
          errors.cityRating
        }}</small>
      </div>

      <div>
        <label for="cityComments" class="form-label">Comments</label>
        <textarea
          v-model="cityComments"
          class="form-control"
          id="cityComments"
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

.is-invalid {
  border-color: red;
}

.text-danger {
  color: red;
}
</style>
