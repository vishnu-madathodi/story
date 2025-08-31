const date = new Date();
const day = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

$(document).ready(() => {
  $("#date").text(
    `${day[date.getDay()]}, ${date.getDate()} ${months[date.getMonth()]}`
  );
  $('#city').focus();
});
