<script>
    import * as handlers from './index.js';
    browser.runtime.onMessage.addListener(async ({id, data}) => (id in handlers) && await handlers[id](data));
</script>
