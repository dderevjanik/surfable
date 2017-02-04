import { IMessage } from './IMessage';
import { ITab } from './ITab';

interface ISender {
    frameId: number;
    id: string;
    tab: ITab;
    url: string;
}

export type ICallback = (message: IMessage, sender: ISender, response: any, port: any) => void;
