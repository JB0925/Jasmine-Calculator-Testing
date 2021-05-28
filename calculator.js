window.addEventListener('DOMContentLoaded', function() {
  const form = document.getElementById("calc-form");
  if (form) {
    setupIntialValues();
    form.addEventListener("submit", function(e) {
      e.preventDefault();
      updateMonthly(update());
    });
  }
});

function getCurrentUIValues() {
  return {
    amount: +(document.getElementById("loan-amount").value),
    years: +(document.getElementById("loan-years").value),
    rate: +(document.getElementById("loan-rate").value),
  }
}

// Get the inputs from the DOM.
// Put some default values in the inputs
// Call a function to calculate the current monthly payment
function setupIntialValues() {
  let amt = document.querySelector('#loan-amount');
  let term = document.querySelector('#loan-years');
  let rate = document.querySelector('#loan-rate');
  let variables = [amt, term, rate];
  variables.forEach((item) => {
    item.value = 0;
  });
  calculateMonthlyPayment(amt, term, rate);
};

// Get the current values from the UI
// Update the monthly payment
function update() {
  let { amount, years, rate } = getCurrentUIValues();
  return calculateMonthlyPayment({amount: amount, years: years, rate: rate});
}

// Given an object of values (a value has amount, years and rate ),
// calculate the monthly payment.  The output should be a string
// that always has 2 decimal places.
function calculateMonthlyPayment(values) {
  let {amount, years, rate} = values;
  if (amount < 0 || years < 0 || rate < 0) {
    throw new Error('one of your values is less than zero, which does not make sense.');
  };
  let periodicInterestRate = rate / 12;
  let totalPayments = years * 12;
  let payment = (amount * periodicInterestRate) / (1 - (1 + periodicInterestRate)**-totalPayments) || 0;
  payment = payment.toString();

  if (payment.includes('.')) {
    let decimalPlaces = payment.split('.')[1];
    if (decimalPlaces.length < 2) {
      return payment + '.00';
    } else {
        return`${payment.split('.')[0]}.${payment.split('.')[1].slice(0,2)}`;
    };
  } else {
      return '0.00';
  }
};

// Given a string representing the monthly payment value,
// update the UI to show the value.
function updateMonthly(monthly) {
  document.querySelector('#monthly-payment').style.textAlign = 'center';
  document.querySelector('#monthly-payment').innerText = `$${monthly}`;
};
