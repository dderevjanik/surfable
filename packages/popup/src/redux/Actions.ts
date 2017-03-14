interface IAction {
	readonly type: string;
}

export const ACTION = {
	PANEL_CLOSE: 'PANEL_CLOSE' as 'PANEL_CLOSE',
	PANEL_OPEN: 'PANEL_OPEN' as 'PANEL_OPEN',
	PANEL_UP: 'PANEL_UP' as 'PANEL_UP',
	PANEL_DOWN: 'PANEL_DOWN' as 'PANEL_DOWN',
	SEARCH_CHANGE: 'SEARCH_CHANGE' as 'SEARCH_CHANGE',
	PANEL_EXECUTE_COMMAND: 'PANEL_EXECUTE_COMMAND' as 'PANEL_EXECUTE_COMMAND'
};

interface IPanelClose extends IAction
{ type: typeof ACTION.PANEL_CLOSE; }

interface IPanelOpen extends IAction
{ type: typeof ACTION.PANEL_OPEN; }

interface IPanelUp extends IAction
{ type: typeof ACTION.PANEL_UP; }

interface IPanelDown extends IAction
{ type: typeof ACTION.PANEL_DOWN; }

interface ISearchChange extends IAction
{ type: typeof ACTION.SEARCH_CHANGE; readonly value: string; }

interface IPanelExecuteCommand extends IAction
{ type: typeof ACTION.PANEL_EXECUTE_COMMAND; }

export type ActionType = IPanelClose | IPanelOpen | IPanelUp | IPanelDown | ISearchChange | IPanelExecuteCommand;
