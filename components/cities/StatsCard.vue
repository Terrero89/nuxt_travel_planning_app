<script setup>
const props = defineProps({
  numOfExpenses: {
    type: Number,
    required: true,
  },
  accommodationCost: {
    type: Number,
    required: true,
  },

  totalCost: {
    type: Number,
    required: true,
  },
  bookedItems: {
    type: Number,
    required: true,
  },
  averageRating: {
    type: Number,
    required: true,
  },
  totalDuration: {
    type: Number,
    required: true,
  },
});
</script>

<template>
  <UICard>
    <div class="card-body">
      <div class="card-item">
        <label>No. of expenses:</label>
        <span>{{ numOfExpenses }}</span>
      </div>
      <div class="card-item">
        <label>No. of Cities:</label>
        <span>{{ bookedItems }}</span>
      </div>
      <div class="card-item">
        <label>Accomomodation totals:</label>
        <span>$ {{ accommodationCost }} </span>
      </div>
      <div class="card-item">
        <label>Overall Cost:</label>
        <span>$ {{ totalCost }} </span>
      </div>
      <div class="card-item">
        <label>Average Rating:</label>
        <span>{{ averageRating.toFixed(2) }} / 5</span>
      </div>

   
    </div>
  </UICard>
</template>

<style scoped>
.card-body {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  flex-wrap: wrap;
  width: 100%;
  background:  rgb(248, 248, 248);

}

.card-item {
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 10px;

  border-radius: 5px;
  margin: 0 10px;
}

label {
  font-weight: bold;
  margin-bottom: 5px;
}

span {
  color: #555;
}
</style>
