let price = 19.5;
let cid = [
  ['PENNY', 0.5],
  ['NICKEL', 0],
  ['DIME', 0],
  ['QUARTER', 0],
  ['ONE', 0],
  ['FIVE', 0],
  ['TEN', 0],
  ['TWENTY', 0],
  ['ONE HUNDRED', 0]
];

const currencyUnits = {
  "PENNY": 0.01,
  "NICKEL": 0.05,
  "DIME": 0.10,
  "QUARTER": 0.25,
  "ONE": 1,
  "FIVE": 5,
  "TEN": 10,
  "TWENTY": 20,
  "ONE HUNDRED": 100
};

document.getElementById("purchase-btn").addEventListener("click", () => {
  const cashInput = parseFloat(document.getElementById("cash").value);
  const changeDue = document.getElementById("change-due");

  if (cashInput < price) {
    alert("Customer does not have enough money to purchase the item");
    return;
  }

  if (cashInput === price) {
    changeDue.textContent = "No change due - customer paid with exact cash";
    return;
  }

  let change = parseFloat((cashInput - price).toFixed(2));
  let totalCid = parseFloat(cid.reduce((acc, curr) => acc + curr[1], 0).toFixed(2));

  if (change > totalCid) {
    changeDue.textContent = "Status: INSUFFICIENT_FUNDS";
    return;
  }

  if (change === totalCid) {
    let message = "Status: CLOSED";
    cid.forEach(([unit, amount]) => {
      if (amount > 0) {
        message += ` ${unit}: $${amount.toFixed(2)}`;
      }
    });
    changeDue.textContent = message;
    return;
  }

  const changeArray = [];
  let updatedCid = JSON.parse(JSON.stringify(cid)).reverse();

  for (let [unit, amount] of updatedCid) {
    let unitTotal = 0;
    let unitValue = currencyUnits[unit];

    while (change >= unitValue && amount >= unitValue) {
      change -= unitValue;
      change = Math.round(change * 100) / 100;
      amount -= unitValue;
      unitTotal += unitValue;
    }

    if (unitTotal > 0) {
      changeArray.push([unit, unitTotal]);
    }
  }

  if (change > 0) {
    changeDue.textContent = "Status: INSUFFICIENT_FUNDS";
  } else {
    let message = "Status: OPEN";
    changeArray.forEach(([unit, amount]) => {
      message += ` ${unit}: $${amount.toFixed(2)}`;
    });
    changeDue.textContent = message;
  }
});