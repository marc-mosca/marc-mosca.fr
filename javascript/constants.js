const skills = [
  ["Langages", "PHP, TypeScript, HTML, CSS, C, C++, Swift, SQL"],
  ["Outils", "Git, Docker, Linux, MacOS, Helix"]
]

const projects = [
  {
    id: "marc-mosca.fr",
    name: "marc-mosca.fr",
    description: "Dépôt de mon portfolio.",
    link: "https://github.com/marc-mosca/marc-mosca.fr"
  },
  {
    id: "dotfiles",
    name: "dotfiles",
    description: "Dépôt regroupant mes configurations système et logiciel.",
    link: "https://github.com/marc-mosca/dotfiles"
  }
]

const commands = {
  help() {
    const list = Object.keys(commands).sort()
    const items = list.map(command => `• <span>${command}</span><br/>`).join("")

    print(`Commandes disponibles:\n${items}`)
    print(`\nAstuces: <span>Tab</span> auto-complétion • <span>↑/↓</span> historique • <span>Ctrl</span>+<span>L</span> effacer`,'muted')
  },
  about() {
    print("Bonjour, je suis Marc MOSCA - étudiant en développement informatique à 42 Lyon Auvergne-Rhône-Alpes.")
  },
  date() {
    print(new Date().toLocaleString())
  },
  clear() {
    output.innerHTML = ""
  },
  skills() {
    print(skills.map(([key, value]) => `<div><strong>${key}:</strong> ${value}</div>`).join(""))
  },
  projects() {
    print("Projects:\n")
    
    projects.forEach((project) => {
      print(`• <strong>${htmlspecialchars(project.name)}</strong>\t\t${htmlspecialchars(project.description)}`)
    })
  },
  open(arguments) {
    const id = (arguments[0] || "").toLowerCase()
    const project = projects.find((project) => project.id === id)

    if (!id) {
      return print(htmlspecialchars("Usage: open <id-projet>"), "warn")
    }

    if (project && project.link && project.link !== "") {
      window.open(project.link, "_blank", "noopener")
      print(htmlspecialchars(`Ouverture de ${project.id}…`), "success")
    }
    else {
      print(htmlspecialchars(`Aucun project reconnu : ${id}`), "error")
    }
  },
  social() {
    print('Contact:\n• Email: <a href="mailto:contact@marc-mosca.fr">contact@marc-mosca.fr</a>\n• GitHub: <a href="https://github.com/marc-mosca" target="_blank" rel="noopener">github.com/marc-mosca</a>\n• LinkedIn: <a href="https://www.linkedin.com/in/marc-mosca" target="_blank" rel="noopener">linkedin.com/in/marc-mosca</a>')
  },
  history() {
    history.forEach((command, index) => print(`${index + 1} ${htmlspecialchars(command)}`))
  }
}
