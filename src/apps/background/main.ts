import {browser} from 'webextension-polyfill-ts';
import * as handlers from './handlers';

browser.runtime.onMessage.addListener(async ({id, data}) => {
    console.log({id, data});
    if (id in handlers) return await handlers[id](data);
});
