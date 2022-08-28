<script>
    import * as handlers from './';
    browser.runtime.onMessage.addListener(async ({id, data}) => (id in handlers) && await handlers[id](data));
</script>
