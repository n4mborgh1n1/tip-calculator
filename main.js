const inputBill = document.getElementById('inputBill');
const inputPeople = document.getElementById('inputPeople');
const tipContainer = document.getElementById('tipContainer');
const tipPercentages = [5, 10, 15, 25, 50];

const totalPerPersonElement = document.getElementById('totalPerPerson');
const totalElement = document.getElementById('total');

// initialize tip percentage to 0%
let tipPercentage = 0;

// add event listener to the tip percentage radio buttons
tipContainer.addEventListener('click', function(event) {
  if (event.target.value !== 'custom') {
    tipPercentage = parseInt(event.target.value);
  } else {
    tipPercentage = 0;
  }
  calculateTip();
});

// add event listener to the bill and number of people input fields
inputBill.addEventListener('input', calculateTip);
inputPeople.addEventListener('input', calculateTip);

// add event listener to the reset button
const resetBtn = document.querySelector('.resetBtn');
resetBtn.addEventListener('click', function() {
  inputBill.value = '';
  inputPeople.value = '';
  tipPercentage = 0;
  calculateTip();
});

function calculateTip() {
  // get the bill amount and the number of people
  const billAmount = parseFloat(inputBill.value);
  const numberOfPeople = parseInt(inputPeople.value);

  // calculate the tip amount and the total amount per person
  let tipAmount = (billAmount * tipPercentage / 100) / numberOfPeople;
  let totalPerPerson = (billAmount + tipAmount) / numberOfPeople;
  
  if (numberOfPeople === 1) {
    tipAmount = billAmount * (tipPercentage / 100);
    totalPerPerson = billAmount + tipAmount;
  } else {
    tipAmount = (billAmount * tipPercentage / 100) / numberOfPeople;
    totalPerPerson = (billAmount + tipAmount * 2) / numberOfPeople;
  }
  
  // display the tip amount and total per person
  if (!isNaN(totalPerPerson) && numberOfPeople !== 0) {
    totalPerPersonElement.textContent = `$${tipAmount.toFixed(2)}`;
    totalElement.textContent = `$${totalPerPerson.toFixed(2)}`;
  } else {
    totalPerPersonElement.textContent = '$0.00';
    totalElement.textContent = '$0.00';
  }
}

// input field restriction
inputBill.addEventListener("input", () => {
  let billValue = inputBill.value;

  // decimal part restriction -> auf 2 kommastellen
  if (billValue.includes(".")) {
    const [integerPart, decimalPart] = billValue.split(".");
    billValue = `${integerPart.slice(0, 7)}.${decimalPart.slice(0, 2)}`;
  } else {
    billValue = billValue.slice(0, 7);
  }

  // only interger and point
  inputBill.value = billValue.replace(/[^0-9.]/g, "");
  inputBill.setAttribute("autocomplete", "off");

  calculateTip();
});

inputPeople.addEventListener("input", () => {
  let peopleValue = inputPeople.value;

  // max 500 ppl restrition
  if (peopleValue > 500) {
    peopleValue = "500";
  }

  // only interger 
  inputPeople.value = peopleValue.replace(/[^0-9]/g, "");
  inputPeople.setAttribute("autocomplete", "off");

  calculateTip();
});
