// Define your own language here
type language = {
    'en': 'english'
}
export interface ILanguage {
    [text: string]: {
        [l in keyof language]: string;
    };
}
