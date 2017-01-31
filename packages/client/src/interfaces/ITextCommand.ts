export interface ITextCommand {
    desc: string;
    text: string;
    func: () => void;
}
