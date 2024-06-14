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

function getTotalCidAmount(cid) {
    let total = 0
    for(let arr of cid) {
        total += arr[1] // index 1, the total amount of a cash amount
    }
    return Number(total.toFixed(2))
}