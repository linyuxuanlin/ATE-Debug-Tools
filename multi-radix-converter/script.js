// 获取 DOM 元素
const inputBaseRadios = document.getElementsByName("input-base");
const inputElement = document.getElementById("input");
const outputBaseRadios = document.getElementsByName("output-base");
const outputElement = document.getElementById("output");
const switchBtn = document.getElementById("switch-btn");
const verticalOutputBtn = document.getElementById("vertical-output-btn");

// 转换函数
function convert() {
  let inputBase, outputBase;
  for (let i = 0; i < inputBaseRadios.length; i++) {
    if (inputBaseRadios[i].checked) {
      inputBase = parseInt(inputBaseRadios[i].value);
      break;
    }
  }
  for (let i = 0; i < outputBaseRadios.length; i++) {
    if (outputBaseRadios[i].checked) {
      outputBase = parseInt(outputBaseRadios[i].value);
      break;
    }
  }
  const input = inputElement.value;

  // 将输入内容转换为十进制
  const decimal = input ? parseInt(input, inputBase) : NaN;

  // 将十进制转换为输出进制
  let output = isNaN(decimal) ? "" : decimal.toString(outputBase);

  if (outputBase === 2) {
    // 如果输出二进制的位数小于32位，前面补0
    output = output.padStart(32, "0");
  }

  // 显示结果
  outputElement.textContent = output;
  // 如果竖向输出按钮已经被按下，将输出转换为竖向输出
  if (verticalOutputBtn.checked) {
    verticalOutput(outputBase);
  }
}

// 自动转换输入
inputElement.addEventListener("input", convert);

// 一键切换函数
function switchOutput() {
  // 获取当前输入和输出的值和进制
  const input = inputElement.value;
  const output = outputElement.textContent;
  let inputBase, outputBase;
  for (let i = 0; i < inputBaseRadios.length; i++) {
    if (inputBaseRadios[i].checked) {
      inputBase = parseInt(inputBaseRadios[i].value);
      break;
    }
  }
  for (let i = 0; i < outputBaseRadios.length; i++) {
    if (outputBaseRadios[i].checked) {
      outputBase = parseInt(outputBaseRadios[i].value);
      break;
    }
  }

  // 切换输入和输出的值和进制
  inputElement.value = output;
  outputElement.textContent = input;
  for (let i = 0; i < inputBaseRadios.length; i++) {
    if (parseInt(inputBaseRadios[i].value) === outputBase) {
      inputBaseRadios[i].checked = true;
      break;
    }
  }
  for (let i = 0; i < outputBaseRadios.length; i++) {
    if (parseInt(outputBaseRadios[i].value) === inputBase) {
      outputBaseRadios[i].checked = true;
      break;
    }
  }

  // 自动转换输出
  convert();
}

// 双击输出结果复制
outputElement.addEventListener("dblclick", () => {
  navigator.clipboard.writeText(outputElement.textContent);
  //alert("已复制");
});

// 绑定事件
switchBtn.addEventListener("click", switchOutput);
copyBtn.addEventListener("click", copyOutput);
//verticalOutputBtn.addEventListener("click", verticalOutput);

function copyOutput() {
  const outputText = document.getElementById("output").innerText;
  const tempTextArea = document.createElement("textarea");
  tempTextArea.value = outputText;
  document.body.appendChild(tempTextArea);
  tempTextArea.select();
  document.execCommand("copy");
  document.body.removeChild(tempTextArea);
  alert("已复制到剪贴板！");
}

function goToHomePage() {
  window.location.href = "../index.html";
}

// 竖向输出函数
function verticalOutput(outputBase) {
  // 如果输出不为二进制，不做任何操作
  if (outputBase !== 2) {
    return;
  }

  // 将输出转换为竖向输出
  let verticalOutput = "";
  for (let i = 0; i < outputElement.textContent.length; i++) {
    verticalOutput += outputElement.textContent[i] + "\n";
  }
  verticalOutput = verticalOutput.replace(/0/g, "L").replace(/1/g, "H");

  // 显示竖向输出
  outputElement.innerHTML = "<pre>" + verticalOutput + "</pre>";
}
