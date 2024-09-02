<script setup>
import { onMounted } from "vue";
import { useDestinationStore } from "@/store/destination";
const store = useDestinationStore();
import { storeToRefs } from "pinia";
const { destination } = storeToRefs(store);
const { destinationsAsArray } = store;
const route = useRoute(); //route object
const destinationParamID = route.params.destinationID;

</script>

<template>
  <div>


    <div>{{ route.params }}</div>
    <DestinationUpdateForm />
  </div>
</template>
