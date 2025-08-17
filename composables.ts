// src/composables/useApi.ts
import { ref, computed } from 'vue'
import type { Ref } from 'vue'
import axios from 'axios'

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000'

export function useApi<T = any>() {
  const loading: Ref<boolean> = ref(false)
  const error: Ref<string | null> = ref(null)
  const data: Ref<T | null> = ref(null)

  const isLoading = computed(() => loading.value)
  const hasError = computed(() => error.value !== null)

  const execute = async (
    url: string,
    options: RequestInit = {}
  ): Promise<T | null> => {
    loading.value = true
    error.value = null

    try {
      const response = await fetch(`${API_BASE_URL}${url}`, {
        ...options,
        headers: {
          'Content-Type': 'application/json',
          ...options.headers,
        },
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const result = await response.json()
      data.value = result
      return result
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'An error occurred'
      return null
    } finally {
      loading.value = false
    }
  }

  const get = (url: string) => execute(url, { method: 'GET' })
  const post = (url: string, body: any) => 
    execute(url, { method: 'POST', body: JSON.stringify(body) })

  return {
    loading: readonly(loading),
    error: readonly(error),
    data: readonly(data),
    isLoading,
    hasError,
    get,
    post,
    execute
  }
}

// src/composables/useFileUpload.ts
import { ref } from 'vue'
import type { Ref } from 'vue'

export interface UploadResult {
  success: boolean
  filename: string
  processed_count?: number
  total_rows?: number
  errors?: string[]
}

export function useFileUpload() {
  const uploading: Ref<boolean> = ref(false)
  const progress: Ref<number> = ref(0)
  const results: Ref<UploadResult[]> = ref([])

  const uploadFile = async (
    file: File,
    endpoint: string
  ): Promise<UploadResult | null> => {
    uploading.value = true
    progress.value = 0

    const formData = new FormData()
    formData.append('file', file)

    try {
      const response = await fetch(`/api/upload/${endpoint}`, {
        method: 'POST',
        body: formData,
      })

      if (!response.ok) {
        throw new Error(`Upload failed: ${response.statusText}`)
      }

      const result = await response.json()
      results.value.push(result)
      progress.value = 100

      return result
    } catch (error) {
      console.error('Upload error:', error)
      return null
    } finally {
      uploading.value = false
    }
  }

  const reset = () => {
    progress.value = 0
    results.value = []
    uploading.value = false
  }

  return {
    uploading,
    progress,
    results,
    uploadFile,
    reset
  }
}

// src/stores/analytics.ts
import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { AnalyticsFilter, RateChangeMetrics, HospitalRateChange } from '@/types/analytics'
import type { Hospital, Enterprise } from '@/types/hospital'

export const useAnalyticsStore = defineStore('analytics', () => {
  // State
  const hospitals = ref<Hospital[]>([])
  const enterprises = ref<Enterprise[]>([])
  const rateChanges = ref<HospitalRateChange[]>([])
  const filters = ref<AnalyticsFilter>({})
  const loading = ref(false)

  // Getters
  const filteredRateChanges = computed(() => {
    let filtered = rateChanges.value

    if (filters.value.hospitalId) {
      filtered = filtered.filter(rc => rc.customer_id === filters.value.hospitalId)
    }

    if (filters.value.enterpriseId) {
      filtered = filtered.filter(rc => rc.enterprise_id === filters.value.enterpriseId)
    }

    if (filters.value.startDate) {
      filtered = filtered.filter(rc => 
        new Date(rc.infusion_date_time) >= new Date(filters.value.startDate!)
      )
    }

    if (filters.value.endDate) {
      filtered = filtered.filter(rc => 
        new Date(rc.infusion_date_time) <= new Date(filters.value.endDate!)
      )
    }

    return filtered
  })

  const metrics = computed((): RateChangeMetrics => {
    const data = filteredRateChanges.value
    
    return {
      totalChanges: data.length,
      averageIncrease: data.reduce((sum, rc) => sum + (rc.percentincrease || 0), 0) / data.length || 0,
      maxIncrease: Math.max(...data.map(rc => rc.percentincrease || 0)),
      infusionsUnder4Hours: data.filter(rc => (rc.total_elapsed_time || 0) < 240).length,
      infusionsOver4Hours: data.filter(rc => (rc.total_elapsed_time || 0) >= 240).length,
    }
  })

  // Actions
  const fetchHospitals = async () => {
    loading.value = true
    try {
      const response = await fetch('/api/hospitals')
      hospitals.value = await response.json()
    } finally {
      loading.value = false
    }
  }

  const fetchEnterprises = async () => {
    loading.value = true
    try {
      const response = await fetch('/api/enterprises')
      enterprises.value = await response.json()
    } finally {
      loading.value = false
    }
  }

  const fetchRateChanges = async () => {
    loading.value = true
    try {
      const query = new URLSearchParams()
      if (filters.value.hospitalId) query.append('hospital_id', filters.value.hospitalId.toString())
      if (filters.value.enterpriseId) query.append('enterprise_id', filters.value.enterpriseId.toString())
      if (filters.value.startDate) query.append('start_date', filters.value.startDate)
      if (filters.value.endDate) query.append('end_date', filters.value.endDate)

      const response = await fetch(`/api/analytics/rate-changes?${query}`)
      rateChanges.value = await response.json()
    } finally {
      loading.value = false
    }
  }

  const updateFilters = (newFilters: Partial<AnalyticsFilter>) => {
    filters.value = { ...filters.value, ...newFilters }
    fetchRateChanges()
  }

  return {
    // State
    hospitals,
    enterprises,
    rateChanges,
    filters,
    loading,
    // Getters
    filteredRateChanges,
    metrics,
    // Actions
    fetchHospitals,
    fetchEnterprises,
    fetchRateChanges,
    updateFilters
  }
})
