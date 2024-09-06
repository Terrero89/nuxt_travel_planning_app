<script setup>
import { ref, onMounted, computed, watch } from "vue";
import { useExpenseStore } from "@/store/expenses";
import { storeToRefs } from "pinia";

const expenseStore = useExpenseStore();
const { fetchExpenses, updateExpense } = expenseStore;

const { expenses } = storeToRefs(expenseStore);

const route = useRoute(); // route object

const destId = route.params.destinationID;
const cityId = route.params.cityID;
const expenseID = route.params.expenseID;

const expenseItem = computed(() => {
  return (
    expenseStore.expensesAsArray.find((item) => item.expenseID === expenseID) ||
    {}
  );
});

// Function to calculate duration
const calculateDuration = (startTime, endTime) => {
  const [startHours, startMinutes] = startTime.split(':').map(Number);
  const [endHours, endMinutes] = endTime.split(':').map(Number);

  const startDate = new Date();
  const endDate = new Date();

  startDate.setHours(startHours, startMinutes);
  endDate.setHours(endHours, endMinutes);

  // Calculate duration in minutes
  const durationMinutes = (endDate - startDate) / (1000 * 60);
  const isNegative = durationMinutes < 0;
  const absoluteMinutes = Math.abs(durationMinutes);

  // Convert minutes to hours and minutes
  const durationHours = Math.floor(absoluteMinutes / 60);
  const remainingMinutes = Math.round(absoluteMinutes % 60);

  // Return in appropriate format
  if (isNegative) {
    return `-${durationHours} hour${durationHours !== 1 ? 's' : ''} ${remainingMinutes} minute${remainingMinutes !== 1 ? 's' : ''}`;
  } else {
    return `${durationHours} hour${durationHours !== 1 ? 's' : ''} ${remainingMinutes} minute${remainingMinutes !== 1 ? 's' : ''}`;
  }
};

// Computed property for duration
const duration = computed(() => {
  if (expenseItem.value.startTime && expenseItem.value.endTime) {
    return calculateDuration(expenseItem.value.startTime, expenseItem.value.endTime);
  }
  return '';
});

// Watch for changes in startTime or endTime and update duration accordingly
watch([() => expenseItem.value.startTime, () => expenseItem.value.endTime], () => {
  expenseItem.value.duration = duration.value;
});

const updateExpenseHandler = async () => {
  try {
    await updateExpense(expenseID, expenseItem.value);
    navigateTo("/destinations");
  } catch (error) {
    console.error("Error updating expense:", error);
    alert("An error occurred while updating the expense. Please try again later.");
  }
};

onMounted(async () => {
  await fetchExpenses();
});
</script>

<template>
  <div class="form-wrapper">
    <form class="row g-3" @submit.prevent="updateExpenseHandler">
      <h3 class="mb-4">Update Expense</h3>
      <!-- {{ expenseItem }}
      {{ expenseItem.expense }} -->

      <div>
        <label for="inputPassword4" class="form-label">Expense</label>
        <input
          type="input"
          v-model.trim="expenseItem.expense"
          class="form-control"
          id="name-input"
        />
      </div>

      <div class="col-6">
        <label for="transportType" class="form-label">Expense Type</label>
        <select
          class="form-select"
          v-model="expenseItem.category"
          aria-label="Default select example"
        >
          <option></option>
          <option>Food/Drinks</option>
          <option>Attractions</option>
          <option>Souvenirs</option>
          <option>Store Purchase</option>
          <option>Landmarks</option>
          <option>Transportation</option>
          <option>Rentals</option>
          <option>Other</option>
          <option>N/A</option>
        </select>
      </div>

      <div class="col-6">
        <label for="inputPassword4" class="form-label">Price</label>
        <input
          type="number"
          v-model.trim="expenseItem.cost"
          class="form-control"
          id="name-input"
        />
      </div>

      <div class="col-6">
        <label for="inputPassword4" class="form-label">Start Time: </label>
        <input
          type="time"
          v-model.trim="expenseItem.startTime"
          class="form-control"
          id="time-input"
        />
      </div>
      <div class="col-6">
        <label for="inputPassword4" class="form-label">End Time: </label>
        <input
          type="time"
          v-model.trim="expenseItem.endTime"
          class="form-control"
          id="time-input"
        />
      </div>

      <div class="col-6">
        <label for="inputPassword4" class="form-label">Duration</label>
        <input
          type="text"
          v-model.trim="expenseItem.duration"
          class="form-control"
          id="duration-input"
          readonly
        />
      </div>

      <div class="col-6">
        <label for="inputPassword4" class="form-label">Rating</label>
        <input
          type="number"
          v-model.trim="expenseItem.placeRating"
          class="form-control"
          id="placeRating-input"
          min="0"
          max="5"
          step="0.1"
        />
      </div>
      <div class="">
        <label for="transportType" class="form-label">Visit Priority</label>
        <select
          class="form-select"
          v-model="expenseItem.priority"
          aria-label="Default select example"
          placeholder="Priority"
        >
          <option></option>
          <option>Must visit</option>
          <option>Nice to visit</option>
          <option>Backup options</option>
          <option>Optional</option>
        </select>
      </div>
      <div>
        <label for="inputPassword4" class="form-label">Location</label>
        <input
          type="input"
          v-model.trim="expenseItem.location"
          class="form-control"
          id="name-input"
        />
      </div>
      <div class="">
        <label for="transportType" class="form-label">Status</label>
        <select
          class="form-select"
          v-model="expenseItem.isCompleted"
          aria-label="Default select example"
          placeholder="status"
        >
          <option></option>
          <option>Completed</option>
          <option>In Progress</option>
          <option>Pending</option>
        </select>
      </div>
      <div>
        <textarea
          class="form-control"
          v-model.trim="expenseItem.comments"
          aria-label="With textarea"
          placeholder="Comments"
        />
      </div>

      <div>
        <button type="submit" class="btn btn-primary py-2 px-4">Submit</button>
      </div>
    </form>
  </div>
</template>

<style scoped>
.form-wrapper {
  background-color: white;
  max-width: 32rem;
  border-radius: 7px;
  border: solid rgb(143, 143, 143, 0.2) 1px;
  margin: 1rem auto;
  padding: 2.7rem 1.5rem;
}

label {
  color: rgb(77, 73, 73);
  font-weight: 400;
  font-size: 1rem;
  margin: 0.5rem 0;
}

/* 
 */
.input-container {
  max-width: 500px;
  margin: 0 auto;
  padding: 1rem;
  border: 1px solid #ccc;
  border-radius: 8px;
  border-radius: 8px;
  background-color: #f9f9f9;
}

.form-label {
  font-weight: bold;
  margin-bottom: 0.5rem;
}

.form-control {
  width: 100%;
  padding: 0.5rem;
  margin-bottom: 1rem;
}

a {
  color: #0066cc;
  text-decoration: none;
}

a:hover {
  text-decoration: underline;
}
</style>
