// import SwimmingIcon from "@/assets/icons/swimming.svg";
import CrossCountryIcon from "@/assets/icons/RadfordCrossCountry.svg";
import RADPACIcon from "@/assets/icons/RADPAC.svg";
import AthleticsIcon from "@/assets/icons/RadfordXC.svg";

import ChessIcon from "@/assets/icons/extras/chess.svg";
import NetballIcon from "@/assets/icons/extras/netball.svg";
import DebatingIcon from "@/assets/icons/extras/debate.svg";
import MarioIcon from "@/assets/icons/extras/mario.svg";
import HandballIcon from "@/assets/icons/extras/handball.svg";
import SpellingBeeIcon from "@/assets/icons/extras/spelling-bee.svg";

var events = [
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
        id: 9,
        name: "Spelling Bee",
        points: { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, 7: 0, 8: 0 },
        icon: SpellingBeeIcon,
        backgroundColor: "#67c7a4",
      },
    ],
  },
];

export default events;
