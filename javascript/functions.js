/**
 * @param {string} str
 * @returns {string}
 */
function htmlspecialchars(str)
{
    return String(str).replace(/[&<>\"]/g, s => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[s]));
}

/**
 * @param {string} text
 * @param {string} cls
 * @param {boolean} isPrompt
 * @returns {HTMLDivElement}
 */
function print(text, cls = "", isPrompt = false) {
    const div = document.createElement("div");

    if (isPrompt === true) {
        const words = text.split(" ");
        const prompt = document.createElement("span");
        prompt.innerHTML = words[0];
        prompt.className = "command-input__label";
        div.appendChild(prompt)
        div.appendChild(document.createTextNode(words[1]))
        output.appendChild(div);
        return div;
    }

    div.className = cls;
    div.innerHTML = text;
    output.appendChild(div);
    output.scrollTop = output.scrollHeight;
    return div;
}

/**
 * @param {string} command
 */
function pushHistory(command)
{
    if (command.length === 0)
    {
        return ;
    }
    history.push(command);
    if (history.length > 100)
    {
        history.shift();
    }
    localStorage.setItem("history", JSON.stringify(history));
    historyIndex = null;
}

function historyPrevious()
{
    if (history.length === 0)
    {
        return ;
    }
    if (historyIndex === null)
    {
        historyIndex = history.length - 1;
    }
    else
    {
        historyIndex = Math.max(0, historyIndex - 1);
    }
    input.value = history[historyIndex];
}

function historyNext()
{
    if (historyIndex === null)
    {
        return ;
    }
    historyIndex = Math.min(history.length, historyIndex + 1);
    input.value = history[historyIndex] || "";
    if (historyIndex >= history.length)
    {
        historyIndex = null;
    }
}

/**
 * @param {string} value
 * @returns {string|null}
 */
function autocomplete(value)
{
    const list = Object.keys(commands).filter(key => key.startsWith(value));
    if (!value)
    {
        return null;
    }
    if (list.length === 1)
    {
        return list[0] + " ";
    }
    if (list.length > 1)
    {
        print(list.join(" "));
    }
    return null;
}
