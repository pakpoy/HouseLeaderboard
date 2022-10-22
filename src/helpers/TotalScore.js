import _ from "lodash";

import houses from "@/data/houses";
import events from "@/data/events";

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
  houses.forEach((house) => {
    housesWithTotalScore.push({ ...house, score: houseTotalScore(house.id) });
  });
  return _.orderBy(housesWithTotalScore, ["score", "name"], ["desc", "asc"]);
}

export default totalScore;
