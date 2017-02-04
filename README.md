# Surfable

Surfable is quick command pallete extension for chrome. It's heavly inspired
by command pallete from Sublime Text, Atom and VS Code (thank VS Code for design).

## Development

Surfable is mono repo using [lernajs](https://github.com/lerna/lerna) for packages
listed bellow. If you never heard about monorepo, it means that single repository
holds several subrepositories. Every directory found in `/packges` it's own repository
with `package.json` included in.

When you already cloned surfable repository, start with bootstraping project, instead
of doing `npm install` in every subrepository, use `lerna bootstrap`.

```bash
git clone https://github.com/dderevjanik/surfable
lerna bootstrap
```

Lerna bootstrap will make `npm install` for you in every subrepository and it'll
also create symlinks for shared dependencies.

### Background

This is main heart of Surfable app.

### Popup

### Client

### Common
