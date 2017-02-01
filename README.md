# Surfable

Surfable is quick command pallete extension for chrome. It's heavly inspired
by command pallete from Sublime Text, Atom and VS Code (thank VS Code for design).

## Development

Surfable is mono repo using [lernajs](https://github.com/lerna/lerna) for packages
listed bellow. If you never head about monorepo, it means that single repository
holds several subprojects. Every directory found in `/packges` is own project with
`package.json` included in.

When you already cloned surfable repository, start with bootstraping project, instead
of doing `npm install` in every subpackge, use `lerna bootstrap`.

```bash
git clone https://github.com/dderevjanik/surfable
lerna bootstrap
```

Lerna bootstrap will make `npm install` for you in every subpackage and also it'll
create symlinks for shared dependencies.

### Client

### Background

### Common
