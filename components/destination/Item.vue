<script setup>
import { ref, onMounted, onUnmounted } from "vue";
import { useDestinationStore } from "@/store/destination";
import { storeToRefs } from "pinia";
import { formatDate } from "../../utils/date-conversion";

const store = useDestinationStore();
const { destination, fetchDestinations } = storeToRefs(store);

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

const destinationParam = ref(props.destinationID);
const isOpen = ref(false);
const daysRemainingForTrip = ref(props.daysRemainingForTrip); // Create a local ref for daysRemainingForTrip

// Function to calculate daysRemainingForTrip
const calculateDaysRemaining = () => {
  if (props.from) {
    const fromDate = new Date(props.from);
    const currentDate = new Date();
    const remainingDays = (fromDate - currentDate) / (1000 * 60 * 60 * 24); // Calculate difference in days
    daysRemainingForTrip.value =
      remainingDays > 0 ? Math.ceil(remainingDays) : 0;
  } else {
    daysRemainingForTrip.value = 0;
  }
};

// Automatically calculate daysRemainingForTrip on mount and update it daily
onMounted(() => {
  calculateDaysRemaining();

  // Update daysRemainingForTrip every day at midnight
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
        <!-- {{ props.destinationID }} -->

        <h1 class="title">{{ props.destination }}</h1>
        <div class="destination-wrapper">
          <div class="section-one row">
            <div class="col section">
              <span class="pb-2 title-section">Transportation </span>
              <h2>{{ props.transportType }}</h2>
              <span class="pb-2 title-section">Duration </span>
              <h2>
                <span class="highlight">{{ props.tripDuration }}</span>
                Days
              </h2>
            </div>
            <div class="col section">
              <span class="title-section pb-2"> Budget </span>
              <h2>
                $
                <span class="highlight"
                  >{{ formatNumber(props.destinationBudget) }}
                </span>
              </h2>

              <span class="pb-2 title-section"> Days until trip </span>
              <h2>
                <span class="highlight">{{ daysRemainingForTrip }} </span>
                {{ pdaysRemainingForTrip <= 1 ? "Day" : "Days" }}
              </h2>
              <!-- if dates is equal to 0  or is passed then we are going torender the date "ago" instead -->
            </div>
            <div class="col section">
              <span class="pb-2 title-section">Date Planned</span>
              <h2>{{ formatDate(props.date) }}</h2>
              <span class="pb-2 title-section">Rating</span>
              <h2 v-if="props.tripRating < 4">
                <span class="highlight">
                  <UBadge
                    v-if="props.tripRating < 4"
                    variant="soft"
                    size="md"
                    color="red"
                    >{{ props.tripRating }}</UBadge
                  >
                </span>
              </h2>

              <h2 v-else-if="props.tripRating >= 4 && props.tripRating <= 4.5">
                <span class="highlight">
                  <UBadge
                    v-if="props.tripRating >= 4 && props.tripRating <= 4.5"
                    variant="soft"
                    size="md"
                    color="yellow"
                    >{{ props.tripRating }}</UBadge
                  >
                </span>
              </h2>
              <h2 v-else-if="props.tripRating > 4.5">
                <span class="highlight">
                  <UBadge
                    v-if="props.tripRating > 4.5"
                    variant="soft"
                    size="md"
                    color="green"
                    >{{ props.tripRating.toFixed(1) }}</UBadge
                  >
                </span>
              </h2>

              <UButton color="blue" label="Details" @click="isOpen = true" />
            </div>
            <div>
              <span class="mr-auto">
                <UBadge
                  v-if="!props.isTripCompleted"
                  variant="outline"
                  size="md"
                  color="red"
                  >In progress</UBadge
                >
                <UBadge
                  v-if="props.isTripCompleted"
                  variant="outline"
                  size="md"
                  color="primary"
                  >Complete</UBadge
                >
              </span>
            </div>
          </div>
          <div>
            <div>
              <UModal v-model="isOpen">
                <div class="p-4">
                  <DestinationDetails
                    :destinationID="props.destinationID"
                    :destination="props.destination"
                    :transportType="props.transportType"
                    :destinationBudget="props.destinationBudget"
                    :from="props.from"
                    :to="props.to"
                    :tripDuration="props.tripDuration"
                    :date="props.date"
                    :isTripCompleted="props.isTripCompleted"
                    :daysRemainingForTrip="daysRemainingForTrip"
                    :citiesIncludedOnTrip="props.citiesIncludedOnTrip"
                    :tripRating="props.tripRating"
                    :tripComments="props.tripComments"
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
}
.section span {
  font-weight: bold;
  color: gray;
}

.item {
  border-bottom: solid rgb(218, 214, 214) 1px;
  background-color: rgb(248, 248, 248);
  padding: 1rem;
  margin: 0.5rem 0;
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
