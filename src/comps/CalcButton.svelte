<script>
    import { createEventDispatcher } from 'svelte'; 
    import Button, { Label } from '@smui/button';
    import { wait } from '../libs/utils';
    
    const dispatch = createEventDispatcher();

    let running = false;
    
    async function calc() {
        running = true;
        let button = document.getElementById('more-contents-button');

        while (window.location.pathname === '/paid_memberships') {
            if (button.offsetParent) {
                button.childNodes[0].click();
                dispatch('update');
            }
            await wait(100);
        }
        running = false;
    }
</script>

{#if !running}
<Button on:click={calc} variant="raised">
        <Label>Calculate</Label>
</Button>
{/if}