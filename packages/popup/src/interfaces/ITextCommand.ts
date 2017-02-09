export interface ITextCommand {
	readonly desc: string;
	readonly cat: string;
	readonly text: string;
	readonly imgUrl?: string;
	readonly pText?: string[]; // Refactor, please :-)
	readonly func: () => void;
}
