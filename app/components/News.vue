<script setup lang="ts">
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

interface Post {
  id?: number
  image?: string
  date?: string
  title?: string
  description?: string
}

const { getItems } = useDirectusItems()

const { data: posts } = await useAsyncData('novoland_posts', () => {
  return getItems<Post>({
    collection: 'novoland_post',
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
      trigger: '#news',
      start: 'top 80%',
      end: 'bottom 60%',
      toggleActions: 'play none none reverse',
    }
  })
    .from('.news', animation)
})
</script>

<template>
  <UPageSection
    id="news"
    title="Новости"
    :ui="{
      title: 'news__title font-serif text-left text-[#28445C]',
    }"
    class="news"
  >
    <UCarousel
      v-slot="{ item }"
      dots
      :items="posts"
      :ui="{
        item: 'sm:basis-1/2 md:basis-1/2 lg:basis-1/3',
        dot: 'data-[state=active]:bg-[#28445C]'
      }"
      class="news__carousel w-full max-w-sm mx-auto sm:max-w-xl md:max-w-2xl lg:max-w-4xl xl:max-w-6xl"
    >
      <UBlogPost
        variant="ghost"
        v-bind="item"
        :image="`https://cms.sibbalance.ru/assets/${item.image}`"
        :ui="{
          date: 'fonts-sans text-[#28445C] opacity-80',
          title: 'fonts-sans text-[#28445C]',
          description: 'fonts-sans text-[#28445C]'
        }"
      >
        <template #date>
          {{
            new Intl.DateTimeFormat('ru-RU', {
              day: 'numeric',
              month: 'long',
              year: 'numeric'
            }).format(new Date(item.date!))
          }}
        </template>
      </UBlogPost>
    </UCarousel>
  </UPageSection>
</template>

<style scoped></style>
