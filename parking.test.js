const {
  createParkingLot,
  createTicket,
  addCarToParkingLot,
  verifyReleaseCar,
  removeCarFromParkingLot
} = require("./parking.js");

describe("create new parking lot", () => {
  it("should return the state of the parking lot, when the app is first booted", () => {
    const givenSize = 50;
    const expected = {
      cars: [],
      maxSize: 50
    };
    expect(createParkingLot(givenSize)).toEqual(expected);
  });
});

describe("create ticket", () => {
  it("should return carInfo with ticket, when has space", () => {
    const carInfo = {
      carId: "abc"
    };
    const parkingLot = createParkingLot(2);
    expect(createTicket(carInfo, parkingLot).ticketId).toBeTruthy();
  });
  it("should reject and return nothing, when no space", () => {
    const carInfo = {
      carId: "abc"
    };
    const parkingLot = createParkingLot(0);
    expect(createTicket(carInfo, parkingLot)).toBeFalsy();
  });
  it("should reject when car with same info already exist", () => {
    const carToBeAdded = { carId: "abc" };
    const parkingLot = {
      cars: [{ carId: "abc" }],
      maxSize: 3
    };
    expect(createTicket(carToBeAdded, parkingLot)).toBeFalsy();
  });
});

describe("add Car To Parking Lot", () => {
  const maxSize = 3;
  const parkingLot = createParkingLot(maxSize);
  const car = { carId: "abc" };
  const carWithTicket = createTicket(car, parkingLot);
  it("should add car to parking lot, and return current state of the parking lot given a car with ticket is added", () => {
    const parkingLotUpdated = addCarToParkingLot(carWithTicket, parkingLot);
    const expected = {
      cars: [carWithTicket],
      maxSize
    };
    expect(parkingLotUpdated).toEqual(expected);
  });
  it("should not add the car twice, if the same carId or ticketId already exist", () => {
    let parkingLotUpdated = addCarToParkingLot(carWithTicket, parkingLot);
    parkingLotUpdated = addCarToParkingLot(carWithTicket, parkingLot);
    parkingLotUpdated = addCarToParkingLot(carWithTicket, parkingLot);
    const expected = {
      cars: [carWithTicket],
      maxSize
    };
    expect(parkingLotUpdated).toEqual(expected);
  });
});

describe("verify releasing car", () => {
  const addedCar1 = { carId: "abc", model: "bz", ticketId: "567" };
  const addedCar2 = { carId: "efg", model: "bmw", ticketId: "234" };
  const parkingLot = {
    cars: [addedCar1, addedCar2],
    maxSize: 3
  };
  it("should release the car when the carInfo and ticket is given and verified", () => {
    const givenInfo = {
      carId: "efg",
      ticketId: "234"
    };
    expect(verifyReleaseCar(givenInfo, parkingLot)).toEqual(addedCar2);
  });
  it("should reject release when the ticketInfo is missing", () => {
    const givenInfo = {
      carId: "efg"
    };
    expect(verifyReleaseCar(givenInfo, parkingLot)).toEqual(false);
  });
  it("should reject release when the carInfo is missing", () => {
    const givenInfo = {
      ticketId: "234"
    };
    expect(verifyReleaseCar(givenInfo, parkingLot)).toEqual(false);
  });
});

describe("remove car from parking ", () => {
  it("should remove car from the parking lot and return latest parking lot state, when verified car info is given", () => {
    const addedCar1 = { carId: "abc", model: "bz", ticketId: "567" };
    const addedCar2 = { carId: "efg", model: "bmw", ticketId: "234" };
    const parkingLot = {
      cars: [addedCar1, addedCar2],
      maxSize: 3
    };
    const expected = {
      cars: [addedCar2],
      maxSize: 3
    };
    expect(removeCarFromParkingLot(addedCar1, parkingLot)).toEqual(expected);
  });
  it("should do nothing and return latest parking lot state, when verified car is already released", () => {
    const releasedCar = { carId: "abc", model: "bz", ticketId: "567" };
    const addedCar2 = { carId: "efg", model: "bmw", ticketId: "234" };
    const parkingLot = {
      cars: [addedCar2],
      maxSize: 3
    };
    const expected = parkingLot;
    expect(removeCarFromParkingLot(releasedCar, parkingLot)).toEqual(expected);
  });
});
