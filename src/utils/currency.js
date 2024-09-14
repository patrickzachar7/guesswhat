// src/utils/currency.js
const CURRENCY_KEY = 'game_currency';

export function earnCurrency(amount) {
  const currentBalance = getCurrencyBalance();
  localStorage.setItem(CURRENCY_KEY, currentBalance + amount);
}

export function spendCurrency(amount) {
  const currentBalance = getCurrencyBalance();
  if (currentBalance >= amount) {
    localStorage.setItem(CURRENCY_KEY, currentBalance - amount);
    return true;
  }
  return false;
}

export function getCurrencyBalance() {
  return parseInt(localStorage.getItem(CURRENCY_KEY) || '0', 10);
}