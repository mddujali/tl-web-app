<script lang="ts" setup>
import { ref } from 'vue'
import api from '@/api'
import { useAuthStore } from '@/stores/auth.ts'
import type { IpAddress } from '@/types/IpAddress.ts'
import _ from 'lodash'
import { Modal } from 'bootstrap'

const successMessage = ref<string>('')
const errorMessage = ref<string>('')
const isDeleting = ref<boolean>(false)
const props = defineProps<{ selectedIpAddress: IpAddress | null }>()

const authStore = useAuthStore()
const emit = defineEmits<{ ipAddressDeleted: []; 'update:selectedIpAddress': [null] }>()

const resetMessages = (): void => {
  successMessage.value = ''
  errorMessage.value = ''
}

const resetForm = (): void => {
  resetMessages()
  isDeleting.value = false
}

const handleClose = async (): Promise<void> => {
  const modalElement = document.getElementById('deleteIpAddressModal')

  if (modalElement) {
    const modal = Modal.getInstance(modalElement)

    modal?.hide()

    setTimeout((): void => {
      resetForm()
      emit('update:selectedIpAddress', null)
    }, 200)
  }
}

const handleDelete = async (): Promise<void> => {
  if (!props.selectedIpAddress) {
    return
  }

  resetMessages()

  isDeleting.value = true

  try {
    const requestUrl = `/ip-addresses/${props.selectedIpAddress.id}`
    const requestConfig = {
      headers: {
        Authorization: `Bearer ${authStore.accessToken}`,
      },
    }

    await api.delete(requestUrl, requestConfig)

    successMessage.value = 'IP address has been deleted.'

    emit('ipAddressDeleted')

    setTimeout(() => {
      handleClose()
    }, 2500)
  } catch (error: unknown) {
    if (error && typeof error === 'object' && 'isAxiosError' in error) {
      const axiosError = error as {
        isAxiosError: boolean
        response: {
          status: number
          data: {
            message: string
            data: Array<unknown>
          }
        }
      }

      if (axiosError.isAxiosError) {
        const errorResponse = axiosError.response

        errorMessage.value = _.get(
          errorResponse,
          'data.message',
          'Unable to delete IP address. Please try again.',
        )

        return
      }
    }

    errorMessage.value = 'An unexpected error occurred. Please try again later.'
  } finally {
    isDeleting.value = false
  }
}
</script>

<template>
  <div
    class="modal fade"
    id="deleteIpAddressModal"
    tabindex="-1"
    aria-labelledby="deleteIpAddressModalLabel"
    aria-hidden="true"
    data-bs-backdrop="false"
  >
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title fw-bold" id="deleteIpAddressModalLabel">Delete IP Address</h5>

          <button type="button" class="btn-close" @click="handleClose()"></button>
        </div>

        <div class="modal-body">
          <div v-if="successMessage.length > 0" class="alert alert-success" role="alert">
            {{ successMessage }}
          </div>

          <div v-if="errorMessage.length > 0" class="alert alert-danger" role="alert">
            {{ errorMessage }}
          </div>

          <div v-if="!successMessage.length">
            <p class="mb-3">
              Are you sure you want to delete this IP address? This action cannot be undone.
            </p>

            <div v-if="selectedIpAddress" class="card">
              <div class="card-body">
                <div class="row mb-2">
                  <div class="col-sm-3">
                    <strong>ID:</strong>
                  </div>

                  <div class="col-sm-9">
                    {{ selectedIpAddress.id }}
                  </div>
                </div>

                <div class="row mb-2">
                  <div class="col-sm-3">
                    <strong>IP Address:</strong>
                  </div>

                  <div class="col-sm-9">
                    {{ selectedIpAddress.ipAddress }}
                  </div>
                </div>

                <div class="row mb-2">
                  <div class="col-sm-3">
                    <strong>Label:</strong>
                  </div>

                  <div class="col-sm-9">
                    {{ selectedIpAddress.label }}
                  </div>
                </div>

                <div class="row mb-0">
                  <div class="col-sm-3">
                    <strong>Comment:</strong>
                  </div>

                  <div class="col-sm-9">
                    {{ selectedIpAddress.comment }}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" @click="handleClose()">
            {{ successMessage.length > 0 ? 'Close' : 'Cancel' }}
          </button>

          <button
            v-if="!successMessage.length"
            type="button"
            class="btn btn-danger"
            @click="handleDelete()"
            :disabled="isDeleting"
          >
            <span
              v-if="isDeleting"
              class="spinner-border spinner-border-sm me-2"
              aria-hidden="true"
            ></span>

            {{ isDeleting ? 'Deleting...' : 'Delete' }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
