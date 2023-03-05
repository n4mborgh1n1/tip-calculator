const inputBill = document.getElementById('inputBill');
const inputPeople = document.getElementById('inputPeople');
const tipContainer = document.getElementById('tipContainer');
const tipPercentages = [5, 10, 15, 25, 50];
const totalPerPersonElement = document.getElementById('totalPerPerson');
const totalElement = document.getElementById('total');
const error = document.querySelector('.error');

// error 
inputPeople.addEventListener("input", function() {
  if (inputPeople.value <= 0) {
    error.style.display = "block";
  } else {
    error.style.display = "none";
  }
});

// initialize tip percentage to 0%
let tipPercentage = 0;
let customTipPercentage = 0;

// add event listener to the tip percentage radio buttons
tipContainer.addEventListener('click', function(event) {
  if (event.target.value !== 'custom') {
    tipPercentage = parseInt(event.target.value);
    customTipPercentage = 0;
    tipInput.value = '';
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
  let tipAmount = (billAmount * (tipPercentage + customTipPercentage) / 100) / numberOfPeople;
  let totalPerPerson = (billAmount + tipAmount) / numberOfPeople;
  
  if (numberOfPeople === 1) {
    tipAmount = billAmount * ((tipPercentage + customTipPercentage) / 100);
    totalPerPerson = billAmount + tipAmount;
  } else {
    tipAmount = (billAmount * (tipPercentage + customTipPercentage) / 100) / numberOfPeople;
    totalPerPerson = (billAmount + tipAmount * numberOfPeople) / numberOfPeople;
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
    billValue = `${integerPart.slice(0, 4)}.${decimalPart.slice(0, 2)}`;
  } else {
    billValue = billValue.slice(0, 4);
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

const tipInput = document.querySelector('.tipCos');

tipInput.addEventListener('click', function() {
  tipInput.placeholder = '';

});

tipInput.addEventListener('input', function() {
  let tipValue = tipInput.value;

  tipInput.addEventListener('input', function() {
    let tipValue = tipInput.value;
  
    // restrict to 2 digits and allow only numbers
    if (tipValue.length > 3) {
      tipValue = tipValue.slice(0, 3);
    }
    tipValue = tipValue.replace(/[^0-9]/g, "");
    tipInput.value = tipValue.length > 0 ? `${tipValue}%` : '';
  
    // set customTipPercentage to the value of the input field
    customTipPercentage = parseInt(tipValue);
    
    // uncheck the other tip percentage radio buttons
    const tipRadioButtons = document.querySelectorAll('.tip');
    tipRadioButtons.forEach(function(button) {
      if (button.value !== 'custom') {
        button.checked = false;
      }
    });
  
    calculateTip();
  });
  
  // set customTipPercentage to the value of the input field
  customTipPercentage = parseInt(tipInput.value);
  
  // uncheck the other tip percentage radio buttons
  const tipRadioButtons = document.querySelectorAll('.tip');
  tipRadioButtons.forEach(function(button) {
    if (button.value !== 'custom') {
      button.checked = false;
    }
  });

  calculateTip();
});

// automatisierung

window.addEventListener('load', function() {
  resetBtn.click();
});

tipInput.addEventListener('blur', function() {
  tipInput.placeholder = 'Custom';
});

// reset radiobutton color when input cutom tip

const tipCos = document.querySelector('.tipCos');
const tipLabels = document.querySelectorAll('.tip label');

tipCos.addEventListener('input', () => {
  if (tipCos.value) {
    tipLabels.forEach(label => label.style.backgroundColor = 'hsl(183, 100%, 15%)');
    tipLabels.forEach(label => label.style.color = 'white');
  } else {
    tipLabels.forEach(label => label.style.backgroundColor = '');
  }
});
