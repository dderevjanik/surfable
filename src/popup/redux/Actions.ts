import { IChromeState } from '../../interfaces/IChromeState';

interface IAction {
	readonly type: string;
}

export const ACTION = {
	PANEL_CLOSE: 'PANEL_CLOSE' as 'PANEL_CLOSE',
	PANEL_OPEN: 'PANEL_OPEN' as 'PANEL_OPEN',
	PANEL_UP: 'PANEL_UP' as 'PANEL_UP',
	PANEL_DOWN: 'PANEL_DOWN' as 'PANEL_DOWN',
	SEARCH_CHANGE: 'SEARCH_CHANGE' as 'SEARCH_CHANGE',
	PANEL_EXECUTE_COMMAND: 'PANEL_EXECUTE_COMMAND' as 'PANEL_EXECUTE_COMMAND',
	TAB_SHOW_HISTORY: 'TAB_SHOW_HISTORY' as 'TAB_SHOW_HISTORY',
	SYNC_CHROME_STATE: 'SYNC_CHROME_STATE' as 'SYNC_CHROME_STATE'
};

interface IPanelClose extends IAction
{ readonly type: typeof ACTION.PANEL_CLOSE; }

interface IPanelOpen extends IAction
{ readonly type: typeof ACTION.PANEL_OPEN; }

interface IPanelUp extends IAction
{ readonly type: typeof ACTION.PANEL_UP; }

interface IPanelDown extends IAction
{ readonly type: typeof ACTION.PANEL_DOWN; }

interface ISearchChange extends IAction
{ readonly type: typeof ACTION.SEARCH_CHANGE; readonly searchValue: string; }

interface IPanelExecuteCommand extends IAction
{ readonly type: typeof ACTION.PANEL_EXECUTE_COMMAND; }

interface ITabShowHistory extends IAction
{ readonly type: typeof ACTION.TAB_SHOW_HISTORY; }

interface ISyncChromeState extends IAction
{ readonly type: typeof ACTION.SYNC_CHROME_STATE; readonly chromeState: IChromeState; }

export type ActionType = IPanelClose | IPanelOpen | IPanelUp | IPanelDown | ISearchChange | IPanelExecuteCommand | ITabShowHistory | ISyncChromeState;
