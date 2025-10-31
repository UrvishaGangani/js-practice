import BankAccount from "./bankAccount";

const myAccount = new BankAccount('001', 'John Doe', 1000);

myAccount.deposit(500);
myAccount.withraw(200);
myAccount.checkBalance();