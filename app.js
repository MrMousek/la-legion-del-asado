async function fetchStreamers() {
    showLoading();
    try {
        const res = await fetch("./functions/getStreamers.js");
        const json = await res.json();
        displayStreamers(json.data);
    } catch (e) {
        console.error(e);
        showError();
    }
}
