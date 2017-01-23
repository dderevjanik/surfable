import { ITextCommand } from './interfaces/ITextCommand';
import { PressedKeysMap } from './Types';
import { keyMap } from './data/KeyMap';
import { store } from './redux/store';
import { panelClose, panelOpen } from './redux/Actions'
import { render } from './Index.tsx';

render();

const showLinks = () => {
    console.log('showiiiing links');
    const createHint = () => {
        const hint = document.createElement('div');
        hint.className = 'surfable_hint';
        hint.innerText = 'LINKA';
        return hint;
    }
    const links = document.querySelectorAll('a');
    for(let i = 0; i < links.length; i++) {
        const link = links[i];
        link.appendChild(createHint());
    }
};

const commands: ITextCommand[] = [
    { text: 'Show links', desc: 'Show all links on page', func: showLinks },
    { text: 'Quick Print', desc: 'Print current page', func: () => null },
    { text: 'Print', desc: 'Print current page, setup', func: () => null },
    { text: 'Bookmarks', desc: 'Show bookmarks', func: () => null },
    { text: 'Find', desc: 'Find using regex', func: () => null }
];

const pressedKeys: PressedKeysMap = {};

const processEvent = (event: KeyboardEvent) => {
    if (!((document.activeElement.tagName === 'BODY') || (document.activeElement.id === 'surfable_input'))) {
        return;
    }
    switch(event.keyCode) {
        case keyMap.p: {
            console.log('dispatching open');
            store.dispatch(panelOpen());
            break;
        }
        case keyMap.esc: {
            console.log('dispatching close');
            store.dispatch(panelClose());
            break;
        }
    }
};


document.onkeypress = (e) => {
    processEvent(e);
};

document.onkeydown = (e) => {
    // It's not possible to catch arrow keys with 'onkeypress' event
    if ((e.keyCode >= 37) && (e.keyCode <= 40) || (e.keyCode == keyMap.esc)) {
        processEvent(e);
    }
}
