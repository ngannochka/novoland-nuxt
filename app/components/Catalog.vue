<script setup lang="ts">
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

interface CatalogSection {
  id?: number
  showMoreButton?: string
  callbackButton?: string
}

interface ProductCard {
  id?: number
  image?: string
  title?: string
  volume?: string
  material?: string
  color?: string
}

const { getSingletonItem, getItems } = useDirectusItems()

const { data: catalogSection } = await useAsyncData('novoland_catalog', () => {
  return getSingletonItem<CatalogSection>({
    collection: 'novoland_catalog',
  })
})

const { data: products } = await useAsyncData('novoland_products', () => {
  return getItems<ProductCard>({
    collection: 'novoland_product',
  })
})

const emit = defineEmits<{
  (e: 'openCallbackModal', value: boolean): void
}>()

const handleCallbackButtonClick = () => {
  emit('openCallbackModal', true)
}

const {
  visibleItems: visibleProducts,
  hasMoreItems: hasMoreProducts,
  handleShowMore
} = useShowMoreItems(6, 3, products.value)

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
      trigger: '#catalog',
      start: 'top 80%', // когда верх блока доходит до 80% экрана
      end: 'bottom 60%',
      toggleActions: 'play none none reverse', // можно поиграться с этим
    }
  })
    .from('.catalog', animation)
})
</script>

<template>
  <UPageSection
    id="catalog"
    title="Каталог ампул"
    :ui="{
      title: 'font-serif text-left text-[#28445C]',
      body: 'flex flex-col'
    }"
    class="catalog"
  >
    <UPageGrid>
      <template
        v-for="({ image, title, volume, material, color }, index) in visibleProducts"
        :key="index"
      >
        <UCard
          variant="solid"
          :ui="{
            root: 'bg-transparent',
            header: '',
            body: '',
            footer: 'flex justify-end'
          }"
        >
          <template #header>
            <NuxtImg :src="`https://cms.sibbalance.ru/assets/${image}`" :alt="title" class="w-full" />
          </template>

          <h3 class="font-sans text-base text-pretty font-semibold text-[#2A4A5D] mb-4">
            {{ title }}
          </h3>

          <dl class="grid grid-cols-[auto_1fr] gap-y-2 font-sans text-[15px] text-pretty text-black">
            <dt>
              Объем:
            </dt>
            <dd class="text-right">
              {{ volume }}
            </dd>

            <dt>
              Материал:
            </dt>
            <dd class="text-right">
              {{ material }}
            </dd>

            <dt>
              Цвет пленки:
            </dt>
            <dd class="text-right">
              {{ color }}
            </dd>
          </dl>

          <template #footer>
            <UButton
              class="font-sans rounded-full bg-[#2A4A5D] hover:bg-[#223C52] focus:bg-[#223C52] active:bg-[#1D3448]"
              @click="handleCallbackButtonClick"
            >
              {{ catalogSection?.callbackButton }}
            </UButton>
          </template>
        </UCard>

        <USeparator
          v-if="products && index < products.length - 1"
          :ui="{
            root: 'opacity-60 sm:hidden',
            border: 'border-[rgba(40,68,92,0.3)]'
          }"
        />
      </template>
    </UPageGrid>

    <UButton
      size="xl"
      icon="i-lucide-chevrons-down"
      class="self-center lg:justify-self-center font-sans rounded-full bg-[#2A4A5D] hover:bg-[#223C52] focus:bg-[#223C52] active:bg-[#1D3448]"
      v-if="hasMoreProducts"
      @click="handleShowMore"
    >
      {{ catalogSection?.showMoreButton }}
    </UButton>
  </UPageSection>
</template>
