
<script setup>


const route = useRoute(); //route object
const destId = route.params.destinationID;

</script>

<template>

    <div>
        <h3>CREATING  A CITY : {{ destId }}</h3>
        <CitiesAddForm />
    </div>
</template>