// DOM elements
const passwordResult = document.getElementById("passwordResult");
const clipboardElement = document.getElementById("clipboardElement");
const slider = document.getElementById("sliderRange");
const rangeValue = document.getElementById("rangeValue");
const upperElement = document.getElementById("UppercaseChars");
const lowerElement = document.getElementById("LowercaseChars");
const numbersElement = document.getElementById("Numbers");
const symbolsElement = document.getElementById("Symbols");
const generateBtn = document.getElementById("btnGenerate");
const passwordAlert = document.getElementById("password-alert");
var password = "";
var timer;

// Alert options
const alertOptions = {
  leastOneOption: "Select at least one option...",
  noPwtoCopy: "There is no password to copy...",
  successCopy: "Password successfully copied!",
};

// Ranges for characters
const upperRanges = [
  [65, 73],
  [74, 76],
  [77, 79],
  [80, 91],
];

const lowerRanges = [
  [97, 105],
  [106, 108],
  [109, 111],
  [112, 123],
];

const numberRanges = [[50, 58]];

const symbolRanges = [
  [33, 34],
  [35, 39],
  [42, 44],
  [61, 62],
  [63, 65],
  [94, 96],
];

// Initiate initial arrays
upperCharArray = [];
lowerCharArray = [];
numberArray = [];
symbolArray = [];
// Generate arrays for all characters;
generateCharArray(upperRanges, upperCharArray);
generateCharArray(lowerRanges, lowerCharArray);
generateCharArray(numberRanges, numberArray);
generateCharArray(symbolRanges, symbolArray);

// Slider and length value connection
rangeValue.innerHTML = slider.value;
slider.oninput = function () {
  rangeValue.innerHTML = this.value;
};

// Generate characters array
function generateCharArray(ranges, array) {
  for (let i = 0; i < ranges.length; i++) {
    for (let element = ranges[i][0]; element < ranges[i][1]; element++) {
      array.push(element);
    }
  }
}

// Selected options
function selectedOptions() {
  var upper = upperElement.checked;
  var lower = lowerElement.checked;
  var numbers = numbersElement.checked;
  var symbols = symbolsElement.checked;
  return [{ upper }, { lower }, { numbers }, { symbols }].filter(
    (elem) => Object.values(elem)[0]
  );
}

// Get number of selected options
function getNumberOfSelectedOptions() {
  var options = selectedOptions();
  return options.length;
}

// Password seed function: includes minimum characters in password
function passwordSeed() {
  options = selectedOptions();

  options.forEach((element) => {
    curr = Object.keys(element);

    if (curr == "upper") {
      password += getUpperChar();
    } else if (curr == "lower") {
      password += getLowerChar();
    } else if (curr == "numbers") {
      password += getNumber();
    } else {
      password += getSymbol();
    }
  });
}

function generate() {
  passwordSeed();
  options = selectedOptions();
  var rand;

  while (password.length < slider.value) {
    options.forEach((elem) => {
      curr = Object.keys(elem);
      if (curr == "upper") {
        rand = Math.floor(
          Math.random() * (password.length / 2 - slider.value / 5) +
            slider.value / 3
        );
        for (el = 0; el < rand; el++) {
          password += getUpperChar();
        }
      }
      if (curr == "lower") {
        rand = Math.floor(
          Math.random() * (password.length / 2 - slider.value / 5) +
            slider.value / 3
        );
        for (el = 0; el < rand; el++) {
          password += getLowerChar();
        }
      }
      if (curr == "numbers") {
        rand = Math.floor(
          Math.random() * (password.length / 2 - slider.value / 5) +
            slider.value / 3
        );
        for (el = 0; el < rand; el++) {
          password += getNumber();
        }
      }
      if (curr == "symbols") {
        rand = Math.floor(
          Math.random() * (password.length / 2 - slider.value / 5) +
            slider.value / 3
        );
        for (el = 0; el < rand; el++) {
          password += getSymbol();
        }
      }
    });
  }
}

// Shuffle a password
function shuffle() {
  var array = Array.from(password);
  var currentIndex = array.length,
    temporaryValue,
    randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {
    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }
  var finalPw = array.toString().replace(/,/g, "").slice(0, slider.value);
  password = finalPw;
}

// Alert message disappear
function removeMessage() {
  passwordAlert.innerHTML = "&nbsp;";
}

var startTimer = function () {
  clearTimeout(timer);
  timer = setTimeout(removeMessage, 6000);
};

// Listener for clipboard
clipboardElement.addEventListener("click", () => {
  if (passwordResult.value == "") {
    passwordAlert.style.color = "#ff414d";
    passwordAlert.innerText = alertOptions["noPwtoCopy"];
    startTimer();
  } else {
    passwordResult.select();
    document.execCommand("copy");
    passwordAlert.style.color = "#32e0c4";
    passwordAlert.innerText = alertOptions["successCopy"];
    startTimer();
  }
});

// Listener for password generate button
generateBtn.addEventListener("click", () => {
  if (getNumberOfSelectedOptions() == 0) {
    passwordAlert.style.color = "#ff414d";
    passwordAlert.innerText = alertOptions["leastOneOption"];
    startTimer();
  } else {
    generate();
    shuffle();
    passwordResult.value = password;
    password = "";
  }
});

// Get random symbol
function getRandom(array) {
  return String.fromCharCode(array[Math.floor(Math.random() * array.length)]);
}

// Get random Upercase Character from an array
function getUpperChar() {
  return getRandom(upperCharArray);
}

// Get random Lowercase Character from an array
function getLowerChar() {
  return getRandom(lowerCharArray);
}

// Get random number from an array
function getNumber() {
  return getRandom(numberArray);
}

// Get random symbol from an array
function getSymbol() {
  return getRandom(symbolArray);
}
