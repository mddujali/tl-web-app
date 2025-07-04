<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import type { IpAddress } from '@/types/IpAddress.ts'
import api from '@/api'
import type { FetchIpAddressesResponseData } from '@/types/FetchIpAddressesResponseData.ts'

const ipAddresses = ref<IpAddress[]>([])
const emit = defineEmits<{
  triggerView: [ipAddress: IpAddress]
  triggerEdit: [ipAddress: IpAddress]
  triggerDelete: [ipAddress: IpAddress]
}>()

const handleFetchIpAddresses = async (): Promise<void> => {
  try {
    const response = await api.get('/ip-addresses')

    const { data }: FetchIpAddressesResponseData = response.data

    ipAddresses.value = data
  } catch (error: unknown) {
    console.log(error)
  }
}

const handleView = (ipAddress: IpAddress): void => emit('triggerView', ipAddress)

const handleEdit = (ipAddress: IpAddress): void => emit('triggerEdit', ipAddress)

const handleDelete = (ipAddress: IpAddress): void => emit('triggerDelete', ipAddress)

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

          <th scope="col" class="text-center" style="width: 130px">Actions</th>
        </tr>
      </thead>

      <tbody>
        <tr v-for="ipAddress in ipAddresses" :key="ipAddress.id">
          <td>{{ ipAddress.id }}</td>

          <td>
            <code class="text-primary">{{ ipAddress.ip_address }}</code>
          </td>

          <td>{{ ipAddress.label }}</td>

          <td>{{ ipAddress.created_at }}</td>

          <td>{{ ipAddress.updated_at }}</td>

          <td>
            <div class="d-flex justify-content-between">
              <button
                type="button"
                class="btn btn-sm btn-outline-primary"
                @click="handleView(ipAddress)"
                title="View"
              >
                <i class="fas fa-eye"></i>
              </button>

              <button
                type="button"
                class="btn btn-sm btn-outline-secondary"
                @click="handleEdit(ipAddress)"
                title="Edit"
              >
                <i class="fas fa-edit"></i>
              </button>

              <button
                type="button"
                class="btn btn-sm btn-outline-danger"
                @click="handleDelete(ipAddress)"
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
