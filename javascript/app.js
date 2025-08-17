print("Bienvenue sur le portoflio de Marc MOSCA. Tapez `help` pour voir la liste des commandes.");

form.addEventListener("submit", e => {
    e.preventDefault();
    const raw = input.value.trim();
    print(`\n${prompt.textContent} ${htmlspecialchars(raw)}`, "", true);
    if (!raw)
    {
        input.value = "";
    }
    pushHistory(raw);
    const [cmd, ...args] = raw.split(/\s+/);
    if (typeof commands[cmd] === "function")
    {
        commands[cmd](args);
    }
    else
    {
        print(`Commande inconnue: ${htmlspecialchars(cmd)}`, "error");
    }
    input.value = "";
});

input.addEventListener("keydown", e => {
    if (e.key === "ArrowUp")
    {
        e.preventDefault();
        historyPrevious();
    }
    else if (e.key === "ArrowDown")
    {
        e.preventDefault();
        historyNext();
    }
    else if (e.key === "Tab")
    {
        e.preventDefault();
        const filled = autocomplete(input.value);
        if (filled)
        {
            input.value = filled;
        }
    }
    else if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "l")
    {
        e.preventDefault();
        commands.clear();
    }
});
