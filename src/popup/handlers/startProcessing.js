import {processing} from '../stores/application'

const startProcessing = async () => processing.set(true);

export default startProcessing;
