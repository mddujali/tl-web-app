<script lang="ts" setup>
import type { AuditLog } from '@/types/AuditLog.ts'
import { Modal } from 'bootstrap'

defineProps<{ selectedAuditLog: AuditLog | null }>()

const handleClose = async (): Promise<void> => {
  const modalElement = document.getElementById('viewAuditLogModal')

  if (modalElement) {
    const modal = Modal.getInstance(modalElement)

    modal?.hide()
  }
}
</script>

<template>
  <div
    class="modal fade"
    id="viewAuditLogModal"
    tabindex="-1"
    aria-labelledby="viewAuditLogModalLabel"
    aria-hidden="true"
    data-bs-backdrop="false"
  >
    <div class="modal-dialog modal-lg">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title fw-bold" id="viewAuditLogModalLabel">View Audit Log</h5>

          <button type="button" class="btn-close" @click="handleClose()"></button>
        </div>

        <div class="modal-body">
          <div v-if="selectedAuditLog" class="card">
            <div class="card-body">
              <div class="row mb-2">
                <div class="col-sm-4">
                  <strong>ID:</strong>
                </div>

                <div class="col-sm-8">
                  {{ selectedAuditLog.id }}
                </div>
              </div>

              <div class="row mb-2">
                <div class="col-sm-4">
                  <strong>User:</strong>
                </div>

                <div class="col-sm-8">
                  {{ selectedAuditLog?.user?.name || 'N/A' }}
                </div>
              </div>

              <div class="row mb-2">
                <div class="col-sm-4">
                  <strong>Type:</strong>
                </div>

                <div class="col-sm-8">
                  <span
                    class="badge"
                    :class="{
                      'bg-success': selectedAuditLog.type === 'info',
                      'bg-warning': selectedAuditLog.type === 'warning',
                      'bg-danger': selectedAuditLog.type === 'error',
                      'bg-secondary': !['info', 'warning', 'error'].includes(selectedAuditLog.type),
                    }"
                  >
                    {{ selectedAuditLog.type }}
                  </span>
                </div>
              </div>

              <div class="row mb-2">
                <div class="col-sm-4">
                  <strong>Message:</strong>
                </div>

                <div class="col-sm-8">
                  {{ selectedAuditLog.message }}
                </div>
              </div>

              <div class="row mb-2">
                <div class="col-sm-4">
                  <strong>Context:</strong>
                </div>

                <div class="col-sm-8">
                  <pre v-if="selectedAuditLog.context" class="bg-light p-2 border rounded">{{
                    JSON.stringify(selectedAuditLog.context, null, 2)
                  }}</pre>
                  <span v-else class="text-muted">N/A</span>
                </div>
              </div>

              <div class="row mb-0">
                <div class="col-sm-4">
                  <strong>Created Date:</strong>
                </div>

                <div class="col-sm-8">
                  {{ selectedAuditLog.created_at }}
                </div>
              </div>
            </div>
          </div>

          <div v-else class="text-center text-muted">No audit log selected.</div>
        </div>

        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" @click="handleClose()">Close</button>
        </div>
      </div>
    </div>
  </div>
</template>
