const obj = new Object();
obj.add = "Addition";
var obj2 = obj;
obj2.add = "Updated after second object";

console.log(obj.add);
