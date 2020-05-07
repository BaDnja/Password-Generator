// DOM elements
const passwordResult = document.getElementById("passwordResult");
const clipboardElement = document.getElementById("clipboardElement");
const slider = document.getElementById("sliderRange");
const lengthValue = document.getElementById("rangeValue");
const upperElement = document.getElementById("UppercaseChars");
const lowerElement = document.getElementById("LowercaseChars");
const numbersElement = document.getElementById("Numbers");
const symbolsElement = document.getElementById("Symbols");
const generateBtn = document.getElementById("btnGenerate");
var symbolsArray = [];

// Slider and length value connection
lengthValue.innerHTML = slider.value;
slider.oninput = function () {
  lengthValue.innerHTML = this.value;
};

function hasOption(option) {
  return option.checked;
}

function numOfChecked() {
  return (
    hasOption(upperElement) +
    hasOption(lowerElement) +
    hasOption(numbersElement) +
    hasOption(symbolsElement)
  );
}

// Selected options
function selectedOptions() {
  var upper = hasOption(upperElement);
  var lower = hasOption(lowerElement);
  var numbers = hasOption(numbersElement);
  var symbols = hasOption(symbolsElement);
  if (symbols) {
    generateSymbolsArray();
  }
  return [{ upper }, { lower }, { numbers }, { symbols }].filter(
    (elem) => Object.values(elem)[0]
  );
}

// Generating a password
function generatePassword() {
  let password = "";

  const numofCheckedOptions = numOfChecked();
  const selected = selectedOptions();

  if (numofCheckedOptions === 0) {
    alert("Select at least one option!");
    return "";
  }

  for (let i = 0; i < slider.value; i += numofCheckedOptions) {
    selected.forEach((option) => {
      if ("upper" in option) {
        password += getUpperChar();
      } else if ("lower" in option) {
        password += getLowerChar();
      } else if ("numbers" in option) {
        password += getNumber();
      } else {
        password += getSymbol();
      }
    });
  }
  var sliced = password.slice(0, slider.value);
  var arrayPassword = Array.from(sliced);
  return arrayPassword;
}

// Shuffle a password
function shuffle(passwordArray) {
  var pwArray = passwordArray;
  let randPos, temp;

  for (let i = pwArray.length - 1; i > 0; i--) {
    randPos = Math.floor(Math.random() * (i + 1));
    temp = pwArray[i];
    pwArray[i] = pwArray[randPos];
    pwArray[randPos] = temp;
  }
  var finalArray = pwArray.toString().replace(/,/g, "");
  return finalArray;
}

// Listener for clipboard
clipboardElement.addEventListener("click", () => {
  if (passwordResult.value == "") {
    alert("There is no password to copy!");
  } else {
    passwordResult.select();
    document.execCommand("copy");
    alert("Password successfully copied!");
  }
});

// Listener for password generate button
generateBtn.addEventListener("click", () => {
  passwordResult.value = shuffle(generatePassword());
});

// Function for generating random character within a range
function getRandom(min, max) {
  return String.fromCharCode(Math.floor(Math.random() * (max - min) + min));
}

// Get Upercase Character
function getUpperChar() {
  return getRandom(65, 91);
}

// Get Lowercase Character
function getLowerChar() {
  return getRandom(97, 123);
}

// Get Number
function getNumber() {
  return getRandom(48, 58);
}

// Symbols

// Generate Symbols Array
function generateSymbolsArray() {
  const ranges = [
    [33, 44],
    [45, 48],
    [58, 65],
    [91, 97],
    [123, 126],
  ];

  for (let i = 0; i < ranges.length; i++) {
    for (let element = ranges[i][0]; element < ranges[i][1]; element++) {
      symbolsArray.push(element);
    }
  }
}

// Get random symbol from an array
function getSymbol() {
  return String.fromCharCode(
    symbolsArray[Math.floor(Math.random() * symbolsArray.length)]
  );
}
