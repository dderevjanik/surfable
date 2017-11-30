# Surfable

Surfable is quick command pallete extension for chrome. It's heavly inspired by command pallete from Sublime Text, Atom
and VS Code (thank VS Code for design).

## Overview

![screenshot](docs/img/screen.jpg)

### 1.1. Background

This is main heart of Surfable app. All events passing to command line headings to background. Background is always
running, so it's listening to commands from popup or client.

### 1.2. Popup

Popup is frontend for popup, when user clicks on top-right icon in chrome browser.

### 1.3. Content

Content is script, which is executed on every page user visits.

### 1.4. Common

Used to share interfaces, types a common data between subprojects. Events (redux's actions), which are used among
subprojects are stored in common to avoid type errors and common javascript mistakes.

## 2. Examples

### 2.1. Custom Command

```typescript
// packages/popup/src/data/Commands.ts
const customCommand: ICommand = {
	type: COMMAND.SIMPLE,
	cat: CAT.PAGE,
	text: "Open new tab",
	desc: "Ctrl + T",
	action: { type: MESSAGE.TAB_NEW, url: "", targe: ETarget.BACKGROUND }
};
```

## Credits

* [vscode](https://github.com/Microsoft/vscode) for providing such a beautifull IDE and best implementation of
	quickpanel/command palette.
