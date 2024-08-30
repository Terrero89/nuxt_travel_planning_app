<script setup>
import { onMounted } from "vue";
import { useDestinationStore } from "@/store/destination";
const store = useDestinationStore();
import { storeToRefs } from "pinia";
const { destination } = storeToRefs(store);
const {  } = store;
const route = useRoute(); //route object
const destinationParamID = route.params.destinationID;


const findByID = ()=>{
  return destination.value.filter((city) => city.parentDestinationID === destinationParamID)
}
 


onMounted(() => {});


</script>

<template>
  <div>
{{ findByID() }}
    UPDATE DESTINATION
    <div>{{ route.params }}</div>
    <DestinationUpdateForm />
  </div>
</template>
