import { defineStore } from 'pinia'

export const useDestinationStore = defineStore({
    id: "destinations",

    state: () => ({
        destination: "MIAMI",
    }),



});
