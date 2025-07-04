<script lang="ts" setup>
import IpAddressTable from '@/components/IpAddressTable.vue'
import SaveIpAddressModal from '@/components/SaveIpAddressModal.vue'
import { Modal } from 'bootstrap'

const handleAdd = (): void => {
  const modalElement = document.getElementById('saveIpAddressModal')

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
          <h4>IP Address Management</h4>

          <button class="btn btn-primary" @click="handleAdd()">
            <i class="fas fa-plus"></i> Add
          </button>
        </div>

        <IpAddressTable />
      </div>
    </div>

    <SaveIpAddressModal />
  </div>
</template>
