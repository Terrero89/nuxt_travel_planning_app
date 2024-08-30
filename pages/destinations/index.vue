<script setup>
import { useDestinationStore } from "@/store/destination";
const store = useDestinationStore();
import { storeToRefs } from "pinia";

const { destination } = storeToRefs(store);
const isOpen = ref(false)
</script>

<template>
  <div>
    <UIContainer>
      <UICard class="mt-5 mb-2 py-4"> 
      <UButton  label="Add Destination" @click="isOpen = true"></UButton>
      <UButton>Up coming attractions</UButton>
    </UICard>

      <!-- {{ destination }} -->
     <DestinationList/>
     <div>
    <UButton label="Open" @click="isOpen = true" />

    <UModal v-model="isOpen">
      <div class="p-4">
 <DestinationAddForm/>
      </div>
    </UModal>
  </div>
   </UIContainer>
  </div>
</template>
