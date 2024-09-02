import axios from "axios";
import { defineStore } from "pinia";

export const useTestStore = defineStore({
  id: "test",
  state: () => ({
    trips: [
      {
        id:'1',
        name: "sergio",
        last: "Terrero",
        experience: [
          {
            action: "run",
            enjoy: "eat",
            job: [
              { work: "programmer1" },
              { work: "developer1" },
              { work: "engineer1" },
            ],
          },
        ],
      },
      {
        id:'2',
        name: "cami",
        last: "Terrero",
        experience: [
          {
            action: "run",
            enjoy: "eat",
            job: [
                { work: "programmer2" },
                { work: "developer2" },
                { work: "engineer2" },
            ],
          },
        ],
      },
      {
        id:'3',
        name: "ezra",
        last: "Terrero",
        experience: [
          {
            action: "run",
            enjoy: "eat",
            job: [
                { work: "programmer3" },
                { work: "developer3" },
                { work: "engineer3" },
            ],
          },
        ],
      },
    ],
  }),
});
