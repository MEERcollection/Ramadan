let selectedCoins = 1000;
let selectedPrice = 10.39;

let demoBalance = 0;
let transactions = [];


function selectPackage(element) {

    document
        .querySelectorAll(".coin-card")
        .forEach(card => card.classList.remove("selected"));

    element.classList.add("selected");

    selectedCoins = Number(element.dataset.coins);
    selectedPrice = Number(element.dataset.price);

    updateTotal();
}


function updateTotal() {

    document.getElementById("totalPrice").textContent =
        "$" + selectedPrice.toFixed(2);
}


function customCoins(element) {

    let amount = prompt("Enter the number of demo coins:");

    if (amount === null)
        return;

    amount = Number(amount);

    if (!Number.isInteger(amount) || amount <= 0) {

        alert("Please enter a valid whole number.");

        return;
    }

    /*
       Demo rate based approximately on
       the packages shown in the reference.
    */

    let price = amount * 0.01039;

    selectedCoins = amount;
    selectedPrice = price;


    document
        .querySelectorAll(".coin-card")
        .forEach(card => card.classList.remove("selected"));

    element.classList.add("selected");


    element.querySelector(".coin-number").innerHTML =
        '<span class="coin">♪</span> ' +
        amount.toLocaleString();


    element.querySelector(".price").textContent =
        "$" + price.toFixed(2);


    updateTotal();
}


function recharge() {

    /*
      DEMO ONLY:
      No card details are requested and
      no real payment takes place.
    */

    demoBalance += selectedCoins;

    document.getElementById("currentBalance").textContent =
        demoBalance.toLocaleString();


    transactions.unshift({

        coins: selectedCoins,

        price: selectedPrice,

        date: new Date()

    });


    document.getElementById("confirmedCoins").textContent =
        selectedCoins.toLocaleString();


    document
        .getElementById("confirmationModal")
        .classList.add("show");
}


function openHistory() {

    const container =
        document.getElementById("historyContent");


    if (transactions.length === 0) {

        container.innerHTML =
            "<p>No demo transactions yet.</p>";

    } else {

        container.innerHTML = transactions.map(transaction => {

            return `

                <div style="
                    padding:15px 0;
                    border-bottom:1px solid #eee;
                ">

                    <strong>
                        ${transaction.coins.toLocaleString()}
                        coins
                    </strong>

                    <div style="
                        margin-top:5px;
                        color:#555;
                    ">
                        $${transaction.price.toFixed(2)}
                    </div>

                    <small style="color:#999;">
                        ${transaction.date.toLocaleString()}
                    </small>

                </div>

            `;

        }).join("");
    }


    document
        .getElementById("historyModal")
        .classList.add("show");
}


function closeHistory() {

    document
        .getElementById("historyModal")
        .classList.remove("show");
}


function closeConfirmation() {

    document
        .getElementById("confirmationModal")
        .classList.remove("show");
}


function copyCode() {

    navigator.clipboard
        .writeText("7ZWJC8BZ")
        .then(() => {

            alert("Invitation code copied!");

        });
}


/*
Close popup by clicking outside of it.
*/

window.addEventListener("click", function(event) {

    const history =
        document.getElementById("historyModal");

    const confirmation =
        document.getElementById("confirmationModal");


    if (event.target === history)
        closeHistory();


    if (event.target === confirmation)
        closeConfirmation();

});
