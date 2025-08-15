let amt = document.querySelector("input");
let val = parseFloat(amt.value);

let ans = document.querySelector("#answer");

let fromS = document.querySelector("#select1");
let toS = document.querySelector("#select2");

const USD = {
    "EUR": .86,
    "INR" : 87.68,
    "GBP" : .74 
};

const EUR = {
    "USD": 1.0989,
    "INR": 91.4286,
    "GBP": 0.8352
};

const INR = {
    "USD": 0.0120,
    "EUR": 0.01093,
    "GBP": 0.00913
};

const GBP = {
    "USD": 1.3158,
    "EUR": 1.1974,
    "INR": 109.4868
};

const rates = { USD, EUR, INR, GBP };

amt.addEventListener("input", calc);
fromS.addEventListener("change", calc);
toS.addEventListener("change", calc);

function calc() {
    val = parseFloat(amt.value);
    if (isNaN(val)){
    ans.innerText = "Converted Amount: 0";
    } else {
        console.log("correct");
        ans.innerText = "Correct";
    }

    let from = fromS.value;
    let to = toS.value;

    console.log(from);

    if (from == to){
        ans.innerText = "Converted Amount: " + val;
    } else {
        ans.innerText = "Converted Amount: " + val * rates[from][to];
    }
}