const EventEmitter = require("events");

const customEventEmitter = new EventEmitter();

customEventEmitter.on("response", () => console.log("Hello from response"));

customEventEmitter.emit("response");

// We can also play around with events and make our own custom events by adding some variables to it as arguements and as per our need
customEventEmitter.on("about", (name, surname) => {
  console.log(`This is ${name} ${surname}`);
});
customEventEmitter.emit("about", "dhyey", "rabadiya");
