import { ITextCommand } from './../int\erfaces/ITextCommand';
import * as allCommands from './../commands/All';

/**
 * All possible commands listed in command panel
 */
export const commands: ITextCommand[] = [
    allCommands.addToBookmarks,
    allCommands.addToBookmarksAs,
    allCommands.closeCurrentTab,
    allCommands.openNewTab,
    allCommands.showBookmarks,
    allCommands.showDownloads,
    allCommands.showExtensions,
    allCommands.showHistory,
    allCommands.showSettings
];
