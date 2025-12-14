<script setup lang="ts">
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

interface ServicesSection {
  id?: number
  description?: string
}

interface Service {
  id?: number
  image?: string
  title?: string
  description?: string
  feature1?: string
  feature2?: string
  feature3?: string
  callbackButton?: string
}

const { getSingletonItem, getItems } = useDirectusItems()

const { data: servicesSection } = await useAsyncData('novoland_services', () => {
  return getSingletonItem<ServicesSection>({
    collection: 'novoland_services'
  })
})

const { data: services } = await useAsyncData('novoland_service', () => {
  return getItems<Service>({
    collection: 'novoland_service',
  })
})

const emit = defineEmits<{
  (e: 'openCallbackModal', value: boolean): void
}>()

const handleCallbackButtonClick = () => {
  emit('openCallbackModal', true)
}

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
      trigger: '#services',
      start: 'top 80%', // когда верх блока доходит до 80% экрана
      end: 'bottom 60%',
      toggleActions: 'play none none reverse', // можно поиграться с этим
      // scrub: 1, // включи, если хочешь, чтобы шло плавно вместе со скроллом
    }
  })
    .from('.services', animation)
})
</script>

<template>
  <UPageSection
    id="services"
    title="Каталог услуг"
    :description="servicesSection?.description"
    :ui="{
      title: 'services__title text-left font-serif text-[#28445C]',
      description: 'services__description text-left font-sans text-[#28445C]',
    }"
    class="services"
  >
    <UPricingPlans>
      <UPricingPlan
        v-for="({ image, title, description, feature1, feature2, feature3, callbackButton }, index) in services"
        :key="index"
        :title="title"
        :description="description"
        :features="[feature1, feature2, feature3] as string[]"
        :button="{
          label: callbackButton,
          onClick: handleCallbackButtonClick,
        }"
        :ui="{
          root: `rounded-2xl bg-cover bg-center bg-no-repeat bg-black/50 bg-blend-multiply`,
          title: 'font-sans text-white',
          description: 'font-sans text-white/90',
          featureTitle: 'font-sans text-white',
          featureIcon: 'text-white',
          button: 'rounded-full bg-white font-sans text-[#28445C] hover:bg-[#D9D9D9] focus:bg-[#F2F2F2] active:bg-[#F2F2F2]',
        }"
        class="services__card"
        :style="{
          backgroundImage: `url(https://cms.sibbalance.ru/assets/${image}`
        }"
      />
    </UPricingPlans>
  </UPageSection>
</template>
