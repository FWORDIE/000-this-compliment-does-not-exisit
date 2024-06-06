<script lang="ts">
	import '$lib/scss/global.scss';

    export let data;
    const handleKey = (event: KeyboardEvent) => {
        if (event.repeat) return;

        switch (event.key) {
            case "c":
               
                // By using `preventDefault`, it tells the Browser not to handle the
                // key stroke for its own shortcuts or text input.
                event.preventDefault();
                break;


        }
    };
</script>
<svelte:window on:keydown={(e) => handleKey(e)} />

<main>
    <slot {data}><!-- optional fallback --></slot>
    
</main>

<style lang="scss">
    main{
        max-width: 100dvw;
        max-height: 100dvh;
        overflow: hidden;
    }

</style>