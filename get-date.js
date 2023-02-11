// Module object is what represents the current module

exports.date = function() {
  const newDate = new Date();
  const options = {
    weekday: "long",
    month: "long",
    day: "numeric"
  }
  return day = newDate.toLocaleDateString("en-US", options); 
}
