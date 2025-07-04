<script setup lang="ts">
import AuditLogsTable from '@/components/AuditLogsTable.vue'
import ViewAuditLogModal from '@/components/ViewAuditLogModal.vue'
import { Modal } from 'bootstrap'
import { ref } from 'vue'
import type { AuditLog } from '@/types/AuditLog.ts'

const selectedAuditLog = ref<AuditLog | null>(null)

const handleView = (auditLog: AuditLog): void => {
  selectedAuditLog.value = auditLog

  const modalElement = document.getElementById('viewAuditLogModal')

  if (modalElement) {
    const modal = new Modal(modalElement)

    modal.show()
  }
}
</script>

<template>
  <div class="container">
    <div class="row">
      <div class="col-12">
        <div class="d-flex justify-content-between align-items-center mb-4">
          <h4 class="fw-bold">Audit Logs</h4>
        </div>

        <AuditLogsTable @triggerView="handleView($event)" />
      </div>
    </div>

    <ViewAuditLogModal :selectedAuditLog />
  </div>
</template>
