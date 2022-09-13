<script>
    import Nav from "./Nav.svelte";
    import pages from './pages.js';

    let selectedPage = 'table';
    $: page = pages[selectedPage];
</script>

<main>
    <header>
        <Nav bind:selected={selectedPage} />
    </header>

    <svelte:component this={page.component} />
</main>

<style>
    main { width: 800px; height: 600px; }
    header {
        width: 100%; height: 40px;
        background: black;
    }
</style>
