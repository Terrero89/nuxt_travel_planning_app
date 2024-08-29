<script setup>
import { useDestinationStore } from "@/store/destination";
const store = useDestinationStore();
import { storeToRefs } from "pinia";
const { cities } = storeToRefs(store);
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
</script>

<template>
  <div>
    <div class="modal-details">
      <h3>CityDetails</h3>
      <hr />
      <h2>{{ props.city }}</h2>


      <div class="details-row">
        <span class="detail-label">Accommodation:</span>
        <span class="detail-value space"> {{ props.accommodation }}</span>
      </div>
      <div class="details-row">
        <span class="detail-label">Is Accommodation paid:</span>
        <span class="detail-value space"> {{ !props.isAccommodationPaid  ? 'no' : 'yes'}}</span>
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

      <!-- <div v-if="props.isTripCompleted">
        <div class="details-row">
          <span class="detail-label">Trip Completed </span>
          <span class="detail-value space">{{ props.isThisCityVisited }}</span>
        </div>
      </div> -->
      <div >
        <div class="details-row">
          <span class="detail-label">City visited </span>
          <span class="detail-value space">{{ props.isThisCityVisited }}</span>
        </div>
      </div>

      <div >
        <div class="details-row">
          <span class="detail-label">Days until visit: </span>
          <span class="detail-value space">
            {{ props.daysRemainingForCity }} days
          </span>
        </div>
      </div>

      <div class="details-row">
        <span class="detail-label">Expenses Included: </span>
        <span class="detail-value space"
          >{{ props.expenseIncludedOnCity }} cities</span
        >
      </div>

      <div class="details-row">
        <span class="detail-label">Rating: </span>
        <span class="detail-value space"> {{ props.cityRating }}</span>
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
        <UButton @click="$emit('close')">Close</UButton>
        <UButton>Update</UButton>
      </div>
    </div>
  </div>
</template>

<style scoped>
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
