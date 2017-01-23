export interface IBookmarks {
    create: (props: {parentId?: number, index?: number, title?: string, url?: string}) => null;
}
