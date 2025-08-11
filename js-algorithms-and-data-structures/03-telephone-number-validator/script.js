// script.js

const input = document.getElementById('user-input');
const checkBtn = document.getElementById('check-btn');
const clearBtn = document.getElementById('clear-btn');
const result = document.getElementById('results-div');

function isValidUSPhone(number) {
  const regex = /^(1\s?)?(\(\d{3}\)|\d{3})([\s\-]?)\d{3}([\s\-]?)\d{4}$/;
  return regex.test(number);
}

checkBtn.addEventListener('click', () => {
  const number = input.value.trim();

  if (!number) {
    alert('Please provide a phone number');
    return;
  }

  const valid = isValidUSPhone(number);

  result.textContent = valid
    ? `Valid US number: ${number}`
    : `Invalid US number: ${number}`;
});

clearBtn.addEventListener('click', () => {
  result.textContent = '';
  input.value = '';
});