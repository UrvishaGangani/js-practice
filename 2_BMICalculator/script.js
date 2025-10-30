const body = document.querySelector('body')
const height = document.querySelector("#height");
const weight = document.querySelector("#weight");
const heightError = document.querySelector("#height-error");
const weightError = document.querySelector("#weight-error");
const cal_btn = document.querySelector("#calculate_btn");
const result = document.querySelector("#result");

function calculateBMI(weight, height) {
    if (height === '' || height < 0 || isNaN(height)
    || weight === "" || weight < 0 || isNaN(weight)) {
        return `please give a valid numbers`;
    }   

    const bmi = weight / ((height * height)/10000).toFixed(2);
    console.log(`weight : ${weight} \n  height : ${height} \n BMI : ${bmi} `)
    let category = '';
    if (bmi < 18.5) {
      category = "Underweight";
    } else if (bmi >= 18.5 && bmi < 24.9) {
      category = "Normal Weight";
    } else if (bmi >= 25 && bmi < 29.9) {
      category = "Overweight";
    } else {
      category = "Obese";
    }
    return `Your BMI is ${bmi.toFixed(1)} (${category})`;
}

cal_btn.addEventListener('click', function (e) {
    e.preventDefault()

    const height = parseFloat(document.querySelector("#height").value);
    const weight = parseFloat(document.querySelector("#weight").value);
    const resultElement = document.getElementById("result");

    const result = calculateBMI(weight, height);
    resultElement.innerHTML = `<b>${result}</b>`;
})
function isNumber(value) {
  return !isNaN(value) && value.trim() !== "";
}
height.addEventListener("input", () => {
    if (!isNumber(height.value)) {
        heightError.textContent = "Enter a valid number";
    } else {
        heightError.textContent = "";
    }
});
weight.addEventListener("input", () => {
  if (!isNumber(weight.value)) {
    weightError.textContent = "Enter a valid number";
  } else {
    weightError.textContent = "";
  }
});