let btn = document.querySelector("button");
let bill = document.querySelector(".finalAmt");

btn.addEventListener("click", calc);

function calc() {
    // Read current values and convert to numbers
    let cake1 = Number(document.querySelector("#cake1").value) || 0;
    let cake2 = Number(document.querySelector("#cake2").value) || 0;
    let cake3 = Number(document.querySelector("#cake3").value) || 0;
    let cake4 = Number(document.querySelector("#cake4").value) || 0;

    let ans = cake1 * 300 + cake2 * 200 + cake3 * 250 + cake4 * 350;
    bill.innerText = "Total Bill : " + ans;
}
