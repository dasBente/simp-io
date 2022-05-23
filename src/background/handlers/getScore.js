const getScore = async () => await browser.storage.local.get('results');

export default getScore;
