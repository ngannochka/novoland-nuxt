<script setup lang="ts">
useHead({
  link: [
    { rel: 'canonical', href: 'https://novoland54.ru/' }
  ]
})

useSeoMeta({
  title: 'НовоЛэнд',
  description: 'НовоЛэнд — это современное производственное предприятие, специализирующееся на полном цикле от идеи и разработки рецептуры до упаковки.',
  ogTitle: 'НовоЛэнд',
  ogDescription: 'НовоЛэнд — это современное производственное предприятие, специализирующееся на полном цикле от идеи и разработки рецептуры до упаковки.',
  ogImage: '/ogImage.png',
  ogUrl: 'https://novoland54.ru/',
  titleTemplate: '%s'
})

const modal = ref(false)

const toggleCallbackModal = (value: boolean) => {
  modal.value = value
}
</script>

<template>
  <Header @openCallbackModal="toggleCallbackModal" />
  <UMain>
    <Hero @openCallbackModal="toggleCallbackModal" />
    <Services @openCallbackModal="toggleCallbackModal" />
    <Catalog @openCallbackModal="toggleCallbackModal" />
    <Advantages />
    <About />
    <Partners />
    <Accomplishments />
    <Certificates />
    <News />
    <Contacts />
  </UMain>
  <Footer @openCallbackModal="toggleCallbackModal" />
  <CallbackModal :open="modal" @toggle-callback-modal="toggleCallbackModal"/>
</template>
