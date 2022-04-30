// Copied from https://github.com/sethyuan/logseq-plugin-media-ts
export function findMediaElement(refEl) {
    return (
        findMediaElementIn(
            parent.document.querySelector(".cards-review"),
            (_el) => true,
        ) ||
        findMediaElementIn(
            parent.document.getElementById("right-sidebar"),
            (_el) => true,
        ) ||
        findMediaElementIn(
            parent.document.getElementById("left-container"),
            (el) => el?.compareDocumentPosition(refEl) === 4,
        )
    )
}

// Copied from https://github.com/sethyuan/logseq-plugin-media-ts
function findMediaElementIn(root, pred) {
    if (root == null) return null

    const iframeElements = Array.from(root.getElementsByTagName("iframe"))
    const videoElements = Array.from(root.getElementsByTagName("video"))
    const audioElements = Array.from(root.getElementsByTagName("audio"))

    let video = null
    let audio = null
    let youtube = null

    for (let i = iframeElements.length - 1; i >= 0; i--) {
        const el = iframeElements[i]
        if (el.id.startsWith('youtube-player-') && pred(el)) {
            youtube = el
            break
        }
    }
    for (let i = videoElements.length - 1; i >= 0; i--) {
        const el = videoElements[i]
        if (pred(el)) {
            video = el
            break
        }
    }
    for (let i = audioElements.length - 1; i >= 0; i--) {
        const el = audioElements[i]
        if (pred(el)) {
            audio = el
            break
        }
    }

    const elements = [youtube, video, audio]
    let closest = null
    for (const el of elements) {
        if (el == null) continue
        if (closest == null || closest.compareDocumentPosition(el) === 4) {
            closest = el
        }
    }
    return closest
}