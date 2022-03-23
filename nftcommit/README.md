oclif-hello-world
=================

oclif example Hello World CLI

[![oclif](https://img.shields.io/badge/cli-oclif-brightgreen.svg)](https://oclif.io)
[![Version](https://img.shields.io/npm/v/oclif-hello-world.svg)](https://npmjs.org/package/oclif-hello-world)
[![CircleCI](https://circleci.com/gh/oclif/hello-world/tree/main.svg?style=shield)](https://circleci.com/gh/oclif/hello-world/tree/main)
[![Downloads/week](https://img.shields.io/npm/dw/oclif-hello-world.svg)](https://npmjs.org/package/oclif-hello-world)
[![License](https://img.shields.io/npm/l/oclif-hello-world.svg)](https://github.com/oclif/hello-world/blob/main/package.json)

<!-- toc -->
* [Usage](#usage)
* [Commands](#commands)
<!-- tocstop -->
# Usage
<!-- usage -->
```sh-session
$ npm install -g nftcommit
$ nftcommit COMMAND
running command...
$ nftcommit (--version)
nftcommit/0.0.5 darwin-x64 node-v14.16.1
$ nftcommit --help [COMMAND]
USAGE
  $ nftcommit COMMAND
...
```
<!-- usagestop -->
# Commands
<!-- commands -->
* [`nftcommit create-repo`](#nftcommit-create-repo)
* [`nftcommit create-repo world`](#nftcommit-create-repo-world)
* [`nftcommit delete-repo`](#nftcommit-delete-repo)
* [`nftcommit delete-repo world`](#nftcommit-delete-repo-world)
* [`nftcommit hello PERSON`](#nftcommit-hello-person)
* [`nftcommit hello world`](#nftcommit-hello-world)
* [`nftcommit help [COMMAND]`](#nftcommit-help-command)
* [`nftcommit list-repos`](#nftcommit-list-repos)
* [`nftcommit list-repos world`](#nftcommit-list-repos-world)
* [`nftcommit plugins`](#nftcommit-plugins)
* [`nftcommit plugins:inspect PLUGIN...`](#nftcommit-pluginsinspect-plugin)
* [`nftcommit plugins:install PLUGIN...`](#nftcommit-pluginsinstall-plugin)
* [`nftcommit plugins:link PLUGIN`](#nftcommit-pluginslink-plugin)
* [`nftcommit plugins:uninstall PLUGIN...`](#nftcommit-pluginsuninstall-plugin)
* [`nftcommit plugins update`](#nftcommit-plugins-update)
* [`nftcommit register-commit`](#nftcommit-register-commit)
* [`nftcommit register-commit world`](#nftcommit-register-commit-world)
* [`nftcommit signup`](#nftcommit-signup)
* [`nftcommit signup world`](#nftcommit-signup-world)

## `nftcommit create-repo`

Criar Repositório NFTCommit

```
USAGE
  $ nftcommit create-repo

DESCRIPTION
  Criar Repositório NFTCommit

EXAMPLES
  $ nftcommit signup
```

_See code: [dist/commands/create-repo/index.ts](https://github.com/augustovicente/nft-commit/blob/v0.0.5/dist/commands/create-repo/index.ts)_

## `nftcommit create-repo world`

Say hello world

```
USAGE
  $ nftcommit create-repo world

DESCRIPTION
  Say hello world

EXAMPLES
  $ oex hello world
  hello world! (./src/commands/hello/world.ts)
```

## `nftcommit delete-repo`

Deletar Repositório Existente

```
USAGE
  $ nftcommit delete-repo

DESCRIPTION
  Deletar Repositório Existente

EXAMPLES
  $ nftcommit signup
```

_See code: [dist/commands/delete-repo/index.ts](https://github.com/augustovicente/nft-commit/blob/v0.0.5/dist/commands/delete-repo/index.ts)_

## `nftcommit delete-repo world`

Say hello world

```
USAGE
  $ nftcommit delete-repo world

DESCRIPTION
  Say hello world

EXAMPLES
  $ oex hello world
  hello world! (./src/commands/hello/world.ts)
```

## `nftcommit hello PERSON`

Say hello

```
USAGE
  $ nftcommit hello [PERSON] -f <value>

ARGUMENTS
  PERSON  Person to say hello to

FLAGS
  -f, --from=<value>  (required) Whom is saying hello

DESCRIPTION
  Say hello

EXAMPLES
  $ oex hello friend --from oclif
  hello friend from oclif! (./src/commands/hello/index.ts)
```

_See code: [dist/commands/hello/index.ts](https://github.com/augustovicente/nft-commit/blob/v0.0.5/dist/commands/hello/index.ts)_

## `nftcommit hello world`

Say hello world

```
USAGE
  $ nftcommit hello world

DESCRIPTION
  Say hello world

EXAMPLES
  $ oex hello world
  hello world! (./src/commands/hello/world.ts)
```

## `nftcommit help [COMMAND]`

Display help for nftcommit.

```
USAGE
  $ nftcommit help [COMMAND] [-n]

ARGUMENTS
  COMMAND  Command to show help for.

FLAGS
  -n, --nested-commands  Include all nested commands in the output.

DESCRIPTION
  Display help for nftcommit.
```

_See code: [@oclif/plugin-help](https://github.com/oclif/plugin-help/blob/v5.1.11/src/commands/help.ts)_

## `nftcommit list-repos`

Listar Repositórios Existentes

```
USAGE
  $ nftcommit list-repos

DESCRIPTION
  Listar Repositórios Existentes

EXAMPLES
  $ nftcommit signup
```

_See code: [dist/commands/list-repos/index.ts](https://github.com/augustovicente/nft-commit/blob/v0.0.5/dist/commands/list-repos/index.ts)_

## `nftcommit list-repos world`

Say hello world

```
USAGE
  $ nftcommit list-repos world

DESCRIPTION
  Say hello world

EXAMPLES
  $ oex hello world
  hello world! (./src/commands/hello/world.ts)
```

## `nftcommit plugins`

List installed plugins.

```
USAGE
  $ nftcommit plugins [--core]

FLAGS
  --core  Show core plugins.

DESCRIPTION
  List installed plugins.

EXAMPLES
  $ nftcommit plugins
```

_See code: [@oclif/plugin-plugins](https://github.com/oclif/plugin-plugins/blob/v2.0.11/src/commands/plugins/index.ts)_

## `nftcommit plugins:inspect PLUGIN...`

Displays installation properties of a plugin.

```
USAGE
  $ nftcommit plugins:inspect PLUGIN...

ARGUMENTS
  PLUGIN  [default: .] Plugin to inspect.

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Displays installation properties of a plugin.

EXAMPLES
  $ nftcommit plugins:inspect myplugin
```

## `nftcommit plugins:install PLUGIN...`

Installs a plugin into the CLI.

```
USAGE
  $ nftcommit plugins:install PLUGIN...

ARGUMENTS
  PLUGIN  Plugin to install.

FLAGS
  -f, --force    Run yarn install with force flag.
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Installs a plugin into the CLI.

  Can be installed from npm or a git url.

  Installation of a user-installed plugin will override a core plugin.

  e.g. If you have a core plugin that has a 'hello' command, installing a user-installed plugin with a 'hello' command
  will override the core plugin implementation. This is useful if a user needs to update core plugin functionality in
  the CLI without the need to patch and update the whole CLI.

ALIASES
  $ nftcommit plugins add

EXAMPLES
  $ nftcommit plugins:install myplugin 

  $ nftcommit plugins:install https://github.com/someuser/someplugin

  $ nftcommit plugins:install someuser/someplugin
```

## `nftcommit plugins:link PLUGIN`

Links a plugin into the CLI for development.

```
USAGE
  $ nftcommit plugins:link PLUGIN

ARGUMENTS
  PATH  [default: .] path to plugin

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Links a plugin into the CLI for development.

  Installation of a linked plugin will override a user-installed or core plugin.

  e.g. If you have a user-installed or core plugin that has a 'hello' command, installing a linked plugin with a 'hello'
  command will override the user-installed or core plugin implementation. This is useful for development work.

EXAMPLES
  $ nftcommit plugins:link myplugin
```

## `nftcommit plugins:uninstall PLUGIN...`

Removes a plugin from the CLI.

```
USAGE
  $ nftcommit plugins:uninstall PLUGIN...

ARGUMENTS
  PLUGIN  plugin to uninstall

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Removes a plugin from the CLI.

ALIASES
  $ nftcommit plugins unlink
  $ nftcommit plugins remove
```

## `nftcommit plugins update`

Update installed plugins.

```
USAGE
  $ nftcommit plugins update [-h] [-v]

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Update installed plugins.
```

## `nftcommit register-commit`

Registrar um commit como NFT pela NFTCommit

```
USAGE
  $ nftcommit register-commit

DESCRIPTION
  Registrar um commit como NFT pela NFTCommit

EXAMPLES
  $ nftcommit signup
```

_See code: [dist/commands/register-commit/index.ts](https://github.com/augustovicente/nft-commit/blob/v0.0.5/dist/commands/register-commit/index.ts)_

## `nftcommit register-commit world`

Say hello world

```
USAGE
  $ nftcommit register-commit world

DESCRIPTION
  Say hello world

EXAMPLES
  $ oex hello world
  hello world! (./src/commands/hello/world.ts)
```

## `nftcommit signup`

Inscrever-se no sistema

```
USAGE
  $ nftcommit signup

DESCRIPTION
  Inscrever-se no sistema

EXAMPLES
  $ nftcommit signup
```

_See code: [dist/commands/signup/index.ts](https://github.com/augustovicente/nft-commit/blob/v0.0.5/dist/commands/signup/index.ts)_

## `nftcommit signup world`

Say hello world

```
USAGE
  $ nftcommit signup world

DESCRIPTION
  Say hello world

EXAMPLES
  $ oex hello world
  hello world! (./src/commands/hello/world.ts)
```
<!-- commandsstop -->
