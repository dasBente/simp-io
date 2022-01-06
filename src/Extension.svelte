<script>
    import App from './App.svelte';
    import { getHeader } from './extraction';

    function addExtension() {
        let node = document.createElement('div');
        getHeader().append(node);

        new App({ target: node, props: {} });
        return node;
    }

    let extension = addExtension();

    if (!extension) document.addEventListener('yt-navigate-finish', () => {
        if (!extension && window.location.pathname == '/paid_memberships') {
            extension = addExtension();
        }
    });
</script>