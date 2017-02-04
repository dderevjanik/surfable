export interface ITextCommand {
    readonly desc: string;
    readonly cat: string;
    readonly text: string;
    readonly func: () => void;
}
