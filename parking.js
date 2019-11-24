const { DEFAULT_PARKING_SIZE } = require("./constants");
const fp = require("ramda");
const uuidv4 = require("uuid/v4");

const createParkingLot = (maxSize = DEFAULT_PARKING_SIZE) => ({
  cars: [],
  maxSize
});

const createTicket = fp.curry((carInfo, parkingLot) => {
  const { cars, maxSize } = parkingLot;
  if (cars.length >= maxSize) {
    return false;
  }
  const carsWithSameId = cars.filter(car => car.carId === carInfo.carId);
  if (carsWithSameId.length) {
    return false;
  }
  return {
    ...carInfo,
    ticketId: uuidv4()
  };
});

const addCarToParkingLot = fp.curry((carWithTicket, parkingLot) => {
  const { cars } = parkingLot;
  const { carId, ticketId } = carWithTicket;
  const existCarId = cars.find(car => car.carId === carId);
  const existTicketId = cars.find(car => car.ticketId === ticketId);
  if (!carWithTicket || existCarId || existTicketId) {
    return parkingLot;
  }
  return {
    ...parkingLot,
    cars: cars.concat(carWithTicket)
  };
});

const verifyReleaseCar = (givenInfo, parkingLot) => {
  const { cars } = parkingLot;
  const { carId, ticketId } = givenInfo;
  if (!carId || !ticketId) {
    return false;
  }
  const matchedCar = cars.find(car => {
    return car.carId === carId && car.ticketId === ticketId;
  });
  if (!matchedCar) return false;
  return matchedCar;
};

const removeCarFromParkingLot = (carWithTicket, parkingLot) => ({
  ...parkingLot,
  cars: parkingLot.cars.filter(car => car.carId !== carWithTicket.carId)
});

module.exports = {
  createParkingLot,
  createTicket,
  addCarToParkingLot,
  verifyReleaseCar,
  removeCarFromParkingLot
};
