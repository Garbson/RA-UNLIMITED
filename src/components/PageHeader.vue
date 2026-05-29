<script setup>
import EditableText from './EditableText.vue'

defineProps({
  eyebrowKey: { type: String, required: true },
  eyebrowDefault: { type: String, default: '' },
  titleKey: { type: String, required: true },
  titleDefault: { type: String, default: '' },
  leadKey: { type: String, required: true },
  leadDefault: { type: String, default: '' },
  background: { type: String, default: '' },
})
</script>

<template>
  <section class="page-header" :style="background ? { '--bg-image': `url('${background}')` } : {}">
    <div class="container">
      <div class="page-header-text">
        <div class="eyebrow">
          <EditableText :content-key="eyebrowKey" :default="eyebrowDefault" />
        </div>
        <h1 class="display-title">
          <EditableText :content-key="titleKey" :default="titleDefault" tag="span" multiline />
        </h1>
        <p class="lead">
          <EditableText :content-key="leadKey" :default="leadDefault" tag="span" multiline />
        </p>
      </div>
    </div>
  </section>
</template>

<style scoped>
.page-header {
  position: relative;
  padding: clamp(80px, 12vw, 160px) 0 clamp(60px, 8vw, 100px);
  background:
    radial-gradient(ellipse at top right, rgba(244, 184, 96, 0.18), transparent 50%),
    radial-gradient(ellipse at bottom left, rgba(58, 79, 58, 0.08), transparent 60%),
    var(--color-cream);
  overflow: hidden;
}
.container { max-width: 1280px; margin: 0 auto; padding: 0 32px; }
.page-header-text { max-width: 760px; }
.eyebrow { margin-bottom: 20px; }
.display-title {
  white-space: pre-line;
  margin-bottom: 24px;
  font-size: clamp(2.25rem, 5vw, 4rem);
}
.lead { max-width: 620px; }
@media (max-width: 600px) {
  .container { padding: 0 24px; }
}
</style>
