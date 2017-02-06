import { Type } from 'surfable-common/src/actions/all';
import { CAPTURE } from 'surfable-common/src/actions/all';
import { ITextCommand } from './../interfaces/ITextCommand';
import * as allCommands from './../commands/All';

declare const chrome;
const sendMessage = (message: Type) => chrome.runtime.sendMessage(message, () => null);

/**
 * All possible commands listed in command panel
 */
export const commands: ITextCommand[] = [
    allCommands.addToBookmarks,
    // allCommands.addToBookmarksAs,
    allCommands.closeCurrentTab,
    allCommands.openNewTab,
    allCommands.showBookmarks,
    allCommands.showDownloads,
    allCommands.showExtensions,
    allCommands.showHistory,
    allCommands.showSettings,
    // allCommands.zoomIn,
    // allCommands.zoomOut,
    // allCommands.zoomReset,
];
