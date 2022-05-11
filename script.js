

const balance = document.getElementById('balance')
const money_plus = document.getElementById('money-plus')
const money_minus = document.getElementById('money-minus')
const list = document.getElementById('list')
const form = document.getElementById('form')
const text = document.getElementById('text')
const amount = document.getElementById('amount')


const localStorageTransactions = JSON.parse(
    localStorage.getItem('transactions')
  );

let transactions;

if (localStorage.getItem('transactions') !== null) {
    transactions = localStorageTransactions;
} else {
    transactions = [];
}

//Add transaction event

function addTransaction(e) {
    e.preventDefault()

    if(text.value.trim() ==='' || amount.value.trim() === '') {
        alert('Please add a text and amount')
    } else {
        const transaction = {
            id:generateID(),
            text:text.value,
            amount:+amount.value // amount trebe sa fie un numar nu un string
        }

        transactions.push(transaction)// adaugam elementele la sfarsitul array ului

        addTransactionDOM(transaction)

        updateValues()

        updateLocalStorage()

        text.value= ''
        amount.value= ''
    }
}

//Generate random id
function generateID(){
    return Math.floor(Math.random() * 100000000)
   
}

// Add transactions to DOM list
function addTransactionDOM(transaction) {
   //Get sign
   const sign = transaction.amount<0 ? '-' : '+'

   const item = document.createElement('li')

   // Add class based on value
   item.classList.add(transaction.amount < 0 ? 'minus' : 'plus')


   item.innerHTML = `
   ${transaction.text} <span> ${sign} ${Math.abs(transaction.amount)}</span> 
   <button class = "delete-btn" onclick="removeTransaction(${transaction.id})"> x </button>
   `
   list.appendChild(item)
}


// Update balance income, expense

function updateValues(){
    const amounts = transactions.map(transaction => 
        transaction.amount)

    const total = amounts.reduce((acc,item) => (acc += item),0)
    .toFixed(2)// 2 zecimale


    const income = amounts
                    .filter(item => item > 0)
                    .reduce((acc,item) => (acc += item),0)
                    .toFixed(2)

    const expense = (
        amounts.filter( item => item < 0).reduce((acc,item) => (acc += item),0) *-1).toFixed(2)

    balance.innerText = `$${total}`
    money_plus.innerText = `$${income}`
    money_minus.innerText = `$${expense}`
                
    
}

//Remove transaction by id function
function removeTransaction(id){
    transactions= transactions.filter(transaction => transaction.id !== id) // if its not the id that its passed in, than its going in the array

    updateLocalStorage()
    
    init()
}

//Update local storage transaction

function updateLocalStorage() {
    localStorage.setItem('transactions' , JSON.stringify(transactions))
}

// Init app
function init() {
    list.innerHTML = '' // clear off the list

    transactions.forEach(addTransactionDOM) 
    updateValues()
}
init()

form.addEventListener('submit',addTransaction)


















