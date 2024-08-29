<script setup>
import { useDestinationStore } from "@/store/destination";
const store = useDestinationStore();
import { storeToRefs } from "pinia";

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
const isOpen = ref(false);
</script>

<template>
  <div class="destination-item">
    <div class="item">
      <!-- <div class="status" :class="currStatus"></div> -->
      <div class="destination">
        <h1 class="title">{{ props.destination }}</h1>
        <div class="destination-wrapper">
          <div class="section-one row">
            <div class="col section">
              <span class="pb-2 title-su">Transportation </span>
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
                $ <span class="highlight">{{ props.destinationBudget }} </span>
              </h2>

              <span class="pb-2 title-section"> Days until trip </span>
              <h2>
                $
                <span class="highlight">{{ props.daysRemainingForTrip }} </span>
                days
              </h2>
            </div>
            <div class="col section">
              <span class="pb-2 title-section">Date Planned</span>
              <h2>{{ props.date }}</h2>
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
                    >{{ props.tripRating }}</UBadge
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
                    :daysRemainingForTrip="props.daysRemainingForTrip"
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
