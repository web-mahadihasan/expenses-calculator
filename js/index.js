
function getValue(id) {
  const inputValue = document.getElementById(id).value;
  const inputNumber = parseFloat(inputValue);
  return inputNumber;
}

function clearInput(){
  const allInput = document.querySelectorAll(".input-item");
  for(const input of allInput){
    input.value = ""
  }
}



// get Elements 
const totalExpense = document.getElementById("total-expense");
const balance = document.getElementById("balance");
const savingAmount = document.getElementById("savings-amount");
const remainingAmount = document.getElementById("remaining-amount");
const historyMainContainer = document.getElementById("history-main-container");
const calculatorContainer = document.getElementById("calculator-container");

// button tab change
const historyBtn = document.getElementById("history-btn");
const calculatorBtn = document.getElementById("calculator-btn");

let getExpense = 0;

document.getElementById("calculator-btn").addEventListener("click",() => {
 
  calculatorBtn.classList.add("text-white", "bg-gradient-to-r", "from-blue-600",  "to-purple-500");
  calculatorBtn.classList.remove("text-gray-600");

  historyBtn.classList.remove("text-white", "bg-gradient-to-r", "from-blue-600",  "to-purple-500");
  historyBtn.classList.add("text-gray-600");

  calculatorContainer.classList.remove("hidden");
  historyMainContainer.classList.add("hidden");

});

document.getElementById("history-btn").addEventListener("click", () => {

  calculatorBtn.classList.remove("text-white", "bg-gradient-to-r", "from-blue-600",  "to-purple-500");
  calculatorBtn.classList.add("text-gray-600");

  historyBtn.classList.add("text-white", "bg-gradient-to-r", "from-blue-600",  "to-purple-500");
  historyBtn.classList.remove("text-gray-600");

  calculatorContainer.classList.add("hidden")
  historyMainContainer.classList.remove("hidden");

});


// Button calculate 
document.getElementById("calculate-btn").addEventListener("click", () => {
  const income = getValue("income");
  const rent = getValue("rent");
  const food = getValue("food");
  const others = getValue("others");

  if(income <= 0 || rent < 0 || food < 0 || others < 0){
    alert `Invalid income input`
  }else{
    const allExpense = food + rent + others;
    getExpense = allExpense;
    const restBalance = income - allExpense

    if(allExpense > income){r
      alert `Your Expense too much! Earn money`
    } else{
      totalExpense.innerText = allExpense.toFixed(2);
      balance.innerText = restBalance.toFixed(2);
    }
  }


});

document.getElementById("savings-btn").addEventListener("click", () => {
  const savingsInput = getValue("savings");
  const income = getValue("income");
  const getBalance = parseFloat(document.getElementById("balance").innerText);

  // input validation
  const savingsInputs = document.getElementById("savings").value;
  const inputToArray = [...savingsInputs];
  const checkInput = inputToArray.every(item => !isNaN(Number(item)))

  // Percentage validation 
  const maxPercentage = (getBalance / income) * 100;

  if (!checkInput || savingsInput > maxPercentage || income <= 0) {
    alert`Invalid savings input`;
  } else {
    const getSavings = (income * savingsInput) / 100;
    const amountAfterSaving = getBalance - getSavings;

    savingAmount.innerText = getSavings.toFixed(2);
    remainingAmount.innerText = amountAfterSaving.toFixed(2);

    // Create History 
    const historyContainer = document.getElementById("history-container");
  const date = new Date().toLocaleDateString();
  const createDiv = document.createElement("div")
  createDiv.classList.add("py-2", "px-3", "bg-white", "rounded-md", "border-l-2", "border-purple-500");

  createDiv.innerHTML +=`
  <p class="text-gray-500">${date}</p>
  <h5 class="text-black font-bold">Income: $ ${income}</span></h5>
  <p class="text-gray-500 font-medium">Expenses: $ ${getExpense}</span></p>
  <p class="text-gray-500 font-medium">Balance: $ ${getBalance}</p>
  `;
  
    historyContainer.appendChild(createDiv);

    checkInput();
  }
});

