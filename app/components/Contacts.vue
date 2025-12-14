<script setup lang="ts">
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

interface Contact {
  id?: number
  title?: string
  description?: string
  link?: string
}

gsap.registerPlugin(ScrollTrigger)

const { getItems } = useDirectusItems()

const { data: contacts } = await useAsyncData('novoland_contacts', () => {
  return getItems<Contact>({
    collection: 'novoland_contact',
  })
})

onMounted(async () => {
  await nextTick()

  const animation = {
    autoAlpha: 0,
    duration: 0.3,
    scale: 0.95,
    y: 40,
    ease: 'expo.out',
  }

  gsap.timeline({
    scrollTrigger: {
      trigger: '#contacts',
      start: 'top 80%',
      end: 'bottom 60%',
      toggleActions: 'play none none reverse',
    }
  })
    .from('.contacts', animation)
})
</script>

<template>
  <client-only>
    <UPageSection
      id="contacts"
      title="Контакты"
      :ui="{
        title: 'contacts__title text-left font-serif text-[#28445C]',
        body: 'contacts__body flex flex-col gap-8 md:flex-row ',
      }"
      class="contacts"
    >
      <template #body>
        <iframe
          id="map_705864409"
          frameborder="0"
          width="100%"
          src="https://makemap.2gis.ru/widget?data=eJxtUm1vmzAQ_i_ex6D2CK9G6ofMaDQTYiFqtbKpH7LgUiqCmXGS0Sj_fXdm-9ZIkdE9L_eczxemdC21rDOpDtLoVo4s-XlhZhokS9gXuTNHLZnDBq0GqY3FL2yvOqUR_wTL2H1ZIm5a05ECvnrlyYgJ8qg88KyA3CvN6u4OKbUc97odTKt6JG7uV4vz71PZ12IBeU6iX1ChuBZw1mPjK_G4LtCgQqxNt83M2zaFcCF_L00tOJmjzl0X4haqlL59yF_K0RD3ATWZIO-PuFgDyG_Jz4cKT6t9HLHnZ6wjnmWQv5VjISI6DSce5uDZN6h60rtQ3W_fppQyn60vDn3k1CsqTyLdvlpPTTXqu4Bq3VgvO0PT0B_7rSDHPHw-R5oTZz6idsaeyMe1WU2WUoZ2WqH2Yb4XTn1T4tt7JN1G8POmsZf-vu5r-YclLvz_XR3WzMueaJX_Nr1RbW-Qv1f4INp-Z-xDiJc3HGLXdZ3Av-FeGHL_GfVtzZIYltdnhx12w0aN7bzUC-t2hiUz1_eiIIr8KIwjh3UEz24hDzwf3CAMQoyn1AHDxWiKj0N13fdXKbsftmr0UV7_AlLczMs"
          sandbox="allow-modals allow-forms allow-scripts allow-same-origin allow-popups allow-top-navigation-by-user-activation"
          class="rounded-lg h-[400px] md:h-[500px]"
        ></iframe>

        <UPageList class="gap-5">
          <UPageCard
            v-for="({ title, description, link }, index) in contacts"
            :key="index"
            :title
            :description
            :to="link"
            variant="naked"
            :ui="{
              title: 'font-serif text-[#28445C]',
              description: 'font-sans text-[#28445C]',
            }"
          />
        </UPageList>
      </template>
    </UPageSection>
  </client-only>
</template>

<style scoped></style>
