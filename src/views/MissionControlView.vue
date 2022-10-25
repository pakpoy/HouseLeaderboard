<script setup>
import { computed } from "vue";
import socket from "@/socket";
import { useStore } from "vuex";

const store = useStore();

function flattenEventsArray() {
  const flattened = [];
  store.state.events.forEach((event) => {
    if (!event.subbed) {
      flattened.push({ ...event, ofSubbed: false, masterEventId: false });
    } else {
      event.subEvents.forEach((subEvent) => {
        flattened.push({
          ...subEvent,
          ofSubbedEvent: true,
          masterEventId: event.id,
          masterEventName: event.name,
        });
      });
    }
  });
  return flattened;
}

const flattenedEvents = computed(() => {
  return flattenEventsArray();
});

function returnScore(eventId, houseId) {
  const events = flattenEventsArray();
  const event = events.find((e) => eventId === e.id);
  return event.points[houseId];
}

function publish() {
  socket.emit("missioncontrol", store.state.events);
}
</script>

<template>
  <table>
    <tr>
      <th>HouseID</th>
      <th v-for="event of flattenedEvents" :key="event.id" class="event-name">
        {{ event.name }}
      </th>
    </tr>
    <tr v-for="house of store.state.houses" :key="house.id">
      <th
        class="house-name"
        :style="`
          background-color: ${house.color};
          color: ${house.textColor};
          `"
      >
        {{ house.name }}
      </th>
      <td
        v-for="event of flattenedEvents"
        :key="event.id"
        class="score-td"
        :style="`
          background-color: ${house.color};
          color: ${house.textColor};
          `"
      >
        <input
          type="number"
          :value="returnScore(event.id, house.id)"
          @input="
            (change) =>
              store.commit(`updateScore`, {
                newScore: Number(change.target.value),
                event: event.id,
                house: house.id,
                subEventId: event.masterEventId,
              })
          "
          class="score"
        />
      </td>
    </tr>
  </table>
  <button @click="publish()">Publish</button>
</template>

<style lang="scss" scoped>
table {
  table-layout: fixed;
  border-collapse: collapse;
  .event-name {
    word-wrap: break-word;
  }
  td,
  th {
    width: 2em;
  }
  th.event-name {
    text-align: left;
  }

  input {
    width: 6em;
    opacity: 80%;
  }
}
</style>
