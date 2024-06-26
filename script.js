let price = 1.87;
let cid = [
  ["PENNY", 1.01],
  ["NICKEL", 2.05],
  ["DIME", 3.1],
  ["QUARTER", 4.25],
  ["ONE", 90],
  ["FIVE", 55],
  ["TEN", 20],
  ["TWENTY", 60],
  ["ONE HUNDRED", 100]
];

let cashAmounts = [
    ["PENNY", 0.01],
    ["NICKEL", 0.05],
    ["DIME", 0.1],
    ["QUARTER", 0.25],
    ["ONE", 1],
    ["FIVE", 5],
    ["TEN", 10],
    ["TWENTY", 20],
    ["ONE HUNDRED", 100]
];

initialiseApp()

function getTotalCidAmount(cid) {
    let total = 0
    for(let arr of cid) {
        total += arr[1] // index 1, the total amount of a cash amount
    }
    return Number(total.toFixed(2))
}

function getLargestAvailableCashAmountIndex(change, cashAmounts, cid) {    
    for(let i = cashAmounts.length - 1; i >= 0; i--) { //start from highest index
        if(cashAmounts[i][1] <= change && cid[i][1] > 0) { // if a current cash amount is smaller than or equal to change, and is available in cid
            return i
        }
    }

    return null // in case smallest amount i.e. pennies are not available
}

function convertFinalChangeAmountToString(arr) {
    let finalString = ""

    for(let i = arr.length - 1; i >= 0; i--) { //start from highest index
        if(arr[i][1] > 0) {
            finalString += `${arr[i][0]}: $${arr[i][1]}\n`
        }
    }

    return finalString.trim()
}

function deepCopy(arr) {
    return arr.map(item => Array.isArray(item) ? deepCopy(item) : item);
}

function getChangeString(change, cid) {
    let remainingChange = change
    let copyCid = deepCopy(cid)
    let finalChange = [
        ["PENNY", 0],
        ["NICKEL", 0],
        ["DIME", 0],
        ["QUARTER", 0],
        ["ONE", 0],
        ["FIVE", 0],
        ["TEN", 0],
        ["TWENTY", 0],
        ["ONE HUNDRED", 0]
    ]
    let currentCashAmount = null
    let currentCashAmountIndex = null

    while(remainingChange > 0) {
        currentCashAmountIndex = getLargestAvailableCashAmountIndex(remainingChange, cashAmounts, copyCid)

        if(currentCashAmountIndex !== null) {
            currentCashAmount = cashAmounts[currentCashAmountIndex][1]

            remainingChange = Number(parseFloat(remainingChange - currentCashAmount).toFixed(2))
            copyCid[currentCashAmountIndex][1] = Number(parseFloat(copyCid[currentCashAmountIndex][1] - currentCashAmount).toFixed(2))
            finalChange[currentCashAmountIndex][1] = Number(parseFloat(finalChange[currentCashAmountIndex][1] + currentCashAmount).toFixed(2))

        } else {
            return "" // cannot make exact change
        }
    }
    return convertFinalChangeAmountToString(finalChange)
}

function generateOutput() {
    const cashInput = document.getElementById('cash')
    const changeDueDiv = document.getElementById('change-due')
    const cash = Number(parseFloat(cashInput.value).toFixed(2))
    const totalAmountInCid = getTotalCidAmount(cid)
    const change = Number(parseFloat(cash - price).toFixed(2))
    let status

    if(cash < price) {
        alert("Customer does not have enough money to purchase the item")
    } else if (cash === price) {
        status = "No change due - customer paid with exact cash"
    } else if (change === totalAmountInCid) {
        status = `Status: CLOSED\n${getChangeString(change, cid)}`
    } else if (totalAmountInCid > change && getChangeString(change, cid) !== "") {
        status = `Status: OPEN\n${getChangeString(change, cid)}`
    } else {
        status = "Status: INSUFFICIENT_FUNDS"
    }

    changeDueDiv.innerHTML = status
}

function clickPurchaseButton() {
    generateOutput()
}

function initialiseApp() {
    const purchaseButton = document.getElementById('purchase-btn')
    const total = document.getElementById('total')
    const changeInDrawerList = document.getElementById('change-in-drawer-list')

    purchaseButton.addEventListener('click', clickPurchaseButton)
    total.innerHTML = `Price: $${price}`
    changeInDrawerList.innerHTML = convertFinalChangeAmountToString(cid)
}