<script setup lang="ts">
import type { FormSubmitEvent } from '@nuxt/ui'
import { vMaska } from 'maska/vue'
import * as z from 'zod'
import { YandexSmartCaptcha } from '@gladesinger/vue3-yandex-smartcaptcha'

const { open } = defineProps<{
  open: boolean
}>()

const config = useRuntimeConfig()

const captchaClientKey = config.public.captchaClientKey

const schema = z.object({
  name: z.string('Введите имя').min(2, 'Минимум 2 символа'),
  email: z.email({
    error: (issue) => {
      if (issue.code === 'invalid_format')
        return 'Некорректный email'

      return 'Введите email'
    }
  }),
  phone: z.string('Введите номер телефона'),
  agreement: z.boolean(),
  captchaToken: z.string(),
})

type Schema = z.output<typeof schema>

const state = reactive<Partial<Schema>>({
  name: undefined,
  email: undefined,
  phone: undefined,
  agreement: undefined,
  captchaToken: undefined,
})

const isSubmitDisabled = computed(() => {
  return !(state.name && state.email && state.phone && state.agreement && state.captchaToken)
})

const toast = useToast()

const handleCaptchaSuccess = (token: string) => {
  state.captchaToken = token
}

const emit = defineEmits<{
  (e: 'toggleCallbackModal', value: boolean): void
}>()

const handleFormSubmit = async (event: FormSubmitEvent<Schema>) => {
  try {
    const { data } = await $fetch('/api/lead', {
      method: 'post',
      body: {
        data: {
          name: event.data.name,
          email: event.data.email,
          phone: event.data.phone,
        },
        captcha: {
          captchaToken: event.data.captchaToken
        }
      },
    })

    toast.add({
      title: 'Заявка получена!',
      description: 'Мы свяжемся с Вами в ближайшее время.',
      ui: {
        title: 'font-serif text-[#28445C]',
        description: 'font-sans text-[#28445C]',
      },
      progress: {
        ui: {
          indicator: 'bg-[#28445C]'
        }
      }
    })
  } catch (error) {
    toast.add({
      title: 'Произошла ошибка!',
      description: 'Попробуйте позже.',
      color: 'error',
      ui: {
        title: 'font-serif text-[#28445C]',
        description: 'font-sans text-[#28445C]',
      }
    })
  } finally {
    emit('toggleCallbackModal', false)
  }
}
</script>

<template>
  <UModal
    :open="open"
    @update:open="$emit('toggleCallbackModal', false)"
    title="Заявка на обратный звонок"
    description="Пожалуйста, заполните форму и мы постараемся связаться с вами как можно скорее."
    :ui="{
      body: '',
      title: 'font-serif text-[#28445C]',
      description: 'font-sans text-[#212B23]',
    }"
  >
    <template #body>
      <UForm
        :schema="schema"
        :state="state"
        class="space-y-4 bg-[url(/modal/bgi.svg)] bg-no-repeat bg-top-right bg-size-[110px_auto]"
        @submit="handleFormSubmit"
      >
        <UFormField
          label="Ваше имя"
          name="name"
          :ui="{
            label: 'font-sans',
            error: 'font-sans'
          }"
        >
          <UInput
            v-model="state.name"
            placeholder="Иван"
            color="neutral"
            :ui="{
              base: 'w-full rounded-full font-sans placeholder:font-sans'
            }"
          />
        </UFormField>

        <UFormField
          label="Номер телефона"
          name="phone"
          :ui="{
            label: 'font-sans',
            error: 'font-sans'
          }"
        >
          <UInput
            v-model="state.phone"
            placeholder="+7 000 000 00 00"
            color="neutral"
            v-maska="'+7 ### ### ## ##'"
            :ui="{
              base: 'w-full rounded-full font-sans placeholder:font-sans'
            }"
          />
        </UFormField>

        <UFormField
          label="Email"
          name="email"
          :ui="{
            label: 'font-sans',
            error: 'font-sans'
          }"
        >
          <UInput
            v-model="state.email"
            placeholder="ivanivanov@gmail.com"
            color="neutral"
            :ui="{
              base: 'rounded-full font-sans placeholder:font-sans'
            }"
          />
        </UFormField>

        <ClientOnly>
          <YandexSmartCaptcha
            class="self-center"
            :siteKey="captchaClientKey"
            @onSuccess="handleCaptchaSuccess"
          />
        </ClientOnly>

        <UCheckbox
          v-model="state.agreement"
          label="Я согласен(а) на обработку персональных данных"
          :ui="{
            indicator: 'bg-[#2A4A5D]'
          }"
        />

        <UButton :disabled="isSubmitDisabled" type="submit" class="rounded-full font-sans disabled:bg-[#6E726E] bg-[#2A4A5D] hover:bg-[#223C52] focus:bg-[#223C52] active:bg-[#1D3448]">
          Отправить
        </UButton>
      </UForm>
    </template>
  </UModal>
</template>

<style scoped></style>
