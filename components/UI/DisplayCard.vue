  
  <script setup>
  const props = defineProps({
    highestCategory: {
      type: String,
      required: true,
    },
    priorityCount: {
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
          <label>No. of items:</label>
          <span>{{ highestCategory }}</span>
        </div>
  
        <div class="card-item">
          <label>Priority Count:</label>
          <span>{{ priorityCount }}</span>
        </div>
  
        <div class="card-item">
          <label>Total Cost:</label>
          <span>{{ totalCost }} USD</span>
        </div>
  
        <div class="card-item">
          <label>Booked Items:</label>
          <span>{{ bookedItems }}</span>
        </div>
  
        <div class="card-item">
          <label>Average Rating:</label>
          <span>{{ averageRating }} / 5</span>
        </div>
  
        <div class="card-item">
          <label>Total Duration:</label>
          <span>{{ totalDuration }} hours</span>
        </div>
      </div>
    </UICard>
  </template>

  
  <style scoped>

   
  
  .card-body {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    flex-wrap:wrap;
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
  