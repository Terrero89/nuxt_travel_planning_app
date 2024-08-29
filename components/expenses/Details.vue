<script setup>
import { useDestinationStore } from "@/store/destination";
const store = useDestinationStore();
import { storeToRefs } from "pinia";

const props = defineProps([
  "expensesID",
  "destinationParentID",
  "cityParentID",
  "expense", // food, landmarks, transport, uber, plane, hotel, attractions,
  "category",
  "startTime",
  "endTime",
  "from",
  "to",
  "cost",
  "isExpensePaid",
  "location",
  "duration",
  "date",
  "isCompleted",
  "daysRemainingForExpense",
  "placeRating",
]);
</script>

<template>
  <div class="modal-details">
    <h3>Expense Details</h3>
    <hr />
    <h2>{{ props.expense }}</h2>

    <div class="details-row">
      <span class="detail-label">Category:</span>
      <span class="detail-value space">{{ props.category }}</span>
    </div>

    <div class="details-row" v-if="props.category !== 'Food'">
      <span class="detail-label">Start: </span>
      <span class="detail-value space">{{ props.startTime }}</span>
      <span class="detail-label">End time: </span>
      <span class="detail-value space">{{ props.endTime }}</span>
    </div>

    <div class="details-row">
      <span class="detail-label">Cost:</span>
      <span class="detail-value space">${{ props.cost }}</span>
    </div>
    <div class="details-row" v-if="props.category === 'Attractions'">
      <span class="detail-label">Is paid: </span>
      <span class="detail-value space">{{ props.isExpensePaid }}</span>
    </div>
    <div class="details-row" v-if="props.category !== 'Food'">
      <span class="detail-label">Duration:</span>
      <span class="detail-value space">{{ props.duration }} Hours</span>
    </div>
    <div v-if="expense.isCompleted">
      <div class="details-row">
        <span class="detail-label">Expense Paid: </span>
        <span class="detail-value space">{{ props.isExpensePaid }}</span>
      </div>
    </div>

    <div>
      <div class="details-row">
        <span class="detail-label">Days Remaining: </span>
        <span class="detail-value space">
          {{ expense.daysRemainingForExpense }} days
        </span>
      </div>
    </div>
    <div>
      <div class="details-row">
        <span class="detail-label">Location: </span>
        <span class="detail-value space">{{ props.location }}</span>
      </div>
    </div>
<!-- < 4 -->
    <div v-if="props.placeRating < 4">
      <span class="details-row" >
        <span class="detail-label">Rating: </span>
        <UBadge v-if="props.placeRating < 4" size="md" color="red">{{
          props.placeRating
        }}</UBadge>
        
      </span>
    </div>

    <div  v-else-if="props.placeRating >= 4 && props.placeRating <= 4.5">
      <span class="details-row" >
        <span class="detail-label">Rating: </span>
        <UBadge v-if="props.placeRating >= 4 && props.placeRating <= 4.5"  size="md" color="yellow">{{
          props.placeRating
        }}</UBadge>
        
      </span>
    </div>

    <div  v-else-if="props.placeRating > 4.5">
      <span class="details-row" >
        <span class="detail-label">Rating: </span>
        <UBadge v-if="props.placeRating > 4.5" size="md" color="green">{{
          props.placeRating
        }}</UBadge>
        
      </span>
    </div>
    
<!-- 
    <div class="details-row">
      <span class="detail-label">Rating: </span>
      <span class="detail-value space">{{ props.placeRating }}</span>
    </div> -->

    <div class="details-row d-block">
      <span class="detail-label">Comments: </span>
      <p class="d-block">
        {{ props.comments }}
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Dicta natus
        earum a quam quas fugit voluptatem laborum sit similique, totam
      </p>
    </div>

    <div class="modal-actions">
      <UButton @click="$emit('close')">Close</UButton>
      <UButton>Update</UButton>
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
  font-size: 1.4rem;
  margin-bottom: 10px;
}
.modal-details h3 {
  font-size: 1.6rem;
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
