<script lang="ts" setup>
import IpAddressTable from '@/components/IpAddressTable.vue'

const handleAdd = (): void => {}
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
  </div>
</template>
