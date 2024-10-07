<script setup>
const route = useRoute(); //route object
const destId = route.params.destinationID;

const props = defineProps(["modelValue"]);
const emit = defineEmits([
  "update:modelValue",

 ,
]);
const filterByName = ref("");

const filterByStatus = ref("");
const filterByCategory = ref("");
const filterByBookingStatus = ref("");

const createCityLink = computed(() => `/destinations/${destId}/createCity`);


</script>

<template>
  <!-- search bar starts here -->
  <div>
    <div>
      <div class="row py-2 mx-3">
        <div class="col-lg-6 col-md-6 col-sm-2 col-6 my-auto item">
          <div class="input-group">
            <span class="input-group-text" id="basic-addon1">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                class="bi bi-search"
                viewBox="0 0 16 16"
              >
                <path
                  d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"
                /></svg
            ></span>

            <input
              type="text"
              class="form-control"
              placeholder="Search by.."
              :value="modelValue"
             @input="$emit('update:modelValue', $event.target.value)"
            />
        
          </div>
        </div>
        <!--  -->
        <div class="col-lg-2 col-md-2 col-sm-2 col-6 my-auto item">
          <div>
            <!-- <label for="transportType" class="form-label"
              > By Status </label
            > -->
            <select
              class="form-select"
              id="transportType"
              v-model="filterByStatus"
              @change="$emit('update:filter2', filterByStatus)"
              placeholder="Filter by status"
            >
              <option value="" disabled selected hidden>
                Filter by status
              </option>
              <option>Visited</option>
              <option>Not visited</option>
              <option>In progress</option>
            </select>
          </div>
          <!-- <button class="btn btn-md btn-primary">Add Destination</button> -->
        </div>

        <div class="col-lg-2 col-md-2 col-sm-2 col-6 my-auto item">
          <div>
            <select
              class="form-select"
              id="category-selection"
              v-model="filterByCategory"
              @change="$emit('update:filter3', filterByCategory)"
            >
              <option value="" disabled selected hidden>Filter by type</option>
              <option>Further Date</option>
              <option>Closest Date</option>
              <option>Highest Rating</option>
              <option>Lowest Rating</option>
              <option>Highest Cost</option>
              <option>Lowest Cost</option>
            </select>
          </div>
        </div>

        <div class="col-lg-2 col-md-2 col-sm-2 col-6 my-auto item">
          <div>
            <select
              class="form-select"
              id="category-selection"
              v-model="filterByCategory"
              @change="$emit('update:filter3', filterByCategory)"
            >
              <option value="" disabled selected hidden>Filter by type</option>
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

      
      </div>
    </div>
  </div>
</template>

<style scoped>
.button-color {
  text-decoration: none;
}
</style>
