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
  "totalCost",
  "from",
  "to",
  "isThisCityVisited",
  "cityRating",
  "cityDuration",
  "daysRemainingForCity",
  "expenseIncludedOnCity",
  "expenseIncludedOnCity",
  "cityComments",
  "date",
]);
const isOpen = ref(false);
</script>

<template>
  <div class="destination-item">
    <div class="item">
      <!-- <div class="status" :class="currStatus"></div> -->
      <div class="destination">
        <h1 class="title">{{ props.city }}</h1>
        <div class="destination-wrapper">
          <div class="section-one row">
            <div class="col section">
              <span class="pb-2 title-su">Accommodation </span>
              <h2>{{ props.accommodation }}</h2>
              <span class="pb-2 title-su">Accommodation Cost </span>
              <h2>$ {{ props.accommodationCost }}</h2>
            </div>
            <div class="col section">
              <span class="title-section pb-2"> Total Cost</span>
              <h2>${{ props.totalCost }}</h2>
              <span class="pb-2 title-section">Duration </span>
              <h2>{{ props.cityDuration }} days</h2>
              <span class="pb-2 title-section"> Days until visit </span>
              <h2>{{ props.daysRemainingForCity }} days</h2>
            </div>
            <div class="col section">
              <span class="pb-2 title-section">Date Planned</span>
              <h2>{{ props.date }}</h2>
              <span class="pb-2 title-section">Rating</span>
              <h2>{{ props.cityRating }}</h2>

              <UButton color="blue" label="Details" @click="isOpen = true" />
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
            <div></div>
            <UModal v-model="isOpen">
              <div class="p-4">
                <CitiesDetails
                  :cityID="props.cityID"
                  :city="props.city"
                  :accommodation="props.accommodation"
                  :accommodationCost="props.accommodationCost"
                  :totalCost="props.totalCost"
                  :from="props.from"
                  :to="props.to"
                  :isThisCityVisited="props.isThisCityVisited"
                  :cityDuration="props.cityDuration"
                  :date="props.date"
                  :daysRemainingForCity="props.daysRemainingForCity"
                  :expenseIncludedOnCity="props.expenseIncludedOncity"
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
.destination {
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
