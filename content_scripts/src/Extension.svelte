<script>
    import App from './App.svelte';
    import { getHeader } from './libs/extraction';

    function addExtension() {
        let node = document.createElement('div');
        getHeader().append(node);

        new App({ target: node, props: {} });
        return node;
    }

    let extension;
    if (window.location.pathname === '/paid_memberships') extension = addExtension();

    if (!extension) document.addEventListener('yt-navigate-finish', () => {
        if (!extension && window.location.pathname === '/paid_memberships') {
            setTimeout(() => { extension = addExtension(); }, 500);
        }
    });
</script>