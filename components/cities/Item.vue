<script setup>
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
]);
</script>

<template>
    <div class="project-item">
      <div class="item">
        <!-- <div class="status" :class="currStatus"></div> -->
        <div class="project">
          <h1>{{ props.city }}</h1>
          <h2 class="pb-2">{{ props.accommodation }}</h2>
         
        <NuxtLink class="my-auto mr" :to="destinations"
          ><button type="button" class="btn-md px-3 btn btn-outline-primary mr">
            Details
          </button>
        </NuxtLink>
      </div>
    </div>
  </div>
</template>



<style scoped>
.complete {
  color: rgb(7, 56, 7);
}

.project {
  /* border: solid red 1px; */
  margin: 0 0.5rem;
}
.mr {
  margin-left: auto;
}
.item {
  border-bottom: solid rgb(218, 214, 214) 1px;
  background-color: rgb(255, 255, 255);
  padding: 1rem;
  margin: 0.5rem 0rem;
  display: flex;
}

.project-item h1 {
  margin: 0 2%;
  font-size: 1rem;
}
.project-item h2 {
  color: gray;
  font-size: 1rem;
  margin: 0.2rem 0;

  /* border:solid blue */
}

.project-item h5 {
  margin-right: auto;
}

.button-status .button {
  margin-top: 5rem;
  /* display:flex;
  flex-direction: column;
  justify-content: center; */
}

.wrapper {
  border: solid rgb(0, 81, 255) 1px;
  padding: 2rem;
  margin: 0 auto;
}
</style>