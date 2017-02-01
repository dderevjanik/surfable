export interface ITextCommand {
    desc: string;
    cat: string;
    text: string;
    func: () => void;
}
