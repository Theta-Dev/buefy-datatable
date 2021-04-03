<template>
  <footer
    class="footer"
  >
    <div class="container-fluid">
      <div class="level">
        <div class="level-left">
          <div class="level-item">
            <div class="footer-copyright">
              <b>&copy; {{ year }}, JustBoil.me</b> &mdash; Admin One Demo
              <span class="tag">v1.5.1</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>

<script>
export default {
  name: 'FooterBar',
  computed: {
    year() {
      return '2021';
    },
  },
};
</script>
