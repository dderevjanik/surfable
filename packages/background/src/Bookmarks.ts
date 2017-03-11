// @TODO reduce can lead to performance issues here, maybe muttability will help to boost performance
const extractBookmarks = (bookmarkNode: chrome.bookmarks.BookmarkTreeNode): chrome.bookmarks.BookmarkTreeNode[] =>
	bookmarkNode.children.reduce((acc, node) => node.url ? [...acc, node] : acc.concat(extractBookmarks(node)), []);

/**
 * Get array of all bookmarks available
 * @TODO remove duplicates
 */
export const getBookmarks = (bookmarkTree: chrome.bookmarks.BookmarkTreeNode[]): chrome.bookmarks.BookmarkTreeNode[] =>
	bookmarkTree.reduce((acc, node) => node.url ? [...acc, node] : acc.concat(extractBookmarks(node)), []);
