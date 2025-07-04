<script setup lang="ts">
import AuditLogsTable from '@/components/AuditLogsTable.vue'
</script>

<template>
  <div class="container">
    <div class="row">
      <div class="col-12">
        <div class="d-flex justify-content-between align-items-center mb-4">
          <h4>Audit Logs</h4>
        </div>

        <AuditLogsTable />
      </div>
    </div>
  </div>
</template>
