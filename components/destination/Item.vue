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
              <span class="pb-2 title-section ">Transportation </span>
              <h2>{{ props.transportType }}</h2>
              <span class="pb-2 title-section ">Duration </span>
              <h2>{{ props.tripDuration }} days</h2>
            </div>
            <div class="col section">
              <span class="title-section pb-2"> Budget </span>
              <h2>${{ props.destinationBudget }}</h2>
              <span class="pb-2 title-section"> Days until trip </span>
              <h2>{{ props.daysRemainingForTrip }} days</h2>
            </div>
            <div class="col section">
              <span class="pb-2 title-section ">Date Planned</span>
              <h2>{{ props.date }}</h2>
              <span class="pb-2 title-section ">Rating</span>
              <h2>{{ props.tripRating }}</h2>

              <UButton color="blue" label="Show Details" @click="isOpen = true" />
            </div>
            <div>
              <span class="mr-auto">
                <UBadge v-if="!props.isTripCompleted" size="md" color="red"
                  >In progress</UBadge
                >
                <UBadge v-if="props.isTripCompleted" color="primary"
                  >Complete</UBadge
                >
              </span>
            </div>
          </div>
          <div>
            <UModal v-model="isOpen" prevent-close>
              <UCard
                :ui="{
                  ring: '',
                  divide: 'divide-y divide-gray-100 dark:divide-gray-800',
                }"
              >
                <template #header>
                  HEADEr
                  <div class="flex items-center justify-between">
                    <h3
                      class="text-base font-semibold leading-6 text-gray-900 dark:text-white"
                    >
                      Modal
                    </h3>
                    <UButton
                      color="indigo"
                      variant="ghost"
                      icon="i-heroicons-x-mark-20-solid"
                      class="-my-1"
                      @click="isOpen = false"
                    />
                  </div>
                </template>

                <div class="pp">contentt here</div>
              </UCard>
            </UModal>
          </div>
          <!-- <div class="section-two">
       
        <p>Number of cities:{{ props.citiesIncludedOnTrip }}</p>
        <p>Destination Budget{{ props.destinationBudget }}</p>
        <p>{{ props.isTripCompleted }}</p>
        <p>Rating: {{ props.tripRating }}</p>
        </div> -->
          <!-- <div class="section-three">
        <p>From: {{ props.from }}</p>
        <p>To: {{ props.to }}</p>
       </div> -->
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.pp {
  min-height: 35rem;
  min-width: 90%;
  margin: auto 0;
}
.destination {
  /* border: solid red 1px; */

  min-width: 100%;
}
.title {
  font-weight: bold;
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
  color: rgb(88, 87, 87);
  font-size: 1rem;
}
.destination-item .section h2 {
  color: gray;
  font-weight: 500;
  font-size: 0.9rem;
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
