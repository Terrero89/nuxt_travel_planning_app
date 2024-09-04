<script setup>
import { useExpenseStore } from "@/store/expenses";
const expenseStore = useExpenseStore();
import { storeToRefs } from "pinia";
// import {
//   calculateTotalDuration,
//   calculateDaysRemaining,
// } from "../../utils/date-conversion";
const {expenses } = storeToRefs(expenseStore);
const { addExpense } = expenseStore;

const route = useRoute(); //route object

const destId = route.params.destinationID;
const cityId = route.params.cityID;

</script>

<template>
    <div class="form-wrapper">
      <form class="row g-3" @submit.prevent="submitForm">
        <h3 class="mb-4">Add Expense</h3>
        {{ cityID }}
  
        <div>
          <label for="inputPassword4" class="form-label">Expense</label>
          <input type="input" v-model.trim="expense" class="form-control" id="name-input" />
        </div>
  
        <div class="col-6">
          <label for="transportType" class="form-label">Expense Type</label>
  
          <select class="form-select" v-model="category" aria-label="Default select example">
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
  
        <div class="col-6" v-if="showPrice">
          <label for="inputPassword4" class="form-label">Price</label>
          <input type="number" v-model.trim="cost" class="form-control" id="name-input" />
        </div>
  
        <div class="col-6">
          <label for="inputPassword4" class="form-label">Start Time: </label>
          <input type="time" v-model.trim="startTime" class="form-control" id="time-input" />
        </div>
        <div class="col-6">
          <label for="inputPassword4" class="form-label">End time: </label>
          <input type="time" v-model.trim="endTime" class="form-control" id="time-input" />
        </div>
  
        <div class="col-6">
          <label for="inputPassword4" class="form-label">Duration</label>
          <input type="number" v-model.trim="duration" class="form-control" id="duration-input" />
        </div>
  
        <div class="col-6">
          <label for="inputPassword4" class="form-label">Rating</label>
  
          <input type="number" v-model.trim="placeRating" class="form-control" id="placeRating-input" min="0" max="5"
            step="0.1" />
        </div>
        <div class="">
          <label for="transportType" class="form-label">Visit Priority</label>
  
          <select class="form-select" v-model="priority" aria-label="Default select example" placeholder="Priority">
            <option></option>
            <option>Must visit</option>
            <option>Nice to visit</option>
            <option>Backup options</option>
            <option>Optional</option>
  
          </select>
        </div>
        <div>
          <label for="inputPassword4" class="form-label">Location</label>
          <input type="input" v-model.trim="location"  class="form-control"
            id="name-input" />
        </div>
  
  
  
        <div>
          <textarea class="form-control" v-model.trim="comments" aria-label="With textarea" placeholder="Comments" />
        </div>
  
        <div>
          <button type="submit" class="btn btn-primary py-2 px-4">Submit</button>
        </div>
      </form>
    </div>
  </template>
  