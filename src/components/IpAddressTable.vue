<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import type { IpAddress } from '@/types/IpAddress.ts'

const ipAddresses = ref<IpAddress[]>([])

const handleView = (): void => {}

const handleEdit = (): void => {}

const handleDelete = (): void => {}

onMounted(() => {
  ipAddresses.value = [
    {
      id: 1,
      ipAddress: '192.168.1.1',
      label: 'Router',
      comment: 'Dignissimos dolorem.',
      createAt: '2025-06-30T05:59:19.000000Z',
      updatedAt: '2025-06-30T05:59:19.000000Z',
    },
    {
      id: 2,
      ipAddress: '192.168.1.100',
      label: 'Server',
      comment: 'Dignissimos dolorem.',
      createAt: '2025-06-30T05:59:19.000000Z',
      updatedAt: '2025-06-30T05:59:19.000000Z',
    },
    {
      id: 3,
      ipAddress: '10.0.0.1',
      label: 'Gateway',
      comment: 'Dignissimos dolorem.',
      createAt: '2025-06-30T05:59:19.000000Z',
      updatedAt: '2025-06-30T05:59:19.000000Z',
    },
    {
      id: 4,
      ipAddress: '172.16.0.1',
      label: 'Switch',
      comment: 'Dignissimos dolorem.',
      createAt: '2025-06-30T05:59:19.000000Z',
      updatedAt: '2025-06-30T05:59:19.000000Z',
    },
  ]
})
</script>

<template>
  <div class="table-responsive">
    <table class="table table-striped table-hover">
      <thead class="table-dark">
        <tr>
          <th scope="col">ID</th>

          <th scope="col">IP Address</th>

          <th scope="col">Label</th>

          <th scope="col" class="text-center">Actions</th>
        </tr>
      </thead>

      <tbody>
        <tr v-for="ipAddress in ipAddresses" :key="ipAddress.id">
          <td>{{ ipAddress.id }}</td>

          <td>
            <code class="text-primary">{{ ipAddress.ipAddress }}</code>
          </td>

          <td>{{ ipAddress.label }}</td>

          <td style="width: 150px">
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
                class="btn btn-sm btn-outline-secondary"
                @click="handleEdit()"
                title="Edit"
              >
                <i class="fas fa-edit"></i>
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

    <div v-if="ipAddresses.length === 0" class="text-center py-4">
      <p class="text-muted">No records found.</p>
    </div>
  </div>
</template>
