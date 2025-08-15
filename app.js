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
        name: "marc-mosca.fr\t\t",
        description: "Développement de mon web terminal portfolio.",
        link: "https://github.com/marc-mosca/marc-mosca.fr",
    },
    {
        id: "libasm",
        name: "libasm\t\t",
        description: "Initiation au language assembleur en codant des fonctions de la librairie standard.",
        link: "https://github.com/marc-mosca/Libasm",
    },
    {
        id: "ft_linear_regression",
        name: "ft_linear_regression\t",
        description: "Initiation au machine learning grâce à la regression lineaire avec un algorithme du gradient.",
        link: "https://github.com/marc-mosca/linear-regression",
    },
    {
        id: "lightcore",
        name: "lightcore\t\t",
        description: "Développement d'un framework MVC permettant d'apprendre le fonctionnement d'un framework et de ses outils.",
        link: "https://github.com/marc-mosca/LightCore",
    },
    {
        id: "swifty_companion",
        name: "swifty_companion\t",
        description: "Initiation au développement mobile grâce à une application pour les étudiants de l'école 42.",
        link: "https://github.com/marc-mosca/swifty-companion",
    },
    {
        id: "ft_transcendence",
        name: "ft_transcendence\t",
        description: "Développement d'un site web permettant de jouer au Pong et de communiquer en temps réel avec d'autres utilisateur.",
        link: "https://github.com/marc-mosca/transcendence",
    },
    {
        id: "ft_containers",
        name: "ft_containers\t\t",
        description: "Découverte et développement de différent conteneur de la librairie standard C++.",
        link: "https://github.com/marc-mosca/containers",
    },
    {
        id: "ft_irc",
        name: "ft_irc\t\t",
        description: "Développement d'un serveur IRC en suivant les RFC standards d'Internet.",
        link: "https://github.com/marc-mosca/irc",
    },
    {
        id: "inception",
        name: "inception\t\t",
        description: "Apprentissage de docker et des bases de l'administration système.",
        link: "https://github.com/marc-mosca/inception",
    },
    {
        id: "cub3d",
        name: "cub3d\t\t\t",
        description: "Découverte du ray-casting grâce à un projet inspiré du premier FPS : Wolfenstein 3D.",
        link: "https://github.com/marc-mosca/cub3d",
    },
    {
        id: "minishell",
        name: "minishell\t\t",
        description: "Développement d'un simple shell pour découvrir les processus et approfondir les descripteur de fichier.",
        link: "https://github.com/marc-mosca/minishell",
    },
    {
        id: "philosophers",
        name: "philosophers\t\t",
        description: "Découverte des bases des threads et des mutex.",
        link: "https://github.com/marc-mosca/philosophers",
    },
    {
        id: "pipex",
        name: "pipex\t\t\t",
        description: "Découverte et programmation d'un mécanisme UNIX : les redirections et les pipes.",
        link: "https://github.com/marc-mosca/pipex",
    },
    {
        id: "so_long",
        name: "so_long\t\t",
        description: "Développement d'un jeu 2D conçu pour apprendre à manipuler des textures, des sprites et du gameplay.",
        link: "https://github.com/marc-mosca/so-long",
    },
    {
        id: "push_swap",
        name: "push_swap\t\t",
        description: "Implémentation d'algorithmes permettant de trier des données dans une pile le plus efficacement possible.",
        link: "https://github.com/marc-mosca/push-swap",
    },
    {
        id: "get_next_line",
        name: "get_next_line\t\t",
        description: "Développement d'une fonction permettant de lire une ligne depuis un descripteur de fichier.",
        link: "https://github.com/marc-mosca/get-next-line",
    },
    {
        id: "printf",
        name: "ft_printf\t\t",
        description: "Développement de la fonction printf en C pour comprendre la notion d'argument à taille variable.",
        link: "https://github.com/marc-mosca/printf",
    },
    {
        id: "libft",
        name: "libft\t\t\t",
        description: "Développement de certaines fonctions de la librairie standard C.",
        link: "https://github.com/marc-mosca/Libft",
    }
];

const commands = {
    help() {
        const list = Object.keys(commands).sort();
        const items = list.map(command => `• <span>${command}</span><br/>`).join("");
        print(`Commandes disponibles:\n${items}`);
        print(`\nAstuces: <span>Tab</span> auto-complétion • <span>↑/↓</span> historique • <span>Ctrl</span>+<span>L</span> effacer`,'muted');
    },
    about() {
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
            print(`• <strong>${htmlspecialchars(p.name)}</strong>\t${htmlspecialchars(p.description)}`);
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
            print(htmlspecialchars(`Ouverture de ${project.id}…`), "success");
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
