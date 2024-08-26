<script setup >
import { useDestinationStore } from '@/store/destination';
const store = useDestinationStore()

</script>

<template>
    {{ store.destination }}
    <div>HOME</div>
<button class="btn btn-primary">HELLo</button>
<UButton>Button</UButton>


</template>