<script lang="ts" setup>
import IpAddressTable from '@/components/IpAddressTable.vue'
import SaveIpAddressModal from '@/components/SaveIpAddressModal.vue'
import { Modal } from 'bootstrap'
import { ref } from 'vue'

const handleAdd = (): void => {
  const modalElement = document.getElementById('saveIpAddressModal')

  if (modalElement) {
    const modal = new Modal(modalElement)

    modal.show()
  }
}

const ipAddressTableRef = ref<InstanceType<typeof IpAddressTable>>()

const handleIpAddressSaved = async (): Promise<void> => {
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

        <IpAddressTable ref="ipAddressTableRef" />
      </div>
    </div>

    <SaveIpAddressModal @ipAddressSaved="handleIpAddressSaved()" />
  </div>
</template>
