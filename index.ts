import '@logseq/libs'
import { findMediaElement } from './utils'

const playbackSpeed = [0.8, 1.0, 1.25, 1.5, 1.75, 2.0]

const styleSheet = `
.media-controls button:hover {
    color: var(--ls-link-ref-text-hover-color);
}
`

function _render(slot, speed) {
    logseq.provideUI({
        key: "media_controls",
        slot,
        reset: true,
        template: `
        <div class="media-controls flex gap-x-4 mt-2">
            <button class="w-6 h-6" data-on-click="backward" data-slot-id="${slot}"><svg xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 140 140" width="100%" height="100%"><path fill="currentColor" d="M64 0v11A64 64 0 1 1 0 75h14a50 50 0 1 0 50-50v13L16 19 64 0zm17 45.8c6.6 0 11.8 2.7 15.6 8.3a38 38 0 0 1 5.3 21.3c0 9-1.8 16.1-5.3 21.4a18 18 0 0 1-15.6 8.3c-6.7 0-12-2.8-15.6-8.3a38 38 0 0 1-5.3-21.4c0-9 1.8-16 5.3-21.3 3.7-5.6 8.9-8.3 15.6-8.3zm-32.4 1V104h-9.4V58.2a32.3 32.3 0 0 1-13 7v-9.4a34 34 0 0 0 15.4-9h7zm32.4 7c-4.6 0-7.8 2.5-9.6 7.6-1.3 3.4-2 8.1-2 14.1s.7 10.7 2 14.2c1.8 5 5 7.6 9.6 7.6 4.5 0 7.7-2.6 9.6-7.6 1.3-3.5 2-8.2 2-14.2s-.7-10.7-2-14.1c-2-5.1-5.1-7.6-9.6-7.6z"></path></svg></button>
            <button class="w-6 h-6" data-on-click="forward" data-slot-id="${slot}"><svg xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 140 140" width="100%" height="100%"><path fill="currentColor" d="M64 11v14h-.8A50 50 0 1 0 114 75h14a64 64 0 1 1-64-64zm16.9 35c6.6 0 11.8 2.7 15.6 8.3a38 38 0 0 1 5.3 21.4c0 9-1.8 16-5.3 21.3-3.8 5.6-9 8.4-15.6 8.4-6.7 0-12-2.8-15.6-8.4A38 38 0 0 1 60 75.7c0-9 1.8-16.1 5.3-21.4C69 48.7 74.2 46 80.9 46zm-32.5 1v57.1H39V58.3a32.3 32.3 0 0 1-13 7V56a34 34 0 0 0 15.4-9h7zm32.5 7c-4.6 0-7.8 2.4-9.6 7.5-1.3 3.5-2 8.2-2 14.2 0 5.9.7 10.6 2 14.1 1.8 5 5 7.6 9.6 7.6 4.5 0 7.7-2.5 9.6-7.6 1.3-3.5 1.9-8.2 1.9-14.1 0-6-.6-10.7-2-14.2-1.8-5.1-5-7.6-9.5-7.6zM64 0l48 19-48 19V0z"></path></svg></button>
            <button class="w-12 h-6" data-on-click="changePlaybackRate" data-slot-id="${slot}">${speed}x</button>
        </div>
        `
    });
}

async function main() {
    let playbackSpeedIndex = 1;

    logseq.provideStyle(styleSheet)

    logseq.Editor.registerSlashCommand('Insert Media Controls', async () => {
        await logseq.Editor.insertAtEditingCursor(
            `{{renderer: media_controls}}`,
        )
    })

    logseq.provideModel({
        async forward(e: any) {
            const { slotId } = e.dataset
            const el = parent.document.getElementById(slotId)

            const audio = findMediaElement(el);
            audio.currentTime += 10;
        },
        async backward(e: any) {
            const { slotId } = e.dataset
            const el = parent.document.getElementById(slotId)

            const audio = findMediaElement(el);
            audio.currentTime -= 10;
        },
        async changePlaybackRate(e: any) {
            const { slotId } = e.dataset
            const el = parent.document.getElementById(slotId)
            const audio = findMediaElement(el);

            playbackSpeedIndex++;
            if (playbackSpeedIndex >= playbackSpeed.length) {
                playbackSpeedIndex = 0;
            }

            audio.playbackRate = playbackSpeed[playbackSpeedIndex];
            _render(slotId, playbackSpeed[playbackSpeedIndex])
        },
    })

    logseq.App.onMacroRendererSlotted(async ({ slot, payload }) => {
        const [type, startTime, durationMins] = payload.arguments;
        if (!type?.startsWith(':media_controls')) return;

        _render(slot, playbackSpeed[playbackSpeedIndex])
    })
}

logseq.ready(main).catch(console.error)
