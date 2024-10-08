<script setup>
const props = defineProps({
  numOfExpenses: {
    type: Number,
    required: true,
  },

  totalCost: {
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
        <label>Total Cost:</label>
        <span>$ {{ totalCost }} </span>
      </div>

      <div class="card-item">
        <label>Total Duration:</label>
        <span>{{ totalDuration }} </span>
      </div>
      <div class="card-item">
        <label>Avg Rating:</label>
        <span>{{ averageRating }} / 5</span>
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
