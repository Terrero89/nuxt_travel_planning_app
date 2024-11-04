<script setup>
import { onMounted } from "vue";
import { useCityStore } from "@/store/cities";
import { useExpenseStore } from "@/store/expenses";
const expenseStore = useExpenseStore();
const cityStore = useCityStore();
import { storeToRefs } from "pinia";
const { fetchCities } = cityStore;
const { fetchExpenses } = expenseStore;
const { expenses } = storeToRefs(expenseStore);
const { cities, filteredCitiesStats } = storeToRefs(cityStore);
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
  "date",
  "cityComments",
]);

onMounted(async () => {
  await fetchCities();
  await fetchExpenses();
});

const nextCities = computed(() => {
  return cities.value.filter((city) => {
    return (
      calculateDaysRemaining(city.from) > 0 &&
      calculateDaysRemaining(city.from) <= 5
    );
  });
});

const nextExpenses = computed(() => {
  let convert = expenses.value
    .filter((item) => item.category === "Attractions")
    .sort(
      (a, b) =>
        new Date(b.expectedExpenseDate) - new Date(a.expectedExpenseDate)
    );

  return convert.filter((city) => {
    return (
      calculateDaysRemaining(city.expectedExpenseDate) > 0 &&
      calculateDaysRemaining(city.expectedExpenseDate) <= 4
    );
  });
});
</script>

<template>
  <div>
    
    <h5>Up coming events</h5>
    <div>
      <div class="cities-box">
        <h5 class="ml-2">Next Cities</h5>
        <div class="card" v-for="city in nextCities" :key="city.cityID">
          <div class="next-box">
            <h5 class="city-title">{{ city.city }}</h5>

            <div class="info-box">
              <span class="info-items"> {{ formatDate(city.from) }}</span>
              <span
                >Days Remaining
                <span class="info-items time">{{
                  calculateDaysRemaining(city.from)
                }}</span></span
              >
              <span> {{ city.isAccommodationPaid }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div>
      <div class="cities-box">
        <h5 class="ml-2">Next Attractions</h5>
        <div class="card" v-for="city in nextExpenses" :key="city.cityID">
          <div class="next-box">
            <h5 class="city-title">{{ city.expense.slice(0,20) }}</h5>

            <div class="info-box">
              <span class="info-items">
                {{ formatDate(city.expectedExpenseDate) }}</span
              >
              <span
                >Days Remaining
                <span class="info-items time">{{
                  calculateDaysRemaining(city.expectedExpenseDate) === 0
                    ? "TODAY"
                    : calculateDaysRemaining(city.expectedExpenseDate)
                }}</span></span
              >
              <span> {{ city.isAccommodationPaid }}</span>
              <span v-if="city.priority === 'Must visit'">
                <span class="" v-if="city.priority === 'Must visit'">
               
                  <UBadge
                    class="mx-3"
                    v-if="city.priority === 'Must visit'"
                    size="md"
                    color="green"
                    variant="soft"
                    >{{ "Must visit" }}</UBadge
                  >
                </span>
              </span>

              <div v-else-if="city.priority === 'Nice to visit'">
                <span class="" v-if="city.priority === 'Nice to visit'">
                 
                  <UBadge
                    class="mx-3"
                    v-if="city.priority === 'Nice to visit'"
                    size="md"
                    color="indigo"
                    variant="soft"
                    >{{ "Nice to visit" }}</UBadge
                  >
                </span>
              </div>
              <span v-else-if="city.priority === 'Backup options'">
                <span class="" v-if="city.priority === 'Backup options'">
                  
                  <UBadge
                    class="mx-3"
                    v-if="city.priority === 'Backup options'"
                    size="md"
                    color="yellow"
                    variant="soft"
                    >{{ "Backup option" }}</UBadge
                  >
                </span>
              </span>

              <span v-else-if="city.priority === 'Optional'">
                <span class="" v-if="(city.priority = 'Optional')">
                 
                  <UBadge
                    class="mx-3"
                    v-if="city.priority === 'Optional'"
                    size="md"
                    color="gray"
                    variant="soft"
                    >{{ "Optional" }}</UBadge
                  >
                </span>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.time {
  color: black;
  font-weight: 600;
}
.card {
  border-radius: 0.5rem;
  margin: 0.5rem 0.2rem;
}
.next-box {
  display: flex;
  padding: 1rem 0.5rem;
}
.info-box {
  margin: auto 1rem;
  margin-right:auto;
}

.info-items {
  margin: auto 1rem;
}
</style>
