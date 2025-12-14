<script setup lang="ts">
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

interface AboutSection {
  id?: number
  description?: string
}

const { getSingletonItem } = useDirectusItems()

const { data: aboutSection } = await useAsyncData('novoland_about', () => {
  return getSingletonItem<AboutSection>({
    collection: 'novoland_about'
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
      trigger: '#about',
      start: 'top 80%',
      end: 'bottom 60%',
      toggleActions: 'play none none reverse',
    }
  })
    .from('.about', animation)
    // .from('.about .about__description', animation, '>-0.15')
})
</script>

<template>
  <UPageSection
    id="about"
    title="О компании"
    :description="aboutSection?.description"
    :ui="{
      root: 'bg-[url(/about/aboutTransparentBgi.svg)] bg-no-repeat bg-right md:bg-none',
      wrapper: 'md:bg-[url(/about/aboutBgi.svg)] md:bg-no-repeat md:bg-[90%_center]',
      title: 'about__title text-left font-serif text-[#28445C]',
      description: 'about__description text-left font-sans text-[#28445C] md:max-w-md lg:max-w-lg xl:max-w-xl 2xl:max-w-2xl',
    }"
    class="about"
  />
</template>

<style scoped></style>
