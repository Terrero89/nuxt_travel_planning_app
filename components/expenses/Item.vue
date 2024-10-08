<script setup>
import { onMounted, onUnmounted, ref } from "vue";

const props = defineProps([
  "expenseID",
  "destinationParentID",
  "cityParentID",
  "expense",
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
  "expectedExpenseDate",
]);

const isOpen = ref(false);
const daysRemainingForExpense = ref(props.daysRemainingForExpense); // Create a local ref for daysRemainingForExpense

// Function to calculate daysRemainingForExpense
const calculateDaysRemaining = () => {
  if (props.from) {
    const fromDate = new Date(props.from);
    const currentDate = new Date();
    const remainingDays = (fromDate - currentDate) / (1000 * 60 * 60 * 24); // Calculate difference in days
    daysRemainingForExpense.value =
      remainingDays > 0 ? Math.ceil(remainingDays) : 0;
  } else {
    daysRemainingForExpense.value = 0;
  }
};
const expenseStatus = computed(() => {
  if (props.isCompleted === "Completed") {
    return "Completed";
  } else if (props.isCompleted === "Pending") {
    return "Pending";
  } else if (props.isCompleted === "In Progress") {
    return "In Progress";
  }
});

// Automatically calculate daysRemainingForExpense on mount and update it daily
onMounted(() => {
  calculateDaysRemaining();

  // Update daysRemainingForExpense every day at midnight
  const interval = setInterval(calculateDaysRemaining, 86400000); // 86400000ms = 24 hours


  // Cleanup interval on unmount
  onUnmounted(() => {
    clearInterval(interval);
  });
});
</script>

<template>
  <div class="destination-item">
    <div class="item">
      <div class="destination">
        <div class="d-flex align-items-center">
          <h1 class="title">{{ props.expense }}</h1>
          <div class="status">
            <span class="mr-0">
              <UBadge
                v-if="expenseStatus === 'Completed'"
                variant="outline"
                size="md"
                color="green"
                >Completed</UBadge
              >
              <UBadge
                v-if="expenseStatus === 'Pending'"
                variant="outline"
                size="md"
                color="red"
                >Pending</UBadge
              >
              <UBadge
                v-if="expenseStatus === 'In Progress'"
                variant="outline"
                size="md"
                color="yellow"
                >In progress</UBadge
              >
            </span>
          </div>
        </div>
        <div class="destination-wrapper">
          <div class="section-one row">
            <div class="col section">
              <span class="pb-2 title-section">Category </span>
              <h2>{{ props.category }}</h2>

              <span > Price </span>
              <h2>
                $ <span class="highlight">{{ props.cost }} </span>
              </h2>
<!--              <div>-->
<!--                <span class="pb-2 title-section">Duration </span>-->
<!--                <h2>-->
<!--                  <span class="highlight">{{ props.duration }} </span>-->
<!--                </h2>-->
<!--              </div>-->
            </div>
            <div class="col section">
<!--              <span class="title-section pb-2"> Price </span>-->
<!--              <h2>-->
<!--                $ <span class="highlight">{{ props.cost }} </span>-->
<!--              </h2>-->
              <span class="pb-2 title-section"> Reservation Date</span>
              <h2>
                <span class="highlight"
                  >{{ formatDate(props.expectedExpenseDate) }}
                </span>
              </h2>
            </div>
            <div class="col section">
              <!-- <span class="pb-2 title-section">Date Planned</span>
              <h2>{{ formatDate(props.date) }}</h2> -->
          
              <!-- <span class="pb-2 title-section">Date Planned</span>
              <h2>{{ formatDate(props.date) }}</h2> -->

              <span class="pb-2 title-section">Rating</span>
              <h2>
                <span class="highlight">
                  <UBadge
                    v-if="props.placeRating < 4"
                    variant="solid"
                    size="md"
                    color="red"
                    >{{ props.placeRating }}</UBadge
                  >
                  <UBadge
                    v-if="props.placeRating >= 4 && props.placeRating <= 4.5"
                    variant="solid"
                    size="md"
                    color="yellow"
                    >{{ props.placeRating }}</UBadge
                  >
                  <UBadge
                    v-if="props.placeRating > 4.5"
                    variant="solid"
                    size="md"
                    color="green"
                    >{{ props.placeRating }}</UBadge
                  >

                </span>

              </h2>

           
            </div>
            <div class="col mx-auto">
              <button
                  class="my-2 details-button"
                  @click="isOpen = true"
              >Details</button> </div>
            
          </div>
          <div>
            <div>
              <UModal v-model="isOpen">
                <div class="p-4">
                  <ExpensesDetails
                    :destinationParentID="props.destinationParentID"
                    :cityParentID="props.cityParentID"
                    :expenseID="props.expenseID"
                    :expense="props.expense"
                    :category="props.category"
                    :startTime="props.startTime"
                    :endTime="props.endTime"
                    :from="props.from"
                    :to="props.to"
                    :cost="props.cost"
                    :isExpensePaid="props.isExpensePaid"
                    :location="props.location"
                    :duration="props.duration"
                    :date="props.date"
                    :isCompleted="props.isCompleted"
                    :daysRemainingForExpense="props.daysRemainingForExpense"
                    :placeRating="props.placeRating"
                    :comments="props.comments"
                    :priority="props.priority"
                    :expectedExpenseDate="props.expectedExpenseDate"
                  />
                </div>
              </UModal>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>

.details-button{
  color: black;
  border: #e1e1e1 solid 1px;
  padding: 5px 10px;
  border-radius: 8px;
}

.details-button:hover{
  background-color: #dadada;
  transition: 0.3s ease-in-out;


}
.highlight {
  font-weight: 800;

  color: rgb(43, 41, 41) !important;
}

.destination {
  min-width: 100%;
}
.title {
  color: rgb(78, 77, 77);
  font-weight: bold;
  margin-right: auto;
}
.section span {
  font-weight: bold;
  color: gray;
}
.mr {
  margin-left: auto;
}
.item {
  border-bottom: solid rgb(218, 214, 214) 1px;
  background-color: rgb(248, 248, 248);
  padding: 1rem;
  margin: 0.5rem 0rem;
  display: flex;
}

.destination-item h1 {
  font-size: 1rem;
}
.destination-item .title-section {
  color: gray;
  font-size: 0.9rem;
}
.destination-item .section h2 {
  color: rgb(43, 41, 41);
  font-weight: 500;
  font-size: 1.01rem;
  margin: 0.2rem 0;
}
.destination-item h5 {
  margin-right: auto;
}

.button-status .button {
  margin-top: 5rem;
  /* display:flex;
  flex-direction: column;
  justify-content: center; */
}
</style>
