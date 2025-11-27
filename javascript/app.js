const output = document.getElementById("output")
const input = document.getElementById("input")
const form = document.getElementById("form")
const prompt = document.getElementById("prompt")

let history = JSON.parse(localStorage.getItem("history") || "[]")
let historyIndex = null
