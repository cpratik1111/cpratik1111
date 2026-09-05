# macOS Screenshot Defaults

Use the `defaults` command to control whether macOS adds a shadow around screenshots.

## Disable Screenshot Shadows

Run this command to disable the shadow:

```bash
defaults write com.apple.screencapture "disable-shadow" -bool "true"
```
**Read the Current Setting**

Use this command to check the current value:

```bash
defaults read com.apple.screencapture "disable-shadow"
```

**Reset to the Default**

Run this command to remove the custom setting and restore the macOS default:

```bash
defaults delete com.apple.screencapture "disable-shadow"
```

## Reduce Window Animation Duration
Makes windows open and close faster

```
defaults write NSGlobalDomain NSWindowResizeTime -float 0.05
``` 

## Speed Up Mission Control Animations
Makes Mission Control animations nearly instant.

```
defaults write com.apple.dock expose-animation-duration -float 0.1; killall Dock
```

## Disable Dock Bounce Animations
Turn off the bouncing animations 
```
defaults write com.apple.dock no-bouncing -bool TRUE; killall Dock
```
To enable again
```
defaults write com.apple.dock no-bouncing -bool FALSE; killall Dock
```

## Speed Up Dock Auto-Hide Animation

Remove a slight delay when auto-hiding is enabled.
```
defaults write com.apple.dock autohide-delay -float 0; killall Dock

```

For an ultra-fast pop-up effect, also speed up the animation:

```
defaults write com.apple.dock autohide-time-modifier -float 0.1; killall Dock

```

**Reset to Default**
```
defaults delete com.apple.dock autohide-delay
defaults delete com.apple.dock autohide-time-modifier
killall Dock
```






