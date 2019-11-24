const {
  createParkingLot,
  createTicket,
  addCarToParkingLot
} = require("./parking");
const fp = require("ramda");

let parkingLot = createParkingLot(2);
const cars = [
  { carId: "abc", model: "bz" },
  { carId: "efg", model: "bz" },
  { carId: "hij", model: "bmw" }
];

cars.forEach(car => {
  const ticket = createTicket(car, parkingLot);
  parkingLot = addCarToParkingLot(ticket, parkingLot);
});

console.log(parkingLot);
