class BankAccount {
  constructor(accountNumber, accountHolder, balance = 0) {
    this.accountNumber = accountNumber;
    this.accountHolder = accountHolder;
    this.balance = balance;
  }
  deposit(amount) {
    if (amount > 0) {
      this.balance += amount;
      console.log(`✅ Deposited $${amount}. New balance: $${this.balance}`);
    } else {
      console.log("❌ Deposit amount must be greater than zero.");
    }
  }

    // Method to withdraw money
    withraw(amount) {
        if (amount <= 0) {
            console.log("❌ Withdrawal amount must be greater than zero.");
        }
        else if(amount>this.balance){
            console.log("❌ Insufficient balance.");
        }
        else {
            this.balance -= amount;
            console.log(
              `✅ Withdrew $${amount}. Remaining balance: $${this.balance}`
            );
        }
    }

    checkBalance() {
        console.log(`💰 Current balance: $${this.balance}`);
        return this.balance;
    }
}

export default BankAccount;