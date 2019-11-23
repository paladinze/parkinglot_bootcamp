function uuidv4() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}

const PACKING_SIZE = 50;
const createParkingLot = (size) => ({
  space: [],
  size,
});

const createPassword = (carInfo, parkingLot) => {
  const { space, size} = parkingLot
  if (space.length === size) {
    console.log('space full')
    return false;
  }
  return ({
    ...carInfo,
    password: uuidv4(),
  });
};

const theParkingLot = createParkingLot(PACKING_SIZE);
const password = createPassword({model: 'bz'}, theParkingLot);

module.exports = {
  createParkingLot,
  createPassword
};