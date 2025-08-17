<!-- src/views/ReportsView.vue -->
<template>
  <div class="reports-view">
    <div class="reports-header">
      <h1 class="page-title">Reports</h1>
      <p class="page-subtitle">
        Generate and export comprehensive reports for your customer data and analytics.
      </p>
    </div>

    <!-- Report Templates -->
    <div class="report-templates">
      <h2 class="section-title">Report Templates</h2>
      <div class="templates-grid">
        <div class="template-card">
          <div class="template-card__header">
            <div class="template-card__icon template-card__icon--primary">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <line x1="18" y1="20" x2="18" y2="10"/>
                <line x1="12" y1="20" x2="12" y2="4"/>
                <line x1="6" y1="20" x2="6" y2="14"/>
              </svg>
            </div>
            <h3 class="template-card__title">Infusion Analytics Summary</h3>
          </div>
          <p class="template-card__description">
            Comprehensive overview of infusion metrics, rate changes, and customer performance across all enterprises.
          </p>
          <div class="template-card__actions">
            <button @click="generateReport('analytics-summary')" class="btn btn--primary" :disabled="generating">
              <svg v-if="!generating" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                <polyline points="17,8 12,3 7,8"/>
                <line x1="12" y1="3" x2="12" y2="15"/>
              </svg>
              <div v-else class="spinner"></div>
              {{ generating ? 'Generating...' : 'Generate Report' }}
            </button>
            <button class="btn btn--secondary">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                <polyline points="7,10 12,15 17,10"/>
                <line x1="12" y1="15" x2="12" y2="3"/>
              </svg>
              Download Template
            </button>
          </div>
        </div>

        <div class="template-card">
          <div class="template-card__header">
            <div class="template-card__icon template-card__icon--success">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"/>
                <path d="M13.73 21a2 2 0 0 1-3.46 0"/>
              </svg>
            </div>
            <h3 class="template-card__title">Alarm Activity Report</h3>
          </div>
          <p class="template-card__description">
            Detailed analysis of alarm patterns, DNL counts, system errors, and care area performance metrics.
          </p>
          <div class="template-card__actions">
            <button @click="generateReport('alarm-activity')" class="btn btn--primary" :disabled="generating">
              <svg v-if="!generating" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                <polyline points="17,8 12,3 7,8"/>
                <line x1="12" y1="3" x2="12" y2="15"/>
              </svg>
              <div v-else class="spinner"></div>
              {{ generating ? 'Generating...' : 'Generate Report' }}
            </button>
            <button class="btn btn--secondary">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                <polyline points="7,10 12,15 17,10"/>
                <line x1="12" y1="15" x2="12" y2="3"/>
              </svg>
              Download Template
            </button>
          </div>
        </div>

        <div class="template-card">
          <div class="template-card__header">
            <div class="template-card__icon template-card__icon--warning">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
                <circle cx="9" cy="7" r="4"/>
                <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
                <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
              </svg>
            </div>
            <h3 class="template-card__title">Customer Performance Report</h3>
          </div>
          <p class="template-card__description">
            Customer-specific metrics including enterprise breakdowns, infusion volumes, and comparative analysis.
          </p>
          <div class="template-card__actions">
            <button @click="generateReport('customer-performance')" class="btn btn--primary" :disabled="generating">
              <svg v-if="!generating" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                <polyline points="17,8 12,3 7,8"/>
                <line x1="12" y1="3" x2="12" y2="15"/>
              </svg>
              <div v-else class="spinner"></div>
              {{ generating ? 'Generating...' : 'Generate Report' }}
            </button>
            <button class="btn btn--secondary">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                <polyline points="7,10 12,15 17,10"/>
                <line x1="12" y1="15" x2="12" y2="3"/>
              </svg>
              Download Template
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Custom Report Builder -->
    <div class="custom-report-section">
      <h2 class="section-title">Custom Report Builder</h2>
      <div class="custom-report-card">
        <div class="report-builder">
          <div class="builder-section">
            <h4 class="builder-section__title">Data Sources</h4>
            <div class="checkbox-group">
              <label class="checkbox-item">
                <input type="checkbox" v-model="customReport.dataSources" value="rate-changes" />
                <span class="checkbox-custom"></span>
                Rate Changes
              </label>
              <label class="checkbox-item">
                <input type="checkbox" v-model="customReport.dataSources" value="alarms" />
                <span class="checkbox-custom"></span>
                Alarms
              </label>
              <label class="checkbox-item">
                <input type="checkbox" v-model="customReport.dataSources" value="enterprise-units" />
                <span class="checkbox-custom"></span>
                Enterprise Units
              </label>
            </div>
          </div>

          <div class="builder-section">
            <h4 class="builder-section__title">Date Range</h4>
            <div class="date-inputs">
              <div class="form-group">
                <label class="form-label">Start Date</label>
                <input type="date" v-model="customReport.startDate" class="form-control" />
              </div>
              <div class="form-group">
                <label class="form-label">End Date</label>
                <input type="date" v-model="customReport.endDate" class="form-control" />
              </div>
            </div>
          </div>

          <div class="builder-section">
            <h4 class="builder-section__title">Filters</h4>
            <div class="filter-inputs">
              <div class="form-group">
                <label class="form-label">Customer</label>
                <select v-model="customReport.customerId" class="form-control">
                  <option value="">All Customers</option>
                  <option v-for="customer in customers" :key="customer.id" :value="customer.id">
                    {{ customer.customer_name }}
                  </option>
                </select>
              </div>
              <div class="form-group">
                <label class="form-label">Enterprise</label>
                <select v-model="customReport.enterpriseId" class="form-control">
                  <option value="">All Enterprises</option>
                  <option v-for="enterprise in enterprises" :key="enterprise.id" :value="enterprise.id">
                    {{ enterprise.enterprise_name }}
                  </option>
                </select>
              </div>
            </div>
          </div>

          <div class="builder-actions">
            <button 
              @click="generateCustomReport" 
              class="btn btn--primary btn--large"
              :disabled="!canGenerateCustomReport || generating"
            >
              <svg v-if="!generating" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                <polyline points="17,8 12,3 7,8"/>
                <line x1="12" y1="3" x2="12" y2="15"/>
              </svg>
              <div v-else class="spinner"></div>
              Generate Custom Report
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Recent Reports -->
    <div class="recent-reports-section" v-if="recentReports.length > 0">
      <h2 class="section-title">Recent Reports</h2>
      <div class="reports-table">
        <table class="data-table">
          <thead>
            <tr>
              <th>Report Name</th>
              <th>Type</th>
              <th>Generated Date</th>
              <th>Size</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="report in recentReports" :key="report.id">
              <td>{{ report.name }}</td>
              <td>
                <span class="type-badge" :class="`type-badge--${report.type}`">
                  {{ formatReportType(report.type) }}
                </span>
              </td>
              <td>{{ formatDate(report.generatedDate) }}</td>
              <td>{{ report.size }}</td>
              <td>
                <div class="action-buttons">
                  <button @click="downloadReport(report)" class="btn btn--small btn--primary">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                      <polyline points="7,10 12,15 17,10"/>
                      <line x1="12" y1="15" x2="12" y2="3"/>
                    </svg>
                  </button>
                  <button @click="deleteReport(report)" class="btn btn--small btn--secondary">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                      <polyline points="3,6 5,6 21,6"/>
                      <path d="M19,6v14a2,2 0 0,1-2,2H7a2,2 0 0,1-2-2V6m3,0V4a2,2 0 0,1,2-2h4a2,2 0 0,1,2,2v2"/>
                    </svg>
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useAnalyticsStore } from '@/stores/analytics'
import { storeToRefs } from 'pinia'

const analyticsStore = useAnalyticsStore()
const { customers, enterprises } = storeToRefs(analyticsStore)

const generating = ref(false)

const customReport = ref({
  dataSources: [] as string[],
  startDate: '',
  endDate: '',
  customerId: '',
  enterpriseId: ''
})

const recentReports = ref([
  {
    id: 1,
    name: 'Q4_2024_Analytics_Summary',
    type: 'analytics',
    generatedDate: '2024-12-15T10:30:00Z',
    size: '2.4 MB'
  },
  {
    id: 2,
    name: 'November_Alarm_Report',
    type: 'alarms',
    generatedDate: '2024-12-01T14:22:00Z',
    size: '1.8 MB'
  },
  {
    id: 3,
    name: 'Customer_Performance_Nov',
    type: 'performance',
    generatedDate: '2024-11-30T16:45:00Z',
    size: '3.1 MB'
  }
])

const canGenerateCustomReport = computed(() => {
  return customReport.value.dataSources.length > 0 && 
         customReport.value.startDate && 
         customReport.value.endDate
})

const generateReport = async (type: string) => {
  generating.value = true
  try {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    // Add to recent reports
    const newReport = {
      id: Date.now(),
      name: `${type}_${new Date().toISOString().split('T')[0]}`,
      type: type,
      generatedDate: new Date().toISOString(),
      size: '2.1 MB'
    }
    recentReports.value.unshift(newReport)
    
    console.log(`Generated report: ${type}`)
  } catch (error) {
    console.error('Error generating report:', error)
  } finally {
    generating.value = false
  }
}

const generateCustomReport = async () => {
  generating.value = true
  try {
    // Simulate API call with custom parameters
    await new Promise(resolve => setTimeout(resolve, 3000))
    
    const newReport = {
      id: Date.now(),
      name: `Custom_Report_${new Date().toISOString().split('T')[0]}`,
      type: 'custom',
      generatedDate: new Date().toISOString(),
      size: '1.9 MB'
    }
    recentReports.value.unshift(newReport)
    
    console.log('Generated custom report:', customReport.value)
  } catch (error) {
    console.error('Error generating custom report:', error)
  } finally {
    generating.value = false
  }
}

const downloadReport = (report: any) => {
  console.log('Downloading report:', report.name)
  // Simulate download
}

const deleteReport = (report: any) => {
  const index = recentReports.value.findIndex(r => r.id === report.id)
  if (index > -1) {
    recentReports.value.splice(index, 1)
  }
}

const formatReportType = (type: string) => {
  const typeMap: { [key: string]: string } = {
    'analytics': 'Analytics',
    'alarms': 'Alarms',
    'performance': 'Performance',
    'custom': 'Custom'
  }
  return typeMap[type] || type
}

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}

onMounted(() => {
  analyticsStore.fetchCustomers()
  analyticsStore.fetchEnterprises()
})
</script>

<style lang="scss" scoped>
.reports-view {
  padding: $spacing-xl;
  max-width: 1400px;
  margin: 0 auto;
}

.reports-header {
  text-align: center;
  margin-bottom: $spacing-xxl;
  
  .page-title {
    font-size: $font-size-xxl;
    font-weight: $font-weight-bold;
    color: $text-primary;
    margin-bottom: $spacing-md;
  }
  
  .page-subtitle {
    font-size: $font-size-lg;
    color: $text-secondary;
    max-width: 600px;
    margin: 0 auto;
    line-height: 1.6;
  }
}

.section-title {
  font-size: $font-size-xl;
  font-weight: $font-weight-semibold;
  color: $text-primary;
  margin-bottom: $spacing-lg;
}

.report-templates {
  margin-bottom: $spacing-xxl;
  
  .templates-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
    gap: $spacing-lg;
  }
}

.template-card {
  background: $background-card;
  border-radius: $border-radius-lg;
  box-shadow: $shadow-light;
  padding: $spacing-lg;
  border: 1px solid $border-color;
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: $shadow-medium;
  }
  
  &__header {
    display: flex;
    align-items: center;
    gap: $spacing-md;
    margin-bottom: $spacing-md;
  }
  
  &__icon {
    width: 48px;
    height: 48px;
    border-radius: $border-radius-md;
    display: flex;
    align-items: center;
    justify-content: center;
    
    svg {
      width: 24px;
      height: 24px;
    }
    
    &--primary {
      background: lighten($primary-blue, 40%);
      color: $primary-blue;
    }
    
    &--success {
      background: lighten($accent-green, 40%);
      color: $accent-green;
    }
    
    &--warning {
      background: lighten($accent-orange, 35%);
      color: $accent-orange;
    }
  }
  
  &__title {
    font-size: $font-size-md;
    font-weight: $font-weight-semibold;
    color: $text-primary;
    margin: 0;
  }
  
  &__description {
    font-size: $font-size-sm;
    color: $text-secondary;
    line-height: 1.6;
    margin-bottom: $spacing-lg;
  }
  
  &__actions {
    display: flex;
    gap: $spacing-sm;
    flex-wrap: wrap;
  }
}

.custom-report-section {
  margin-bottom: $spacing-xxl;
  
  .custom-report-card {
    background: $background-card;
    border-radius: $border-radius-lg;
    box-shadow: $shadow-light;
    padding: $spacing-xl;
  }
}

.report-builder {
  .builder-section {
    margin-bottom: $spacing-xl;
    
    &:last-child {
      margin-bottom: 0;
    }
    
    &__title {
      font-size: $font-size-md;
      font-weight: $font-weight-semibold;
      color: $text-primary;
      margin-bottom: $spacing-md;
    }
  }
}

.checkbox-group {
  display: flex;
  gap: $spacing-lg;
  flex-wrap: wrap;
}

.checkbox-item {
  display: flex;
  align-items: center;
  gap: $spacing-sm;
  cursor: pointer;
  font-size: $font-size-sm;
  color: $text-primary;
  
  input[type="checkbox"] {
    display: none;
  }
  
  .checkbox-custom {
    width: 18px;
    height: 18px;
    border: 2px solid $border-color;
    border-radius: $border-radius-sm;
    position: relative;
    transition: all 0.2s ease;
    
    &::after {
      content: '';
      position: absolute;
      left: 5px;
      top: 2px;
      width: 6px;
      height: 10px;
      border: solid white;
      border-width: 0 2px 2px 0;
      transform: rotate(45deg);
      opacity: 0;
      transition: opacity 0.2s ease;
    }
  }
  
  input[type="checkbox"]:checked + .checkbox-custom {
    background: $primary-blue;
    border-color: $primary-blue;
    
    &::after {
      opacity: 1;
    }
  }
}

.date-inputs,
.filter-inputs {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: $spacing-lg;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: $spacing-xs;
}

.builder-actions {
  display: flex;
  justify-content: center;
  margin-top: $spacing-xl;
}

.recent-reports-section {
  .reports-table {
    background: $background-card;
    border-radius: $border-radius-lg;
    box-shadow: $shadow-light;
    overflow: hidden;
  }
}

.data-table {
  width: 100%;
  border-collapse: collapse;
  
  th {
    background: lighten($background-primary, 3%);
    color: $text-primary;
    font-weight: $font-weight-semibold;
    padding: $spacing-md;
    text-align: left;
    border-bottom: 2px solid $border-color;
    font-size: $font-size-sm;
  }
  
  td {
    padding: $spacing-md;
    border-bottom: 1px solid $border-color;
    font-size: $font-size-sm;
    color: $text-primary;
  }
  
  tbody tr:hover {
    background: lighten($primary-blue, 45%);
  }
}

.type-badge {
  padding: $spacing-xs $spacing-sm;
  border-radius: $border-radius-sm;
  font-size: $font-size-xs;
  font-weight: $font-weight-medium;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  
  &--analytics {
    background: lighten($primary-blue, 40%);
    color: $primary-blue;
  }
  
  &--alarms {
    background: lighten($accent-green, 40%);
    color: $accent-green;
  }
  
  &--performance {
    background: lighten($accent-orange, 35%);
    color: $accent-orange;
  }
  
  &--custom {
    background: lighten($accent-purple, 35%);
    color: $accent-purple;
  }
}

.action-buttons {
  display: flex;
  gap: $spacing-sm;
  
  .btn--small {
    padding: $spacing-xs;
    
    svg {
      width: 14px;
      height: 14px;
    }
  }
}

.spinner {
  width: 16px;
  height: 16px;
  border: 2px solid rgba(white, 0.3);
  border-top: 2px solid white;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

// Responsive design
@media (max-width: 768px) {
  .reports-view {
    padding: $spacing-lg;
  }
  
  .templates-grid {
    grid-template-columns: 1fr;
    gap: $spacing-md;
  }
  
  .template-card__actions {
    flex-direction: column;
    align-items: stretch;
  }
  
  .checkbox-group {
    flex-direction: column;
    gap: $spacing-md;
  }
  
  .date-inputs,
  .filter-inputs {
    grid-template-columns: 1fr;
  }
  
  .reports-table {
    overflow-x: auto;
  }
  
  .data-table {
    min-width: 600px;
  }
}
</style>

<!-- src/views/NotFoundView.vue -->
<template>
  <div class="not-found-view">
    <div class="not-found-content">
      <div class="not-found-illustration">
        <svg viewBox="0 0 200 200" class="illustration-svg">
          <circle cx="100" cy="100" r="80" fill="none" stroke="#e2e8f0" stroke-width="2"/>
          <text x="100" y="110" text-anchor="middle" font-size="48" font-weight="bold" fill="#64748b">404</text>
        </svg>
      </div>
      
      <h1 class="not-found-title">Page Not Found</h1>
      <p class="not-found-description">
        Sorry, the page you are looking for doesn't exist or has been moved.
      </p>
      
      <div class="not-found-actions">
        <router-link to="/" class="btn btn--primary btn--large">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
            <polyline points="9,22 9,12 15,12 15,22"/>
          </svg>
          Go to Dashboard
        </router-link>
        
        <button @click="goBack" class="btn btn--secondary btn--large">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <polyline points="15,18 9,12 15,6"/>
          </svg>
          Go Back
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter()

const goBack = () => {
  if (window.history.length > 1) {
    router.go(-1)
  } else {
    router.push('/')
  }
}
</script>

<style lang="scss" scoped>
.not-found-view {
  min-height: calc(100vh - 140px);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: $spacing-xl;
  background: $background-primary;
}

.not-found-content {
  text-align: center;
  max-width: 500px;
  margin: 0 auto;
}

.not-found-illustration {
  margin-bottom: $spacing-xl;
  
  .illustration-svg {
    width: 200px;
    height: 200px;
    margin: 0 auto;
    display: block;
  }
}

.not-found-title {
  font-size: 2.5rem;
  font-weight: $font-weight-bold;
  color: $text-primary;
  margin-bottom: $spacing-md;
}

.not-found-description {
  font-size: $font-size-lg;
  color: $text-secondary;
  line-height: 1.6;
  margin-bottom: $spacing-xxl;
}

.not-found-actions {
  display: flex;
  gap: $spacing-lg;
  justify-content: center;
  flex-wrap: wrap;
}

// Responsive design
@media (max-width: 768px) {
  .not-found-view {
    padding: $spacing-lg;
  }
  
  .not-found-title {
    font-size: 2rem;
  }
  
  .not-found-actions {
    flex-direction: column;
    align-items: center;
    gap: $spacing-md;
    
    .btn {
      width: 100%;
      max-width: 200px;
    }
  }
}
</style>
