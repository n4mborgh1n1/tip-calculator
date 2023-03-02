const inputBill = document.getElementById('inputBill');
inputBill.addEventListener('input', () => {
  let billValue = inputBill.value;

  // begrenze auf zwei Nachkommastellen nach einem Punkt
  if (billValue.includes('.')) {
    const [integerPart, decimalPart] = billValue.split('.');
    billValue = `${integerPart.slice(0, 7)}.${decimalPart.slice(0, 2)}`;
  } else {
    billValue = billValue.slice(0, 7);
  }

  // entferne alle Zeichen außer Zahlen und Punkt
  inputBill.value = billValue.replace(/[^0-9.]/g, '');
  inputBill.setAttribute('autocomplete', 'off');
});

const inputPeople = document.getElementById('inputPeople');
inputPeople.addEventListener('input', () => {
  let peopleValue = inputPeople.value;

  // begrenze auf maximal 500 Personen
  if (peopleValue > 500) {
    peopleValue = '500';
  }
  
  // entferne alle Zeichen außer Zahlen
  inputPeople.value = peopleValue.replace(/[^0-9]/g, '');
  inputPeople.setAttribute('autocomplete', 'off');
});
