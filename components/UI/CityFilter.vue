<script setup>

const route = useRoute(); //route object
const destId = route.params.destinationID;


const props = defineProps(["modelValue"]);
const emit = defineEmits(["update:modelValue", "update:filter2", "update:filter3", "update:filter4"]);

const filter = ref("");
const filterByStatus = ref('')
const filterByCategory = ref('')
const filterByBookingStatus = ref('')

const createCityLink = computed(() => `/destinations/${destId}/createCity`);
</script>

<template>
  <!-- search bar starts here -->
  <div>
    <div>
      <div class="row py-2 mx-3">
      

        <!--  -->
        <div class="col-lg-2 col-md-2 col-sm-2 col-3 my-auto">
            <div>
                <label for="transportType" class="form-label"
              > By Status </label
            >
            <select class="form-select" id="transportType" v-model="filterByStatus"  @change="$emit('update:filter2', filterByStatus)" placeholder="Filter by status">
              <option>Visited</option>
              <option>Not visited</option>
              <option>In progress</option>
            </select>
          </div>
            <!-- <button class="btn btn-md btn-primary">Add Destination</button> -->
      
        </div>
        

        <div class="col-lg-2 col-md-2 col-sm-2 col-3 my-auto">
            <div>
            <label for="transportType" class="form-label"
              > By Type </label
            >
        
            <select class="form-select" id="category-selection" v-model="filterByCategory" @change="$emit('update:filter3', filterByCategory)">
              <option>Further Date</option>
              <option>Closest Date</option>
              <option>Highest Rating</option>
              <option>Lowest Rating</option>
              <option>Highest Cost</option>
              <option>Lowest Cost</option>
             
            </select>
          </div>
        </div>
        
        <div class="col-lg-2 col-md-2 col-sm-2 col-3  my-auto">
            <div>
            <!-- <label for="transportType" class="form-label"
              > By Booking status</label
            > -->
            <label for="transportType" class="form-label"
              > By Booking </label
            >
      
            <select class="form-select" id="booking-selection" v-model="filterByBookingStatus" @change="$emit('update:filter4',  filterByBookingStatus )">
              <option>Reserved</option>
              <option>Half Reserved</option>
              <option>Pending</option>
              
            </select>
          </div>
        </div>
        <!--  -->
        <div class="col-lg-2 col-md-2 col-sm-2 col-3 ml-auto ">
          <nuxt-link
            type="button"
            class="d-flex justify-content-end button-color"
            :to="createCityLink"
          >
            <UButton
              class="my-2 button-color"
              color="blue"
              size="lg"
              label="Add New City"
            />
            <!-- <button class="btn btn-md btn-primary">Add Destination</button> -->
          </nuxt-link>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.button-color {
  text-decoration: none;
}
</style>
