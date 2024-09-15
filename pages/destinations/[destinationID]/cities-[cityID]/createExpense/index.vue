<script setup>

const route = useRoute(); //route object

const destId = route.params.destinationID;
const cityId = route.params.cityID;
</script>


<template>
  <div>
    {{cityId}}
    <ExpensesAddForm :cityID="cityId"/>
  </div>
</template>
