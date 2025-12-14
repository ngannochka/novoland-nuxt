<script setup lang="ts">
import type { NavigationMenuItem } from '@nuxt/ui'

interface Footer {
  id?: number
  email?: string
  phone?: string
}

const { getSingletonItem } = useDirectusItems()

const { data: footer } = await useAsyncData('novoland_footer', () => {
  return getSingletonItem<Footer>({
    collection: 'novoland_footer',
  })
})

const emit = defineEmits<{
  (e: 'openCallbackModal', value: true): void
}>()

const handleCallbackButtonClick = () => {
  emit('openCallbackModal', true)
}

const items: NavigationMenuItem[] = [
  {
    label: 'Каталог услуг',
    to: '#services',
  },
  {
    label: 'Каталог ампул',
    to: '#catalog',
  },
  {
    label: 'О компании',
    to: '#about',
  },
  {
    label: 'Партнеры',
    to: '#partners',
  },
  {
    label: 'Достижения',
    to: '#accomplishments',
  },
  {
    label: 'Сертификаты',
    to: '#certificates',
  },
  {
    label: 'Новости',
    to: '#news',
  },
  {
    label: 'Контакты',
    to: '#contacts',
  },
]

const currentYear = new Date().getFullYear()
</script>

<template>
  <UFooter
    :ui="{
      root: 'pb-[12vw] bg-[#28445C] bg-[url(/footer/footerBgi.svg)] bg-no-repeat bg-bottom bg-size-[60vw_auto]',
      left: 'flex flex-col',
      right: 'flex flex-col gap-3',
      center: 'self-center'
    }"
  >
    <template #left>
      <UButton
        label="Заказать звонок"
        size="lg"
        class="mb-4 bg-white font-sans text-[#28445C] hover:bg-[#D9D9D9] focus:bg-[#F2F2F2] active:bg-[#F2F2F2] lg:hidden"
        @click="handleCallbackButtonClick"
      />

      <p class="font-sans text-white">
        ООО "НОВОЛЭНД"
      </p>
      <p class="font-sans text-white">
        ОГРН 1195476063507
      </p>
      <p class="flex items-center gap-1 font-sans text-white">
        <UIcon name="lucide:copyright" class="size-3" /> {{ currentYear }}
      </p>
    </template>

    <template #default>
      <UNavigationMenu
        :items="items"
        :ui="{
          list: 'flex flex-col xl:flex-row',
          link: 'text-white'
        }"
      />
    </template>

    <template #right>
      <NuxtLink to="/">
        <NuxtImg src="/footer/footerLogo.svg" alt="Логотип компании НовоЛэнд" class="h-7 mb-4 lg:m-0" />
      </NuxtLink>

      <NuxtLink
        :to="`mailto:${footer?.email}`"
        class="flex items-center gap-1 font-sans text-white hover:text-[#D9D9D9] focus:text-[#F2F2F2] active:text-[#F2F2F2]"
      >
        <UIcon name="ic:outline-email" class="size-5" />
        {{ footer?.email  }}
      </NuxtLink>

      <NuxtLink
        :to="`mailto:${footer?.email}`"
        class="flex items-center gap-1 font-sans text-white hover:text-[#D9D9D9] focus:text-[#F2F2F2] active:text-[#F2F2F2]"
      >
        <UIcon name="ic:round-phone" class="size-5" />
        {{ footer?.phone  }}
      </NuxtLink>

    </template>
  </UFooter>
</template>

<style scoped></style>
