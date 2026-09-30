<template>
  <div class="home flex h-screen w-screen items-center justify-center">
    <EmojiBackground />
    <div ref="sakanaHost" class="sakana-widget-host" />
    <div
      class="-mt-10 flex w-screen animate-scale-in-center flex-col px-4 sm:-mt-40 sm:w-[626px]"
    >
      <ClientOnly>
        <Vue3Lottie
          :animationData="lottieData"
          class="w-full sm:w-[300px] custom-small"
          :autoPlay="true"
          :loop="true"
          :speed="1"
          renderer="svg"
        />
      </ClientOnly>
      <div
        class="relative mt-6 flex w-full flex-col items-center rounded-lg bg-white/85 py-6 text-zinc-800 shadow shadow-black/40 backdrop-blur-sm"
      >
        <div class="text-2xl font-bold sm:text-3xl">
          <span class="shake-hand inline-block">👋</span> Hi, I am
          <span
            class="bg-gradient-to-r from-pink-500 to-rose-500 bg-clip-text text-transparent"
            >ZhangHaha</span
          >.
        </div>
        <p class="mt-2 text-base sm:text-lg">Operations</p>
        <p class="mt-1 text-black/50">"Turning ideas into action."</p>
        <div class="mt-4 flex gap-4">
          <div
            @click="router.go('/AboutMe')"
            class="button relative w-fit cursor-pointer rounded-full bg-white active:scale-95"
          >
            🎉 Welcome
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, onBeforeUnmount, defineAsyncComponent } from "vue";
import EmojiBackground from "../../components/EmojiBackground/index.vue";
import { useRouter } from "vitepress";
import lottieData from "../../assets/dora.json";
import chibiImage from "../../assets/sakana-me-2d-chibi.png";

type SakanaWidgetInstance = {
  mount: (element: HTMLElement) => SakanaWidgetInstance;
  unmount: () => SakanaWidgetInstance;
};

type SakanaWidgetCharacter = {
  image: string;
  initialState: {
    i: number;
    s: number;
    d: number;
    r: number;
    y: number;
    t: number;
    w: number;
  };
};

declare global {
  interface Window {
    SakanaWidget?: {
      new (options?: {
        character?: string;
        autoFit?: boolean;
        controls?: boolean;
      }): SakanaWidgetInstance;
      getCharacter: (name: string) => SakanaWidgetCharacter | null;
      registerCharacter: (
        name: string,
        character: SakanaWidgetCharacter,
      ) => void;
    };
  }
}

// 动态导入 Vue3Lottie 避免 SSR 问题
const Vue3Lottie = defineAsyncComponent(() =>
  // @ts-ignore
  import("vue3-lottie").then((m) => m.Vue3Lottie),
);

const returnToTopRef = ref<HTMLElement | null>(null);
const sakanaHost = ref<HTMLElement | null>(null);

const router = useRouter();
let sakanaWidget: SakanaWidgetInstance | undefined;
let sakanaScriptPromise: Promise<void> | undefined;
let isUnmounted = false;

function loadSakanaWidget() {
  if (window.SakanaWidget) return Promise.resolve();

  return (sakanaScriptPromise ??= new Promise<void>((resolve, reject) => {
    const script = document.createElement("script");
    script.src =
      "https://cdn.jsdelivr.net/npm/sakana-widget@4.0.0/lib/index.umd.min.js";
    script.onload = () => resolve();
    script.onerror = () => {
      sakanaScriptPromise = undefined;
      reject(new Error("Failed to load Sakana Widget"));
    };
    document.head.appendChild(script);
  }));
}

onMounted(() => {
  returnToTopRef.value = document.querySelector(".VPLocalNav.empty.fixed");
  if (returnToTopRef.value) returnToTopRef.value.style.zIndex = "-1000";

  void loadSakanaWidget()
    .then(() => {
      if (isUnmounted || !sakanaHost.value || !window.SakanaWidget) return;
      const SakanaWidget = window.SakanaWidget;
      const character = SakanaWidget.getCharacter("chisato");
      if (!character) return;

      SakanaWidget.registerCharacter("blog-chibi", {
        ...character,
        image: chibiImage,
        initialState: {
          ...character.initialState,
          r: 0,
          y: 0,
          t: 0,
          w: 0,
        },
      });
      sakanaWidget = new SakanaWidget({
        character: "blog-chibi",
        autoFit: true,
        controls: false,
      }).mount(sakanaHost.value);
    })
    .catch((error) => console.error(error));
});

onBeforeUnmount(() => {
  isUnmounted = true;
  sakanaWidget?.unmount();
  sakanaWidget = undefined;
  if (returnToTopRef.value) returnToTopRef.value.style.zIndex = "1000";
});
</script>

<style scoped>
.sakana-widget-host {
  position: fixed;
  right: 0;
  bottom: 0;
  z-index: 50;
  width: clamp(120px, 20vw, 200px);
  height: clamp(120px, 20vw, 200px);
}

@media (pointer: coarse) {
  .sakana-widget-host {
    width: clamp(170px, 45vw, 200px);
    height: clamp(170px, 45vw, 200px);
  }
}

.home {
  --primary-color: #ff6086;
  /* 优化渲染性能 */
  contain: layout style paint;
}

.button {
  padding: 6px 12px;
  color: var(--primary-color);
  border: 2px solid var(--primary-color);
  transition: all 0.2s cubic-bezier(0, 0, 0.2, 1);
  /* 优化点击性能 */
  touch-action: manipulation;
}

.button:hover {
  background-color: var(--primary-color);
  color: white;
}

.button::before,
.button::after {
  position: absolute;
  content: "";
  width: 150%;
  left: 50%;
  height: 100%;
  transform: translateX(-50%);
  z-index: -1000;
  background-repeat: no-repeat;
  /* GPU 加速 */
  will-change: background-position;
}

.button:hover::before {
  top: -70%;
  background-image:
    radial-gradient(circle, var(--primary-color) 20%, transparent 20%),
    radial-gradient(
      circle,
      transparent 20%,
      var(--primary-color) 20%,
      transparent 30%
    ),
    radial-gradient(circle, var(--primary-color) 20%, transparent 20%),
    radial-gradient(circle, var(--primary-color) 20%, transparent 20%),
    radial-gradient(
      circle,
      transparent 10%,
      var(--primary-color) 15%,
      transparent 20%
    ),
    radial-gradient(circle, var(--primary-color) 20%, transparent 20%),
    radial-gradient(circle, var(--primary-color) 20%, transparent 20%),
    radial-gradient(circle, var(--primary-color) 20%, transparent 20%),
    radial-gradient(circle, var(--primary-color) 20%, transparent 20%);
  background-size:
    10% 10%,
    20% 20%,
    15% 15%,
    20% 20%,
    18% 18%,
    10% 10%,
    15% 15%,
    10% 10%,
    18% 18%;
  background-position: 50% 120%;
  animation: greentopBubbles 1s ease;
}

@keyframes greentopBubbles {
  0% {
    background-position:
      5% 90%,
      10% 90%,
      10% 90%,
      15% 90%,
      25% 90%,
      25% 90%,
      40% 90%,
      55% 90%,
      70% 90%;
  }

  50% {
    background-position:
      0% 80%,
      0% 20%,
      10% 40%,
      20% 0%,
      30% 30%,
      22% 50%,
      50% 50%,
      65% 20%,
      90% 30%;
  }

  100% {
    background-position:
      0% 70%,
      0% 10%,
      10% 30%,
      20% -10%,
      30% 20%,
      22% 40%,
      50% 40%,
      65% 10%,
      90% 20%;
    background-size:
      0% 0%,
      0% 0%,
      0% 0%,
      0% 0%,
      0% 0%,
      0% 0%;
  }
}

.button:hover::after {
  bottom: -70%;
  background-image:
    radial-gradient(circle, var(--primary-color) 20%, transparent 20%),
    radial-gradient(circle, var(--primary-color) 20%, transparent 20%),
    radial-gradient(
      circle,
      transparent 10%,
      var(--primary-color) 15%,
      transparent 20%
    ),
    radial-gradient(circle, var(--primary-color) 20%, transparent 20%),
    radial-gradient(circle, var(--primary-color) 20%, transparent 20%),
    radial-gradient(circle, var(--primary-color) 20%, transparent 20%),
    radial-gradient(circle, var(--primary-color) 20%, transparent 20%);
  background-size:
    15% 15%,
    20% 20%,
    18% 18%,
    20% 20%,
    15% 15%,
    20% 20%,
    18% 18%;
  background-position: 50% 0%;
  animation: greenbottomBubbles 1s ease;
}

@keyframes greenbottomBubbles {
  0% {
    background-position:
      10% -10%,
      30% 10%,
      55% -10%,
      70% -10%,
      85% -10%,
      70% -10%,
      70% 0%;
  }

  50% {
    background-position:
      0% 80%,
      20% 80%,
      45% 60%,
      60% 100%,
      75% 70%,
      95% 60%,
      105% 0%;
  }

  100% {
    background-position:
      0% 90%,
      20% 90%,
      45% 70%,
      60% 110%,
      75% 80%,
      95% 70%,
      110% 10%;
    background-size:
      0% 0%,
      0% 0%,
      0% 0%,
      0% 0%,
      0% 0%,
      0% 0%;
  }
}

.shake-hand {
  animation: shake 4s ease-in-out both infinite;
}
@keyframes shake {
  60% {
    transform: rotate(0deg);
  }
  70% {
    transform: rotate(-10deg);
  }
  80% {
    transform: rotate(0deg);
  }
  90% {
    transform: rotate(10deg);
  }
  100% {
    transform: rotate(0deg);
  }
}

.custom-small {
  width: 300px;
}
</style>
