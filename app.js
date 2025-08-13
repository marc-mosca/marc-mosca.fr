// MARK: - Functions

function print(text, cls = "", isPrompt = false) {
    const div = document.createElement("div");

    if (isPrompt === true) {
        const words = text.split(" ");
        const prompt = document.createElement("span");
        prompt.innerHTML = words[0];
        prompt.className = "prompt";
        div.appendChild(prompt)
        div.appendChild(document.createTextNode(words[1]))
        elements.output.appendChild(div);
        return div;
    }

    div.className = cls;
    div.innerHTML = text;
    elements.output.appendChild(div);
    elements.output.scrollTop = elements.output.scrollHeight;
    return div;
}

function htmlspecialchars(str) {
    return String(str).replace(/[&<>\"]/g, s => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[s]));
}

function pushHistory(command) {
    if (!command) {
        return ;
    }
    state.history.push(command);
    if (state.history.length > 100) {
        state.history.shift();
    }
    localStorage.setItem('history', JSON.stringify(state.history));
    state.historyIndex = null;
}

function historyPrevious() {
    if (!state.history.length) {
        return ;
    }
    if (state.historyIndex === null) {
        state.historyIndex = state.history.length - 1;
    }
    else {
        state.historyIndex = Math.max(0, state.historyIndex - 1);
    }
    elements.input.value = state.history[state.historyIndex];
}

function historyNext() {
    if (state.historyIndex === null) {
        return ;
    }
    state.historyIndex = Math.min(state.history.length, state.historyIndex + 1);
    elements.input.value = state.history[state.historyIndex] || "";
    if (state.historyIndex >= state.history.length) {
        state.historyIndex = null;
    }
}

function autocomplete(value) {
    const list = Object.keys(commands).filter(key => key.startsWith(value));
    if (!value) {
        return null;
    }
    if (list.length === 1) {
        return list[0] + " ";
    }
    if (list.length > 1) {
        print(list.join(" "));
    }
    return null;
}

// MARK: - Constants

const elements = {
    output: document.getElementById("output"),
    form: document.getElementById("input-form"),
    input: document.getElementById("cmd"),
    prompt: document.getElementById("prompt")
};

const state = {
    user: "guest",
    host: "marc-mosca.fr",
    cwd: "~",
    history: JSON.parse(localStorage.getItem("history") || "[]"),
    historyIndex: null
};

const projects = [
    {
        id: "marc-mosca.fr",
        name: "marc-mosca.fr",
        description: "Mon portoflio personnel sous forme de terminal web.",
        link: "https://github.com/marc-mosca/marc-mosca.fr",
    },
    {
        id: "libasm",
        name: "Libasm",
        description: "Réimplémentation des fonctions standard C en assembleur x86-64.",
        link: "https://github.com/marc-mosca/Libasm",
    },
    {
        id: "linear-regression",
        name: "Linear Regression",
        description: "Introduction au machine learning.",
        link: "https://github.com/marc-mosca/linear-regression",
    },
    {
        id: "lightcore",
        name: "Light Core",
        description: "Le coeur d'un micro-framework en PHP.",
        link: "https://github.com/marc-mosca/LightCore",
    },
    {
        id: "swifty-companion",
        name: "Swifty Companion",
        description: "Application iOS pour les étudiants de l'école 42.",
        link: "https://github.com/marc-mosca/swifty-companion",
    },
    {
        id: "transcendence",
        name: "Transcendence",
        description: "Développement d'un jeu Pong multiplayer en ligne.",
        link: "https://github.com/marc-mosca/transcendence",
    },
    {
        id: "containers",
        name: "Containers",
        description: "Réimplémentation des containers (Vector, Stack, Map) de la librairie standard C++.",
        link: "https://github.com/marc-mosca/containers",
    },
    {
        id: "irc",
        name: "IRC",
        description: "Développement d'un serveur IRC en C++.",
        link: "https://github.com/marc-mosca/irc",
    },
    {
        id: "inception",
        name: "Inception",
        description: "Découverte et mise en pratique des notions de Docker.",
        link: "https://github.com/marc-mosca/inception",
    },
    {
        id: "cub3d",
        name: "Cub3D",
        description: "Développement d'un jeu en C en utilisant le raytracing.",
        link: "https://github.com/marc-mosca/cub3d",
    },
    {
        id: "minishell",
        name: "Minishell",
        description: "Développement d'un micro shell en C.",
        link: "https://github.com/marc-mosca/minishell",
    },
    {
        id: "philosophers",
        name: "Philosophers",
        description: "Découverte des threads et des mutex via un problème philosophique en C.",
        link: "https://github.com/marc-mosca/philosophers",
    },
    {
        id: "pipex",
        name: "Pipex",
        description: "Découverte des pipes en C.",
        link: "https://github.com/marc-mosca/pipex",
    },
    {
        id: "so-long",
        name: "So-long",
        description: "Développement d'un jeu simple en 2D.",
        link: "https://github.com/marc-mosca/so-long",
    },
    {
        id: "push-swap",
        name: "Push Swap",
        description: "Découverte des notions d'algorithmie et de performance.",
        link: "https://github.com/marc-mosca/push-swap",
    },
    {
        id: "get-next-line",
        name: "Get Next Line",
        description: "Développement d'une fonction permettant de lire un fichier ligne par ligne.",
        link: "https://github.com/marc-mosca/get-next-line",
    },
    {
        id: "printf",
        name: "Printf",
        description: "Réimplémentation de la fonction printf en C.",
        link: "https://github.com/marc-mosca/printf",
    },
    {
        id: "libft",
        name: "Libft",
        description: "Réimplémentation des fonctions standard C.",
        link: "https://github.com/marc-mosca/Libft",
    }
];

const commands = {
    help() {
        const list = Object.keys(commands).sort();
        const items = list.map(command => `• <span class="badge">${command}</span><br/>`).join("");
        print(`Commandes disponibles:\n${items}`);
        print(`\nAstuces: <span class="kbd">Tab</span> auto-complétion • <span class="kbd">↑/↓</span> historique • <span class="kbd">Ctrl</span>+<span class="kbd">L</span> effacer`,'muted');
    },
    whoami() {
        print("Bonjour, je suis Marc MOSCA - étudiant en développement informatique à 42 Lyon Auvergne-Rhône-Alpes.")
    },
    date() {
        print(new Date().toLocaleString());
    },
    clear() {
        elements.output.innerHTML = "";
    },
    skills() {
        const columns = [
            ["Langages", "PHP, TypeScript, HTML, CSS, C, C++, Swift, SQL"],
            ["Outils", "Git, Docker, Linux, JetBrains IDE"],
        ];
        const html = columns.map(([key, value]) => `<div><strong>${key}:</strong> ${value}</div>`).join("");
        print(html, "grid");
    },
    projects() {
        print("Projects:\n");
        projects.forEach(p => {
            print(`• <strong>${htmlspecialchars(p.name)}</strong> — ${htmlspecialchars(p.description)}\n   id: <span class="badge">${p.id}</span>\n   ouvrir: open ${p.id}`);
        });
    },
    open(arguments) {
        const id = (arguments[0] || "").toLowerCase();
        const project = projects.find(project => project.id === id);
        if (!id) {
            return print(htmlspecialchars("Usage: open <id-projet>"), "warn");
        }
        if (project && project.link && project.link !== "") {
            window.open(project.link, "_blank", "noopener");
            print(htmlspecialchars(`Ouverture de ${project.name}…`), "success");
        }
        else {
            print(htmlspecialchars(`Aucun project reconnu : ${id}`), "error");
        }
    },
    social() {
        print('Contact:\n• Email: <a href="mailto:contact@marc-mosca.fr">contact@marc-mosca.fr</a>\n• GitHub: <a href="https://github.com/marc-mosca" target="_blank" rel="noopener">github.com/marc-mosca</a>\n• LinkedIn: <a href="https://www.linkedin.com/in/marc-mosca" target="_blank" rel="noopener">linkedin.com/in/marc-mosca</a>');
    },
    history() {
        state.history.forEach((command, index) => print(`${index + 1} ${htmlspecialchars(command)}`));
    }
};

// MARK: - Code Execution

print("Bienvenue sur le portoflio de Marc MOSCA. Tapez `help` pour voir la liste des commandes.");

elements.form.addEventListener("submit", e => {
    e.preventDefault();
    const raw = elements.input.value.trim();
    print(`\n${elements.prompt.textContent} ${htmlspecialchars(raw)}`, "", true);
    if (!raw) {
        elements.input.value = "";
    }
    pushHistory(raw);
    const [cmd, ...args] = raw.split(/\s+/);
    if (typeof commands[cmd] === 'function') {
        commands[cmd](args);
    }
    else {
        print(`Commande inconnue: ${htmlspecialchars(cmd)}`, 'error');
    }
    elements.input.value = "";
});

elements.input.addEventListener("keydown", e => {
    if (e.key === "ArrowUp") {
        e.preventDefault();
        historyPrevious();
    }
    else if (e.key === "ArrowDown") {
        e.preventDefault();
        historyNext();
    }
    else if (e.key === "Tab") {
        e.preventDefault();
        const filled = autocomplete(elements.input.value);
        if (filled) {
            elements.input.value = filled;
        }
    }
    else if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'l') {
        e.preventDefault();
        commands.clear();
    }
});
