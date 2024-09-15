<script setup>
const route = useRoute(); //route object
const destId = route.params.destinationID;
const cityId = route.params.cityID;

const props = defineProps(["modelValue"]);
const emit = defineEmits([
  "update:filter1",
  "update:filter2",
  "update:filter3",
  "update:filter4",

  
]);

const filterByPriority = ref("");
const filterByCategory = ref("");
const filterByMisc = ref("");
const filterByStatus = ref("");

const addExpenseLink = computed(
  () => `/destinations/${destId}/cities-${cityId}/createExpense`
);

</script>

<template>
  <!-- search bar starts here -->
  <div>
    <UICard class="mt-5">
      <div class="row py-2 mx-3">
        <!--  -->
        <div class="col-lg-2 col-md-2 col-sm-3 col-6 my-auto item">
          <div>
            <!-- <label for="transportType" class="form-label"> Priority </label> -->
         
            <select
              class="form-select"
              id="transportType"
              v-model="filterByPriority"
              @change="$emit('update:filter1', filterByPriority)"
              placeholder="Filter by priority"
            >
              <option value="" disabled selected hidden>By Priority</option>
              <option>Must visit</option>
              <option>Nice to visit</option>
              <option>Backup options</option>
              <option>Optional</option>
            </select>
          </div>
          <!-- <button class="btn btn-md btn-primary">Add Destination</button> -->
        </div>

        <div class="col-lg-2 col-md-2 col-sm-2 col-6 my-auto item">
          <div>
            <!-- <label for="transportType" class="form-label"
              > By Booking status</label
            > -->
            <!-- <label for="transportType" class="form-label"> By category</label> -->

            <select
              class="form-select"
              id="booking-selection"
              v-model="filterByCategory"
              @change="$emit('update:filter2', filterByCategory)"
            >
              <option value="" disabled selected hidden>Category</option>
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
        </div>
        <!--  -->

        <div class="col-lg-2 col-md-2 col-sm-2 col-6 my-auto item">
          <div>
            <!-- <label for="transportType" class="form-label"> By Misc </label> -->

            <select
              class="form-select"
              id="category-selection"
              v-model="filterByMisc"
              @change="$emit('update:filter3', filterByMisc)"
            >
              <option value="" disabled selected hidden>Misc</option>
              <option>Further Date</option>
              <option>Closest Date</option>
              <option>Highest Rating</option>
              <option>Lowest Rating</option>
              <option>Highest Cost</option>
              <option>Lowest Cost</option>
            </select>
          </div>
        </div>
        <!--  -->
        <div class="col-lg-2 col-md-2 col-sm-2 col-6 my-auto item">
          <div>
            <!-- <label for="transportType" class="form-label"
              > By Booking status</label
            > -->
            <!-- <label for="transportType" class="form-label"> By status </label> -->

            <select
              class="form-select"
              id="booking-selection"
              v-model="filterByStatus"
              @change="$emit('update:filter4', filterByStatus)"
            >
              <option value="" disabled selected hidden>Status</option>
              <option>Completed</option>
              <option>In Progress</option>
              <option>Pending</option>
            </select>
          </div>
        </div>
        <!--  -->
        <div class="col-lg-2 col-md-2 col-sm-2 col-3 ml-auto">
            <nuxt-link
            type="button"
            class="d-flex justify-content-end button-color"
            :to="addExpenseLink"
          >
            <UButton
              class="my-2 button-color"
              color="blue"
              size="lg"
              label="Add Expense"
            />
            <!-- <button class="btn btn-md btn-primary">Add Destination</button> -->
          </nuxt-link>
        </div>
      </div>
    </UICard>
  </div>
</template>

<style scoped>
.button-color {
  text-decoration: none;
}

 @media (max-width: 768px) {
    select{
      margin:  0.3rem 0;
    }
  
  
  }
</style>
