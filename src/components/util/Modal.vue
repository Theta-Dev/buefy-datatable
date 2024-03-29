<template>
  <transition
    :name="animation"
    @after-enter="afterEnter"
    @before-leave="beforeLeave"
    @after-leave="afterLeave"
  >
    <div
      v-if="!destroyed"
      v-show="isActive"
      class="modal is-active"
      :class="[{'is-full-screen': fullScreen}, customClass]"
      tabindex="-1"
      :role="ariaRole"
      :aria-label="ariaLabel"
      :aria-modal="ariaModal"
    >
      <div
        class="modal-background"
        @click="cancel('outside')"
      />
      <div
        class="animation-content"
        :class="{ 'modal-content': !hasModalCard }"
        :style="customStyle"
      >
        <component
          :is="component"
          v-if="component"
          v-bind="props"
          :can-cancel="canCancel"
          v-on="events"
          @close="close"
        />
        <template v-else-if="content">
          <div v-html="content" />
        </template>
        <slot
          v-else
          :can-cancel="canCancel"
          :close="close"
        />
        <button
          v-if="showX"
          v-show="!animating"
          type="button"
          class="modal-close is-large"
          @click="cancel('x')"
        />
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: 'Modal',
  // deprecated, to replace with default 'value' in the next breaking change
  model: {
    prop: 'active',
    event: 'update:active',
  },
  props: {
    active: Boolean,
    component: {
      type: [Object, Function, String],
      default: null,
    },
    content: {
      type: [String, Array],
      default: null,
    },
    programmatic: Boolean,
    props: {
      type: Object,
      default: null,
    },
    events: {
      type: Object,
      default: null,
    },
    width: {
      type: [String, Number],
      default: 960,
    },
    hasModalCard: Boolean,
    animation: {
      type: String,
      default: 'zoom-out',
    },
    canCancel: {
      type: [Array, Boolean],
      default: () => ['escape', 'x', 'outside', 'button'],
    },
    onCancel: {
      type: Function,
      default: () => {},
    },
    scroll: {
      type: String,
      default: () => 'clip',
      validator: (value) => [
        'clip',
        'keep',
      ].indexOf(value) >= 0,
    },
    fullScreen: Boolean,
    autoFocus: {
      type: Boolean,
      default: false,
    },
    customClass: {
      type: String,
      default: '',
    },
    ariaRole: {
      type: String,
      validator: (value) => [
        'dialog',
        'alertdialog',
      ].indexOf(value) >= 0,
      default: 'dialog',
    },
    ariaModal: Boolean,
    ariaLabel: {
      type: String,
      validator: (value) => Boolean(value),
      default: '',
    },
    destroyOnHide: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      isActive: this.active || false,
      savedScrollTop: null,
      newWidth: typeof this.width === 'number'
        ? `${this.width}px`
        : this.width,
      animating: !this.active,
      destroyed: !this.active,
    };
  },
  computed: {
    cancelOptions() {
      return typeof this.canCancel === 'boolean'
        ? this.canCancel
        : this.canCancel;
    },
    showX() {
      return this.cancelOptions.indexOf('x') >= 0;
    },
    customStyle() {
      if(!this.fullScreen) {
        return { maxWidth: this.newWidth };
      }
      return null;
    },
  },
  watch: {
    active(value) {
      this.isActive = value;
    },
    isActive(value) {
      if(value) this.destroyed = false;
      this.handleScroll();
      this.$nextTick(() => {
        if(value && this.$el && this.$el.focus && this.autoFocus) {
          this.$el.focus();
        }
      });
    },
  },
  created() {
    if(typeof window !== 'undefined') {
      document.addEventListener('keyup', this.keyPress);
    }
  },
  beforeMount() {
    // Insert the Modal component in body tag
    // only if it's programmatic
    return this.programmatic && document.body.appendChild(this.$el);
  },
  mounted() {
    if(this.programmatic) this.isActive = true;
    else if(this.isActive) this.handleScroll();
  },
  beforeDestroy() {
    if(typeof window !== 'undefined') {
      document.removeEventListener('keyup', this.keyPress);
      // reset scroll
      document.documentElement.classList.remove('is-clipped');
      const savedScrollTop = !this.savedScrollTop
        ? document.documentElement.scrollTop
        : this.savedScrollTop;
      document.body.classList.remove('is-noscroll');
      document.documentElement.scrollTop = savedScrollTop;
      document.body.style.top = null;
    }
  },
  methods: {
    handleScroll() {
      if(typeof window === 'undefined') return;
      if(this.scroll === 'clip') {
        if(this.isActive) {
          document.documentElement.classList.add('is-clipped');
        }
        else {
          document.documentElement.classList.remove('is-clipped');
        }
        return;
      }
      this.savedScrollTop = !this.savedScrollTop
        ? document.documentElement.scrollTop
        : this.savedScrollTop;
      if(this.isActive) {
        document.body.classList.add('is-noscroll');
      }
      else {
        document.body.classList.remove('is-noscroll');
      }
      if(this.isActive) {
        document.body.style.top = `-${this.savedScrollTop}px`;
        return;
      }
      document.documentElement.scrollTop = this.savedScrollTop;
      document.body.style.top = null;
      this.savedScrollTop = null;
    },
    /**
        * Close the Modal if canCancel and call the onCancel prop (function).
        */
    cancel(method, ...args) {
      if(this.cancelOptions.indexOf(method) < 0) return;
      this.$emit('cancel', args);
      this.onCancel.apply(null, args);
      this.close();
    },
    /**
        * Call the onCancel prop (function).
        * Emit events, and destroy modal if it's programmatic.
        */
    close() {
      this.$emit('close');
      this.$emit('update:active', false);
      // Timeout for the animation complete before destroying
      if(this.programmatic) {
        this.isActive = false;
        setTimeout(() => {
          this.$destroy();
          if(typeof this.$el.remove !== 'undefined') {
            this.$el.remove();
          }
          else if(typeof this.$el.parentNode !== 'undefined' && this.$el.parentNode !== null) {
            this.$el.parentNode.removeChild(this.$el);
          }
        }, 150);
      }
    },
    /**
        * Keypress event that is bound to the document.
        */
    keyPress({ key }) {
      if(this.isActive && (key === 'Escape' || key === 'Esc')) this.cancel('escape');
    },
    /**
        * Transition after-enter hook
        */
    afterEnter() {
      this.animating = false;
      this.$emit('after-enter');
    },
    /**
        * Transition before-leave hook
        */
    beforeLeave() {
      this.animating = true;
    },
    /**
        * Transition after-leave hook
        */
    afterLeave() {
      if(this.destroyOnHide) {
        this.destroyed = true;
      }
      this.$emit('after-leave');
    },
  },
};
</script>
