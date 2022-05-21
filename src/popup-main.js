import App from './App.svelte';
import 'milligram';
import 'webextension-polyfill';

const app = new App({ target: document.body });

export default app;
