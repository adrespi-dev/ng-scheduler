import Reminder from "../models/reminder";
import DEFAULT_COLORS from "../data/colors";
import * as moment from "moment";

const getSeedData = () => [
  new Reminder(
    "She cried diamonds",
    moment("7-2-2020 13:20", "MM-DD-YYYY HH:mm"),
    "Guayaquil",
    DEFAULT_COLORS[0].value
  ),
  new Reminder(
    "Dont step on the broken glass",
    moment("7-3-2020 14:15", "MM-DD-YYYY HH:mm"),
    "Quito",
    DEFAULT_COLORS[2].value
  ),
  new Reminder(
    "Deep dive down the rabbit hole",
    moment("7-4-2020 08:15", "MM-DD-YYYY HH:mm"),
    "London",
    DEFAULT_COLORS[1].value
  ),
  new Reminder(
    "Final Fantasy Vii",
    moment("7-6-2020 10:12", "MM-DD-YYYY HH:mm"),
    "New York",
    DEFAULT_COLORS[0].value
  ),
  new Reminder(
    "Kingdom Hearts III",
    moment("7-6-2020 12:08", "MM-DD-YYYY HH:mm"),
    "Miami",
    DEFAULT_COLORS[0].value
  ),
  new Reminder(
    "Super Mario",
    moment("7-10-2020 15:45", "MM-DD-YYYY HH:mm"),
    "Cuenca",
    DEFAULT_COLORS[0].value
  ),
  new Reminder(
    "Dissidia Final Fantasy",
    moment("7-13-2020 16:19", "MM-DD-YYYY HH:mm"),
    "Moscow",
    DEFAULT_COLORS[2].value
  ),
  new Reminder(
    "League of Legends",
    moment("7-14-2020 23:22", "MM-DD-YYYY HH:mm"),
    "Istanbul",
    DEFAULT_COLORS[2].value
  ),
  new Reminder(
    "League of Legends",
    moment("7-14-2020 23:22", "MM-DD-YYYY HH:mm"),
    "Istanbul",
    DEFAULT_COLORS[2].value
  ),
  new Reminder(
    "League of Legends",
    moment("7-14-2020 23:22", "MM-DD-YYYY HH:mm"),
    "Istanbul",
    DEFAULT_COLORS[2].value
  ),
  new Reminder(
    "League of Legends",
    moment("7-14-2020 23:22", "MM-DD-YYYY HH:mm"),
    "Istanbul",
    DEFAULT_COLORS[2].value
  ),
  new Reminder(
    "League of Legends",
    moment("7-14-2020 23:22", "MM-DD-YYYY HH:mm"),
    "Istanbul",
    DEFAULT_COLORS[2].value
  ),
];

export default getSeedData;
