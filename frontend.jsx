<!-- src/App.vue -->
<template>
  <div id="app" class="app">
    <AppHeader />
    <div class="app-layout">
      <AppSidebar />
      <main class="main-content">
        <RouterView />
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
import AppHeader from '@/components/common/AppHeader.vue'
import AppSidebar from '@/components/common/AppSidebar.vue'
</script>

<style lang="scss">
@import '@/styles/variables.scss';
@import '@/styles/global.scss';

.app {
  min-height: 100vh;
  background: $background-primary;
}

.app-layout {
  display: flex;
  min-height: calc(100vh - 70px); // Subtract header height
}

.main-content {
  flex: 1;
  overflow-x: auto;
}
</style>

<!-- src/components/common/AppHeader.vue -->
<template>
  <header class="app-header">
    <div class="header-content">
      <div class="header-brand">
        <div class="brand-icon">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.29 1.51 4.04 3 5.5l7 7Z"/>
          </svg>
        </div>
        <div class="brand-text">
          <h1 class="brand-title">Infusion Analytics</h1>
          <p class="brand-subtitle">Customer Data Platform</p>
        </div>
      </div>
      
      <nav class="header-nav">
        <router-link to="/" class="nav-link" :class="{ active: $route.path === '/' }">
          Dashboard
        </router-link>
        <router-link to="/upload" class="nav-link" :class="{ active: $route.path === '/upload' }">
          Upload
        </router-link>
        <router-link to="/analytics" class="nav-link" :class="{ active: $route.path === '/analytics' }">
          Analytics
        </router-link>
        <router-link to="/reports" class="nav-link" :class="{ active: $route.path === '/reports' }">
          Reports
        </router-link>
      </nav>
      
      <div class="header-actions">
        <button class="btn btn--secondary btn--small">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"/>
            <path d="M13.73 21a2 2 0 0 1-3.46 0"/>
          </svg>
        </button>
        <div class="user-menu">
          <div class="user-avatar">
            <span>A</span>
          </div>
        </div>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
// Header logic here
</script>

<style lang="scss" scoped>
.app-header {
  height: 70px;
  background: $background-card;
  border-bottom: 1px solid $border-color;
  box-shadow: $shadow-light;
  position: sticky;
  top: 0;
  z-index: 1000;
}

.header-content {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 100%;
  padding: 0 $spacing-xl;
  max-width: 1400px;
  margin: 0 auto;
}

.header-brand {
  display: flex;
  align-items: center;
  gap: $spacing-md;
  
  .brand-icon {
    width: 40px;
    height: 40px;
    background: linear-gradient(135deg, $primary-blue, $secondary-blue);
    border-radius: $border-radius-md;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    
    svg {
      width: 24px;
      height: 24px;
    }
  }
  
  .brand-text {
    .brand-title {
      font-size: $font-size-lg;
      font-weight: $font-weight-bold;
      color: $text-primary;
      margin: 0;
      line-height: 1.2;
    }
    
    .brand-subtitle {
      font-size: $font-size-xs;
      color: $text-secondary;
      margin: 0;
      line-height: 1;
    }
  }
}

.header-nav {
  display: flex;
  align-items: center;
  gap: $spacing-lg;
  
  .nav-link {
    padding: $spacing-sm $spacing-md;
    border-radius: $border-radius-md;
    text-decoration: none;
    color: $text-secondary;
    font-weight: $font-weight-medium;
    font-size: $font-size-sm;
    transition: all 0.2s ease;
    position: relative;
    
    &:hover {
      color: $primary-blue;
      background: $light-blue;
    }
    
    &.active {
      color: $primary-blue;
      background: $light-blue;
      
      &::after {
        content: '';
        position: absolute;
        bottom: -1px;
        left: 50%;
        transform: translateX(-50%);
        width: 20px;
        height: 2px;
        background: $primary-blue;
        border-radius: 1px;
      }
    }
  }
}

.header-actions {
  display: flex;
  align-items: center;
  gap: $spacing-md;
  
  .btn--small {
    padding: $spacing-sm;
    
    svg {
      width: 18px;
      height: 18px;
    }
  }
  
  .user-menu {
    .user-avatar {
      width: 36px;
      height: 36px;
      border-radius: 50%;
      background: linear-gradient(135deg, $accent-purple, darken($accent-purple, 10%));
      display: flex;
      align-items: center;
      justify-content: center;
      color: white;
      font-weight: $font-weight-bold;
      cursor: pointer;
      transition: transform 0.2s ease;
      
      &:hover {
        transform: scale(1.05);
      }
    }
  }
}

@media (max-width: 768px) {
  .header-content {
    padding: 0 $spacing-lg;
  }
  
  .header-nav {
    display: none;
  }
  
  .brand-text .brand-subtitle {
    display: none;
  }
}
</style>

<!-- src/components/common/AppSidebar.vue -->
<template>
  <aside class="app-sidebar" :class="{ 'sidebar-collapsed': collapsed }">
    <div class="sidebar-header">
      <button @click="toggleCollapsed" class="collapse-btn">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M3 12h18m-9-9l9 9-9 9"/>
        </svg>
      </button>
    </div>
    
    <nav class="sidebar-nav">
      <div class="nav-section">
        <h3 v-show="!collapsed" class="nav-section-title">Main</h3>
        <router-link to="/" class="nav-item" :class="{ active: $route.path === '/' }">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
            <polyline points="9,22 9,12 15,12 15,22"/>
          </svg>
          <span v-show="!collapsed">Dashboard</span>
        </router-link>
        
        <router-link to="/analytics" class="nav-item" :class="{ active: $route.path === '/analytics' }">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <line x1="18" y1="20" x2="18" y2="10"/>
            <line x1="12" y1="20" x2="12" y2="4"/>
            <line x1="6" y1="20" x2="6" y2="14"/>
          </svg>
          <span v-show="!collapsed">Analytics</span>
        </router-link>
        
        <router-link to="/reports" class="nav-item" :class="{ active: $route.path === '/reports' }">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
            <polyline points="14,2 14,8 20,8"/>
            <line x1="16" y1="13" x2="8" y2="13"/>
            <line x1="16" y1="17" x2="8" y2="17"/>
            <polyline points="10,9 9,9 8,9"/>
          </svg>
          <span v-show="!collapsed">Reports</span>
        </router-link>
      </div>
      
      <div class="nav-section">
        <h3 v-show="!collapsed" class="nav-section-title">Data</h3>
        <router-link to="/upload" class="nav-item" :class="{ active: $route.path === '/upload' }">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
            <polyline points="17,8 12,3 7,8"/>
            <line x1="12" y1="3" x2="12" y2="15"/>
          </svg>
          <span v-show="!collapsed">Upload Data</span>
        </router-link>
      </div>
    </nav>
    
    <div class="sidebar-footer">
      <div class="quick-stats" v-show="!collapsed">
        <div class="stat-item">
          <span class="stat-value">24</span>
          <span class="stat-label">Active Customers</span>
        </div>
        <div class="stat-item">
          <span class="stat-value">1.2M</span>
          <span class="stat-label">Total Records</span>
        </div>
      </div>
    </div>
  </aside>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const collapsed = ref(false)

const toggleCollapsed = () => {
  collapsed.value = !collapsed.value
}
</script>

<style lang="scss" scoped>
.app-sidebar {
  width: 280px;
  background: $background-card;
  border-right: 1px solid $border-color;
  display: flex;
  flex-direction: column;
  transition: width 0.3s ease;
  
  &.sidebar-collapsed {
    width: 80px;
  }
}

.sidebar-header {
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding: 0 $spacing-lg;
  border-bottom: 1px solid $border-color;
  
  .collapse-btn {
    width: 32px;
    height: 32px;
    border: none;
    background: transparent;
    border-radius: $border-radius-sm;
    display: flex;
    align-items: center;
    justify-content: center;
    color: $text-secondary;
    cursor: pointer;
    transition: all 0.2s ease;
    
    &:hover {
      background: $light-blue;
      color: $primary-blue;
    }
    
    svg {
      width: 18px;
      height: 18px;
      transition: transform 0.3s ease;
    }
    
    .sidebar-collapsed & svg {
      transform: rotate(180deg);
    }
  }
}

.sidebar-nav {
  flex: 1;
  padding: $spacing-lg 0;
  overflow-y: auto;
}

.nav-section {
  margin-bottom: $spacing-xl;
  
  &:last-child {
    margin-bottom: 0;
  }
}

.nav-section-title {
  font-size: $font-size-xs;
  font-weight: $font-weight-semibold;
  color: $text-light;
  text-transform: uppercase;
  letter-spacing: 1px;
  margin: 0 0 $spacing-md $spacing-lg;
}

.nav-item {
  display: flex;
  align-items: center;
  gap: $spacing-md;
  padding: $spacing-md $spacing-lg;
  color: $text-secondary;
  text-decoration: none;
  font-weight: $font-weight-medium;
  font-size: $font-size-sm;
  transition: all 0.2s ease;
  position: relative;
  
  svg {
    width: 20px;
    height: 20px;
    flex-shrink: 0;
  }
  
  &:hover {
    background: $light-blue;
    color: $primary-blue;
  }
  
  &.active {
    background: $light-blue;
    color: $primary-blue;
    
    &::before {
      content: '';
      position: absolute;
      left: 0;
      top: 0;
      bottom: 0;
      width: 3px;
      background: $primary-blue;
    }
  }
  
  .sidebar-collapsed & {
    justify-content: center;
    padding: $spacing-md;
    
    span {
      display: none;
    }
  }
}

.sidebar-footer {
  border-top: 1px solid $border-color;
  padding: $spacing-lg;
}

.quick-stats {
  .stat-item {
    display: flex;
    flex-direction: column;
    margin-bottom: $spacing-md;
    
    &:last-child {
      margin-bottom: 0;
    }
    
    .stat-value {
      font-size: $font-size-lg;
      font-weight: $font-weight-bold;
      color: $primary-blue;
    }
    
    .stat-label {
      font-size: $font-size-xs;
      color: $text-secondary;
    }
  }
}

@media (max-width: 768px) {
  .app-sidebar {
    width: 80px;
    
    .nav-section-title {
      display: none;
    }
    
    .nav-item {
      justify-content: center;
      padding: $spacing-md;
      
      span {
        display: none;
      }
    }
    
    .sidebar-footer {
      display: none;
    }
  }
}
</style>
