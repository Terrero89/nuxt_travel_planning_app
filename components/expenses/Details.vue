<script setup>
import { useExpenseStore } from "@/store/expenses";
const expenseStore = useExpenseStore();
import { storeToRefs } from "pinia";
const { expenses } = storeToRefs(expenseStore);
const route = useRoute(); //route object
const { expensesAsArray , fetchExpenses, deleteExpense} = expenseStore;
const cityParamID = route.params.cityID;
const expenseParamID = route.params.expenseID;
const props = defineProps([
  "expenseID",
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
  "priority",
  "comments",
]);
const removeItem = async (id) => {
  console.log(id);

  deleteExpense(id);
  navigateTo( `/destinations/${props.destinationID}/cities-${cityParamID}`);
};
const updateExpensesLink = computed(
  () =>
    `/destinations/${props.destinationID}/cities-${cityParamID}/expense-${props.expenseID}/updateExpense`
);

onMounted(async () => {
  await fetchExpenses();
  expenseStore.expensesAsArray.value;
});
</script>

<template>
  <div class="modal-details">
    <h3>Expense Details</h3>
    <hr />
    <h2>{{ props.expense }}</h2>

   ds {{ props.expenseID }}
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

    <div v-if="props.category === 'Attractions'">
      <span>
        <span v-if="props.isExpensePaid" class="detail-label"
          >Booking Status
        </span>
        <UBadge
          class="mx-3"
          v-if="props.isExpensePaid"
          size="md"
          color="green"
          variant="soft"
          >{{ props.isExpensePaid ? "Booked" : "" }}</UBadge
        >
      </span>
    </div>
    <div v-if="props.category === 'Attractions'">
      <span class="" v-if="!props.isExpensePaid">
        <span class="detail-label">Booking Status</span>
        <UBadge
          class="mx-3"
          v-if="!props.isExpensePaid"
          size="md"
          color="red"
          variant="soft"
          >{{ !props.isExpensePaid ? "Pending" : "" }}</UBadge
        >
      </span>
    </div>

    <div class="details-row" v-if="props.category === 'Attractions'">
      <span class="detail-label">Duration:</span>
      <span class="detail-value space">{{ props.duration }} Hours</span>
    </div>


    <div v-if="!props.isExpensePaid">
      <span class="">
        <span class="detail-label">Paid in advance</span>
        <UBadge
          class="mx-3"
          v-if="!props.isExpensePaid"
          size="md"
          color="red"
          variant="soft"
          >{{ !props.isExpensePaid ? "Pending" : "" }}</UBadge
        >
      </span>
    </div>

    <div>
      <div class="details-row">
        <span class="detail-label">Days Remaining: </span>
        <span class="detail-value space">
          {{ props.daysRemainingForExpense }} days
        </span>
      </div>
    </div>

    <div>
      <div class="details-row">
        <span class="detail-label">Location: </span>
        <span class="detail-value space">
          <UBadge color="gray" variant="soft">
            <a class="marked-link" :href="props.location" target="_blank">
              Google Location
            </a>
          </UBadge>
        </span>
      </div>
    </div>
    <!-- < 4 -->
    <div v-if="props.placeRating < 4">
      <span class="mx-2">
        <span class="detail-label">Rating: </span>
        <UBadge
          class="mx-3"
          v-if="props.placeRating < 4"
          size="md"
          color="red"
          >{{ props.placeRating }}</UBadge
        >
      </span>
    </div>

    <div v-else-if="props.placeRating >= 4 && props.placeRating <= 4.5">
      <span>
        <span class="detail-label">Rating: </span>
        <UBadge
          class="mx-3"
          v-if="props.placeRating >= 4 && props.placeRating <= 4.5"
          size="md"
          color="yellow"
          >{{ props.placeRating }}</UBadge
        >
      </span>
    </div>

    <div v-else-if="props.placeRating > 4.5">
      <span>
        <span class="detail-label">Rating: </span>
        <UBadge
          class="mx-3"
          v-if="props.placeRating > 4.5"
          size="md"
          color="green"
          >{{ props.placeRating }}</UBadge
        >
      </span>
    </div>
 
    <div v-if="props.priority === 'Must visit'">
      <span class="" v-if="(props.priority = 'Must visit')">
        <span class="detail-label">Priority</span>
        <UBadge
          class="mx-3"
          v-if="props.priority === 'Must visit'"
          size="md"
          color="green"
          variant="soft"
          >{{ "Must visit" }}</UBadge
        >
      </span>
    </div>

    <div v-else-if="props.priority === 'Nice to visit'">
      <span class="" v-if="(props.priority = 'Nice to visit')">
        <span class="detail-label">Priority</span>
        <UBadge
          class="mx-3"
          v-if="props.priority === 'Nice to visit'"
          size="md"
          color="indigo"
          variant="soft"
          >{{ "Nice to visit" }}</UBadge
        >
      </span>
    </div>
    <div v-else-if="props.priority === 'Backup option'">
      <span class="" v-if="(props.priority = 'Backup option')">
        <span class="detail-label">Priority</span>
        <UBadge
          class="mx-3"
          v-if="props.priority === 'Backup option'"
          size="md"
          color="yellow"
          variant="soft"
          >{{ "Backup option" }}</UBadge
        >
      </span>
    </div>

    <div v-else-if="props.priority === 'Optional'">
      <span class="" v-if="(props.priority = 'Optional')">
        <span class="detail-label">Priority</span>
        <UBadge
          class="mx-3"
          v-if="props.priority === 'Optional'"
          size="md"
          color="gray"
          variant="soft"
          >{{ "Optional" }}</UBadge
        >
      </span>
    </div>

    <div class="details-row d-block">
      <span class="detail-label">Comments: </span>
      <p class="d-block">
        {{ props.comments }}
      </p>
    </div>

    <div class="modal-actions">
    
      <UButton color="red" variant="solid" @click="removeItem(props.expenseID)">Delete</UButton>
      <UButton :to="updateExpensesLink">Update</UButton>
    </div>
  </div>
</template>

<style scoped>
.marked-link {
  text-decoration: none;
  color: gray;
}
.highlight {
  font-weight: 800;

  color: rgb(4, 54, 112) !important;
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
Comments:
