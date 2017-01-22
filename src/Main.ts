type PressedKeysMap = {[key: string]: boolean}

interface ITextCommand {
    desc: string;
    text: string;
};

interface IAppState {
    config: {
        maxCommands: number;
    },
    quickpanel: {
        opened: boolean;
        offset: number;
    }
};

const commands: ITextCommand[] = [
    { text: 'Quick Print', desc: 'Print current page' },
    { text: 'Print', desc: 'Print current page, setup' },
    { text: 'Find', desc: 'Find using regex' }
];

const appState: IAppState = {
    config: {
        maxCommands: 7
    },
    quickpanel: {
        opened: false,
        offset: 0
    }
};

const keyMap = {
    esc: 27,
    f: 70,
    p: 80,
    ctrl: 17,
    shift: 16,
    slash: 191,
    left: 37,
    up: 38,
    right: 39,
    down: 40
};

const pressedKeys: PressedKeysMap = {};

document.onkeydown = (e) => {
    pressedKeys[e.keyCode] = (e.type === 'keydown');
    processEvent(pressedKeys);
};

document.onkeyup = (e) => {
    pressedKeys[e.keyCode] = !(e.type === 'keyup');
    processEvent(pressedKeys);
};

const createCommand = (name: string, description: string, active: boolean) => `
    <li ${ active ? 'class="surfable_command_hover"' : ''}>
        <span>${ name }</span>
        <small>${ description }</small>
    </li>
`;

const createCommandsList = (commands, hoverIndex) => `
    <ul>
        ${
            commands.map((command, i) =>
                createCommand(command.text, command.desc, (i === hoverIndex))).join('')
        }
    </ul>
`;

const createQuickPanel = () => {
    const quickPanel = document.createElement('div');
    quickPanel.id = "surfable";
    quickPanel.innerHTML = `
        <div class="surfable_quickpanel">
            <div class="surfable_searchbox">
                <input id="surfable_input" type="text" value="" placeholder="type '?' to get help"/>
            </div>
            <div class="surfable_commands">
               ${ createCommandsList(commands, appState.quickpanel.offset) }
            </div>
        </div>
    `;
    return quickPanel;
}

const rerender = () => {
    const oldEl = document.getElementById('surfable_input');
    const newEl = createQuickPanel();
    oldEl.parentNode.removeChild(oldEl);
    document.body.appendChild(newEl);

};

const openQuickPanel = () => {
    document.body.appendChild(createQuickPanel());
    const quickInput = document.getElementById("surfable_input");
    quickInput.focus();
};

const closeQuickPanel = () => {
    const quickPanel = document.querySelector('.surfable_quickpanel');
    quickPanel.parentNode.removeChild(quickPanel);
};

const processEvent = (pressedKeysMap: PressedKeysMap) => {
    console.log(pressedKeys);
    if (pressedKeysMap[keyMap.p] && !appState.quickpanel.opened) {
        appState.quickpanel.opened = true;
        openQuickPanel();
    }
    if (appState.quickpanel.opened) {
        if (pressedKeysMap[keyMap.esc]) {
            appState.quickpanel.opened = false;
            closeQuickPanel();
        }
        if (pressedKeysMap[keyMap.up]) {
            appState.quickpanel.offset -= 1;
            rerender();
        }
        if (pressedKeysMap[keyMap.down]) {
            appState.quickpanel.offset += 1;
            rerender();
        }
    }
};
