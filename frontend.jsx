<!-- src/views/UploadView.vue -->
<template>
  <div class="upload-view">
    <div class="upload-header">
      <h1 class="page-title">Upload Customer Data</h1>
      <p class="page-subtitle">Upload Excel files containing customer infusion data</p>
    </div>

    <div class="upload-container">
      <div class="upload-grid">
        <!-- Hospital Alarms Upload -->
        <div class="upload-card">
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
            Upload customer alarm data including device counts, infusion counts, and error metrics
          </p>
          <input
            ref="alarmsInput"
            type="file"
            accept=".xlsx,.xls"
            @change="(e) => handleFileSelect(e, 'alarms')"
            class="hidden-input"
          />
          <button
            @click="$refs.alarmsInput?.click()"
            :disabled="uploading"
            class="btn btn--primary upload-btn"
          >
            <svg v-if="!files.alarms" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
              <polyline points="7,10 12,15 17,10"/>
              <line x1="12" y1="15" x2="12" y2="3"/>
            </svg>
            <svg v-else viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <polyline points="20,6 9,17 4,12"/>
            </svg>
            {{ files.alarms ? 'File Selected' : 'Choose File' }}
          </button>
          <p v-if="files.alarms" class="file-name">{{ files.alarms.name }}</p>
        </div>

        <!-- Enterprise Units Upload -->
        <div class="upload-card">
          <div class="upload-card__icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
              <line x1="16" y1="2" x2="16" y2="6"/>
              <line x1="8" y1="2" x2="8" y2="6"/>
              <line x1="3" y1="10" x2="21" y2="10"/>
            </svg>
          </div>
          <h3 class="upload-card__title">Enterprise Units</h3>
          <p class="upload-card__description">
            Upload enterprise unit data with infusion counts and completion dates
          </p>
          <input
            ref="enterpriseInput"
            type="file"
            accept=".xlsx,.xls"
            @change="(e) => handleFileSelect(e, 'enterprise')"
            class="hidden-input"
          />
          <button
            @click="$refs.enterpriseInput?.click()"
            :disabled="uploading"
            class="btn btn--primary upload-btn"
          >
            <svg v-if="!files.enterprise" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
              <polyline points="7,10 12,15 17,10"/>
              <line x1="12" y1="15" x2="12" y2="3"/>
            </svg>
            <svg v-else viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <polyline points="20,6 9,17 4,12"/>
            </svg>
            {{ files.enterprise ? 'File Selected' : 'Choose File' }}
          </button>
          <p v-if="files.enterprise" class="file-name">{{ files.enterprise.name }}</p>
        </div>

        <!-- Rate Changes Upload -->
        <div class="upload-card">
          <div class="upload-card__icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <polyline points="22,12 18,12 15,21 9,3 6,12 2,12"/>
            </svg>
          </div>
          <h3 class="upload-card__title">Rate Changes</h3>
          <p class="upload-card__description">
            Upload infusion rate change data with detailed metrics and timestamps
          </p>
          <input
            ref="rateChangesInput"
            type="file"
            accept=".xlsx,.xls"
            @change="(e) => handleFileSelect(e, 'rateChanges')"
            class="hidden-input"
          />
          <button
            @click="$refs.rateChangesInput?.click()"
            :disabled="uploading"
            class="btn btn--primary upload-btn"
          >
            <svg v-if="!files.rateChanges" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
              <polyline points="7,10 12,15 17,10"/>
              <line x1="12" y1="15" x2="12" y2="3"/>
            </svg>
            <svg v-else viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <polyline points="20,6 9,17 4,12"/>
            </svg>
            {{ files.rateChanges ? 'File Selected' : 'Choose File' }}
          </button>
          <p v-if="files.rateChanges" class="file-name">{{ files.rateChanges.name }}</p>
        </div>
      </div>

      <!-- Upload Actions -->
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
          <svg v-else class="spinning" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M21 12c0 4.97-4.03 9-9 9s-9-4.03-9-9 4.03-9 9-9"/>
          </svg>
          {{ uploading ? 'Uploading...' : 'Upload All Files' }}
        </button>
        
        <button
          @click="clearFiles"
          :disabled="uploading"
          class="btn btn--secondary"
        >
          Clear All
        </button>
      </div>

      <!-- Progress Bar -->
      <div v-if="uploading" class="progress-section">
        <div class="progress-bar">
          <div class="progress-fill" :style="{ width: `${progress}%` }"></div>
        </div>
        <p class="progress-text">{{ Math.round(progress) }}% Complete</p>
      </div>

      <!-- Upload Results -->
      <div v-if="results.length > 0" class="results-section">
        <h3 class="results-title">Upload Results</h3>
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
              <h4 class="result-card__title">{{ result.filename }}</h4>
              <span class="result-card__status">
                {{ result.success ? 'Success' : 'Failed' }}
              </span>
            </div>
            
            <div v-if="result.success" class="result-card__stats">
              <div class="stat">
                <span class="stat__label">Processed:</span>
                <span class="stat__value">{{ result.processed_count || 0 }}</span>
              </div>
              <div class="stat">
                <span class="stat__label">Total Rows:</span>
                <span class="stat__value">{{ result.total_rows || 0 }}</span>
              </div>
            </div>
            
            <div v-if="result.errors && result.errors.length > 0" class="result-card__errors">
              <details class="error-details">
                <summary class="error-summary">
                  View {{ result.errors.length }} Error{{ result.errors.length !== 1 ? 's' : '' }}
                </summary>
                <ul class="error-list">
                  <li v-for="error in result.errors.slice(0, 5)" :key="error" class="error-item">
                    {{ error }}
                  </li>
                  <li v-if="result.errors.length > 5" class="error-item">
                    ... and {{ result.errors.length - 5 }} more errors
                  </li>
                </ul>
              </details>
            </div>
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
import { useRouter } from 'vue-router'

const uploadStore = useUploadStore()
const { uploading, progress, results } = storeToRefs(uploadStore)
const router = useRouter()

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
    // Validate file type
    if (!file.name.match(/\.(xlsx|xls)$/i)) {
      alert('Please select a valid Excel file (.xlsx or .xls)')
      return
    }
    
    // Validate file size (10MB limit)
    if (file.size > 10 * 1024 * 1024) {
      alert('File size must be less than 10MB')
      return
    }
    
    files.value = { ...files.value, [type]: file }
  }
}

const uploadFiles = async () => {
  uploadStore.reset()
  
  const filesToUpload = []
  
  if (files.value.alarms) {
    filesToUpload.push({ file: files.value.alarms, endpoint: 'alarms' })
  }
  
  if (files.value.enterprise) {
    filesToUpload.push({ file: files.value.enterprise, endpoint: 'enterprise-units' })
  }
  
  if (files.value.rateChanges) {
    filesToUpload.push({ file: files.value.rateChanges, endpoint: 'rate-changes' })
  }
  
  if (filesToUpload.length > 0) {
    await uploadStore.uploadMultipleFiles(filesToUpload)
    
    // Check if all uploads were successful
    const allSuccess = results.value.every(result => result.success)
    
    if (allSuccess) {
      // Redirect to analytics after successful upload
      setTimeout(() => {
        router.push('/analytics')
      }, 2000)
    }
  }
}

const clearFiles = () => {
  files.value = {}
  uploadStore.reset()
  
  // Clear file inputs
  const inputs = ['alarmsInput', 'enterpriseInput', 'rateChangesInput']
  inputs.forEach(inputRef => {
    const input = (this as any)?.$refs[inputRef]
    if (input) input.value = ''
  })
}
</script>

<style lang="scss" scoped>
.upload-view {
  min-height: 100vh;
  padding: $spacing-xl;
  background: $background-primary;
}

.upload-header {
  text-align: center;
  margin-bottom: $spacing-xxl;
  
  .page-title {
    font-size: $font-size-xxl;
    font-weight: $font-weight-bold;
    color: $text-primary;
    margin-bottom: $spacing-sm;
  }
  
  .page-subtitle {
    font-size: $font-size-lg;
    color: $text-secondary;
  }
}

.upload-container {
  max-width: 1200px;
  margin: 0 auto;
}

.upload-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: $spacing-xl;
  margin-bottom: $spacing-xxl;
}

.upload-card {
  background: $background-card;
  border-radius: $border-radius-lg;
  padding: $spacing-xl;
  box-shadow: $shadow-medium;
  border: 1px solid $border-color;
  text-align: center;
  transition: transform 0.2s, box-shadow 0.2s;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: $shadow-heavy;
  }
  
  &__icon {
    width: 64px;
    height: 64px;
    margin: 0 auto $spacing-lg;
    padding: $spacing-md;
    background: linear-gradient(135deg, $primary-blue, $secondary-blue);
    border-radius: 50%;
    color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    
    svg {
      width: 32px;
      height: 32px;
    }
  }
  
  &__title {
    font-size: $font-size-xl;
    font-weight: $font-weight-semibold;
    color: $text-primary;
    margin-bottom: $spacing-md;
  }
  
  &__description {
    color: $text-secondary;
    margin-bottom: $spacing-xl;
    line-height: 1.6;
  }
}

.hidden-input {
  display: none;
}

.upload-btn {
  width: 100%;
  margin-bottom: $spacing-md;
  
  svg {
    width: 16px;
    height: 16px;
    margin-right: $spacing-xs;
  }
}

.file-name {
  font-size: $font-size-sm;
  color: $accent-green;
  font-weight: $font-weight-medium;
  word-break: break-all;
}

.upload-actions {
  display: flex;
  justify-content: center;
  gap: $spacing-lg;
  margin-bottom: $spacing-xl;
  
  .btn--large {
    padding: $spacing-md $spacing-xl;
    font-size: $font-size-md;
    
    svg {
      width: 20px;
      height: 20px;
      margin-right: $spacing-sm;
      
      &.spinning {
        animation: spin 1s linear infinite;
      }
    }
  }
}

.progress-section {
  margin-bottom: $spacing-xl;
  text-align: center;
  
  .progress-bar {
    width: 100%;
    height: 8px;
    background: lighten($border-color, 5%);
    border-radius: 4px;
    overflow: hidden;
    margin-bottom: $spacing-sm;
    
    .progress-fill {
      height: 100%;
      background: linear-gradient(90deg, $primary-blue, $accent-green);
      border-radius: 4px;
      transition: width 0.3s ease;
    }
  }
  
  .progress-text {
    font-size: $font-size-sm;
    color: $text-secondary;
    font-weight: $font-weight-medium;
  }
}

.results-section {
  .results-title {
    font-size: $font-size-xl;
    font-weight: $font-weight-semibold;
    color: $text-primary;
    margin-bottom: $spacing-lg;
    text-align: center;
  }
}

.results-grid {
  display: grid;
  gap: $spacing-lg;
}

.result-card {
  background: $background-card;
  border-radius: $border-radius-md;
  box-shadow: $shadow-light;
  overflow: hidden;
  
  &--success {
    border-left: 4px solid $accent-green;
  }
  
  &--error {
    border-left: 4px solid $accent-red;
  }
  
  &__header {
    display: flex;
    align-items: center;
    padding: $spacing-lg;
    background: lighten($background-primary, 2%);
    
    .result-card__icon {
      width: 24px;
      height: 24px;
      margin-right: $spacing-md;
      
      svg {
        width: 100%;
        height: 100%;
      }
    }
    
    .result-card__title {
      flex: 1;
      font-size: $font-size-md;
      font-weight: $font-weight-medium;
      color: $text-primary;
      margin: 0;
    }
    
    .result-card__status {
      font-size: $font-size-sm;
      font-weight: $font-weight-medium;
      padding: $spacing-xs $spacing-sm;
      border-radius: $border-radius-sm;
      
      .result-card--success & {
        background: lighten($accent-green, 40%);
        color: $accent-green;
      }
      
      .result-card--error & {
        background: lighten($accent-red, 40%);
        color: $accent-red;
      }
    }
  }
  
  &__stats {
    display: flex;
    padding: $spacing-md $spacing-lg;
    gap: $spacing-lg;
    
    .stat {
      display: flex;
      flex-direction: column;
      align-items: center;
      
      &__label {
        font-size: $font-size-xs;
        color: $text-light;
        margin-bottom: $spacing-xs;
      }
      
      &__value {
        font-size: $font-size-lg;
        font-weight: $font-weight-semibold;
        color: $text-primary;
      }
    }
  }
  
  &__errors {
    padding: $spacing-md $spacing-lg;
    border-top: 1px solid $border-color;
    
    .error-details {
      cursor: pointer;
      
      .error-summary {
        color: $accent-red;
        font-weight: $font-weight-medium;
        font-size: $font-size-sm;
        margin-bottom: $spacing-sm;
        
        &:hover {
          text-decoration: underline;
        }
      }
      
      .error-list {
        margin-top: $spacing-sm;
        padding-left: $spacing-md;
        
        .error-item {
          font-size: $font-size-xs;
          color: $text-secondary;
          margin-bottom: $spacing-xs;
          line-height: 1.4;
        }
      }
    }
  }
}

// Success and error states for upload cards
.result-card--success {
  .result-card__icon svg {
    color: $accent-green;
  }
}

.result-card--error {
  .result-card__icon svg {
    color: $accent-red;
  }
}

// Animations
@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

// Responsive design
@media (max-width: 768px) {
  .upload-view {
    padding: $spacing-lg;
  }
  
  .upload-grid {
    grid-template-columns: 1fr;
  }
  
  .upload-actions {
    flex-direction: column;
    align-items: center;
  }
  
  .upload-header .page-title {
    font-size: $font-size-xl;
  }
}
