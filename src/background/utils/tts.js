import Speech from 'speak-tts'

let speech;

export const initTts = () => {
    const player = new Speech();
    if (player.hasBrowserSupport()) {
        player.init({
            'volume': 1,
            'lang': 'en-GB',
            'voice': 'Google UK English Male',
            'splitSentences': true,
        });
        speech = player;
    }
};
export const speak = (message) => {
    if (!!speech) {
        chrome.browserAction.setBadgeText({text: "♫"});
        speech.speak({text: message}).then(
            () => {
                chrome.browserAction.setBadgeText({text: ""});
            });
        // Play-around then not working
        setTimeout(() => chrome.browserAction.setBadgeText({text: ""}), 3000)
    }
};
