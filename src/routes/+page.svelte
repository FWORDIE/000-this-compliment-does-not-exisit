<script lang="ts">
    import { onMount } from "svelte";

    export let data;
    import Typewriter from "svelte-typewriter";
    import { flip } from "svelte/animate";
    const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));
    let play = false;
    let compliment = {};
    onMount(async () => {
        console.log(data)
        let compliments = data.data
        compliment = compliments[Math.floor(Math.random() * compliments.length)];
        // var sound = new Howl({
        //     src: [audio],
        // });

        // sound.play();
    });
    let duration = 0;
    let done = true;
    let fade = false;
    const playVoice = async () => {
        done = false;
        fade = true;

        let compliments = data.data;
        compliment = compliments[Math.floor(Math.random() * compliments.length)];
        var audio = new Audio(compliment.audio[0].url);
        audio.addEventListener("loadedmetadata", async (event) => {
            await delay(300);
            fade = false;

            text = compliment.text;
            duration = audio.duration;
            play = true;
            audio.play();
        });
        audio.addEventListener("ended", (event) => {
            finished();
        });
    };
    $: text = "";
    const finished = async () => {
        await delay(300);
        doneOne = true;
        done = true;
    };

    let doneOne = false;
    let aboutSpace = false;
</script>

<div class="holder">
    {#if compliment}
        <div class="textHolder" class:fade>
            {#if play}
                <Typewriter interval={(duration * 1000) / text.length - 5} cursor={false}>
                    <p class="title">{text}</p>
                </Typewriter>
            {:else}
                <p class="title">❤️</p>
            {/if}
            <button on:click={playVoice} disabled={!done} class:hidden={!done}>{doneOne ? "Give me another" : "Give me a compliment"}</button>
        </div>
    {/if}
    {#if aboutSpace}
        <div class="about">
            <p class="title">❤️</p>
            <p><b>This Compliment Does Not Exist</b></p>
            <p>
                Virtual hugs from your friends at <a href="https://openai.com/" target="_blank">OpenAi</a> and
                <a href="https://elevenlabs.io" target="_blank">ElevenLabs</a>
            </p>
            <p>Made by <a href="https://www.fredwordie.com/">Fred Wordie</a></p>
        </div>
    {/if}
    <button class="aboutButton" on:click={() => (aboutSpace = !aboutSpace)}>
        {aboutSpace ? "x" : "?"}
    </button>
</div>

<style lang="scss">
    .holder {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        height: 100dvh;
        background-color: var(--white);
        color: var(--black);

        .title {
            color: var(--black);
            opacity: 1;
            font-size: var(--font-size-lg);
            transition: all 300ms;
        }

        .textHolder {
            min-height: 70%;
            width: 70%;
            text-align: center;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;

            &.fade p {
                opacity: 0;
            }
        }

        .about {
            position: absolute;
            height: 100%;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            background-color: var(--white);
            width: 100%;
            color: var(--black);
            p {
                margin-block: var(--halfPadding);
            }
            a {
                color: var(--black);
            }
        }
        .aboutButton {
            position: absolute;
            top: var(--padding);
            right: var(--padding);
            z-index: 10;
            text-decoration: none;
        }
        button {
            border: 0px;
            background: none;
            text-decoration: underline;
            font-size: var(--base-font);
            cursor: pointer;
            opacity: 1;
            transition: opacity 100ms;
            &.hidden {
                opacity: 0;
                cursor: default;
            }
        }
    }
</style>
