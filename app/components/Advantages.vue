<script setup lang="ts">
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

interface Advantage {
  id?: number
  icon?: string
  title?: string
  description?: string
}

const { getItems } = useDirectusItems()

const { data: advantages } = await useAsyncData('novoland_advantages', () => {
  return getItems<Advantage>({
    collection: 'novoland_advantage',
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
      trigger: '#advantages',
      start: 'top 80%',
      end: 'bottom 60%',
      toggleActions: 'play none none reverse',
    }
  })
    .from('.advantages', animation)
})
</script>

<template>
  <UPageSection
    id="advantages"
    title="Наши преимущества"
    :ui="{
      title: 'advantages__title font-serif text-left text-[#28445C]',
    }"
    class="advantages"
  >
    <UPageGrid>
      <UPageCard
        v-for="(advantage, index) in advantages"
        :key="index"
        v-bind="advantage"
        variant="solid"
        :ui="{
          root: 'rounded-2xl bg-[#314158]',
          leadingIcon: 'text-white',
          title: 'font-sans',
          description: 'font-sans text-white',
        }"
        class="advantage"
      />
    </UPageGrid>
  </UPageSection>
</template>

<style scoped></style>
