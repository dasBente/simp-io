import Extension from './Extension.svelte';

const node = document.createElement('div');
document.body.appendChild(node);

const app = new Extension({ target: node, props: {} });

export default app;