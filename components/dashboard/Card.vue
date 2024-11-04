<script setup>
const props = defineProps([
  "title", // expenses
  "category", // expenses
  "completed", // how many completed
  "progress",
  "totals", // total numbers
  "percentage", // percentile of completed vs not completed
  "pending",
]);
</script>
<template>
  <div class="main-container wrapper">
    <h4>{{ props.title }}</h4>
    <div class="numbers-list">
       
        <div class="numbers">
          <span> {{ props.percentage }}%</span>
          <h5>% Completed</h5>
        </div>
      </div>
    <div>
     
      <div class="numbers-list">
        <div class="numbers">
          <span> {{ props.totals }}</span>
          <h5>Totals</h5>
        </div>
       
        <div class="numbers">
       
      </div>
        <div class="numbers">
          <span> {{ props.progress }}</span>
          <h5>Progress</h5>
        </div>
        <div class="numbers">
          <span> {{ props.pending}}</span>
          <h5>Pending</h5>
        </div>
      </div>
   
    </div>
  </div>
</template>

<style scoped>
.main-container {
  margin: 0.5rem auto;
  min-width: 20rem;
  border: solid rgb(179, 179, 179) 1px;
  box-shadow: 0px 6px 40px 15px rgba(0, 0, 0, 0.05);
  border-radius: 0.5rem;
  padding: 1rem;
}

.numbers-list {
  display: flex;
  justify-content: center;

  margin-bottom: 0.3rem;
}
.numbers-list .numbers {
  margin: 0 0.5rem;
  color: rgb(27, 27, 27);
}
h5 {
  font-size: 0.85rem;
  color: rgb(53, 53, 53);
}

.numbers span {
  font-size: 1.4rem;
  font-weight: 600;
  color: rgb(27, 27, 27);
}
</style>
