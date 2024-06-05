//Automate testing means using code for testing code.There are two types of test cases the case 1 is basic test case, which tests if the code is working. Case 2 and 3 are 2nd type called edge cases, test with values that are tricky.
import {formatCurrency} from '../../scripts/utils/money.js';

//Group of related test are called test suite.
console.log('test suite: formatCurrency');

//testing situation is called test case so this is test case 1.
console.log('converts cents into dollars');//passing the name so that we know which case is passed and failed.
if (formatCurrency(2095) === '20.95') {
  console.log('passed');
} else {
  console.log('failed');
}
//this test case 2.
console.log('works with 0');
if (formatCurrency(0) === '0.00') {
  console.log('passed');
} else {
  console.log('failed');
}
//this test case 3.
console.log('rounds up to the nearest cent');
if (formatCurrency(2000.5) === '20.01') {
  console.log('passed');
} else {
  console.log('failed');
}
//test case 4.
console.log('rounds up exercise');
if (formatCurrency(2000.4) === '20.00') {
  console.log('passed');
} else {
  console.log('failed');
}
