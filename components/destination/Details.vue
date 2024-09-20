<script setup>
import { useDestinationStore } from "@/store/destination";
const store = useDestinationStore();
import { storeToRefs } from "pinia";
import { formatDate, formatNumber } from "../../utils/date-conversion";
import {
  calculateDaysRangeDuration,
  calculateTotalDuration,
} from "../../utils/date-conversion";
const { deleteDestination, fetchDestinations } = store;
const { destination } = storeToRefs(store);
const props = defineProps([
  "destinationID",
  "destination",
  "transportType",
  "from",
  "to",
  "destinationBudget",
  "tripDuration",
  "date",
  "isTripCompleted",
  "daysRemainingForTrip",
  "citiesIncludedOnTrip",
  "tripRating",
  "tripComments",
  "numOfPeople",
]);

//? links
const citiesLink = computed(() => `/destinations/${props.destinationID}`);
const updateLink = computed(
  () => `/destinations/${props.destinationID}/update`
);

const tripStatus = computed(() => {
  if (props.isTripCompleted === "Completed") {
    return "Completed";
  } else if (props.isTripCompleted === "Pending") {
    return "Pending";
  } else if (props.isTripCompleted === "In progress") {
    return "In progress";
  }
});

const ratingStatus = computed(() => {
  if (props.tripRating >= 4.5) {
    return { rating: props.tripRating, color: "green" };
  } else if (props.tripRating >= 4 && props.tripRating < 4.5) {
    return { rating: props.tripRating, color: "yellow" };
  } else if (props.tripRating < 4) {
    return { rating: props.tripRating, color: "red" };
  }
});
const removeItem = async (id) => {
  console.log(id);

  deleteDestination(id);

  navigateTo(`/destinations`);
};
</script>

<template>
  <div class="modal-details">
    <h3>Destination Details</h3>
    <!-- {{ props.destinationID }} -->
    <hr />
    <h2>{{ props.destination }}</h2>
    <div class="details-row">
      <span class="detail-label">Number of travelers:</span>
      <span class="detail-value space"> {{ props.numOfPeople }}</span>
    </div>
    <div class="details-row">
      <span class="detail-label">Transport Type:</span>
      <span class="detail-value space">By {{ props.transportType }}</span>
    </div>

    <div class="details-row">
      <span class="detail-label">Dates: </span>
      <span class="detail-value space">
        {{ formatDate(props.from) }} - {{ formatDate(props.to) }}</span
      >
    </div>

    <div class="details-row">
      <span class="detail-label">Budget:</span>
      <span class="detail-value space"
        >${{ formatNumber(props.destinationBudget) }}</span
      >
    </div>

    <div class="details-row">
      <span class="detail-label">Trip Duration:</span>

      <span class="detail-value space"
        >{{ calculateDaysRangeDuration(props.from, props.to) }}
        {{
          calculateTotalDuration(props.from, props.to) > 1 ? "day" : "days"
        }}</span
      >
    </div>

    <div>
      <div class="details-row">
        <span class="detail-label">Days Remaining: </span>
        <span class="detail-value space">
          {{ props.daysRemainingForTrip }} days
        </span>
      </div>
    </div>

    <div class="details-row">
      <span class="detail-label">Cities Included: </span>
      <span class="detail-value space"
        >{{ props.citiesIncludedOnTrip }} cities</span
      >
    </div>

    <div>
      <div>
        <span class="detail-label">Status: </span>
        <span class="mr-auto">
          <UBadge
            v-if="tripStatus === 'Completed'"
            variant="outline"
            size="md"
            color="green"
            >Completed</UBadge
          >
          <UBadge
            v-if="tripStatus === 'Pending'"
            variant="outline"
            size="md"
            color="red"
            >Pending</UBadge
          >
          <UBadge
            v-if="tripStatus === 'In progress'"
            variant="outline"
            size="md"
            color="yellow"
            >In progress</UBadge
          >
        </span>
      </div>
    </div>

    <div>
      <span>
        <span class="detail-label">Rating: </span>
        <UBadge
          v-if="ratingStatus.rating < 4"
          variant="solid"
          size="md"
          color="red"
          >{{ props.tripRating.toFixed(1) }}
        </UBadge>
        <UBadge
          v-if="ratingStatus.rating >= 4 && ratingStatus.rating <= 4.5"
          variant="solid"
          size="md"
          color="yellow"
        >
          {{ props.tripRating.toFixed(1) }}</UBadge
        >
        <UBadge
          v-if="ratingStatus.rating >= 4.5"
          variant="solid"
          size="md"
          color="green"
          >{{ props.tripRating.toFixed(1) }}</UBadge
        >
      </span>
    </div>

    <div>
      <span class="detail-label">See Cities to visit </span>
      <NuxtLink class="space" :to="citiesLink">
        <button class="details-button">Cities</button>
      </NuxtLink>
    </div>
    
    <div class="details-row d-block">
        <span class="detail-label">Added on : </span>
        <span class="detail-value space">{{ formatDate(props.date) }}</span>
      </div>
    <div class="details-row d-block">
      <span class="detail-label">Trip Comments: </span>
      <p class="d-block comment">
        {{ props.tripComments }}
      </p>
    </div>

    <div class="modal-actions">
      <UButton color="red" @click="removeItem(props.destinationID)"
        >Delete</UButton
      >
      <UButton :to="updateLink">Update</UButton>
    </div>
  </div>
</template>

<style scoped>

.details-button{
  color: black;
  border: #b0b0b0 solid 1px;
  padding: 5px 10px;
  border-radius: 8px;
}

.details-button:hover{
  background-color: #dadada;
  transition: 0.3s ease-in-out;


}
.comment {
  border: solid rgb(180, 180, 180) 1px;
  min-height: 5rem;
  border-radius: 5px;
  margin-top: 1rem;
}
/* for highlighting titles : color: gray; */
/* for highlighting values :  color: rgb(43, 41, 41);
  font-weight: 500;*/
.title {
  font-weight: bold;
  color: rgb(110, 110, 110);
}

.highlight {
  font-weight: 800;
  color: rgb(139, 139, 139) !important;
}

.dr-button {
  padding: 3px 13px;
  border-radius: 5px;
  background: rgb(223, 222, 222);
  cursor: pointer;
}

.dr-button:hover {
  background-color: rgb(136, 134, 134);
}

.space {
  margin: 0 0.5rem;
}

.modal-details {
  padding: 20px;
  border-radius: 5px;
  background-color: #fff;
  box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.modal-details h2 {
  font-size: 1.2rem;
  margin-bottom: 10px;
}

.details-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.detail-label {
  font-weight: bold;
}

.detail-value {
  flex-grow: 1;
}

.modal-actions {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
}
</style>
