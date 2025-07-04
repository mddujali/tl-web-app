<script lang="ts" setup>
import { ref } from 'vue'
import type { AuditLog } from '@/types/AuditLog.ts'

const auditLogs = ref<AuditLog[]>([])

const handleView = (): void => {}

const handleDelete = (): void => {}
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
          <th scope="col" class="text-center">Actions</th>
        </tr>
      </thead>

      <tbody>
        <tr v-for="auditLog in auditLogs" :key="auditLog.id">
          <td>{{ auditLog.id }}</td>

          <td>{{ auditLog.user.name }}</td>

          <td>
            <span
              class="badge"
              :class="{
                'bg-success': auditLog.type === 'INFO',
                'bg-warning': auditLog.type === 'WARNING',
                'bg-danger': auditLog.type === 'ERROR',
                'bg-secondary': !['INFO', 'WARNING', 'ERROR'].includes(auditLog.type),
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
