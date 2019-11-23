- given app started
  when app boots
  then return the state of a newly opened parking lot
- given current state of parking lot (params)
  when customer arrives, and the parking lot has space(function)
  then return created ID (expect)
- given current state of parking lot
  when customer arrives, and the parking lot has no space
  then prompt message and return current state
- given an ID was generated
  when car arrives and place the car in space
  then return the current state of the parking lot
- given ID
  when ID verified
  then release the car and return current state
- given ID
  when ID not verified
  then prompt message and return nothing
