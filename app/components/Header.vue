<script setup lang="ts">
import { gsap } from 'gsap'

interface Header {
  id?: number
  callbackButton?: string
}

const { getSingletonItem } = useDirectusItems()

const { data: header } = await useAsyncData('novoland_header', () => {
  return getSingletonItem<Header>({
    collection: 'novoland_header'
  })
})

const emit = defineEmits<{
  (e: 'openCallbackModal', value: true): void
}>()

const isMobileNavOpen = ref<boolean>(false)

const toggleMobileNav = async (value: boolean) => {
  if (value) {
    isMobileNavOpen.value = true
    await nextTick()

    gsap.fromTo(
      '.body',
      {
        opacity: 0,
        y: 40,
        scale: 0.95,
        pointerEvents: 'none',
      },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        pointerEvents: 'auto',
        duration: 0.3,
        ease: 'expo.out',
      }
    )
  } else {
    gsap.to('.body', {
      autoAlpha: 0,
      y: -40,
      scale: 0.95,
      duration: 0.15,
      ease: 'power1.in',
      onComplete: () => {
        isMobileNavOpen.value = false
      },
    })
  }
}

const handleCallbackButtonClick = () => {
  isMobileNavOpen.value = false
  emit('openCallbackModal', true)
}
</script>

<template>
  <UHeader
    :ui="{
      right: 'lg:hidden',
      body: 'body flex flex-col items-center gap-10',
    }"
    :open="isMobileNavOpen"
    @update:open="toggleMobileNav"
  >
    <template #title>
      <NuxtImg
        src="/header/headerLogo.svg"
        alt="Логотип компании НовоЛэнд"
        class="h-8"
      />
    </template>

    <NavMenu />

    <template #body>
      <NavMenu />

      <UButton
        :label="header?.callbackButton"
        size="xl"
        class="font-sans rounded-full bg-[#2A4A5D] hover:bg-[#223C52] focus:bg-[#223C52] active:bg-[#1D3448]"
        @click="handleCallbackButtonClick"
      />
    </template>
  </UHeader>
</template>

<style scoped></style>
