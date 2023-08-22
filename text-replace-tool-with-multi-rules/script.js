function addReplaceRule() {
    const replaceRulesDiv = document.getElementById("replaceRules");
    const newReplaceRuleDiv = document.createElement("div");
    const ruleIndex = replaceRulesDiv.children.length + 1;
  
    newReplaceRuleDiv.className = "replaceRule";
    newReplaceRuleDiv.innerHTML = `
      <label for="find${ruleIndex}">待替换文本 ${ruleIndex}:</label>
      <input type="text" class="find" id="find${ruleIndex}" oninput="applyReplacements()">
      <label for="replace${ruleIndex}">替换后文本 ${ruleIndex}:</label>
      <input type="text" class="replace" id="replace${ruleIndex}" oninput="applyReplacements()">
    `;
  
    replaceRulesDiv.appendChild(newReplaceRuleDiv);
  }
  
  function applyReplacements() {
    const inputText = document.getElementById("input").value;
    const replaceRules = document.querySelectorAll(".replaceRule");
  
    let outputText = inputText;
  
    replaceRules.forEach((rule, index) => {
      const findInput = rule.querySelector(`#find${index + 1}`);
      const replaceInput = rule.querySelector(`#replace${index + 1}`);
  
      if (findInput && replaceInput) {
        const find = findInput.value;
        const replace = replaceInput.value;
  
        if (find !== "" && replace !== "") {
          const regex = new RegExp(find, "g");
          outputText = outputText.replace(regex, match => `<span class="highlight">${replace}</span>`);
        }
      }
    });
  
    document.getElementById("output").innerHTML = outputText;
  }
  
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
  
  function exportRules() {
    const replaceRules = document.querySelectorAll(".replaceRule");
    const rules = [];
  
    replaceRules.forEach((rule, index) => {
      const findInput = rule.querySelector(`#find${index + 1}`);
      const replaceInput = rule.querySelector(`#replace${index + 1}`);
  
      if (findInput && replaceInput) {
        const find = findInput.value;
        const replace = replaceInput.value;
        rules.push(`${find},${replace}`);
      }
    });
  
    const rulesText = rules.join(";");
    const blob = new Blob([rulesText], { type: "text/plain;charset=utf-8" });
    saveAs(blob, "replace_rules.txt");
  }
  
  function importRules(event) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
  
      reader.onload = function(e) {
        const rulesText = e.target.result;
        const rulesArray = rulesText.split(";").map(rule => rule.trim()).filter(rule => rule !== "");
  
        rulesArray.forEach((rule, index) => {
          const [find, replace] = rule.split(",");
          const ruleIndex = index + 1;
  
          const findInput = document.querySelector(`#find${ruleIndex}`);
          const replaceInput = document.querySelector(`#replace${ruleIndex}`);
  
          if (findInput && replaceInput) {
            findInput.value = find;
            replaceInput.value = replace;
          }
        });
  
        applyReplacements();
      };
  
      reader.readAsText(file);
    }
  }
  