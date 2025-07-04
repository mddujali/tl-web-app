<script lang="ts" setup>
import { onMounted, ref } from 'vue'
import type { AuditLog } from '@/types/AuditLog.ts'
import api from '@/api'
import type { FetchAuditLogsResponseData } from '@/types/FetchAuditLogsResponseData.ts'

const auditLogs = ref<AuditLog[]>([])

const handleFetchAuditLogs = async (): Promise<void> => {
  try {
    const response = await api.get('/audit-logs')

    const { data }: FetchAuditLogsResponseData = response.data

    auditLogs.value = data
  } catch (error: unknown) {
    console.log(error)
  }
}

const handleView = (): void => {}

const handleDelete = (): void => {}

onMounted(() => {
  void handleFetchAuditLogs()
})
</script>

<template>
  <div class="table-responsive">
    <table class="table table-striped table-hover">
      <thead class="table-dark">
        <tr>
          <th scope="col">ID</th>

          <th scope="col">User</th>

          <th scope="col">Type</th>

          <th scope="col">Message</th>

          <th scope="col">Created Date</th>

          <th scope="col" class="text-center" style="width: 90px">Actions</th>
        </tr>
      </thead>

      <tbody>
        <tr v-for="auditLog in auditLogs" :key="auditLog.id">
          <td>{{ auditLog.id }}</td>

          <td>{{ auditLog?.user?.name }}</td>

          <td>
            <span
              class="badge"
              :class="{
                'bg-success': auditLog.type === 'info',
                'bg-warning': auditLog.type === 'warning',
                'bg-danger': auditLog.type === 'error',
                'bg-secondary': !['info', 'warning', 'error'].includes(auditLog.type),
              }"
            >
              {{ auditLog.type }}
            </span>
          </td>

          <td>{{ auditLog.message }}</td>

          <td>{{ auditLog.created_at }}</td>

          <td>
            <div class="d-flex justify-content-between">
              <button
                type="button"
                class="btn btn-sm btn-outline-primary"
                @click="handleView()"
                title="View"
              >
                <i class="fas fa-eye"></i>
              </button>

              <button
                type="button"
                class="btn btn-sm btn-outline-danger"
                @click="handleDelete()"
                title="Delete"
              >
                <i class="fas fa-trash"></i>
              </button>
            </div>
          </td>
        </tr>
      </tbody>
    </table>

    <div v-if="auditLogs.length === 0" class="text-center py-4">
      <p class="text-muted">No records found.</p>
    </div>
  </div>
</template>
