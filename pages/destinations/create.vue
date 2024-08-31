<script setup>
const route = useRoute(); //route object
const destinationParamID = route.params.destinationID;
const props = defineProps(["destinationParamID"]);
</script>
<template>
  <div>
    <DestinationAddForm />
  </div>
</template>
