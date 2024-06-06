<script lang="ts">
    import { onMount } from "svelte";

    export let data;
    import Typewriter from "svelte-typewriter";
    import { flip } from "svelte/animate";
    const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));
    let play = false;
    let compliment = {};
    onMount(async () => {
        let compliments = data.data.allCompliments;
        compliment = compliments[Math.floor(Math.random() * compliments.length)];
        // var sound = new Howl({
        //     src: [audio],
        // });

        // sound.play();
    });
    let duration = 0;
    let done = true;
    const playVoice = async  () => {
        done = false
        let compliments = data.data.allCompliments;
        compliment = compliments[Math.floor(Math.random() * compliments.length)];
        var audio = new Audio(compliment.audio[0].url);
        audio.addEventListener("loadedmetadata", async (event) => {
            await delay(300)
            text = compliment.text
            duration = audio.duration;
            play = true;
            audio.play();
        });
        audio.addEventListener("ended", (event) => {
            finished();
        });
    };
    $: text = ''
    const finished = async  () => {

        await delay(300)
        doneOne = true
        done = true;
    };

    let doneOne =  false
</script>

<div class="holder">
    {#if compliment}
        <div class="textHolder">
            {#if play}
                <Typewriter interval={(duration * 1000) / text.length - 5} cursor={false} >
                    <h1>{text}</h1>
                </Typewriter>
            {:else}
            <h1>❤️</h1>
            {/if}
            <button on:click={playVoice} disabled={!done}>{doneOne ?  'Give me another' : 'Give me a compliment'}</button>
        </div>
    {/if}
</div>

<style lang="scss">
    .holder {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        height: 100dvh;
        .textHolder {
            min-height: 70%;
            width: 70%;
            text-align: center;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
        }
        button {
            border: 0px;
            background: none;
            text-decoration: underline;
            cursor: pointer;
        }
    }
</style>
