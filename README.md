# notes README

An extension which makes it easier to take notes in VS Code.


## Features

The command `Make new note` or `cmd-alt-n`/`ctrl-alt-n` makes a new markdown note file in the current workspace. The
file is named with the current date and time, and the cursor is placed at the end of the file.

The command `Delete active file` or `cmd-alt-r`/`ctrl-alt-r` deletes the active file.

## Requirements

## Extension Settings

## Known Issues


## Release Notes

## Other Settings

You may wish to use the following settings.

```
{
    "markdown.experimental.copyFiles.destination": {
        "**/*": "${documentWorkspaceFolder}/attachments/${documentBaseName}/${fileName}"
    },
    "editor.experimental.pasteActions.enabled": true,
    "files.exclude": {
        "**/.*": true
    },
    "github.copilot.editor.enableAutoCompletions": false,
    "github.copilot.inlineSuggest.enable": false
}
```