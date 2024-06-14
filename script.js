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

function getTotalCidAmount(cid) {
    let total = 0
    for(let arr of cid) {
        total += arr[1] // index 1, the total amount of a cash amount
    }
    return Number(total.toFixed(2))
}

function getLargestAvailableCashAmountIndex(change, cashAmounts, cid) {    
    for(let i = cashAmounts.length - 1; i > 0; i--) { //start from highest index
        if(cashAmounts[i][1] <= change && cid[i][1] > 0) { // if a current cash amount is smaller than or equal to change, and is available in cid
            return i
        }
    }

    return null // in case smallest amount i.e. pennies are not available
}