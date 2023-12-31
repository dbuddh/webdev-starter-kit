import readline from "readline";
import crypto from "crypto";
import _ from "lodash";

export const useObjIsEqual = (isShallow) => {
  const obj1 = { name: "John", age: "25" }
  const obj2 = { name: "John", age: "25" }
  const obj3 = obj1 // pass by reference will work with ===
  // lodash (_.) isEqual deep equality checker used
  return console.log(isShallow ? obj1 === obj3 : _.isEqual(obj1, obj2))
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

const useTodayDateFormatted = () => {
  const date = new Date();
  console.log(date)
  console.log("Showing date time in UTC")
  console.log(new Intl.DateTimeFormat('en-US', {
    dateStyle: 'short',
    timeStyle: 'long', timeZone: 'UTC'
  }).format(date));
  console.log("Showing date in pros with SG time zone")
  console.log(new Intl.DateTimeFormat('en-GB', {
    dateStyle: 'full',
    timeStyle: 'long', timeZone: 'Singapore'
  }).format(date));
}

const useSpreadWithObjectAssign = () => {
  const obj1 = {
    name: "John", country: "America", details:
      { age: 25, gender: "M", dob: "1/1/1998" }
  };
  const obj2 = {
    name: "Doe", details:
      { age: 24, dob: "1/1/1999" }
  };

  // this means all attributes from obj1 with
  // exception of details
  // and even for details, only take obj2 details
  // that clash with obj1
  // and for the rest still use obj1's details
  const obj3 = Object.assign({}, obj1,
    { details: { ...obj1.details, ...obj2.details } });
  console.log(JSON.stringify(obj3))
}

// non primitive types that will not be copied (shallow)
// Object,Array,Function,Date,RegExp,Error,Map,
// Set,WeakMap,WeakSet
const useSpreadShallowCopy = () => {
  const obj1 = {
    name: "John", country: "America", details:
      { age: 25, gender: "M", dob: "1/1/1998" },
    hobbies: ['reading']
  };
  const obj2 = {
    name: "Doe", details:
      { age: 24, dob: "1/1/1999" },
    hobbies: ['sleeping']
  };

  // in this example since obj1 and obj2 share
  // name and details, only obj2's attributes for
  // those get chosen
  const obj3 = { ...obj1, ...obj2 }
  console.log(JSON.stringify(obj3));

  // notice how even though we're pushing to
  // obj3's hobbies, coding will now be in obj2's
  // hobbies too
  obj3.hobbies.push('coding');
  console.log(JSON.stringify(obj2));

  // adds all entries in hobbies array
  const obj4 = Object.assign({}, obj1,
    { hobbies: [...obj1.hobbies, ...obj2.hobbies] });
  console.log(JSON.stringify(obj4))
}

const useURL = () => {
  const url = new URL("/en-US/docs", "https://developer.mozilla.org/fr-FR/toto");
  console.log(url)
}

const useURLwithSearchParams = () => {
  let url = new URL("https://example.com?foo=1&bar=2");
  url.searchParams.set('language', "[ \"en\", \"ja\" ,\"zh\"]")
  console.log(url)
  let params = new URLSearchParams(url.search);

  // Add a third parameter.
  params.set("baz", 3);
  //auto encoding
  // "foo=1&bar=2&language=%5B+%22en%22%2C+%22ja%22+%2C%22zh%22%5D&baz=3"
  console.log(params.toString());
}

const useRandomUUID = () => {
  console.log(crypto.randomUUID());
}

// process user input
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.question('Enter the type of function to execute: ', (userInput) => {
  switch (userInput) {
    case 'useObjIsEqual':
      useObjIsEqual(false)
      break;
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
    case 'useTodayDateFormatted':
      useTodayDateFormatted()
      break;
    case 'useSpreadWithObjectAssign':
      useSpreadWithObjectAssign()
      break;
    case 'useSpreadShallowCopy':
      useSpreadShallowCopy()
      break;
    case 'useURL':
      useURL()
      break;
    case 'useURLwithSearchParams':
      useURLwithSearchParams()
      break;
    case 'useRandomUUID':
      useRandomUUID()
      break;
    default:
      console.log("invalid input")
  }
  rl.close();
});
