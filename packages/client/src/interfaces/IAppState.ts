import { IPanel } from './../redux/interfaces/IPanel';
import { IConfig } from './../redux/interfaces/IConfig';
import { ICommands } from './../redux/interfaces/ICommands';

export interface IAppState {
    commands: ICommands;
    config: IConfig;
    quickpanel: IPanel;
};
