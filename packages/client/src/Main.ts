import { ITextCommand } from './interfaces/ITextCommand';
import { IAppState } from './interfaces/IAppState';
import { PressedKeysMap } from './Types';
import { keyMap } from './data/KeyMap';
import { store } from './redux/store';
import { panelClose, panelOpen, panelUp, panelDown, executeCommand, keyPress } from './redux/Reducers/Actions'
import { render } from './Index';

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

render();

const pressedKeys: PressedKeysMap = {};

const processEvent = (event: KeyboardEvent) => {
//     const state = store.getState() as IAppState;
//     // if (!((document.activeElement.tagName === 'BODY') || (document.activeElement.id === 'surfable_input'))) {
//     //     return;
//     // } else {
//     //     event.preventDefault();
//     // }
//     // if (event.ctrlKey && event.keyCode === keyMap.p) {
//     //     event.preventDefault();
//     // }
//     if (document.activeElement.tagName === 'BODY') {
//         switch(event.keyCode) {
//             case keyMap.esc: {
//                 console.log('dispatching close');
//                 store.dispatch(panelClose());
//                 break;
//             }
//             case keyMap.p: {
//                 console.log('dispatching open');
//                 store.dispatch(panelOpen());
//                 break;
//             }
//         }
//     }
    switch(event.keyCode) {
        case keyMap.esc: {
            console.log('dispatching close');
            store.dispatch(panelClose());
            break;
        }
        case keyMap.up: {
            console.log('dispatching up');
            store.dispatch(panelUp());
            break;
        }
        case keyMap.down: {
            console.log('dispatching down');
            store.dispatch(panelDown());
            break;
        }
        case keyMap.enter: {
            console.log('dispatching execute command');
            store.dispatch(executeCommand());
            break;
        }
        default: {
            store.dispatch(keyPress(String.fromCharCode(event.keyCode)));
        }
        // event.preventDefault();
    }
};


// document.onkeypress = (e) => {
//     processEvent(e);
// };

document.onkeydown = (e) => {
    // It's not possible to catch arrow keys with 'onkeypress' event
    console.log('key: ', e.keyCode);
    if ((e.keyCode >= 37) && (e.keyCode <= 40) || (e.keyCode == keyMap.esc) || (e.keyCode == keyMap.enter)) {
        processEvent(e);
    }
}
