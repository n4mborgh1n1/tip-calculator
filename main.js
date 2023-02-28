const input = document.getElementById('inputBill');
input.addEventListener('input', () => {
  input.value = input.value.replace(/[^0-9.]/g, '');
});

const inputPeople = document.getElementById('inputPeople');
inputPeople.addEventListener('input', () => {
  inputPeople.value = inputPeople.value.replace(/[^0-9]/g, '');
});
