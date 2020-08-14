import Reminder from "../models/reminder";
import DEFAULT_COLORS from "../data/colors";
import * as moment from "moment";

const now = new Date();

const getSeedData = () => [
  new Reminder(
    "She cried diamonds",
    moment(
      `${now.getMonth()}-2-${now.getFullYear()} 13:20`,
      "MM-DD-YYYY HH:mm"
    ),
    "Guayaquil",
    DEFAULT_COLORS[0].value
  ),
  new Reminder(
    "Dont step on the broken glass",
    moment(
      `${now.getMonth()}-3-${now.getFullYear()} 14:15`,
      "MM-DD-YYYY HH:mm"
    ),
    "Quito",
    DEFAULT_COLORS[2].value
  ),
  new Reminder(
    "Deep dive down the rabbit hole",
    moment(
      `${now.getMonth()}-4-${now.getFullYear()} 08:15`,
      "MM-DD-YYYY HH:mm"
    ),
    "London",
    DEFAULT_COLORS[1].value
  ),
  new Reminder(
    "Final Fantasy Vii",
    moment(
      `${now.getMonth()}-6-${now.getFullYear()} 10:12`,
      "MM-DD-YYYY HH:mm"
    ),
    "New York",
    DEFAULT_COLORS[0].value
  ),
  new Reminder(
    "Kingdom Hearts III",
    moment(
      `${now.getMonth()}-6-${now.getFullYear()} 12:08`,
      "MM-DD-YYYY HH:mm"
    ),
    "Miami",
    DEFAULT_COLORS[0].value
  ),
  new Reminder(
    "Super Mario",
    moment(
      `${now.getMonth()}-10-${now.getFullYear()} 15:45`,
      "MM-DD-YYYY HH:mm"
    ),
    "Cuenca",
    DEFAULT_COLORS[0].value
  ),
  new Reminder(
    "Dissidia Final Fantasy",
    moment(
      `${now.getMonth()}-13-${now.getFullYear()} 16:19`,
      "MM-DD-YYYY HH:mm"
    ),
    "Moscow",
    DEFAULT_COLORS[2].value
  ),
  new Reminder(
    "League of Legends",
    moment(
      `${now.getMonth()}-14-${now.getFullYear()} 08:16`,
      "MM-DD-YYYY HH:mm"
    ),
    "Istanbul",
    DEFAULT_COLORS[0].value
  ),
  new Reminder(
    "Monster Hunter",
    moment(
      `${now.getMonth()}-14-${now.getFullYear()} 09:32`,
      "MM-DD-YYYY HH:mm"
    ),
    "Bucharest",
    DEFAULT_COLORS[5].value
  ),
  new Reminder(
    "Chrono trigger",
    moment(
      `${now.getMonth()}-14-${now.getFullYear()} 12:05`,
      "MM-DD-YYYY HH:mm"
    ),
    "Dalian",
    DEFAULT_COLORS[1].value
  ),
  new Reminder(
    "Resident Evil",
    moment(
      `${now.getMonth()}-14-${now.getFullYear()} 16:04`,
      "MM-DD-YYYY HH:mm"
    ),
    "Hamburg",
    DEFAULT_COLORS[4].value
  ),
  new Reminder(
    "Dota",
    moment(
      `${now.getMonth()}-14-${now.getFullYear()} 23:22`,
      "MM-DD-YYYY HH:mm"
    ),
    "Shantou",
    DEFAULT_COLORS[3].value
  ),
];

export default getSeedData;
