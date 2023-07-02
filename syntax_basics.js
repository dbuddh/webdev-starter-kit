export function useJSX({ data }) {
  let { title, page, id } = data;
  return (
    <div>
      <h2> {title} </h2>
      <p> {page},{id} </p>
    </div>
  )
}

export function useSpreadOperation({ data }) {
  const obj = { ...data, name: "test" }
  return (
    <div>
      <h2> {obj.name} </h2>
    </div>
  )
}

// not hoisted like function definitions and no local "this"
export const useArrowFunction = ({ data }) => {
  let { title, page, id } = data;
  return (
    <div>
      <h2> {title} </h2>
      <p> {page},{id} </p>
    </div>
  )
}

export const useObjIsEqual = (isShallow) => {
  const obj1 = { name: "John", age: "25" }
  const obj2 = { name: "John", age: "25" }
  const obj3 = obj1 // pass by reference will work with ===
  // lodash (_.) isEqual deep equality checker used
  return console.log(isShallow ? obj1 === obj3 : _.isEqual(object1, obj2))
}

const useEqualityCheck = (isStrict) => {
  const int = 1
  return console.log(isStrict ? int === '1' : int == 1)
}

const useSpreadForFunctionParam = () => {
  const arr1 = [4, 5, 6]
  useArrayTypes(...arr1)
}

function useArrayTypes(num1, num2, num3) {
  const arrOf = Array.of(1, 2, 3)
  const arrBrackets = [num1, num2, num3]
  const arrSpreadCopy = [...arrOf]
  const arrSpreadCombined = [...arrOf, ...arrBrackets]
  console.log(arrSpreadCopy, arrSpreadCombined)
}

// difference between Object and Map is map is in order guranteed
// and keys can be other objs, objects are only key of string
const useIterationsObject = (obj) => {
  for (const key in obj) {
    console.log(key + ":" + obj[key])
  }
  Object.keys(obj).forEach((key) => {
    return console.log(key + ":" + obj[key])
  });
  Object.entries(obj).forEach(([key, value]) => {
    return console.log(key + ":" + value)
  });
}

// notice for loop is of map and not "in" like obj
const useIterationsMap = (map) => {
  for (const [key, value] of map) {
    console.log(key + ":" + value)
  }
  // take note value first then key
  map.forEach((value, key) => {
    return console.log(key + ":" + value)
  });
  // requires to be iterable via array first
  Array.from(map.entries()).forEach(([key, value]) => {
    return console.log(key, value)
  });
}

// process user input
const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.question('Enter the type of function to execute: ', (userInput) => {
  switch (userInput) {
    case 'useIterationsMap':
      useIterationsMap(new Map([[1, "one"], [2, "two"], [3, "three"]]))
      break;
    case 'useIterationsObject':
      useIterationsObject({
        one: "1", two: "2", three: "3"
      })
      break;
    case 'useArrayTypes':
      useArrayTypes(4, 5, 6)
      break;
    case 'useSpreadForFunctionParam':
      useSpreadForFunctionParam();
      break;
    case 'useEqualityCheck true':
      useEqualityCheck(true);
      break;
    case 'useEqualityCheck false':
      useEqualityCheck(false);
      break;
    default:
      console.log("invalid input")
  }
  rl.close();
});
