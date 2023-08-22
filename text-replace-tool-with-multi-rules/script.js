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
        let replace = replaceInput.value;

        if (find !== "" && replace !== "") {
          const regex = new RegExp(find, "g");

          // Escape ${replace} with an HTML entity
          replace = replace.replace(/\$\{replace\}/g, "&#36;{replace}");

          outputText = outputText.replace(regex, (match) => {
            // Check if the match is surrounded by HTML tags
            if (match.startsWith("<") && match.endsWith(">")) {
              return `<span class="highlight">${replace}</span>`;
            } else {
              return match.replace(
                find,
                `<span class="highlight">${replace}</span>`
              );
            }
          });
        }
      }
    });

    // Unescape HTML entities back to ${replace}
    outputText = outputText.replace(/&#36;/g, "$");

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