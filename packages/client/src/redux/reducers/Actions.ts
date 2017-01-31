import {
    PANEL_OPEN, PANEL_CLOSE, PANEL_DOWN, PANEL_UP,
    PANEL_EXECUTE_COMMAND, PANEL_KEYPRESS
} from './ActionsList';

export const panelClose = () => ({
    type: PANEL_CLOSE
});

export const panelOpen = () => ({
    type: PANEL_OPEN
});

export const panelUp = () => ({
    type: PANEL_UP
});

export const panelDown = () => ({
    type: PANEL_DOWN
});

export const keyPress = (char: string) => ({
    type: PANEL_KEYPRESS,
    char: char
});

export const executeCommand = (commandIndex: number) => ({
    type: PANEL_EXECUTE_COMMAND,
    commandInd: commandIndex
})
