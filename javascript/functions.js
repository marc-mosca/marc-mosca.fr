function htmlspecialchars(str) {
  return String(str).replace(/[&<>\"]/g, s => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[s]));
}

function print(text, cls = "") {
  const div = document.createElement("div")

  div.className = cls
  div.innerHTML = text

  output.appendChild(div)
  output.scrollTop = output.scrollHeight
}

function printPrompt(text) {
  const div = document.createElement("div")
  const prompt = document.createElement("span")
  const words = text.split(" ")

  prompt.innerHTML = words[0]
  prompt.className = "prompt"

  div.appendChild(prompt)
  div.appendChild(document.createTextNode(words[1]))

  output.appendChild(div)
  output.scrollTop = output.scrollHeight
}

function pushHistory(command) {
  if (command.length === 0) {
    return
  }

  history.push(command)
  
  if (history.length > 100) {
    history.shift()
  }

  localStorage.setItem("history", JSON.stringify(history))
  historyIndex = null
}

function historyPrevious() {
  if (history.length === 0) {
    return
  }

  historyIndex = (historyIndex === null) ? history.length - 1 : Math.max(0, historyIndex - 1)
  input.value = history[historyIndex]
}

function historyNext() {
  if (historyIndex === null) {
    return
  }

  historyIndex = Math.min(history.length, historyIndex + 1)
  input.value = history[historyIndex] || ""

  if (historyIndex >= history.length) {
    historyIndex = null
  }
}

function autocomplete(value) {
  const list = Object.keys(commands).filter(key => key.startsWith(value))

  if (!value) {
    return null
  }

  if (list.length === 1) {
    return list[0] + " "
  }

  if (list.length > 1) {
    print(list.join(" "))
  }

  return null
}
