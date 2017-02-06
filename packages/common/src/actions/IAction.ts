export interface IAction {
    readonly type: string;
    [key: string]: string|number;
};
