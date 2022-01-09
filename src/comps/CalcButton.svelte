<script>
    import { createEventDispatcher } from 'svelte'; 
    import Button, { Label } from '@smui/button';
    import { wait } from '../libs/utils';
    
    const dispatch = createEventDispatcher();

    let running = false;
    
    async function calc() {
        running = true;
        let button = document.getElementById('more-contents-button');

        if (button) {
            let timer = setInterval(() => dispatch('update'), 1000);
            
            // auto-expand page
            while (window.location.pathname === '/paid_memberships') {
                if (button.offsetParent) button.childNodes[0].click();
                await wait(100);
            }

            clearInterval(timer);
        } else {
            dispatch('update');
        }

        running = false;
    }
</script>

{#if !running}
<Button on:click={calc} variant="raised">
        <Label>Calculate</Label>
</Button>
{/if}