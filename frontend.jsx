<!-- src/views/UploadView.vue -->
<template>
  <div class="upload-view">
    <div class="upload-header">
      <h1 class="page-title">Upload Customer Data</h1>
      <p class="page-subtitle">
        Upload Excel files containing customer infusion data. Please ensure all files follow the required format.
      </p>
    </div>

    <div class="upload-grid">
      <!-- Alarms Upload Card -->
      <div class="upload-card" :class="{ 'has-file': files.alarms }">
        <div class="upload-card__icon">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
            <polyline points="14,2 14,8 20,8"/>
            <line x1="16" y1="13" x2="8" y2="13"/>
            <line x1="16" y1="17" x2="8" y2="17"/>
            <polyline points="10,9 9,9 8,9"/>
          </svg>
        </div>
        <h3 class="upload-card__title">Customer Alarms</h3>
        <p class="upload-card__description">
          Upload alarm data containing DNL counts, tube loads, system errors, and infusion counts by care area.
        </p>
        
        <input
          ref="alarmsInput"
          type="file"
          accept=".xlsx,.xls"
          @change="(e) => handleFileSelect(e, 'alarms')"
          class="file-input"
        />
        
        <div class="upload-card__actions">
          <button
            @click="$refs.alarmsInput?.click()"
            :disabled="uploading"
            class="btn btn--primary"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
              <polyline points="7,10 12,15 17,10"/>
              <line x1="12" y1="15" x2="12" y2="3"/>
            </svg>
            Choose File
          </button>
          
          <div v-if="files.alarms" class="file-info">
            <span class="file-name">{{ files.alarms.name }}</span>
            <span class="file-size">{{ formatFileSize(files.alarms.size) }}</span>
          </div>
        </div>
      </div>

      <!-- Enterprise Units Upload Card -->
      <div class="upload-card" :class="{ 'has-file': files.enterprise }">
        <div class="upload-card__icon">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
            <polyline points="14,2 14,8 20,8"/>
            <line x1="16" y1="13" x2="8" y2="13"/>
            <line x1="16" y1="17" x2="8" y2="17"/>
            <polyline points="10,9 9,9 8,9"/>
          </svg>
        </div>
        <h3 class="upload-card__title">Enterprise Units</h3>
        <p class="upload-card__description">
          Upload enterprise unit data containing infusion counts and completion dates by device type.
        </p>
        
        <input
          ref="enterpriseInput"
          type="file"
          accept=".xlsx,.xls"
          @change="(e) => handleFileSelect(e, 'enterprise')"
          class="file-input"
        />
        
        <div class="upload-card__actions">
          <button
            @click="$refs.enterpriseInput?.click()"
            :disabled="uploading"
            class="btn btn--primary"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
              <polyline points="7,10 12,15 17,10"/>
              <line x1="12" y1="15" x2="12" y2="3"/>
            </svg>
            Choose File
          </button>
          
          <div v-if="files.enterprise" class="file-info">
            <span class="file-name">{{ files.enterprise.name }}</span>
            <span class="file-size">{{ formatFileSize(files.enterprise.size) }}</span>
          </div>
        </div>
      </div>

      <!-- Rate Changes Upload Card -->
      <div class="upload-card" :class="{ 'has-file': files.rateChanges }">
        <div class="upload-card__icon">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
            <polyline points="14,2 14,8 20,8"/>
            <line x1="16" y1="13" x2="8" y2="13"/>
            <line x1="16" y1="17" x2="8" y2="17"/>
            <polyline points="10,9 9,9 8,9"/>
          </svg>
        </div>
        <h3 class="upload-card__title">Rate Changes</h3>
        <p class="upload-card__description">
          Upload rate change data with infusion details, drug information, and percentage increases.
        </p>
        
        <input
          ref="rateChangesInput"
          type="file"
          accept=".xlsx,.xls"
          @change="(e) => handleFileSelect(e, 'rateChanges')"
          class="file-input"
        />
        
        <div class="upload-card__actions">
          <button
            @click="$refs.rateChangesInput?.click()"
            :disabled="uploading"
            class="btn btn--primary"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
              <polyline points="7,10 12,15 17,10"/>
              <line x1="12" y1="15" x2="12" y2="3"/>
            </svg>
            Choose File
          </button>
          
          <div v-if="files.rateChanges" class="file-info">
            <span class="file-name">{{ files.rateChanges.name }}</span>
            <span class="file-size">{{ formatFileSize(files.rateChanges.size) }}</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Upload Action -->
    <div class="upload-actions">
      <button
        @click="uploadFiles"
        :disabled="uploading || !hasFiles"
        class="btn btn--primary btn--large"
      >
        <svg v-if="!uploading" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
          <polyline points="17,8 12,3 7,8"/>
          <line x1="12" y1="3" x2="12" y2="15"/>
        </svg>
        <div v-else class="spinner"></div>
        {{ uploading ? 'Uploading...' : 'Upload All Files' }}
      </button>
      
      <button
        v-if="results.length > 0"
        @click="clearResults"
        class="btn btn--secondary"
      >
        Clear Results
      </button>
    </div>

    <!-- Progress Bar -->
    <div v-if="uploading" class="progress-section">
      <div class="progress-bar">
        <div class="progress-fill" :style="{ width: `${progress}%` }"></div>
      </div>
      <p class="progress-text">Uploading files... {{ progress }}%</p>
    </div>

    <!-- Upload Results -->
    <div v-if="results.length > 0" class="results-section">
      <h2 class="results-title">Upload Results</h2>
      
      <div class="results-grid">
        <div
          v-for="result in results"
          :key="result.filename"
          class="result-card"
          :class="{
            'result-card--success': result.success,
            'result-card--error': !result.success
          }"
        >
          <div class="result-card__header">
            <div class="result-card__icon">
              <svg v-if="result.success" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <polyline points="20,6 9,17 4,12"/>
              </svg>
              <svg v-else viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <circle cx="12" cy="12" r="10"/>
                <line x1="15" y1="9" x2="9" y2="15"/>
                <line x1="9" y1="9" x2="15" y2="15"/>
              </svg>
            </div>
            <div class="result-card__info">
              <h3 class="result-card__filename">{{ result.filename }}</h3>
              <span class="result-card__type">{{ formatFileType(result.file_type) }}</span>
            </div>
            <div class="result-card__status">
              <span class="status-badge" :class="{
                'status-badge--success': result.success,
                'status-badge--error': !result.success
              }">
                {{ result.success ? 'Success' : 'Failed' }}
              </span>
            </div>
          </div>
          
          <div v-if="result.success && result.processed_count !== undefined" class="result-card__stats">
            <div class="stat">
              <span class="stat__value">{{ result.processed_count }}</span>
              <span class="stat__label">Processed</span>
            </div>
            <div class="stat">
              <span class="stat__value">{{ result.total_rows || 0 }}</span>
              <span class="stat__label">Total Rows</span>
            </div>
            <div class="stat">
              <span class="stat__value">{{ ((result.processed_count / (result.total_rows || 1)) * 100).toFixed(1) }}%</span>
              <span class="stat__label">Success Rate</span>
            </div>
          </div>
          
          <div v-if="result.errors && result.errors.length > 0" class="result-card__errors">
            <details class="error-details">
              <summary class="error-summary">
                View Errors ({{ result.errors.length }})
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <polyline points="6,9 12,15 18,9"/>
                </svg>
              </summary>
              <div class="error-list">
                <div
                  v-for="(error, index) in result.errors"
                  :key="index"
                  class="error-item"
                >
                  {{ error }}
                </div>
              </div>
            </details>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useUploadStore } from '@/stores/upload'
import { storeToRefs } from 'pinia'

const uploadStore = useUploadStore()
const { uploading, progress, results } = storeToRefs(uploadStore)

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
  uploadStore.reset()
  
  const uploads = []
  
  if (files.value.alarms) {
    uploads.push(uploadStore.uploadFile(files.value.alarms, 'alarms'))
  }
  
  if (files.value.enterprise) {
    uploads.push(uploadStore.uploadFile(files.value.enterprise, 'enterprise-units'))
  }
  
  if (
