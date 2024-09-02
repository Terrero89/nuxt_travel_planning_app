<script setup>
import { useDestinationStore } from "@/store/destination";
const store = useDestinationStore();
import { storeToRefs } from "pinia";
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
]);

//? links
const citiesLink = computed(() => `/destinations/${props.destinationID}`);
const updateLink = computed(
  () => `/destinations/${props.destinationID}/update`
);


const removeItem = async (id) => {
  console.log(id);

  deleteDestination(id);

  navigateTo(`/destinations`);
};
</script>

<template>
  <div class="modal-details">
    <h3>Destination Details</h3>
    {{ props.destinationID }}
    <hr />
    <h2>{{ props.destination }}</h2>

    <div class="details-row">
      <span class="detail-label">Transport Type:</span>
      <span class="detail-value space">By {{ props.transportType }}</span>
    </div>

    <div class="details-row">
      <span class="detail-label">Dates: </span>
      <span class="detail-value space"> {{ props.from }} -{{ props.to }}</span>
    </div>

    <div class="details-row">
      <span class="detail-label">Budget:</span>
      <span class="detail-value space">${{ props.destinationBudget }}</span>
    </div>

    <div class="details-row">
      <span class="detail-label">Trip Duration:</span>
      <span class="detail-value space">{{ props.tripDuration }} Days</span>
    </div>

    <div v-if="props.isTripCompleted">
      <span class="">
        <span class="detail-label">Visit Status</span>
        <UBadge
          class="mx-3"
          v-if="props.isTripCompleted"
          size="md"
          color="green"
          variant="soft"
          >{{ props.isTripCompleted ? "Visited" : "" }}</UBadge
        >
      </span>
    </div>

    <div v-if="!props.isTripCompleted">
      <span class="">
        <span class="detail-label">Visit Status</span>
        <UBadge
          class="mx-3"
          v-if="!props.isTripCompleted"
          size="md"
          color="red"
          variant="soft"
          >{{ !props.isTripCompleted ? "Not Visited" : "" }}</UBadge
        >
      </span>
    </div>

    <div v-else>
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

    <!-- <div class="details-row">
      <span class="detail-label">Trip Rating: </span>
      <span class="detail-value space"> {{ props.tripRating }}</span>
    </div> -->
    <div v-if="props.tripRating < 4">
      <span class="mx-2">
        <span class="detail-label">Rating: </span>
        <UBadge
          class="mx-3"
          v-if="props.tripRating < 4"
          size="md"
          color="red"
          >{{ props.cityRating }}</UBadge
        >
      </span>
    </div>

    <div v-else-if="props.tripRating >= 4 && props.tripRating <= 4.5">
      <span>
        <span class="detail-label">Rating: </span>
        <UBadge
          class="mx-3"
          v-if="props.tripRating >= 4 && props.tripRating <= 4.5"
          size="md"
          color="yellow"
          >{{ props.tripRating }}</UBadge
        >
      </span>
    </div>

    <div v-else-if="props.tripRating > 4.5">
      <span>
        <span class="detail-label">Rating: </span>
        <UBadge
          class="mx-3"
          v-if="props.tripRating > 4.5"
          size="md"
          color="green"
          >{{ props.tripRating }}</UBadge
        >
      </span>
    </div>

    <div>
      <span class="detail-label">See Cities to visit </span>
      <NuxtLink class="space dr-button" :to="citiesLink">
        <button>Cities</button>
      </NuxtLink>
    </div>

    <div class="details-row d-block">
      <span class="detail-label">Trip Comments: </span>
      <p class="d-block">
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
