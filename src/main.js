import App from './App.svelte';

const node = document.createElement('div');
document.getElementById('primary').appendChild(node);

const app = new App({ target: node, props: {} });

export default app;