let selectedCoins = 1000;
let selectedPrice = 10.39;

let balance = 0;

let transactions = [];


/*
------------------------------------
LOCAL UNIVERSITY PROJECT USERS
------------------------------------

Add/remove usernames here.

This does NOT connect to TikTok.
*/

const projectUsers = [

    {
        username: "secretttttyyyy",
        display: "Secret",
        initial: "S"
    },

    {
        username: "meer.collection",
        display: "Meer Collection",
        initial: "M"
    },

    {
        username: "university.project",
        display: "University Project",
        initial: "U"
    },

    {
        username: "test.account",
        display: "Test Account",
        initial: "T"
    }

];


/*
------------------------------------
COIN PACKAGE
------------------------------------
*/

function choosePackage(card) {

    document
        .querySelectorAll(".coin-option")
        .forEach(item => {

            item.classList.remove("selected");

        });


    card.classList.add("selected");


    selectedCoins =
        Number(card.dataset.coins);


    selectedPrice =
        Number(card.dataset.price);


    updateTotal();

}


function updateTotal() {

    document
        .getElementById("total")
        .textContent =
        "$" + selectedPrice.toFixed(2);

}


/*
------------------------------------
CUSTOM COINS
------------------------------------
*/

function openCustomCoins() {

    document
        .getElementById("customModal")
        .classList.add("show");


    setTimeout(() => {

        document
            .getElementById("customAmount")
            .focus();

    }, 100);

}


function closeCustomCoins() {

    document
        .getElementById("customModal")
        .classList.remove("show");

}


function applyCustomCoins() {

    const input =
        document.getElementById("customAmount");


    const amount =
        Number(input.value);


    if (
        !Number.isInteger(amount) ||
        amount <= 0
    ) {

        alert(
            "Please enter a valid coin amount."
        );

        return;

    }


    /*
       Approximate display rate used only
       by this university interface.
    */

    const price =
        amount * 0.01039;


    selectedCoins =
        amount;


    selectedPrice =
        Number(price.toFixed(2));


    document
        .querySelectorAll(".coin-option")
        .forEach(item => {

            item.classList.remove("selected");

        });


    const customCard =
        document.getElementById("customCard");


    customCard
        .classList.add("selected");


    document
        .getElementById("customCoinTitle")
        .textContent =
        amount.toLocaleString();


    document
        .getElementById("customCoinPrice")
        .textContent =
        "$" + selectedPrice.toFixed(2);


    updateTotal();

    closeCustomCoins();

}


/*
------------------------------------
RECHARGE
------------------------------------
*/

function recharge() {

    balance += selectedCoins;


    document
        .getElementById("balance")
        .textContent =
        balance.toLocaleString();


    const username =
        document
            .getElementById("selectedUsername")
            .textContent;


    transactions.unshift({

        username: username,

        coins: selectedCoins,

        price: selectedPrice,

        time: new Date()

    });


    document
        .getElementById("successCoins")
        .textContent =
        selectedCoins.toLocaleString();


    document
        .getElementById("successModal")
        .classList.add("show");

}


function closeSuccess() {

    document
        .getElementById("successModal")
        .classList.remove("show");

}


/*
------------------------------------
TRANSACTION HISTORY
------------------------------------
*/

function openHistory() {

    const history =
        document.getElementById("historyList");


    if (transactions.length === 0) {

        history.innerHTML = `

            <div class="empty-history">

                No transactions yet.

            </div>

        `;

    }

    else {

        history.innerHTML =
            transactions
                .map(transaction => {

                    return `

                        <div class="history-entry">

                            <div class="history-entry-top">

                                <span>

                                    ${transaction.coins.toLocaleString()}
                                    Coins

                                </span>

                                <span>

                                    $${transaction.price.toFixed(2)}

                                </span>

                            </div>

                            <small>

                                ${escapeHTML(transaction.username)}

                            </small>

                            <small>

                                ${transaction.time.toLocaleString()}

                            </small>

                        </div>

                    `;

                })
                .join("");

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


/*
------------------------------------
USERNAME SEARCH
------------------------------------
*/

function searchUsername() {

    const input =
        document
            .getElementById("usernameInput")
            .value
            .trim()
            .toLowerCase();


    const resultsBox =
        document
            .getElementById("searchResults");


    if (!input) {

        resultsBox.innerHTML = "";

        resultsBox
            .classList
            .remove("show");

        return;

    }


    const matches =
        projectUsers.filter(user => {

            return (

                user.username
                    .toLowerCase()
                    .includes(input)

                ||

                user.display
                    .toLowerCase()
                    .includes(input)

            );

        });


    if (matches.length === 0) {

        resultsBox.innerHTML = `

            <div
                style="
                    padding:15px;
                    color:#777;
                    font-size:13px;
                "
            >

                No project user found.

            </div>

        `;

    }

    else {

        resultsBox.innerHTML =
            matches.map((user, index) => {

                return `

                    <button
                        class="search-user"
                        onclick="selectUser('${escapeAttribute(user.username)}')"
                    >

                        <span class="search-avatar">

                            ${escapeHTML(user.initial)}

                        </span>

                        <span>

                            <strong>

                                ${escapeHTML(user.username)}

                            </strong>

                            <small>

                                ${escapeHTML(user.display)}

                            </small>

                        </span>

                    </button>

                `;

            }).join("");

    }


    resultsBox
        .classList
        .add("show");

}


/*
Search while typing.
*/

document
    .getElementById("usernameInput")
    .addEventListener(
        "input",
        searchUsername
    );


/*
Press Enter to search.
*/

document
    .getElementById("usernameInput")
    .addEventListener(
        "keydown",
        function(event) {

            if (event.key === "Enter") {

                searchUsername();

            }

        }
    );


function selectUser(username) {

    const user =
        projectUsers.find(
            item =>
                item.username === username
        );


    if (!user) {

        return;

    }


    document
        .getElementById("selectedUsername")
        .textContent =
        user.username;


    document
        .querySelector(".avatar")
        .textContent =
        user.initial;


    document
        .getElementById("usernameInput")
        .value =
        user.username;


    document
        .getElementById("searchResults")
        .classList
        .remove("show");

}


/*
------------------------------------
INVITE CODE
------------------------------------
*/

function copyInviteCode() {

    const code =
        "7ZWJC8BZ";


    if (
        navigator.clipboard &&
        navigator.clipboard.writeText
    ) {

        navigator.clipboard
            .writeText(code)
            .then(() => {

                alert(
                    "Invitation code copied."
                );

            });

    }

    else {

        alert(
            "Invitation code: " + code
        );

    }

}


/*
------------------------------------
SAFE HTML OUTPUT
------------------------------------
*/

function escapeHTML(value) {

    return String(value)

        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;")
        .replaceAll("'", "&#039;");

}


function escapeAttribute(value) {

    return String(value)

        .replaceAll("\\", "\\\\")
        .replaceAll("'", "\\'");

}


/*
------------------------------------
CLICK OUTSIDE MODALS
------------------------------------
*/

window.addEventListener(
    "click",
    function(event) {

        const custom =
            document
                .getElementById("customModal");


        const success =
            document
                .getElementById("successModal");


        const history =
            document
                .getElementById("historyModal");


        if (event.target === custom) {

            closeCustomCoins();

        }


        if (event.target === success) {

            closeSuccess();

        }


        if (event.target === history) {

            closeHistory();

        }


        const searchWrap =
            document
                .querySelector(
                    ".username-search-wrap"
                );


        if (
            searchWrap &&
            !searchWrap.contains(event.target)
        ) {

            document
                .getElementById("searchResults")
                .classList
                .remove("show");

        }

    }
);


/*
ESC closes windows.
*/

document.addEventListener(
    "keydown",
    function(event) {

        if (event.key === "Escape") {

            closeCustomCoins();

            closeSuccess();

            closeHistory();

            document
                .getElementById("searchResults")
                .classList
                .remove("show");

        }

    }
);