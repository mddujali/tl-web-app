<script lang="ts" setup>
import { ref, watch } from 'vue'
import api from '@/api'
import { useAuthStore } from '@/stores/auth.ts'
import type { IpAddressValidationErrors } from '@/types/IpAddressValidationErrors.ts'
import type { IpAddress } from '@/types/IpAddress.ts'
import _ from 'lodash'
import { Modal } from 'bootstrap'

const defaultErrors: IpAddressValidationErrors = { ip_address: [], label: [], comment: [] }
const ipAddress = ref<string>('')
const label = ref<string>('')
const comment = ref<string>('')
const successMessage = ref<string>('')
const errorMessage = ref<string>('')
const errors = ref<IpAddressValidationErrors>(defaultErrors)
const props = defineProps<{ selectedIpAddress: IpAddress | null }>()

const authStore = useAuthStore()
const emit = defineEmits<{ ipAddressSaved: []; 'update:selectedIpAddress': [null] }>()

watch(
  () => props.selectedIpAddress,
  (newValue) => {
    if (newValue) {
      ipAddress.value = newValue.ipAddress
      label.value = newValue.label
      comment.value = newValue.comment
    }
  },
  { immediate: true },
)

const resetFields = (): void => {
  ipAddress.value = ''
  label.value = ''
  comment.value = ''
}

const resetMessages = (): void => {
  successMessage.value = ''
  errorMessage.value = ''
  errors.value = defaultErrors
}

const resetForm = (): void => {
  resetFields()

  resetMessages()
}

const handleClose = async (): Promise<void> => {
  const modalElement = document.getElementById('saveIpAddressModal')

  if (modalElement) {
    const modal = Modal.getInstance(modalElement)

    modal?.hide()

    setTimeout((): void => {
      resetForm()

      emit('update:selectedIpAddress', null)
    }, 200)
  }
}

const handleSave = async (): Promise<void> => {
  resetMessages()

  try {
    const requestMethod = !props.selectedIpAddress ? 'post' : 'put'
    const requestUrl = !props.selectedIpAddress
      ? '/ip-addresses'
      : `/ip-addresses/${props.selectedIpAddress.id}`
    const requestPayload = {
      ip_address: ipAddress.value,
      label: label.value,
      comment: comment.value,
    }
    const requestConfig = {
      headers: {
        Authorization: `Bearer ${authStore.accessToken}`,
      },
    }

    await api[requestMethod](requestUrl, requestPayload, requestConfig)

    successMessage.value = 'IP address has been saved.'

    if (!props.selectedIpAddress) {
      resetFields()
    }

    emit('ipAddressSaved')
  } catch (error: unknown) {
    if (error && typeof error === 'object' && 'isAxiosError' in error) {
      const axiosError = error as {
        isAxiosError: boolean
        response: {
          status: number
          data: {
            errors?: IpAddressValidationErrors
            message: string
          }
        }
      }

      if (axiosError.isAxiosError) {
        const errorResponse = axiosError.response

        if (errorResponse.status === 422) {
          errors.value = errorResponse.data.errors || defaultErrors

          return
        }

        errorMessage.value = _.get(
          errorResponse,
          'data.message',
          'Unable to save IP address. Please check your input.',
        )

        return
      }
    }

    errorMessage.value = 'An unexpected error occurred. Please try again later.'
  }
}
</script>

<template>
  <div
    class="modal fade"
    id="saveIpAddressModal"
    tabindex="-1"
    aria-labelledby="saveIpAddressModalLabel"
    aria-hidden="true"
    data-bs-backdrop="false"
  >
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title fw-bold" id="saveIpAddressModalLabel">
            {{ !selectedIpAddress ? 'Add' : 'Edit' }} IP Address
          </h5>

          <button type="button" class="btn-close" @click="handleClose()"></button>
        </div>

        <div class="modal-body">
          <div v-if="successMessage.length > 0" class="alert alert-success" role="alert">
            {{ successMessage }}
          </div>

          <div v-if="errorMessage.length > 0" class="alert alert-danger" role="alert">
            {{ errorMessage }}
          </div>

          <form>
            <div class="mb-3" v-if="!!selectedIpAddress">
              <label for="id" class="form-label fw-bold">ID</label>

              <input
                type="text"
                class="form-control"
                id="id"
                :value="selectedIpAddress?.id || ''"
                readonly
              />
            </div>

            <div class="mb-3">
              <label for="ipAddress" class="form-label fw-bold">IP Address</label>

              <input
                type="text"
                class="form-control"
                :class="[
                  'form-control',
                  { 'is-invalid': errors.ip_address && errors.ip_address.length > 0 },
                ]"
                id="ipAddress"
                v-model="ipAddress"
                :readonly="!!selectedIpAddress"
              />

              <div
                v-for="(error, index) in errors.ip_address"
                :key="index"
                class="invalid-feedback"
              >
                {{ error }}
              </div>
            </div>

            <div class="mb-3">
              <label for="label" class="form-label fw-bold">Label</label>

              <input
                type="text"
                class="form-control"
                :class="['form-control', { 'is-invalid': errors.label && errors.label.length > 0 }]"
                id="label"
                v-model="label"
              />

              <div v-for="(error, index) in errors.label" :key="index" class="invalid-feedback">
                {{ error }}
              </div>
            </div>

            <div class="mb-3">
              <label for="comment" class="form-label fw-bold">Comment</label>

              <input
                type="text"
                class="form-control"
                :class="[
                  'form-control',
                  { 'is-invalid': errors.comment && errors.comment.length > 0 },
                ]"
                id="comment"
                v-model="comment"
                :readonly="!!selectedIpAddress"
              />

              <div v-for="(error, index) in errors.comment" :key="index" class="invalid-feedback">
                {{ error }}
              </div>
            </div>
          </form>
        </div>

        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" @click="handleClose()">Close</button>

          <button type="button" class="btn btn-primary" @click="handleSave()">Save</button>
        </div>
      </div>
    </div>
  </div>
</template>
