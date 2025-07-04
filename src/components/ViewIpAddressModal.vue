<script lang="ts" setup>
import type { IpAddress } from '@/types/IpAddress.ts'
import { Modal } from 'bootstrap'

defineProps<{ selectedIpAddress: IpAddress | null }>()

const handleClose = async (): Promise<void> => {
  const modalElement = document.getElementById('viewIpAddressModal')

  if (modalElement) {
    const modal = Modal.getInstance(modalElement)

    modal?.hide()
  }
}
</script>

<template>
  <div
    class="modal fade"
    id="viewIpAddressModal"
    tabindex="-1"
    aria-labelledby="viewIpAddressModalLabel"
    aria-hidden="true"
    data-bs-backdrop="false"
  >
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title fw-bold" id="viewIpAddressModalLabel">View IP Address</h5>

          <button type="button" class="btn-close" @click="handleClose()"></button>
        </div>

        <div class="modal-body">
          <div v-if="selectedIpAddress" class="card">
            <div class="card-body">
              <div class="row mb-2">
                <div class="col-sm-4">
                  <strong>ID:</strong>
                </div>

                <div class="col-sm-8">
                  {{ selectedIpAddress.id }}
                </div>
              </div>

              <div class="row mb-2">
                <div class="col-sm-4">
                  <strong>IP Address:</strong>
                </div>

                <div class="col-sm-8">
                  {{ selectedIpAddress.ip_address }}
                </div>
              </div>

              <div class="row mb-2">
                <div class="col-sm-4">
                  <strong>Label:</strong>
                </div>

                <div class="col-sm-8">
                  {{ selectedIpAddress.label }}
                </div>
              </div>

              <div class="row mb-0">
                <div class="col-sm-4">
                  <strong>Comment:</strong>
                </div>

                <div class="col-sm-8">
                  {{ selectedIpAddress.comment }}
                </div>
              </div>

              <div class="row mb-0">
                <div class="col-sm-4">
                  <strong>Created Date:</strong>
                </div>

                <div class="col-sm-8">
                  {{ selectedIpAddress.created_at }}
                </div>
              </div>

              <div class="row mb-0">
                <div class="col-sm-4">
                  <strong>Updated Date:</strong>
                </div>

                <div class="col-sm-8">
                  {{ selectedIpAddress.updated_at }}
                </div>
              </div>
            </div>
          </div>

          <div v-else class="text-center text-muted">No IP address selected.</div>
        </div>

        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" @click="handleClose()">Close</button>
        </div>
      </div>
    </div>
  </div>
</template>
