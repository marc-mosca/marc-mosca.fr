const output = document.getElementById("command-output");
const form = document.getElementById("command-form");
const input = document.getElementById("command-input");
const prompt = document.getElementById("command-input__label");

let history = JSON.parse(localStorage.getItem("history") || "[]");
let historyIndex = null;

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

const skills = [
    ["Langages", "PHP, TypeScript, HTML, CSS, C, C++, Swift, SQL"],
    ["Outils", "Git, Docker, Linux, JetBrains IDE"],
];

const commands = {
    help()
    {
        const list = Object.keys(commands).sort();
        const items = list.map(command => `• <span>${command}</span><br/>`).join("");

        print(`Commandes disponibles:\n${items}`);
        print(`\nAstuces: <span>Tab</span> auto-complétion • <span>↑/↓</span> historique • <span>Ctrl</span>+<span>L</span> effacer`,'muted');
    },
    about()
    {
        print("Bonjour, je suis Marc MOSCA - étudiant en développement informatique à 42 Lyon Auvergne-Rhône-Alpes.")
    },
    date()
    {
        print(new Date().toLocaleString());
    },
    clear()
    {
        output.innerHTML = "";
    },
    skills()
    {
        print(skills.map(([key, value]) => `<div><strong>${key}:</strong> ${value}</div>`).join(""));
    },
    projects()
    {
        print("Projects:\n");
        projects.forEach(p => {
            print(`• <strong>${htmlspecialchars(p.name)}</strong>\t${htmlspecialchars(p.description)}`);
        });
    },
    open(arguments)
    {
        const id = (arguments[0] || "").toLowerCase();
        const project = projects.find(project => project.id === id);
        if (!id)
        {
            return print(htmlspecialchars("Usage: open <id-projet>"), "warn");
        }
        if (project && project.link && project.link !== "")
        {
            window.open(project.link, "_blank", "noopener");
            print(htmlspecialchars(`Ouverture de ${project.id}…`), "success");
        }
        else
        {
            print(htmlspecialchars(`Aucun project reconnu : ${id}`), "error");
        }
    },
    social()
    {
        print('Contact:\n• Email: <a href="mailto:contact@marc-mosca.fr">contact@marc-mosca.fr</a>\n• GitHub: <a href="https://github.com/marc-mosca" target="_blank" rel="noopener">github.com/marc-mosca</a>\n• LinkedIn: <a href="https://www.linkedin.com/in/marc-mosca" target="_blank" rel="noopener">linkedin.com/in/marc-mosca</a>');
    },
    history()
    {
        history.forEach((command, index) => print(`${index + 1} ${htmlspecialchars(command)}`));
    }
};
