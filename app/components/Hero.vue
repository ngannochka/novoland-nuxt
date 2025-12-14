<script setup lang="ts">
import { gsap } from 'gsap'

interface HeroSection {
  id?: number
  description?: string
  callbackButton?: string
}

const emit = defineEmits<{
  (e: 'openCallbackModal', value: true): void
}>()

const { getSingletonItem } = useDirectusItems()

const { data: heroSection } = await useAsyncData('novoland_hero', () => {
  return getSingletonItem<HeroSection>({
    collection: 'novoland_hero'
  })
})

const handleCallbackButtonClick = () => {
  emit('openCallbackModal', true)
}

onMounted(() => {
  const animation = {
    autoAlpha: 0,
    duration: 0.3,
    scale: 0.95,
    y: 40,
    ease: 'expo.out',
  }

  gsap.timeline()
    .from('.hero .hero__title--start', animation)
    .from('.hero .hero__title--end', animation, '>+0.3')
    .from('.hero .hero__description', animation, '>')
    .from('.hero .hero__button', animation, '>')
})
</script>

<template>
  <UPageHero
    :description="heroSection?.description"
    :ui="{
      description: 'hero__description font-sans text-[#28445C]'
    }"
    class="hero"
  >
    <template #title>
      <h1 class="flex flex-col font-serif text-[clamp(90px,calc(36.49px+12.16vw),270px)] uppercase text-[#28445C]">
        <span class="hero__title--start self-start">
          ново
        </span>
        <span class="hero__title--end self-end">
          лэнд
        </span>
      </h1>
    </template>

    <template #links>
      <UButton
        size="xl"
        class="hero__button font-sans rounded-full bg-[#2A4A5D] hover:bg-[#223C52] focus:bg-[#223C52] active:bg-[#1D3448]"
        @click="handleCallbackButtonClick"
      >
        {{ heroSection?.callbackButton }}
      </UButton>
    </template>
  </UPageHero>
</template>

<style scoped></style>
