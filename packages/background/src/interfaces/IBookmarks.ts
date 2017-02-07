export interface IBookmarks {
	readonly create: (props: {parentId?: number, index?: number, title?: string, url?: string}) => null;
}
