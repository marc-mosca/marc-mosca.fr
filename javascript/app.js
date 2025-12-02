const output = document.getElementById("output")
const input = document.getElementById("input")
const form = document.getElementById("form")
const prompt = document.getElementById("prompt")

let history = JSON.parse(localStorage.getItem("history") || "[]")
let historyIndex = null

print("Bienvenue sur le portoflio de Marc MOSCA. Tapez `help` pour voir la liste des commandes.");

form.addEventListener("submit", (event) => {
  event.preventDefault()

  const raw = input.value.trim()

  if (!raw) {
    input.value = ""
  }

  printPrompt(`\n${prompt.textContent} ${htmlspecialchars(raw)}`)
  pushHistory(raw)

  const [cmd, ...args] = raw.split(/\s+/)

  if (typeof commands[cmd] === "function") {
    commands[cmd](args)
  }
  else {
    print(`Commande inconnue: ${htmlspecialchars(cmd)}`, "error")
  }

  input.value = ""
})

input.addEventListener("keydown", (event) => {
  if (event.key === "ArrowUp") {
    event.preventDefault()
    historyPrevious()
  }
  else if (event.key === "ArrowDown") {
    event.preventDefault()
    historyNext()
  }
  else if (event.key === "Tab") {
    event.preventDefault()
    const filled = autocomplete(input.value)

    if (filled) {
      input.value = filled
    }
  }
  else if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "l") {
    event.preventDefault()
    commands.clear()
  }
})
