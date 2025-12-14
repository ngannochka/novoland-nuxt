<script setup lang="ts">
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

interface Certificate {
  id?: number
  image?: string
}

const { getItems } = useDirectusItems()

const { data: certificates } = await useAsyncData('novoland_certificates', () => {
  return getItems<Certificate>({
    collection: 'novoland_certificate',
  })
})

onMounted(() => {
  const animation = {
    autoAlpha: 0,
    duration: 0.3,
    scale: 0.95,
    y: 40,
    ease: 'expo.out',
  }

  gsap.timeline({
    scrollTrigger: {
      trigger: '#certificates',
      start: 'top 80%',
      end: 'bottom 60%',
      toggleActions: 'play none none reverse',
    }
  })
    .from('.certificates', animation)
})
</script>

<template>
  <UPageSection
    id="certificates"
    title="Сертификаты"
    :ui="{
      title: 'certificates__title font-serif text-left text-[#28445C]'
    }"
    class="certificates"
  >
    <UCarousel
      v-slot="{ item }"
      dots
      :items="certificates"
      :ui="{
        item: 'sm:basis-1/2 md:basis-1/2 lg:basis-1/3',
        dot: 'data-[state=active]:bg-[#28445C]'
      }"
      class="certificates__carousel w-full max-w-sm mx-auto sm:max-w-xl md:max-w-2xl lg:max-w-4xl xl:max-w-6xl"
    >
      <NuxtImg :src="`https://cms.sibbalance.ru/assets/${item.image}`" class="rounded-lg" />
    </UCarousel>
  </UPageSection>
</template>

<style scoped></style>
