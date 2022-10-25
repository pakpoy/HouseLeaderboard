import { createStore } from "vuex";

import CrossCountryIcon from "@/assets/icons/RadfordCrossCountry.svg";
import AthleticsIcon from "@/assets/icons/RadfordXC.svg";
import RADPACIcon from "@/assets/icons/RADPAC.svg";

import ChessIcon from "@/assets/icons/extras/chess.svg";
import DebatingIcon from "@/assets/icons/extras/debate.svg";
import HandballIcon from "@/assets/icons/extras/handball.svg";
import MarioIcon from "@/assets/icons/extras/mario.svg";
import NetballIcon from "@/assets/icons/extras/netball.svg";
import SpellingBeeIcon from "@/assets/icons/extras/spelling-bee.svg";

import _ from "lodash";

export default createStore({
  state: {
    events: [
      {
        id: 0,
        name: "Athletics",
        subbed: false,
        points: { 1: 6, 2: 8, 3: 7, 4: 1, 5: 4, 6: 3, 7: 2, 8: 5 },
        icon: AthleticsIcon,
      },
      {
        id: 1,
        name: "Foundation Day",
        subbed: false,
        points: { 2: 8, 1: 7, 3: 6, 4: 4, 5: 3, 6: 5, 7: 1, 8: 2 },
      },
      {
        id: 2,
        name: "RADPAC",
        subbed: false,
        points: { 2: 5, 1: 8, 3: 4, 4: 7, 5: 2, 6: 6, 7: 4, 8: 2 },
        icon: RADPACIcon,
      },
      {
        id: 3,
        name: "Cross Country",
        subbed: false,
        points: { 2: 8, 1: 7, 3: 3, 4: 5, 5: 6, 6: 1, 7: 4, 8: 2 },
        icon: CrossCountryIcon,
      },
      {
        id: 4,
        name: "Best of the Rest",
        subbed: true,
        subEvents: [
          {
            id: 5,
            name: "Chess",
            points: { 1: 8, 2: 2, 3: 6, 4: 4, 5: 3, 6: 5, 7: 1, 8: 7 },
            icon: ChessIcon,
            backgroundColor: "#ecad44",
          },
          {
            id: 6,
            name: "Handball",
            points: { 1: 8, 2: 7, 3: 4, 4: 4, 5: 5, 6: 2, 7: 6, 8: 1 },
            icon: HandballIcon,
            backgroundColor: "#fdab65",
          },
          {
            id: 7,
            name: "Debating",
            points: { 1: 5, 2: 2, 3: 2, 4: 5, 5: 6, 6: 8, 7: 5, 8: 7 },
            icon: DebatingIcon,
            backgroundColor: "#ece4d5",
          },
          {
            id: 8,
            name: "Netball",
            points: { 1: 5, 2: 8, 3: 6, 4: 4, 5: 2, 6: 1, 7: 7, 8: 3 },
            icon: NetballIcon,
            backgroundColor: "#bb4ed8",
          },
          {
            id: 9,
            name: "Mario Kart",
            points: { 1: 6, 2: 7, 3: 2, 4: 8, 5: 4, 6: 4, 7: 1, 8: 5 },
            icon: MarioIcon,
            backgroundColor: "#b52f36",
          },
          {
            id: 10,
            name: "Spelling Bee",
            points: { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, 7: 0, 8: 0 },
            icon: SpellingBeeIcon,
            backgroundColor: "#67c7a4",
          },
        ],
      },
    ],
    houses: [
      {
        id: 1,
        name: "Huon",
        color: "#000000",
        textColor: "#fff",
      },
      {
        id: 5,
        name: "Acacia",
        color: "#FDCB00",
        textColor: "#fff",
      },
      {
        id: 2,
        name: "Banksia",
        color: "#ffffff",
        textColor: "#000",
      },
      {
        id: 6,
        name: "Boronia",
        color: "#F01B1F",
        textColor: "#fff",
      },
      {
        id: 3,
        name: "Jarrah",
        color: "#85439B",
        textColor: "#fff",
      },
      {
        id: 4,
        name: "Karri",
        color: "#0E113E",
        textColor: "#fff",
      },
      {
        id: 7,
        name: "Kurrajong",
        color: "#0C9A46",
        textColor: "#fff",
      },
      {
        id: 8,
        name: "Wandoo",
        color: "#3E75BC",
        textColor: "#fff",
      },
    ],
  },
  getters: {
    storesTotalScore(state) {
      let events = state.events;
      function houseTotalScore(houseId) {
        let score = 0;
        events.forEach((event) => {
          score += event.points[houseId];
        });
        return score;
      }

      function updateSubEventScore() {
        const subbedEvents = events.filter((e) => e.subbed);
        subbedEvents.forEach((subbedEvent) => {
          let points = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, 7: 0, 8: 0 };
          let masterPointsArray = [];
          subbedEvent.subEvents.forEach((subEvent) => {
            Object.entries(subEvent.points).forEach(([key, value]) => {
              points[key] += value;
            });
          });
          Object.entries(points).forEach(([key, value]) => {
            masterPointsArray.push({ house: Number(key), points: value });
          });
          const masterPointsArrayOrdered = _.orderBy(
            masterPointsArray,
            ["points"],
            ["asc"]
          );
          let finalMasterPoints = {};
          masterPointsArrayOrdered.forEach((masterPoint, index) => {
            finalMasterPoints[masterPoint.house] = index + 1;
          });
          events.find((e) => e.id == subbedEvent.id).points = finalMasterPoints;
        });
      }

      function totalScore() {
        updateSubEventScore();
        let housesWithTotalScore = [];
        state.houses.forEach((house) => {
          housesWithTotalScore.push({
            ...house,
            score: houseTotalScore(house.id),
          });
        });
        return _.orderBy(
          housesWithTotalScore,
          ["score", "name"],
          ["desc", "asc"]
        );
      }
      return totalScore();
    },
  },
  mutations: {
    updateScore(state, { newScore, event, house, subEventId }) {
      if (subEventId) {
        console.log("subbed");
        console.log(event);
        const masterEventIndex = state.events.findIndex(
          (e) => e.id === subEventId
        );
        const subEventIndex = state.events[
          masterEventIndex
        ].subEvents.findIndex((e) => e.id === event);
        state.events[masterEventIndex].subEvents[subEventIndex].points[house] =
          newScore;
      } else {
        const eventIndex = state.events.findIndex((e) => e.id === event);
        state.events[eventIndex].points[house] = newScore;
      }
    },
    updatesFromMissionControl(state, newEvents) {
      state.events = newEvents;
    },
  },
  actions: {},
  modules: {},
});
