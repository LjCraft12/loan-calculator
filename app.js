const errorText = 'Please Check Your Numbers';
// Listen for submit
document.getElementById('loan-form').addEventListener('submit', function (e) {
    // Hide results
    document.getElementById('results').style.display = 'none';
    document.getElementById('loading').style.display = 'block';

    setTimeout(calculateResults, 1500);

    // Show loader
    e.preventDefault()
});

// Calculate results
function calculateResults() {
    // Grab UI variables
    const amount = document.getElementById('amount');
    const interest = document.getElementById('interest');
    const years = document.getElementById('years');
    const monthlyPayment = document.getElementById('monthly-payment');
    const totalPayment = document.getElementById('total-payment');
    const totalInterest = document.getElementById('total-interest');

    const principle = parseFloat(amount.value);
    const calculatedInterest =parseFloat(interest.value) / 100 / 12;
    const calculatedPayments = parseFloat(years.value) * 12;

    // Compute monthly payments

    const x = Math.pow(1 + calculatedInterest, calculatedPayments);
    const monthly = (principle * x * calculatedInterest) / (x - 1);

    if(isFinite(monthly)) {
        monthlyPayment.value = monthly.toFixed(2);
        totalPayment.value = (monthly * calculatedPayments).toFixed(2);
        totalInterest.value = ((monthly * calculatedPayments) - principle).toFixed(2);
        // Show results
        document.getElementById('results').style.display = 'block';
        // Hide spinner
        document.getElementById('loading').style.display = 'none';

    } else {
        showError(errorText);

    }
}

// Show error
function showError(error) {
    document.getElementById('results').style.display = 'none';
    document.getElementById('loading').style.display = 'none';

//    create div
    const errorDiv = document.createElement('div');

//    Get elements
    const card = document.querySelector('.card');
    const heading = document.querySelector('.heading');

//     add class
    errorDiv.className = 'alert alert-danger';

//    Create text node and append to div
    errorDiv.appendChild(document.createTextNode(error));

//    Insert the error message above the card
    card.insertBefore(errorDiv, heading);

//    Clear error after set amount of time
    setTimeout(clearError, 3000);
}

// Clear Error
function clearError() {
    document.querySelector('.alert').remove();
}