const { createParkingLot, createTicket } = require("./parking");

const parkingLots = [];

const theParkingLot = createParkingLot(PACKING_SIZE);
const ticket = createTicket({ model: "bz" }, theParkingLot);
