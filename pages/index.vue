<script setup>
import { useTestStore } from "@/store/test";
import { storeToRefs } from "pinia";
const store = useTestStore();
const { trips } = storeToRefs(store);

const findMe = () => {
  return trips.value.filter((t) => t.id === "1").filter((e) => e.experience);
};
</script>

<template>
  <div>
    <UICard>
      <div>HOME</div>
    </UICard>
  </div>
</template>
