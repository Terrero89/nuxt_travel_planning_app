
<script setup>
import { ref, onMounted, computed } from "vue";
import { useCityStore } from "@/store/cities";
import { useExpenseStore } from "@/store/expenses";
const expenseStore = useExpenseStore();
const cityStore = useCityStore();

import { storeToRefs } from "pinia";
const { cities } = storeToRefs(cityStore);
const {expenses } = storeToRefs(expenseStore);
const { getAmountOfExpenses, fetchExpenses } = expenseStore;
const { fetchCities, updateCity, citiesAsArray, deleteCity,} = cityStore;
const route = useRoute(); //route object
const destinationParamID = route.params.destinationID;
const cityParamID = route.params.cityID;
const destId = route.params.destinationID;
const props = defineProps([
  "cityID",
  "parentDestinationID",
  "city",
  "accommodation",
  "accommodationCost",
  "isAccommodationPaid",
  "accommodationAddress",
  "totalCost",
  "from",
  "to",
  "isThisCityVisited",
  "cityRating",
  "cityDuration",
  "daysRemainingForCity",
  "expenseIncludedOnCity",
  "cityComments",
  "date"
]);
// have to find a way to grab all the required fields now that i have both ids
const removeItem = async (id) => {
  console.log(id);

  deleteCity(id);
  navigateTo(`/destinations/${destId}`);
};
const citiesLink = computed(
  () => `/destinations/${destId}/cities-${props.cityID}`
);
const updateCitiesLink = computed(
  () => `/destinations/${destId}/cities-${props.cityID}/updateCity`
);

const accommodationStatus = computed(() => {
  if (props.isAccommodationPaid === "Reserved") {
    return "Reserved";
  } else if (props.isAccommodationPaid === "Half reserved") {
    return "Half reserved";
  } else if (props.isAccommodationPaid === "Pending") {
    return "Pending";
  }
})

const visitStatus = computed(() => {
  if (props.isThisCityVisited === "Visited") {
    return "Visited";
  } else if (props.isThisCityVisited === "Not visited") {
    return "Not visited";
  } else if (props.isThisCityVisited === "In progress") {
    return "In progress";
  }
})

const ratingStatus = computed(() => {
  if (props.cityRating >= 4.5) {
    return {rating: props.cityRating, color: "green"};
  } else if (props.cityRating >= 4 && props.cityRating < 4.5) {
    return {rating: props.cityRating, color: "yellow"};
  } else if (props.cityRating < 4) {
    return {rating: props.cityRating, color: "red"};
  }
  
})

const evalLenghtOfExpenses = computed(() => {
  if(getAmountOfExpenses(props.cityID) > 0) {
    return getAmountOfExpenses(props.cityID)
  }else{
    return 'No expenses added yet'
  }
})
onMounted(async() => {
  await fetchExpenses()
  await fetchCities()
  cityStore.citiesAsArray.value

});
</script>

<template>
  <div>
    <div class="modal-details">
      <h3>City Details</h3>
      {{ props.cityID }}-
      <hr />
      <h2>{{ props.city }}</h2>
      <div class="details-row">
        <span class="detail-label">Accommodation:</span>
        <span class="detail-value space"> {{ props.accommodation }}</span>
      </div>

      <div v-if="accommodationStatus">
        <span>
          <span class="detail-label">Booking Status </span>
          <UBadge class="mx-3" v-if="accommodationStatus === 'Reserved'" size="md" color="green" variant="soft">{{
            accommodationStatus
          }}</UBadge>
          <UBadge class="mx-3" v-if="accommodationStatus === 'Half reserved'" size="md" color="yellow" variant="soft">{{
            accommodationStatus }}</UBadge>
          <UBadge class="mx-3" v-if="accommodationStatus === 'Pending'" size="md" color="red" variant="soft">{{
            accommodationStatus }}</UBadge>
        </span>
      </div>


      <div v-if="visitStatus">
        <span class="">
          <span class="detail-label">Visit Status</span>
          <UBadge class="mx-3" v-if="visitStatus === 'Visited'" size="md" color="green" variant="soft">{{
            visitStatus }}</UBadge>
          <UBadge class="mx-3" v-if="visitStatus === 'Not visited'" size="md" color="red" variant="soft">{{
            visitStatus }}</UBadge>
          <UBadge class="mx-3" v-if="visitStatus === 'In progress'" size="md" color="yellow" variant="soft">{{
            visitStatus }}</UBadge>
        </span>
      </div>

      <div class="details-row">
        <span class="detail-label">Dates: </span>
        <span class="detail-value space">
          {{ formatDate(props.from) }} - {{ formatDate(props.to) }}</span>
      </div>

      <div class="details-row">
        <span class="detail-label">Visit total Cost:</span>
        <span class="detail-value space">${{ formatNumber(props.totalCost) }}</span>
      </div>

      <div class="details-row">
        <span class="detail-label">City Duration:</span>

        <span class="detail-value space">{{ calculateDaysRangeDuration(props.from, props.to) }}
          {{
            calculateTotalDuration(props.from, props.to) > 1 ? "day" : "days"
          }}</span>
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
        <span class="detail-label">No. of Expenses </span>
<!--        <span class="detail-value space">{{expenseStore.getAmountOfExpenses(props.cityID)}}</span>-->
        <span class="detail-value space">{{evalLenghtOfExpenses}}</span>
      </div>

      <div v-if="props.cityRating">
        <span class="">
          <span class="detail-label">Rating: </span>
          <UBadge class="mx-3" v-if="ratingStatus.rating < 4" size="md" color="red">{{ ratingStatus.rating }}</UBadge>
          <UBadge class="mx-3" v-if="props.cityRating >= 4 && props.cityRating < 4.5" size="md" color="yellow">{{
            ratingStatus.rating }}</UBadge>
                  <UBadge class="mx-3" v-if="props.cityRating >= 4.5" size="md" color="green">{{ ratingStatus.rating}}</UBadge>

        </span>
      </div>

      <div class="details-row">
        <span class="detail-label">Address:</span>
        <span class="detail-value space">{{ props.accommodationAddress }}</span>
      </div>

      <div>
        <span class="detail-label">See Cities to visit </span>
        <NuxtLink class="space " :to="citiesLink">
          <button class="details-button">See Expenses</button>
        </NuxtLink>
      </div>
   
      <div class="details-row d-block">
        <span class="detail-label">Added on : </span>
        <span class="detail-value space">{{ formatDate(props.date) }}</span>
      </div>
      <div class="details-row d-block">
        <span class="detail-label ">Trip Comments: </span>
        <p class="d-block comment">
          {{ props.comments }}
        </p>
      </div>

      <div class="modal-actions">
        <UButton variant="solid" color="red" @click="removeItem(props.cityID)">Delete</UButton>
        <UButton :to="updateCitiesLink">Update City</UButton>
      </div>
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

.highlight {
  font-weight: 800;

  color: rgb(43, 41, 41) !important;
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
