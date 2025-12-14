<script setup lang="ts">
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

interface Partner {
  id?: number
  image?: string
  link?: string
}

const { getItems } = useDirectusItems()

const { data: partners } = await useAsyncData('novoland_partners', () => {
  return getItems<Partner>({
    collection: 'novoland_partner',
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
      trigger: '#partners',
      start: 'top 80%',
      end: 'bottom 60%',
      toggleActions: 'play none none reverse',
    }
  })
    .from('.partners', animation)
})
</script>

<template>
  <UPageSection
    id="partners"
    title="Наши партнеры"
    :ui="{
      title: 'partners__title font-serif text-left text-[#28445C]',
    }"
    class="partners"
  >
    <UMarquee class="partners__marquee">
      <NuxtLink v-for="({ link, image }, index) in partners" :key="index" :to="link" target="_blank">
        <NuxtImg :src="`https://cms.sibbalance.ru/assets/${image}`" />
      </NuxtLink>
    </UMarquee>
  </UPageSection>
</template>

<style scoped></style>
