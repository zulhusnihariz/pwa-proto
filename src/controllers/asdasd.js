var now = new Date();
now.setDate(now.getDate() + 1);
now.setHours(8);
now.setMinutes(0);
now.setMilliseconds(0);

let setNow = new Date().getTime();

let setTomorrow = now.getTime();

console.log(setNow, setTomorrow);

console.log(`now bigger than tomorrow ${setNow > setTomorrow}`);
console.log(`now less than tomorrow ${setNow < setTomorrow}`);
