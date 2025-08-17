<!-- src/views/AnalyticsView.vue -->
<template>
  <div class="analytics-dashboard">
    <!-- Header -->
    <div class="dashboard-header">
      <h1 class="dashboard-title">All U.S. Customers</h1>
    </div>

    <!-- Filter Section -->
    <div class="filter-section">
      <div class="filter-row">
        <!-- Customer Name Dropdown -->
        <div class="filter-group">
          <label class="form-label">Customer Name</label>
          <select 
            v-model="filters.customerId" 
            @change="onCustomerChange"
            class="form-control"
          >
            <option value="">All</option>
            <option 
              v-for="customer in customers" 
              :key="customer.id" 
              :value="customer.id"
            >
              {{ customer.customer_name }}
            </option>
          </select>
        </div>

        <!-- Enterprise Name Dropdown -->
        <div class="filter-group">
          <label class="form-label">Enterprise Name</label>
          <select 
            v-model="filters.enterpriseId" 
            @change="onEnterpriseChange"
            class="form-control"
          >
            <option value="">All</option>
            <option 
              v-for="enterprise in filteredEnterprises" 
              :key="enterprise.id" 
              :value="enterprise.id"
            >
              {{ enterprise.enterprise_name }}
            </option>
          </select>
        </div>

        <!-- Date Range -->
        <div class="date-range">
          <input 
            v-model="filters.startDate"
            @change="onFiltersChange"
            type="date" 
            class="form-control date-input"
          />
          <div class="date-slider">
            <input 
              type="range" 
              min="0" 
              max="100" 
              class="slider"
            />
          </div>
          <input 
            v-model="filters.endDate"
            @change="onFiltersChange"
            type="date" 
            class="form-control date-input"
          />
        </div>
      </div>
    </div>

    <!-- Main Metrics -->
    <div class="metrics-grid">
      <!-- Main Blue Cards -->
      <div class="metric-card metric-card--primary">
        <div class="metric-card__value">{{ formatNumber(metrics.totalCompletedInfusions) }}</div>
        <div class="metric-card__label">Total Completed Infusions</div>
      </div>

      <div class="metric-card metric-card--primary large">
        <div class="metric-card__value">{{ formatNumber(metrics.overallDailyActiveInfusions) }}</div>
        <div class="metric-card__label">Overall Daily Active Infusions</div>
      </div>

      <!-- Rate Change Cards -->
      <div class="metric-card metric-card--orange">
        <div class="metric-card__value">{{ formatNumber(metrics.pumpRateChangeInfusions) }}</div>
        <div class="metric-card__label">Pump rate change Infusions</div>
        <div class="metric-card__subtitle">
          Infusion with rate change >100
        </div>
      </div>

      <div class="metric-card metric-card--orange">
        <div class="metric-card__value">{{ formatNumber(metrics.pumpRateChangeAttempts) }}</div>
        <div class="metric-card__label"># Pump Rate Change Attempts</div>
        <div class="metric-card__subtitle">
          Flow Rate Changes more than attempts
        </div>
      </div>

      <!-- Bolus Cards -->
      <div class="metric-card metric-card--green">
        <div class="metric-card__value">{{ formatNumber(metrics.bolusInfusions) }}</div>
        <div class="metric-card__label">Boluses Infusions</div>
        <div class="metric-card__subtitle">
          #Bolus with flow rate >100% an...
        </div>
      </div>

      <div class="metric-card metric-card--green">
        <div class="metric-card__value">{{ formatNumber(metrics.bolusAttempted) }}</div>
        <div class="metric-card__label">No. of Bolus Attempted</div>
        <div class="metric-card__subtitle">
          #Bolus more than double
        </div>
      </div>

      <!-- Time-based Cards Row 2 -->
      <div class="metric-card metric-card--orange">
        <div class="metric-card__value">{{ formatNumber(metrics.infusionsOver10Hours) }}</div>
        <div class="metric-card__label">#Infusions for >10 hrs</div>
      </div>

      <div class="metric-card metric-card--orange">
        <div class="metric-card__value">{{ formatNumber(metrics.totalTimeOver3Hours) }}</div>
        <div class="metric-card__label">Total time >3hrs and flow rate</div>
      </div>

      <div class="metric-card metric-card--green">
        <div class="metric-card__value">{{ formatNumber(metrics.bolusOver10Hours) }}</div>
        <div class="metric-card__label">#Bolus for >10hrs</div>
      </div>

      <div class="metric-card metric-card--green">
        <div class="metric-card__value">{{ formatNumber(metrics.bolusTimeOver3Hours) }}</div>
        <div class="metric-card__label">#Bolus with time >3hrs and</div>
      </div>

      <!-- Duration Cards -->
      <div class="metric-card metric-card--purple">
        <div class="metric-card__value">{{ formatNumber(metrics.infusionsUnder4Hours) }}</div>
        <div class="metric-card__label">#Infusion in 0-4 hrs that...</div>
      </div>

      <div class="metric-card metric-card--purple">
        <div class="metric-card__value">{{ formatNumber(metrics.bolusUnder4Hours) }}</div>
        <div class="metric-card__label">#Bolus in 0-4 hrs that have</div>
      </div>

      <div class="metric-card metric-card--purple">
        <div class="metric-card__value">{{ formatNumber(metrics.infusions4To10Hours) }}</div>
        <div class="metric-card__label">#Infusion in 4-10 hrs that...</div>
      </div>

      <div class="metric-card metric-card--purple">
        <div class="metric-card__value">{{ formatNumber(metrics.bolus4To10Hours) }}</div>
        <div class="metric-card__label">#Bolus in 4-10 hrs that...</div>
      </div>
    </div>

    <!-- Tables Section -->
    <div class="tables-section">
      <!-- Pump Rate Change Table -->
      <div class="card">
        <div class="card__header">
          <h3 class="card__title">Pump Rate Changed - By Care Area</h3>
        </div>
        <div class="card__content">
          <div class="table-container">
            <table class="data-table">
              <thead>
                <tr>
                  <th>careareaname</th>
                  <th>drug_name</th>
                  <th>No. of Rate Changes</th>
                  <th>No. of Infusions</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="item in careAreaRateChanges" :key="`rate-${item.careareaname}-${item.drug_name}`">
                  <td>{{ item.careareaname }}</td>
                  <td>{{ item.drug_name }}</td>
                  <td>{{ formatNumber(item.rateChanges) }}</td>
                  <td>{{ formatNumber(item.infusions) }}</td>
                </tr>
                <tr class="total-row">
                  <td colspan="2"><strong>Total</strong></td>
                  <td><strong>{{ formatNumber(totalRateChanges) }}</strong></td>
                  <td><strong>{{ formatNumber(totalRateInfusions) }}</strong></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <!-- Bolus Table -->
      <div class="card">
        <div class="card__header">
          <h3 class="card__title">Bolus - By Care Area</h3>
        </div>
        <div class="card__content">
          <div class="table-container">
            <table class="data-table">
              <thead>
                <tr>
                  <th>careareaname</th>
                  <th>drug_name</th>
                  <th>No. of Bolus</th>
                  <th>No. of Infusions</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="item in careAreaBolus" :key="`bolus-${item.careareaname}-${item.drug_name}`">
                  <td>{{ item.careareaname }}</td>
                  <td>{{ item.drug_name }}</td>
                  <td>{{ formatNumber(item.bolus) }}</td>
                  <td>{{ formatNumber(item.infusions) }}</td>
                </tr>
                <tr class="total-row">
                  <td colspan="2"><strong>Total</strong></td>
                  <td><strong>{{ formatNumber(totalBolus) }}</strong></td>
                  <td><strong>{{ formatNumber(totalBolusInfusions) }}</strong></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useAnalyticsStore } from '@/stores/analytics'
import { storeToRefs } from 'pinia'
import type { AnalyticsFilter, InfusionMetrics, CareAreaData } from '@/types/analytics'
import type { Customer, Enterprise } from '@/types/customer'

const analyticsStore = useAnalyticsStore()
const { customers, enterprises, metrics } = storeToRefs(analyticsStore)

const filters = ref<AnalyticsFilter>({
  customerId: undefined,
  enterpriseId: undefined,
  startDate: '',
  endDate: ''
})

// Sample data - replace with real API calls
const careAreaRateChanges = ref<CareAreaData[]>([])

const careAreaBolus = ref<CareAreaData[]>([])

const filteredEnterprises = computed(() => {
  if (!filters.value.customerId) {
    return enterprises.value
  }
  // Filter enterprises based on selected customer
  return enterprises.value.filter(enterprise => {
    // This would be based on actual relationship data
    return true
  })
})

const totalRateChanges = computed(() => 
  careAreaRateChanges.value.reduce((sum, item) => sum + item.rateChanges, 0)
)

const totalRateInfusions = computed(() => 
  careAreaRateChanges.value.reduce((sum, item) => sum + item.infusions, 0)
)

const totalBolus = computed(() => 
  careAreaBolus.value.reduce((sum, item) => sum + item.bolus, 0)
)

const totalBolusInfusions = computed(() => 
  careAreaBolus.value.reduce((sum, item) => sum + item.infusions, 0)
)

const formatNumber = (num: number) => {
  return num.toLocaleString()
}

const onCustomerChange = () => {
  filters.value.enterpriseId = undefined
  onFiltersChange()
}

const onEnterpriseChange = () => {
  onFiltersChange()
}

const onFiltersChange = () => {
  analyticsStore.updateFilters(filters.value)
}

onMounted(() => {
  analyticsStore.fetchCustomers()
  analyticsStore.fetchEnterprises()
  analyticsStore.fetchAnalytics(filters.value)
})
</script>

<style lang="scss" scoped>
.analytics-dashboard {
  min-height: 100vh;
  padding: $spacing-lg;
  background: $background-primary;
}

.dashboard-header {
  text-align: center;
  margin-bottom: $spacing-xl;
  padding: $spacing-lg;
  background: linear-gradient(135deg, #f0f8ff 0%, #e6f3ff 100%);
  border-radius: $border-radius-lg;
  
  .dashboard-title {
    font-size: $font-size-xxl;
    font-weight: $font-weight-bold;
    color: $text-primary;
    margin: 0;
  }
}

.filter-section {
  margin-bottom: $spacing-xl;
  background: $background-card;
  padding: $spacing-lg;
  border-radius: $border-radius-md;
  box-shadow: $shadow-light;
  
  .filter-row {
    display: grid;
    grid-template-columns: 200px 200px 1fr;
    gap: $spacing-lg;
    align-items: end;
  }
  
  .filter-group {
    display: flex;
    flex-direction: column;
  }
  
  .date-range {
    display: flex;
    align-items: center;
    gap: $spacing-md;
    
    .date-input {
      width: 150px;
    }
    
    .date-slider {
      flex: 1;
      position: relative;
      
      .slider {
        width: 100%;
        height: 6px;
        border-radius: 3px;
        background: linear-gradient(to right, $primary-blue 0%, $primary-blue 100%);
        outline: none;
        -webkit-appearance: none;
        
        &::-webkit-slider-thumb {
          -webkit-appearance: none;
          appearance: none;
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background: $primary-blue;
          cursor: pointer;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
        }
        
        &::-moz-range-thumb {
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background: $primary-blue;
          cursor: pointer;
          border: none;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
        }
      }
    }
  }
}

.metrics-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: $spacing-lg;
  margin-bottom: $spacing-xl;
  
  .metric-card {
    padding: $spacing-lg;
    border-radius: $border-radius-md;
    box-shadow: $shadow-medium;
    text-align: center;
    color: white;
    position: relative;
    overflow: hidden;
    
    &::before {
      content: '';
      position: absolute;
      top: -50%;
      right: -50%;
      width: 100%;
      height: 100%;
      background: rgba(255, 255, 255, 0.1);
      transform: rotate(45deg);
      transition: all 0.3s ease;
      opacity: 0;
    }
    
    &:hover::before {
      opacity: 1;
      transform: rotate(45deg) translateX(-20px);
    }
    
    &__value {
      font-size: 2.5rem;
      font-weight: $font-weight-bold;
      margin-bottom: $spacing-sm;
      line-height: 1;
    }
    
    &__label {
      font-size: $font-size-sm;
      opacity: 0.95;
      font-weight: $font-weight-medium;
      margin-bottom: $spacing-xs;
    }
    
    &__subtitle {
      font-size: $font-size-xs;
      opacity: 0.8;
    }
    
    &--primary {
      background: linear-gradient(135deg, $primary-blue 0%, $secondary-blue 100%);
      
      &.large {
        grid-column: span 2;
        
        .metric-card__value {
          font-size: 3.5rem;
        }
      }
    }
    
    &--orange {
      background: linear-gradient(135deg, $accent-orange 0%, darken($accent-orange, 15%) 100%);
    }
    
    &--green {
      background: linear-gradient(135deg, $accent-green 0%, darken($accent-green, 15%) 100%);
    }
    
    &--purple {
      background: linear-gradient(135deg, $accent-purple 0%, darken($accent-purple, 15%) 100%);
    }
  }
}

.tables-section {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: $spacing-xl;
  
  .card {
    background: $background-card;
    border-radius: $border-radius-md;
    box-shadow: $shadow-light;
    border: 1px solid $border-color;
    
    &__header {
      padding: $spacing-md;
      border-bottom: 1px solid $border-color;
      background: lighten($background-primary, 2%);
    }
    
    &__title {
      font-size: $font-size-md;
      font-weight: $font-weight-semibold;
      color: $text-primary;
      margin: 0;
    }
    
    &__content {
      padding: 0;
    }
  }
  
  .table-container {
    overflow-x: auto;
  }
  
  .data-table {
    width: 100%;
    border-collapse: collapse;
    font-size: $font-size-sm;
    
    th {
      background: lighten($background-primary, 3%);
      color: $text-primary;
      font-weight: $font-weight-semibold;
      padding: $spacing-md;
      text-align: left;
      border-bottom: 2px solid $border-color;
      white-space: nowrap;
    }
    
    td {
      padding: $spacing-sm $spacing-md;
      border-bottom: 1px solid $border-color;
      color: $text-primary;
    }
    
    tbody tr {
      &:hover {
        background: lighten($primary-blue, 45%);
      }
      
      &.total-row {
        background: lighten($background-primary, 1%);
        font-weight: $font-weight-semibold;
        border-top: 2px solid $border-color;
        
        &:hover {
          background: lighten($background-primary, 1%);
        }
      }
    }
  }
}

// Responsive design
@media (max-width: 1200px) {
  .metrics-grid {
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    
    .metric-card.large {
      grid-column: span 1;
    }
  }
  
  .tables-section {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 768px) {
  .analytics-dashboard {
    padding: $spacing-md;
  }
  
  .filter-section .filter-row {
    grid-template-columns: 1fr;
    gap: $spacing-md;
  }
  
  .date-range {
    flex-direction: column;
    align-items: stretch;
    
    .date-input {
      width: 100%;
    }
  }
  
  .metrics-grid {
    grid-template-columns: 1fr;
    gap: $spacing-md;
  }
}
</style>
