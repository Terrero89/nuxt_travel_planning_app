<script setup>
import { ref, watch, computed } from "vue";
import { useExpenseStore } from "@/store/expenses";
import { storeToRefs } from "pinia";
import { calculateDaysRemaining } from "../../utils/date-conversion";

const expenseStore = useExpenseStore();
const { addExpense } = storeToRefs(expenseStore);

const route = useRoute(); // route object
const destId = route.params.destinationID;
const cityId = route.params.cityID;

// Initiate form fields
const expense = ref("");
const category = ref("");
const cost = ref(null);
const location = ref("");
const priority = ref("");
const date = ref(null);
const isCompleted = ref("");
const placeRating = ref(null);
const comments = ref("");
const duration = ref(0);
const daysRemainingForExpense = ref(0);
const expectedExpenseDate = ref(null);

// Validation errors
const validationErrors = ref({});

// Validate form before submission
const validateForm = () => {
  validationErrors.value = {};

  if (!expense.value) {
    validationErrors.value.expense = "Expense name is required.";
  }
  if (!cost.value) {
    validationErrors.value.cost = "Please select a price.";
  }

  if (!location.value) {
    validationErrors.value.location = "Please add a location.";
  }
  if (!category.value) {
    validationErrors.value.category = "Please select a category.";
  }

  if (category.value && showPrice.value && !cost.value) {
    validationErrors.value.cost = "Cost is required for this category.";
  } else if (cost.value && cost.value < 0) {
    validationErrors.value.cost = "Cost must be a positive number.";
  }

  if (placeRating.value !== null && (placeRating.value < 0 || placeRating.value > 5)) {
    validationErrors.value.placeRating = "Rating must be between 0 and 5.";
  }

  if (!priority.value) {
    validationErrors.value.priority = "Please select a priority.";
  }

  if (!expectedExpenseDate.value) {
    validationErrors.value.expectedExpenseDate = "Please select a booking date.";
  }

  return Object.keys(validationErrors.value).length === 0;
};

// Automatically calculate days remaining based on a fixed date
watch(date, () => {
  if (date.value) {
    daysRemainingForExpense.value = calculateDaysRemaining(date.value);
  }
}, { immediate: true });

const submitForm = async () => {
  if (!validateForm()) {
    return;
  }

  const expenseData = {
    parentCityID: cityId,
    parentDestinationID: destId,
    expense: expense.value,
    category: category.value,
    cost: cost.value,
    isExpensePaid: false,
    location: location.value,
    duration: duration.value,
    isCompleted: "Pending",
    daysRemainingForExpense: daysRemainingForExpense.value,
    placeRating: 0,
    priority: priority.value,
    date: new Date(),
    comments: comments.value,
    expectedExpenseDate: expectedExpenseDate.value,
  };

  await addExpense({ ...expenseData, parentCityID: cityId });
  navigateTo(`/destinations/${destId}/cities-${cityId}`);
};

const showPrice = computed(() => {
  return !["N/A", "Landmarks", "Other"].includes(category.value);
});
</script>


<template>
  <div class="form-wrapper">
    <form class="row g-3" @submit.prevent="submitForm">
      <h3 class="mb-4">Add Expense</h3>

      <div>
        <label for="expense" class="form-label">Expense</label>
        <input
          v-model="expense"
          class="form-control"
          :class="{ 'invalid': validationErrors.expense }"
          id="expense"
        />
      
        <small v-if="validationErrors.expense" class="error-message">{{ validationErrors.expense }}</small>
      </div>

      <div class="col-6">
        <label for="category" class="form-label">Expense Type</label>
        <select
          v-model="category"
          class="form-select"
          :class="{ 'invalid': validationErrors.category }"
          id="category"
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
     
        <small v-if="validationErrors.category" class="error-message">{{ validationErrors.category }}</small>
      </div>

      <div class="col-6" v-if="showPrice">
        <label for="cost" class="form-label">Price</label>
        <input
          type="number"
          v-model="cost"
          class="form-control"
          :class="{ 'invalid': validationErrors.cost }"
          id="cost"
        />
       
        <small v-if="validationErrors.cost" class="error-message">{{ validationErrors.cost }}</small>
      </div>

      <div class="col-6">
        <label for="placeRating" class="form-label">Rating</label>
        <input
          type="number"
          v-model="placeRating"
          class="form-control"
          :class="{ 'invalid': validationErrors.placeRating }"
          min="0"
          max="5"
          step="0.1"
        />
       
        <small v-if="validationErrors.placeRating" class="error-message">{{ validationErrors.placeRating }}</small>
      </div>

      <div class="col-6">
        <label for="priority" class="form-label">Visit Priority</label>
        <select
          v-model="priority"
          class="form-select"
          :class="{ 'invalid': validationErrors.priority }"
          id="priority"
        >
          <option></option>
          <option>Must visit</option>
          <option>Nice to visit</option>
          <option>Backup options</option>
          <option>Optional</option>
        </select>
        
        <small v-if="validationErrors.priority" class="error-message">{{ validationErrors.priority }}</small>
      </div>

      <div class="col-6">
        <label for="status" class="form-label">Status</label>
        <select
          v-model="isCompleted"
          class="form-select"
          id="status"
        >
          <option value="" disabled selected hidden>Status</option>
          <option>Complete</option>
          <option>In progress</option>
          <option>Pending</option>
        </select>
     
      </div>

      <div class="col-6">
        <label for="date-input" class="form-label">Date Booked:</label>
        <input
          type="date"
          v-model.trim="expectedExpenseDate"
          class="form-control"
          :class="{ 'invalid': validationErrors.expectedExpenseDate }"
          id="date-input"
        />
       
        <small v-if="validationErrors.expectedExpenseDate" class="error-message">{{ validationErrors.expectedExpenseDate }}</small>
      </div>

      <div>
        <label for="location" class="form-label">Location</label>
        <input
          v-model="location"
          class="form-control"
          :class="{ 'invalid': validationErrors.location }"
        />
        
        <small v-if="validationErrors.location" class="error-message">{{ validationErrors.location }}</small>
      </div>

      <div>
        <label for="comments" class="form-label">Comments</label>
        <textarea
          v-model="comments"
          class="form-control"
          placeholder="Comments"
        ></textarea>
      
      </div>

      <div>
        <button type="submit" class="btn btn-primary">Submit</button>
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

.invalid {
  border-color: red;
}

label {
  color: rgb(77, 73, 73);
  font-weight: 400;
  font-size: 1rem;
  margin: 0.5rem 0;
}

.form-label {
  font-weight: bold;
  margin-bottom: 0.5rem;
}

.form-control {
  width: 100%;
  padding: 0.5rem;
 
}

.error-message {
  color: red;
 

}
</style>