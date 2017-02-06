import { IMessage } from './IMessage';
import { ITab } from './ITab';

interface ISender {
    readonly frameId: number;
    readonly id: string;
    readonly tab: ITab;
    readonly url: string;
}

export type ICallback = (message: IMessage, sender: ISender, response: any, port: any) => void;
