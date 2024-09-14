<script setup>
import { onMounted } from "vue";
import { useDestinationStore } from "@/store/destination";
import { storeToRefs } from "pinia";

const props = defineProps(["modelValue"]);
const emit = defineEmits(["update:modelValue"]);

// Access the store
const store = useDestinationStore();
const { destination, isLoading } = storeToRefs(store); // Include isLoading state

// Fetch destinations when the component is mounted
const { fetchDestinations, filteredD } = store;

onMounted(async () => {
  await fetchDestinations();
});

onBeforeMount(() => {
  fetchDestinations();
});

const createCityLink = computed(() => `/destinations/create`);
</script>

<template>
  <!-- search bar starts here -->
  <div>
    <div>
      <div class="row py-2">
        <div class="col-lg-6 col-md-6 col-sm-6 col-7  my-auto">
          <!-- search button here, emit event soon to be set up -->
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

        <div class="col-lg-4 col-md-4 col-sm-7 col-5">
          <nuxt-link
            type="button"
            class="d-flex justify-content-end button-color"
            :to="createCityLink"
          >
            <UButton
              class="my-2 button-color"
              color="blue"
              size="lg"
              label="Add Destination"
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
