import App from './App.svelte';
import * as $j from 'jquery';

const app = new App({ target: $j('#primary'), props: {} });

export default app;