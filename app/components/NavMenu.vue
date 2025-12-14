<script setup lang="ts">
import { gsap } from 'gsap'
import { ScrollToPlugin } from 'gsap/ScrollToPlugin'
import type { NavigationMenuItem } from '@nuxt/ui'

gsap.registerPlugin(ScrollToPlugin)

const scrollToSection = (selector: string) => {
  gsap.to(window, {
    duration: 1,
    scrollTo: { y: selector, offsetY: 80, autoKill: true },
    ease: 'expo.out'
  })
}

const items: NavigationMenuItem[] = [
  {
    label: 'Каталог услуг',
    to: '#services',
    onSelect: () => scrollToSection('#services')
  },
  {
    label: 'Каталог ампул',
    to: '#catalog',
    onSelect: () => scrollToSection('#catalog')
  },
  {
    label: 'О компании',
    to: '#about',
    onSelect: () => scrollToSection('#about')
  },
  {
    label: 'Партнеры',
    to: '#partners',
    onSelect: () => scrollToSection('#partners')
  },
  {
    label: 'Достижения',
    to: '#accomplishments',
    onSelect: () => scrollToSection('#accomplishments')
  },
  {
    label: 'Сертификаты',
    to: '#certificates',
    onSelect: () => scrollToSection('#certificates')
  },
  {
    label: 'Новости',
    to: '#news',
    onSelect: () => scrollToSection('#news')
  },
  {
    label: 'Контакты',
    to: '#contacts',
    onSelect: () => scrollToSection('#contacts')
  }
]
</script>

<template>
  <ClientOnly>
    <UNavigationMenu
      :items="items"
      :ui="{
        list: 'flex flex-col items-center lg:flex-row',
        linkLabel: 'font-sans text-[#28445C]'
      }"
    />
  </ClientOnly>
</template>

<style scoped></style>
