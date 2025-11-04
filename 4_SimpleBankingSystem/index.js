// import BankAccount from "./bankAccount.js";

let currentAccount = null;

//select DOM elements

const createForm = document.getElementById("creatAccountForm");
const actionsSection = document.getElementById("actions");
const info = document.getElementById("info");
const accountDisplay = document.getElementById("accountDisplay");

const depositeBtn = document.getElementById('depositeBtn');
const withdrawBtn = document.getElementById('withdrawBtn');
const balanceBtn = document.getElementById('balanceBtn')

createForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const holder = document.getElementById('accountHolder').value;
    const number = document.getElementById('accountNumber').value;

    currentAccount = new BankAccount(number, holder, 0);
    info.textContent = `🎉 Account created for ${holder} (Account #${number})`;
    actionsSection.style.display = "block";
    accountDisplay.textContent = currentAccount.checkBalance();

    createForm.reset();

});


// Deposit money
depositBtn.addEventListener('click', () => {
  const amount = parseFloat(prompt("Enter deposit amount:"));
  if (isNaN(amount)) return alert("Invalid amount!");
  const result = currentAccount.deposit(amount);
  accountDisplay.textContent = result;
});

// Withdraw money
withdrawBtn.addEventListener('click', () => {
  const amount = parseFloat(prompt("Enter withdrawal amount:"));
  if (isNaN(amount)) return alert("Invalid amount!");
  const result = currentAccount.withdraw(amount);
  accountDisplay.textContent = result;
});

// Check balance
balanceBtn.addEventListener('click', () => {
  const result = currentAccount.checkBalance();
  accountDisplay.textContent = result;
});


