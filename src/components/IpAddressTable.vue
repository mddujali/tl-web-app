<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import { useAuthStore } from '@/stores/auth'
import type { IpAddress } from '@/types/IpAddress.ts'
import type { IpAddress as IpAddressModel } from '@/models/IpAddress.ts'
import api from '@/api'
import type { FetchIpAddressesResponseData } from '@/types/FetchIpAddressesResponseData.ts'
import _ from 'lodash'

const authStore = useAuthStore()
const ipAddresses = ref<IpAddress[]>([])

const handleFetchIpAddresses = async (): Promise<void> => {
  const response = await api.get('/ip-addresses', {
    headers: { Authorization: `Bearer ${authStore.accessToken}` },
  })

  const { data }: FetchIpAddressesResponseData = response.data

  ipAddresses.value = _.map(data, (ipAddress: IpAddressModel) => ({
    id: ipAddress.id,
    ipAddress: ipAddress.ip_address,
    label: ipAddress.label,
    comment: ipAddress.comment,
    createdAt: ipAddress.created_at,
    updatedAt: ipAddress.updated_at,
  }))
}

const handleView = (): void => {}

const handleEdit = (): void => {}

const handleDelete = (): void => {}

const triggerRefreshData = async (): Promise<void> => {
  await handleFetchIpAddresses()
}

defineExpose({ triggerRefreshData })

onMounted(() => {
  void handleFetchIpAddresses()
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

          <th scope="col">Created Date</th>

          <th scope="col">Updated Date</th>

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

          <td>{{ ipAddress.createdAt }}</td>

          <td>{{ ipAddress.updatedAt }}</td>

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
