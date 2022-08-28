import {endProcessing} from "./checkProgress";

const saveScore = async data => {
    endProcessing();
    return await browser.storage.local.set({ results: data });
}

export default saveScore;
