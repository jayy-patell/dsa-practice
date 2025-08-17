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

// src/stores/upload.ts
import { defineStore } from 'pinia'
import { ref } from 'vue'

export interface UploadResult {
  success: boolean
  filename: string
  file_type: string
  processed_count?: number
  total_rows?: number
  errors?: string[]
}

export const useUploadStore = defineStore('upload', () => {
  const uploading = ref(false)
  const results = ref<UploadResult[]>([])
  const progress = ref(0)

  const uploadFile = async (file: File, endpoint: string): Promise<UploadResult | null> => {
    uploading.value = true
    progress.value = 0

    const formData = new FormData()
    formData.append('file', file)

    try {
      const response = await fetch(`/api/upload/${endpoint}`, {
        method: 'POST',
        body: formData,
      })

      progress.value = 50

      if (!response.ok) {
        throw new Error(`Upload failed: ${response.statusText}`)
      }

      const result = await response.json()
      results.value.push(result)
      progress.value = 100

      return result
    } catch (error) {
      console.error('Upload error:', error)
      const errorResult: UploadResult = {
        success: false,
        filename: file.name,
        file_type: endpoint,
        errors: [error instanceof Error ? error.message : 'Unknown error']
      }
      results.value.push(errorResult)
      return errorResult
    } finally {
      uploading.value = false
      setTimeout(() => {
        progress.value = 0
      }, 2000)
    }
  }

  const reset = () => {
    progress.value = 0
    results.value = []
    uploading.value = false
  }

  const clearResults = () => {
    results.value = []
  }

  return {
    uploading,
    results,
    progress,
    uploadFile,
    reset,
    clearResults
  }
})
