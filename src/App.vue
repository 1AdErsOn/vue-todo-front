<script setup>
import Navbar from '@/components/Navbar.vue';
</script>

<template>
  <Navbar />

  <main class="container">
    <div class="card mt-3">
      <div class="card-body">
        <RouterView />
      </div>
    </div>
  </main>
</template>