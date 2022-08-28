let inProgress = false;

export const startProcessing = () => {
    inProgress = true;
    browser.runtime.sendMessage({id: 'startProcessing'});
}

export const endProcessing = () => {
    inProgress = false;
    browser.runtime.sendMessage({id: 'endProcessing'});
}

const checkProgress = async () => inProgress;

export default checkProgress;
