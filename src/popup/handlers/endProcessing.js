import {processing} from '../stores/application'

const endProcessing = async () => processing.set(false);

export default endProcessing;
