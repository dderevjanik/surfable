export interface ITextCommand {
    readonly desc: string;
    readonly cat: string;
    readonly text: string;
    readonly pText?: string[]; //refactor, please :-)
    readonly func: () => void;
}
