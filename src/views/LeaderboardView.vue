<script setup>
import { onMounted, computed } from "vue";
import { useStore } from "vuex";
import socket from "@/socket";

const store = useStore();

function houseWidth(id) {
  const housesByPoints = store.getters.storesTotalScore;
  const house = housesByPoints.filter((h) => h.id === id);
  const maxPoints = housesByPoints[0].score;
  return (house[0].score / maxPoints) * 100;
}

function eventInHouseWidth(eventId, houseId) {
  const housesByPoints = store.getters.storesTotalScore;
  const house = housesByPoints.filter((h) => h.id === houseId);
  const event = store.getters.dynamicEvents.filter((h) => h.id === eventId);
  return (event[0].points[houseId] / house[0].score) * 100;
}

onMounted(() => {
  socket.on("fromMissionControl", (data) => {
    store.commit("updatesFromMissionControl", data);
  });
});

const eventsStore = computed(() => {
  return store.getters.dynamicEvents;
});

const storesTotalScoreComputed = computed(() => {
  return store.getters.storesTotalScore;
});
</script>

<template>
  <div class="leaderboard">
    <h1 class="header">
      {{
        store.state.showSubOnly
          ? "Best of the Rest"
          : "Radford House Leaderboard"
      }}
    </h1>
    <div class="houses">
      <TransitionGroup name="list" appear>
        <div
          class="house"
          v-for="(house, index) in storesTotalScoreComputed"
          :key="house.id"
          :style="`
          background-color: ${house.color}d7;
          color: ${house.textColor};
          width: ${houseWidth(house.id)}%;
          top: calc(12.5% * ${index});
          border: 2px solid #000;
          opacity: ${house.hidden ? 0 : 100}
          `"
        >
          <div class="text">
            <h1>{{ house.name }}</h1>
            <h1>{{ house.score }} pts</h1>
          </div>
          <div class="events">
            <TransitionGroup name="width">
              <template v-for="event in eventsStore" :key="event.id">
                <!-- Major Event Block -->
                <div
                  v-if="!event.subbed && event.points[house.id] > 0"
                  class="event"
                  :class="{
                    withNewBg: event.newBg,
                    differentSubbed: event.backgroundColor,
                  }"
                  :style="`
            width: ${eventInHouseWidth(event.id, house.id)}%;
            background-image: url(${event.icon ? event.icon : event.newBg});
            background-color: ${event.backgroundColor};
            border: 2px solid ${house.textColor};
            `"
                >
                  <span>{{ event.points[house.id] }}</span>
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
                    {{ subEvent.points[house.id] }}
                  </div>
                </div>
              </template>
            </TransitionGroup>
          </div>
        </div>
      </TransitionGroup>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.leaderboard {
  // background-image: url("@/assets/oval.jpg");
  // background-color: darkgrey;
  background-size: 100% 100%;
  background-image: url("@/assets/R1_corner.svg");
  background-size: 50%;
  background-repeat: no-repeat;
  background-position: bottom right;
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
    height: 100%;
    gap: 1em;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
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
          padding: 1em;
          border-radius: 4px;
          display: flex;
          align-items: flex-end;
          &.withNewBg {
            background-size: cover;
            background-repeat: repeat-x;
            padding: 0;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 2em;
          }
          &.differentSubbed {
            background-size: contain;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 2em;
            padding: 0;
            color: #000;
            span {
              backdrop-filter: brightness(1.1);
            }
          }
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
.list-move,
.list-enter-active,
.list-leave-active {
  transition: all 0.5s ease;
}

.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateX(30px);
}
.list-leave-active {
  position: absolute;
}

.width-move,
.width-enter-active,
.width-leave-active {
  transition: all 0.5s ease;
}

.width-leave-active {
  position: absolute;
}
</style>
