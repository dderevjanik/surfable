import { PANEL_OPEN, PANEL_CLOSE } from './ActionsList';

export const panelClose = () => ({
    type: PANEL_CLOSE
});

export const panelOpen = () => ({
    type: PANEL_OPEN
});
