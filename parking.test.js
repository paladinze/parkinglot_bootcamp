const { createParkingLot, createPassword } = require('./parking.js')

describe('create new parking lot', () => {
  it('should return the state of the new parking lot, when the app is first booted', () => {
    const givenSize = 50;
    const expected = {
      space: [],
      size: 50,
    };
    expect(createParkingLot(givenSize)).toEqual(expected);
  })
})

describe('create ID', () => {
  it('should return an password, when has space', () => {
    const givenCarInfo = {
      model: 'bz'
    };
    expect(typeof createPassword(givenCarInfo, space).password).toBe('string');
  });
  it('should reject and return nothing, when no space', () => {
    const givenCarInfo = {
      model: 'bz'
    };
    const parkingLot = {
      space: [],
      size: 0,
    };
    expect(typeof createPassword(givenCarInfo, parkingLot)).toBeFalsy();
  });
})
