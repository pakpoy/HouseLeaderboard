<script>
import houses from "@/data/houses";
import events from "@/data/events";

import totalScore from "@/helpers/TotalScore";

function houseWidth(id) {
  const housesByPoints = totalScore();
  const house = housesByPoints.filter((h) => h.id === id);
  const maxPoints = housesByPoints[0].score;
  return (house[0].score / maxPoints) * 100;
}

function eventInHouseWidth(eventId, houseId) {
  const housesByPoints = totalScore();
  const house = housesByPoints.filter((h) => h.id === houseId);
  const event = events.filter((h) => h.id === eventId);
  return (event[0].points[houseId] / house[0].score) * 100;
}

export default {
  setup() {
    return {
      houses,
      events,
      houseWidth,
      eventInHouseWidth,
      totalScore,
    };
  },
};
</script>

<template>
  <div class="leaderboard">
    <h1 class="header">Radford House Leaderboard 2022</h1>
    <div class="houses">
      <div
        class="house"
        v-for="(house, index) in totalScore()"
        :key="index"
        :style="`
          background-color: ${house.color}d7;
          color: ${house.textColor};
          width: ${houseWidth(house.id)}%
          `"
      >
        <div class="text">
          <h1>{{ house.name }}</h1>
          <h1>{{ house.score }} pts</h1>
        </div>
        <div class="events">
          <template v-for="(event, index) in events" :key="index">
            <!-- Major Event Block -->
            <div
              v-if="!event.subbed"
              class="event"
              :style="`
            width: ${eventInHouseWidth(event.id, house.id)}%;
            background-image: url(${event.icon})
            `"
            >
              {{ event.points[house.id] }}
            </div>

            <!-- Minor Event Block -->

            <div
              v-else-if="event.subbed"
              class="event subbed"
              :style="`
            width: ${eventInHouseWidth(event.id, house.id)}%;
            `"
            >
              <div
                class="sub-event"
                v-for="subEvent of event.subEvents"
                :key="subEvent.id"
                :style="`
                background-image: url(${subEvent.icon});
                background-color: ${subEvent.backgroundColor};
                `"
              >
                <svg viewBox="0 0 56 18">
                  <text x="0" y="15">{{ subEvent.points[house.id] }}</text>
                </svg>
              </div>
            </div>
          </template>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.leaderboard {
  background-image: url("@/assets/oval.jpg");
  background-size: 100% 100%;
  height: 100%;
  display: grid;
  grid-template-rows: 4em 1fr;
  padding: 1em;
  .header {
    display: flex;
    color: #000000;
    font-size: 2.5em;
    text-align: center;
  }
  .houses {
    display: grid;
    height: 100%;
    grid-template-rows: repeat(8, 1fr);
    gap: 1em;
    .house {
      backdrop-filter: blur(180);
      display: grid;
      grid-template-columns: 200px 1fr;
      border-radius: 4px;
      align-items: center;
      h1 {
        font-size: 2.2em;
        padding-left: 0.8em;
      }
      .events {
        display: flex;
        flex-direction: row;
        gap: 4px;
        padding: 4px;
        height: 100%;
        border-radius: 4px;
        .event {
          background-repeat: no-repeat;
          background-origin: content-box;
          background-position: center;
          border: 2px solid #ffffff;
          padding: 1em;
          border-radius: 4px;
          display: flex;
          align-items: flex-end;
          &.subbed {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            padding: 0;
            .sub-event {
              background-repeat: no-repeat;
              background-size: 100% 100%;
              height: 100%;
              color: #000000;
              display: grid;
              place-items: center;
              font-size: calc(110% + 1px);
            }
          }
        }
      }
    }
  }
}
</style>
