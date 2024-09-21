<script setup>
import { ref, onMounted, onUnmounted } from "vue";
import { useExpenseStore } from "@/store/expenses"


const expenseStore = useExpenseStore();
const {expenses,expensesAmount } = storeToRefs(expenseStore);
const {fetchExpenses, getAvgRatingForCity } = expenseStore;
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
  "daysRemainingForCity", // Initial value from props
  "expenseIncludedOnCity",
  "cityComments",
  "date",
]);

const isOpen = ref(false);
const daysRemainingForCity = ref(props.daysRemainingForCity); // Create a local ref for daysRemainingForCity

// Function to calculate daysRemainingForCity
const calculateDaysRemainingForCity = () => {
  if (props.from) {
    const fromDate = new Date(props.from);
    const currentDate = new Date();
    const remainingDays = (fromDate - currentDate) / (1000 * 60 * 60 * 24); // Calculate difference in days
    daysRemainingForCity.value =
      remainingDays > 0 ? Math.ceil(remainingDays) : 0;
  } else {
    daysRemainingForCity.value = 0;
  }
};

const accommodationStatus = computed(() => {
  if (props.isAccommodationPaid === "Reserved") {
    return "Reserved";
  } else if (props.isAccommodationPaid === "Half reserved") {
    return "Half reserved";
  } else if (props.isAccommodationPaid === "Pending" || false) {
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
  if (props.cityRating >4.5) {
    return {rating: props.cityRating, color: "green"};
  } else if (props.cityRating >= 4 && props.cityRating <= 4.5) {
    return {rating: props.cityRating, color: "yellow"};
  } else if (props.cityRating < 4) {
    return {rating: props.cityRating, color: "red"};
  }
  
})
// Automatically calculate daysRemainingForCity on mount and update it daily
onMounted(async() => {
  await fetchExpenses()
  // await getAmount(props.cityID)
  calculateDaysRemainingForCity();

  // Update daysRemainingForCity every day at midnight
  const interval = setInterval(calculateDaysRemainingForCity, 86400000); // 86400000ms = 24 hours

  // Cleanup interval on unmount
  onUnmounted(() => {
    clearInterval(interval);
  });
});
</script>

<template>
  <div class="destination-item"  >
    <div class="item">
      <!-- <div class="status" :class="currStatus"></div> -->
      <div class="destination">
        {{getAvgRatingForCity(props.cityID) === 0 ? 0 : getAvgRatingForCity(props.cityID)}}

        <div class="d-flex align-items-center">
          <h1 class="title">{{ props.city }}</h1>
        <div class="status">
              <span class="mr-0">
                <UBadge
                  v-if="visitStatus === 'Visited'"
                  variant="outline"
                  size="md"
                  color="green"
                  >Completed</UBadge
                >
                <UBadge
                v-if="visitStatus === 'Not visited'"
                  variant="outline"
                  size="md"
                  color="red"
                  >Pending</UBadge
                >
                <UBadge
                v-if="visitStatus === 'In progress'"
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
              <!-- <span class="pb-2 title-section">Accommodation </span>
              <h2>{{ props.accommodation }}</h2> -->
              <span class="pb-2 title-section">Accommodation Cost </span>
              <h2>
                $ <span class="highlight">{{ props.accommodationCost }} </span>
              </h2>

              <span class="pb-2 title-section">Booking Status </span>
              <h2>
                <span class="highlight"
                  >{{ accommodationStatus}}
                </span>
              </h2>
            </div>
            <div class="col section">
              <!-- <span class="title-section pb-2"> Total Cost</span>
              <h2>
                $ <span class="highlight">{{ props.totalCost  }} </span>
              </h2> -->
              <span class="pb-2 title-section">Duration </span>
              <h2>
                <span class="highlight"
                  >{{ calculateDaysRangeDuration(props.from, props.to) }}
                  {{
                    calculateTotalDuration(props.from, props.to)>= 1 
                      ? "day"
                      : "days"
                  }}</span
                >
              </h2>
              <span class="pb-2 title-section"> Days until visit </span>
              <h2>
                <span class="highlight">{{ daysRemainingForCity }} </span>
                days
              </h2>
            </div>
            <div class="col section">
              <!-- <span class="pb-2 title-section">Date Planned</span>
              <h2>{{ formatDate(props.date) }}</h2> -->
              <span class="pb-2 title-section">Rating</span>
              <h2 >
                <span class="highlight">
                  <UBadge
                    v-if="ratingStatus.rating < 4"
                    variant="soft"
                    size="md"
                    color="red"
                    >{{ ratingStatus.rating }}</UBadge
                  >
                  <UBadge
                    v-if="ratingStatus.rating >= 4 && ratingStatus.rating <= 4.4"
                    variant="soft"
                    size="md"
                    color="yellow"
                    >{{ props.cityRating }}</UBadge
                  >
                  <UBadge
                    v-if="ratingStatus.rating >= 4.5"
                    variant="soft"
                    size="md"
                    color="green"
                    >{{ props.cityRating }}</UBadge
                  >

                </span>

              </h2>
<!--              <UButton class="my-2" color="blue" variant="solid" label="Details" @click="isOpen = true" />-->
            </div>
            <div class="col ">
              <button class="my-2 details-button"   @click="isOpen = true" >Details</button>
            </div>

          </div>
          <div>
            <UModal v-model="isOpen">
              <div class="p-4">
                <CitiesDetails
                  :cityID="props.cityID"
                  :city="props.city"
                  :accommodation="props.accommodation"
                  :accommodationCost="props.accommodationCost"
                  :isAccommodationPaid="props.isAccommodationPaid"
                  :totalCost="props.totalCost"
                  :from="props.from"
                  :to="props.to"
                  :isThisCityVisited="props.isThisCityVisited"
                  :cityDuration="props.cityDuration"
                  :date="props.date"
                  :daysRemainingForCity="daysRemainingForCity"
                  :expenseIncludedOnCity="props.expenseIncludedOnCity"
                  :cityRating="props.cityRating"
                  :cityComments="props.cityComments"
                />
              </div>
            </UModal>
          </div>
        </div>
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
.highlight {
  font-weight: 800;

  color: rgb(43, 41, 41) !important;
}

.destination {
  min-width: 100%;
}
.title {
  font-weight: bold;
  color: rgb(78, 77, 77);
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
