// REFACTOR: reduce can lead to performance issues, maybe muttability will help here to boost performance
const extractBookmarks = (bookmarkNode: chrome.bookmarks.BookmarkTreeNode) =>
	bookmarkNode.children.reduce((acc, node) => node.url ? [...acc, node] : acc.concat(extractBookmarks(node)), []);

/**
 * Get one array of bookmarks
 */
export const getBookmarks = (bookmarkTree: chrome.bookmarks.BookmarkTreeNode[]) =>
	bookmarkTree.reduce((acc, node) => node.url ? [...acc, node] : acc.concat(extractBookmarks(node)), []);
