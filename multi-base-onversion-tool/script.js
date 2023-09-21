const input = document.getElementById("input");
const output = document.getElementById("output");
const inputBin = document.getElementById("input-bin");
const inputOct = document.getElementById("input-oct");
const inputDec = document.getElementById("input-dec");
const inputHex = document.getElementById("input-hex");
const outputBin = document.getElementById("output-bin");
const outputOct = document.getElementById("output-oct");
const outputDec = document.getElementById("output-dec");
const outputHex = document.getElementById("output-hex");
const switchBtn = document.getElementById("switch-btn");
const copyBtn = document.getElementById("copy-btn");

// 填充输出长度
function convertNumber(number, fromBase, toBase) {
  let result = parseInt(number, fromBase).toString(toBase).toUpperCase();
  if (toBase === 16) {
    result = result.padStart(8, "0");
  } else if (toBase === 2) {
    result = result.padStart(32, "0");
  }
  return result;
}

// 将输入框的内容转换为输出进制的值
function convertInput() {
  const value = input.value.trim();
  if (value === "") {
    output.value = "";
    return;
  }

  let inputBase;
  if (inputBin.checked) {
    inputBase = 2;
  } else if (inputOct.checked) {
    inputBase = 8;
  } else if (inputDec.checked) {
    inputBase = 10;
  } else if (inputHex.checked) {
    inputBase = 16;
  }
  let outputBase;
  if (outputBin.checked) {
    outputBase = 2;
  } else if (outputOct.checked) {
    outputBase = 8;
  } else if (outputDec.checked) {
    outputBase = 10;
  } else if (outputHex.checked) {
    outputBase = 16;
  }
  const num = parseInt(value, inputBase);
  //  const num = convertNumber(parseInt(value, inputBase), inputBase, outputBase);
  if (isNaN(num)) {
    output.value = "输入格式错误";
  } else {
    output.value = num.toString(outputBase).toUpperCase();
  }
}

// 切换输入输出
function switchInputOutput() {
  const inputValue = input.value;
  const inputBase = document.querySelector(
    'input[name="input-base"]:checked'
  ).value;
  const outputBase = document.querySelector(
    'input[name="output-base"]:checked'
  ).value;
  input.value = output.value;
  document.querySelector(
    `input[name="input-base"][value="${outputBase}"]`
  ).checked = true;
  output.value = inputValue;
  document.querySelector(
    `input[name="output-base"][value="${inputBase}"]`
  ).checked = true;
}

// 复制输出框的内容到剪贴板
function copyOutput() {
  output.select();
  document.execCommand("copy");
  copyBtn.textContent = "已复制";
  copyBtn.classList.add("copied");
  setTimeout(() => {
    copyBtn.textContent = "复制内容";
    copyBtn.classList.remove("copied");
  }, 1000);
}

// 监听输入框的内容变化，自动转换
input.addEventListener("input", convertInput);

// 监听输入进制选择栏的变化，自动转换
inputBin.addEventListener("change", convertInput);
inputOct.addEventListener("change", convertInput);
inputDec.addEventListener("change", convertInput);
inputHex.addEventListener("change", convertInput);

// 监听输出进制选择栏的变化，自动转换
outputBin.addEventListener("change", convertInput);
outputOct.addEventListener("change", convertInput);
outputDec.addEventListener("change", convertInput);
outputHex.addEventListener("change", convertInput);

// 监听切换输入输出按钮的点击事件
switchBtn.addEventListener("click", switchInputOutput);

// 监听一键复制按钮的点击事件
copyBtn.addEventListener("click", copyOutput);

// 监听输出框的双击事件，复制内容并提示
output.addEventListener("dblclick", function () {
  copyOutput();
  setTimeout(() => {
    copyBtn.textContent = "复制内容";
    copyBtn.classList.remove("copied");
  }, 1000);
});

// 初始化，自动转换输入框的内容
convertInput();

function goToHomePage() {
  window.location.href = "../index.html";
}
