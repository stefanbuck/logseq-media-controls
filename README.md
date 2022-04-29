# logseq-media-controls

Video and audio controls made for [Logseq](https://logseq.com)

![](./screenshot.png)

### Features
- 🏎 Playback speed control
- 🎮 Skip forward / backward

## Usage

Type `/` and then `Insert media controls`

or past the following snippet

```
{{renderer :media_controls}}
```

## Example

```
![](https://anchor.fm/s/265d7c64/podcast/play/50025019/https%3A%2F%2Fd3ctxlq1ktw2nl.cloudfront.net%2Fstaging%2F2022-3-3%2F4535bbc8-fa3c-ddef-49af-ece67bd9d631.mp3)

{{renderer :media_controls}}
```

## Install

1. Open the Logseq app
2. Navigate to the plugins page or use the shortcut <kbd>t</kbd>+<kbd>p</kbd>
3. Switch to the Marketplace tab
4. Search for `media controls`

## Known limitation

- Does not work with YouTube or any other video embeded using `iframes`
