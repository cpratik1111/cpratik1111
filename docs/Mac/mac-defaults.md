# macOS Screenshot Defaults

Use the `defaults` command to control whether macOS adds a shadow around screenshots.

## Disable Screenshot Shadows

Run this command to disable the shadow:

```bash
defaults write com.apple.screencapture "disable-shadow" -bool "true"
```

## Read the Current Setting

Use this command to check the current value:

```bash
defaults read com.apple.screencapture "disable-shadow"
```

## Reset to the Default

Run this command to remove the custom setting and restore the macOS default:

```bash
defaults delete com.apple.screencapture "disable-shadow"
```