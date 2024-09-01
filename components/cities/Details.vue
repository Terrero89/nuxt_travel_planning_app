<script setup>
// import { useDestinationStore } from "@/store/destination";
// const store = useDestinationStore();
// import { storeToRefs } from "pinia";
// const { cities } = storeToRefs(store);
const route = useRoute(); //route object
const destId = route.params.destinationID;
const props = defineProps([
  "cityID",
  "parentDestinationID",
  "city",
  "accommodation",
  "accommodationCost",
  "isAccommodationPaid",
  "totalCost",
  "from",
  "to",
  "isThisCityVisited",
  "cityRating",
  "cityDuration",
  "daysRemainingForCity",
  "expenseIncludedOnCity",
  "cityComments",
]);
// have to find a way to grab all the required fields now that i have both ids

const citiesLink = computed(
  () => `/destinations/${destId}/cities-${props.cityID}`
);
</script>

<template>
  <div>
    <div class="modal-details">
      <h3>City Details</h3>
{{ props.cityID }}
      <hr />
      <h2>{{ props.city }}</h2>

      <div class="details-row">
        <span class="detail-label">Accommodation:</span>
        <span class="detail-value space"> {{ props.accommodation }}</span>
      </div>

      <div v-if="props.isAccommodationPaid">
        <span>
          <span class="detail-label">Booking Status </span>
          <UBadge
            class="mx-3"
            v-if="props.isThisCityVisited"
            size="md"
            color="green"
            variant="soft"
            >{{ props.isThisCityVisited ? "Booked" : "" }}</UBadge
          >
        </span>
      </div>

      <div v-if="!props.isAccommodationPaid">
        <span class="">
          <span class="detail-label">Booking Status</span>
          <UBadge
            class="mx-3"
            v-if="!props.isAccommodationPaid"
            size="md"
            color="red"
            variant="soft"
            >{{ !props.isAccommodationPaid ? "Pending" : "" }}</UBadge
          >
        </span>
      </div>

      <div v-if="!props.isThisCityVisited">
        <span class="">
          <span class="detail-label">Visit Status</span>
          <UBadge
            class="mx-3"
            v-if="!props.isThisCityVisited"
            size="md"
            color="red"
            variant="soft"
            >{{ props.isThisCityVisited ? "Visited" : "" }}</UBadge
          >
        </span>
      </div>

      <div class="details-row">
        <span class="detail-label">Dates: </span>
        <span class="detail-value space">
          {{ props.from }} -{{ props.to }}</span
        >
      </div>

      <div class="details-row">
        <span class="detail-label">Visit total Cost:</span>
        <span class="detail-value space">${{ props.totalCost }}</span>
      </div>

      <div class="details-row">
        <span class="detail-label">City Duration:</span>
        <span class="detail-value space">{{ props.cityDuration }} Days</span>
      </div>

      <div v-if="props.isThisCityVisited">
        <span>
          <span class="detail-label">Visit Status </span>
          <UBadge
            class="mx-3"
            v-if="props.isThisCityVisited"
            size="md"
            color="green"
            variant="soft"
            >{{ props.isThisCityVisited ? "Visited" : "Pending" }}</UBadge
          >
        </span>
      </div>

      <div v-if="!props.isThisCityVisited">
        <span class="">
          <span class="detail-label">Visit Status:</span>
          <UBadge
            class="mx-3"
            v-if="!props.isThisCityVisited"
            size="md"
            color="red"
            variant="soft"
            >{{ props.isThisCityVisited ? "Visited" : "Pending" }}</UBadge
          >
        </span>
      </div>

      <div>
        <div class="details-row">
          <span class="detail-label">Days until visit: </span>
          <span class="detail-value space">
            {{ props.daysRemainingForCity }} days
          </span>
        </div>
      </div>

      <div class="details-row">
        <span class="detail-label">Expenses made: </span>
        <span class="detail-value space"
          >{{ props.expenseIncludedOnCity }} cities</span
        >
      </div>

      <div class="details-row">
        <span class="detail-label">Rating: </span>
        <span class="detail-value space"> {{ props.cityRating }}</span>
      </div>
      <div v-if="props.cityRating < 4">
        <span class="mx-2">
          <span class="detail-label">Rating: </span>
          <UBadge
            class="mx-3"
            v-if="props.cityRating < 4"
            size="md"
            color="red"
            >{{ props.cityRating }}</UBadge
          >
        </span>
      </div>

      <div v-else-if="props.cityRating >= 4 && props.cityRating <= 4.5">
        <span>
          <span class="detail-label">Rating: </span>
          <UBadge
            class="mx-3"
            v-if="props.cityRating >= 4 && props.cityRating <= 4.5"
            size="md"
            color="yellow"
            >{{ props.cityRating }}</UBadge
          >
        </span>
      </div>

      <div v-else-if="props.cityRating > 4.5">
        <span>
          <span class="detail-label">Rating: </span>
          <UBadge
            class="mx-3"
            v-if="props.cityRating > 4.5"
            size="md"
            color="green"
            >{{ props.cityRating }}</UBadge
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
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Dicta natus
          earum a quam quas fugit voluptatem laborum sit similique, totam
          provident numquam. Adipisci facilis perspiciatis vel, aliquid
          consequatur ducimus in!
        </p>
      </div>

      <div class="modal-actions">
        <UButton variant="outline" color="blue">Expenses</UButton>
        <UButton>Update City</UButton>
      </div>
    </div>
  </div>
</template>

<style scoped>
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
