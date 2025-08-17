<!-- src/App.vue -->
<template>
  <div id="app" class="min-h-screen bg-gray-50">
    <BaseHeader />
    <div class="flex">
      <BaseSidebar />
      <main class="flex-1 p-6">
        <RouterView />
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
import BaseHeader from '@/components/common/BaseHeader.vue'
import BaseSidebar from '@/components/common/BaseSidebar.vue'
</script>

<!-- src/components/upload/FileUpload.vue -->
<template>
  <div class="bg-white rounded-lg shadow-md p-6">
    <h2 class="text-2xl font-bold mb-6">Upload Hospital Data</h2>
    
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
      <!-- Alarms Upload -->
      <div class="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
        <div class="mb-4">
          <svg class="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
          </svg>
        </div>
        <h3 class="text-lg font-medium mb-2">Hospital Alarms</h3>
        <input
          ref="alarmsInput"
          type="file"
          accept=".xlsx,.xls"
          @change="(e) => handleFileSelect(e, 'alarms')"
          class="hidden"
        />
        <button
          @click="$refs.alarmsInput?.click()"
          :disabled="uploading"
          class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Choose File
        </button>
        <p v-if="files.alarms" class="mt-2 text-sm text-gray-600">
          {{ files.alarms.name }}
        </p>
      </div>

      <!-- Enterprise Units Upload -->
      <div class="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
        <div class="mb-4">
          <svg class="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
          </svg>
        </div>
        <h3 class="text-lg font-medium mb-2">Enterprise Units</h3>
        <input
          ref="enterpriseInput"
          type="file"
          accept=".xlsx,.xls"
          @change="(e) => handleFileSelect(e, 'enterprise')"
          class="hidden"
        />
        <button
          @click="$refs.enterpriseInput?.click()"
          :disabled="uploading"
          class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
        >
          Choose File
        </button>
        <p v-if="files.enterprise" class="mt-2 text-sm text-gray-600">
          {{ files.enterprise.name }}
        </p>
      </div>

      <!-- Rate Changes Upload -->
      <div class="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
        <div class="mb-4">
          <svg class="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
          </svg>
        </div>
        <h3 class="text-lg font-medium mb-2">Rate Changes</h3>
        <input
          ref="rateChangesInput"
          type="file"
          accept=".xlsx,.xls"
          @change="(e) => handleFileSelect(e, 'rateChanges')"
          class="hidden"
        />
        <button
          @click="$refs.rateChangesInput?.click()"
          :disabled="uploading"
          class="bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded"
        >
          Choose File
        </button>
        <p v-if="files.rateChanges" class="mt-2 text-sm text-gray-600">
          {{ files.rateChanges.name }}
        </p>
      </div>
    </div>

    <!-- Upload Button -->
    <div class="mt-6 text-center">
      <button
        @click="uploadFiles"
        :disabled="uploading || !hasFiles"
        class="bg-indigo-600 hover:bg-indigo-700 disabled:bg-gray-400 text-white font-bold py-3 px-6 rounded-lg"
      >
        <span v-if="uploading">Uploading...</span>
        <span v-else>Upload Files</span>
      </button>
    </div>

    <!-- Progress Bar -->
    <div v-if="uploading" class="mt-4">
      <div class="bg-gray-200 rounded-full h-2">
        <div
          class="bg-blue-600 h-2 rounded-full transition-all duration-300"
          :style="{ width: `${progress}%` }"
        ></div>
      </div>
      <p class="text-center mt-2 text-sm text-gray-600">{{ progress }}%</p>
    </div>

    <!-- Results -->
    <div v-if="results.length > 0" class="mt-6">
      <h3 class="text-lg font-semibold mb-4">Upload Results</h3>
      <div class="space-y-4">
        <div
          v-for="result in results"
          :key="result.filename"
          class="border rounded-lg p-4"
          :class="{
            'border-green-300 bg-green-50': result.success,
            'border-red-300 bg-red-50': !result.success
          }"
        >
          <div class="flex items-center justify-between">
            <h4 class="font-medium">{{ result.filename }}</h4>
            <span
              class="px-2 py-1 rounded text-xs"
              :class="{
                'bg-green-100 text-green-800': result.success,
                'bg-red-100 text-red-800': !result.success
              }"
            >
              {{ result.success ? 'Success' : 'Failed' }}
            </span>
          </div>
          <div v-if="result.success" class="mt-2 text-sm text-gray-600">
            Processed: {{ result.processed_count }} / {{ result.total_rows }} rows
          </div>
          <div v-if="result.errors && result.errors.length > 0" class="mt-2">
            <details class="text-sm">
              <summary class="cursor-pointer text-red-600">View Errors ({{ result.errors.length }})</summary>
              <ul class="mt-2 list-disc list-inside text-red-600">
                <li v-for="error in result.errors" :key="error">{{ error }}</li>
              </ul>
            </details>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useFileUpload } from '@/composables/useFileUpload'

const { uploading, progress, results, uploadFile, reset } = useFileUpload()

const files = ref<{
  alarms?: File
  enterprise?: File
  rateChanges?: File
}>({})

const hasFiles = computed(() => {
  return !!(files.value.alarms || files.value.enterprise || files.value.rateChanges)
})

const handleFileSelect = (event: Event, type: string) => {
  const target = event.target as HTMLInputElement
  const file = target.files?.[0]
  if (file) {
    files.value = { ...files.value, [type]: file }
  }
}

const uploadFiles = async () => {
  reset()
  
  const uploads = []
  
  if (files.value.alarms) {
    uploads.push(uploadFile(files.value.alarms, 'alarms'))
  }
  
  if (files.value.enterprise) {
    uploads.push(uploadFile(files.value.enterprise, 'enterprise-units'))
  }
  
  if (files.value.rateChanges) {
    uploads.push(uploadFile(files.value.rateChanges, 'rate-changes'))
  }
  
  await Promise.all(uploads)
}
</script>

<!-- src/components/dashboard/FilterPanel.vue -->
<template>
  <div class="bg-white rounded-lg shadow-md p-6 mb-6">
    <h3 class="text-lg font-semibold mb-4">Filters</h3>
    
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <!-- Hospital Filter -->
      <div>
        <label for="hospital" class="block text-sm font-medium text-gray-700 mb-1">
          Hospital
        </label>
        <select
          id="hospital"
          v-model="localFilters.hospitalId"
          @change="updateFilters"
          class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">All Hospitals</option>
          <option
            v-for="hospital in hospitals"
            :key="hospital.id"
            :value="hospital.id"
          >
            {{ hospital.customer_name }}
          </option>
        </select>
      </div>

      <!-- Enterprise Filter -->
      <div>
        <label for="enterprise" class="block text-sm font-medium text-gray-700 mb-1">
          Enterprise
        </label>
        <select
          id="enterprise"
          v-model="localFilters.enterpriseId"
          @change="updateFilters"
          class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">All Enterprises</option>
          <option
            v-for="enterprise in enterprises"
            :key="enterprise.id"
            :value="enterprise.id"
          >
            {{ enterprise.enterprise_name }}
          </option>
        </select>
      </div>

      <!-- Start Date Filter -->
      <div>
        <label for="startDate" class="block text-sm font-medium text-gray-700 mb-1">
          Start Date
        </label>
        <input
          id="startDate"
          v-model="localFilters.startDate"
          type="date"
          @change="updateFilters"
          class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <!-- End Date Filter -->
      <div>
        <label for="endDate" class="block text-sm font-medium text-gray-700 mb-1">
          End Date
        </label>
        <input
          id="endDate"
          v-model="localFilters.endDate"
          type="date"
          @change="updateFilters"
          class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
    </div>

    <!-- Clear Filters Button -->
    <div class="mt-4">
      <button
        @click="clearFilters"
        class="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
      >
        Clear Filters
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useAnalyticsStore } from '@/stores/analytics'
import type { AnalyticsFilter } from '@/types/analytics'

const analyticsStore = useAnalyticsStore()
const { hospitals, enterprises, filters } = storeToRefs(analyticsStore)

const localFilters = ref<AnalyticsFilter>({ ...filters.value })

const updateFilters = () => {
  analyticsStore.updateFilters(localFilters.value)
}

const clearFilters = () => {
  localFilters.value = {}
  analyticsStore.updateFilters({})
}

onMounted(() => {
  analyticsStore.fetchHospitals()
  analyticsStore.fetchEnterprises()
})
</script>

<!-- src/components/charts/RateChangeChart.vue -->
<template>
  <div class="bg-white rounded-lg shadow-md p-6">
    <h3 class="text-lg font-semibold mb-4">Rate Changes Over Time</h3>
    <div class="relative h-64">
      <canvas ref="chartCanvas"></canvas>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch, nextTick } from 'vue'
import { Chart, registerables } from 'chart.js'
import { useAnalyticsStore } from '@/stores/analytics'
import { format } from 'date-fns'

Chart.register(...registerables)

const chartCanvas = ref<HTMLCanvasElement>()
let chartInstance: Chart | null = null

const analyticsStore = useAnalyticsStore()
const { filteredRateChanges } = storeToRefs(analyticsStore)

const createChart = () => {
  if (!chartCanvas.value) return

  const ctx = chartCanvas.value.getContext('2d')
  if (!ctx) return

  // Process data for chart
  const processedData = processChartData()

  chartInstance = new Chart(ctx, {
    type: 'line',
    data: {
      labels: processedData.labels,
      datasets: [{
        label: 'Average % Increase',
        data: processedData.data,
        borderColor: 'rgb(59, 130, 246)',
        backgroundColor: 'rgba(59, 130, 246, 0.1)',
        tension: 0.1,
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        y: {
          beginAtZero: true,
          title: {
            display: true,
            text: 'Percentage Increase (%)'
          }
        },
        x: {
          title: {
            display: true,
            text: 'Date'
          }
        }
      },
      plugins: {
        tooltip: {
          mode: 'index',
          intersect: false,
        },
        legend: {
          display: true,
        }
      }
    }
  })
}

const processChartData = () => {
  const groupedData = new Map<string, number[]>()
  
  filteredRateChanges.value.forEach(change => {
    const date = format(new Date(change.infusion_date_time), 'yyyy-MM-dd')
    if (!groupedData.has(date)) {
      groupedData.set(date, [])
    }
    groupedData.get(date)!.push(change.percentincrease || 0)
  })

  const labels = Array.from(groupedData.keys()).sort()
  const data = labels.map(date => {
    const values = groupedData.get(date)!
    return values.reduce((sum, val) => sum + val, 0) / values.length
  })

  return { labels, data }
}

const updateChart = () => {
  if (chartInstance) {
    chartInstance.destroy()
  }
  nextTick(() => {
    createChart()
  })
}

watch(filteredRateChanges, updateChart, { deep: true })

onMounted(() => {
  createChart()
})
</script>

<!-- src/router/index.ts -->
import { createRouter, createWebHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    component: () => import('@/views/HomeView.vue')
  },
  {
    path: '/upload',
    name: 'Upload',
    component: () => import('@/views/UploadView.vue')
  },
  {
    path: '/analytics',
    name: 'Analytics',
    component: () => import('@/views/AnalyticsView.vue')
  },
  {
    path: '/reports',
    name: 'Reports',
    component: () => import('@/views/ReportsView.vue')
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
