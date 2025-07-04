<script lang="ts" setup>
import IpAddressTable from '@/components/IpAddressTable.vue'
import SaveIpAddressModal from '@/components/SaveIpAddressModal.vue'
import { Modal } from 'bootstrap'
import { ref } from 'vue'
import type { IpAddress } from '@/types/IpAddress.ts'
import DeleteIpAddressModal from '@/components/DeleteIpAddressModal.vue'

const selectedIpAddress = ref<IpAddress | null>(null)

const showSaveIpAddressModal = (): void => {
  const modalElement = document.getElementById('saveIpAddressModal')

  if (modalElement) {
    const modal = new Modal(modalElement)

    modal.show()
  }
}

const handleAdd = (): void => {
  showSaveIpAddressModal()
}

const handleEdit = (ipAddress: IpAddress): void => {
  selectedIpAddress.value = ipAddress

  showSaveIpAddressModal()
}

const showDeleteIpAddressModal = (): void => {
  const modalElement = document.getElementById('deleteIpAddressModal')

  if (modalElement) {
    const modal = new Modal(modalElement)

    modal.show()
  }
}

const handleDelete = (ipAddress: IpAddress): void => {
  selectedIpAddress.value = ipAddress

  showDeleteIpAddressModal()
}

const ipAddressTableRef = ref<InstanceType<typeof IpAddressTable>>()

const handleTriggerRefreshData = async (): Promise<void> => {
  await ipAddressTableRef.value?.triggerRefreshData()
}
</script>

<template>
  <div class="container">
    <div class="row">
      <div class="col-12">
        <div class="d-flex justify-content-between align-items-center mb-4">
          <h4>IP Address Management</h4>

          <button class="btn btn-primary" @click="handleAdd()">
            <i class="fas fa-plus"></i> Add
          </button>
        </div>

        <IpAddressTable
          ref="ipAddressTableRef"
          @triggerEdit="handleEdit($event)"
          @triggerDelete="handleDelete($event)"
        />
      </div>
    </div>

    <SaveIpAddressModal
      @ipAddressSaved="handleTriggerRefreshData()"
      v-model:selectedIpAddress="selectedIpAddress"
    />
    <DeleteIpAddressModal
      @ipAddressDeleted="handleTriggerRefreshData()"
      v-model:selectedIpAddress="selectedIpAddress"
    />
  </div>
</template>
