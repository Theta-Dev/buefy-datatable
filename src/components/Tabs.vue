<template>
  <div
    class="b-tabs"
    :class="mainClasses"
  >
    <nav
      class="navbar tabs"
      :class="navClasses"
      role="navigation"
      aria-label="main navigation"
      @keydown="manageTablistKeydown"
    >
      <div class="navbar-brand">
        <slot name="brand" />
      </div>
      <div class="navbar-menu">
        <div class="navbar-start">
          <a
            v-for="(childItem, childIdx) in items"
            v-show="childItem.visible"
            :id="`${childItem.value}-tab`"
            :key="childItem.value"
            ref="tabLink"
            :class="[ 'navbar-item', childItem.headerClass, { 'is-active': childItem.isActive,
                                                              'is-disabled': childItem.disabled }]"
            :aria-controls="`${childItem.value}-content`"
            :aria-selected="`${childItem.isActive}`"
            :tabindex="childItem.isActive ? 0 : -1"
            @focus="currentFocus = childIdx"
            @click="childClick(childItem)"
            @keydown="manageTabKeydown($event, childItem)"
          >
            <b-icon
              v-if="childItem.icon"
              :icon="childItem.icon"
              :pack="childItem.iconPack"
              :size="size"
            />
            <span>{{ childItem.label }}</span>
          </a>
        </div>
      </div>
    </nav>
    <section
      class="tab-content"
      :class="{'is-transitioning': isTransitioning}"
    >
      <slot />
    </section>
  </div>
</template>

<script>
import config from 'buefy/src/utils/config';
import TabbedMixin from 'buefy/src/utils/TabbedMixin';

export default {
  name: 'Tabs',
  mixins: [TabbedMixin('tab')],
  props: {
    expanded: {
      type: Boolean,
      default: () => config.defaultTabsExpanded,
    },
    type: {
      type: [String, Object],
      default: () => config.defaultTabsType,
    },
    animated: {
      type: Boolean,
      default: () => config.defaultTabsAnimated,
    },
    multiline: Boolean,
  },
  data() {
    return {
      currentFocus: this.value,
    };
  },
  computed: {
    mainClasses() {
      return {
        'is-fullwidth': this.expanded,
        'is-vertical': this.vertical,
        'is-multiline': this.multiline,
        [this.position]: this.position && this.vertical,
      };
    },
    navClasses() {
      return [
        this.type,
        this.size,
        {
          [this.position]: this.position && !this.vertical,
          'is-fullwidth': this.expanded,
          'is-toggle': this.type === 'is-toggle-rounded',
        },
      ];
    },
  },
  methods: {
    giveFocusToTab(tab) {
      if(tab.$el && tab.$el.focus) {
        tab.$el.focus();
      }
      else if(tab.focus) {
        tab.focus();
      }
    },
    manageTablistKeydown(event) {
      // https://developer.mozilla.org/fr/docs/Web/API/KeyboardEvent/key/Key_Values#Navigation_keys
      const { key } = event;
      switch(key) {
        case this.vertical ? 'ArrowUp' : 'ArrowLeft':
        case this.vertical ? 'Up' : 'Left': {
          let prevIdx = this.getPrevItemIdx(this.currentFocus, true);
          if(prevIdx === null) {
            // We try to give focus back to the last visible element
            prevIdx = this.getPrevItemIdx(this.items.length, true);
          }
          if(
            prevIdx !== null
                        && this.$refs.tabLink
                        && prevIdx < this.$refs.tabLink.length
                        && !this.items[prevIdx].disabled
          ) {
            this.giveFocusToTab(this.$refs.tabLink[prevIdx]);
          }
          event.preventDefault();
          break;
        }
        case this.vertical ? 'ArrowDown' : 'ArrowRight':
        case this.vertical ? 'Down' : 'Right': {
          let nextIdx = this.getNextItemIdx(this.currentFocus, true);
          if(nextIdx === null) {
            // We try to give focus back to the first visible element
            nextIdx = this.getNextItemIdx(-1, true);
          }
          if(
            nextIdx !== null
                        && this.$refs.tabLink
                        && nextIdx < this.$refs.tabLink.length
                        && !this.items[nextIdx].disabled
          ) {
            this.giveFocusToTab(this.$refs.tabLink[nextIdx]);
          }
          event.preventDefault();
          break;
        }
        default: {
          break;
        }
      }
    },
    manageTabKeydown(event, childItem) {
      // https://developer.mozilla.org/fr/docs/Web/API/KeyboardEvent/key/Key_Values#Navigation_keys
      const { key } = event;
      switch(key) {
        case ' ':
        case 'Space':
        case 'Spacebar':
        case 'Enter': {
          this.childClick(childItem);
          event.preventDefault();
          break;
        }
        default: {
          break;
        }
      }
    },
  },
};
</script>

<style scoped>
.navbar-item {
  display: flex;
}

.navbar,
.navbar-menu,
.navbar-start,
.navbar-end {
  align-items: stretch;
  display: flex;
  padding: 0;
}

.navbar-menu{
  flex-grow: 1;
  flex-shrink: 0;
}
.navbar-start{
  justify-content: flex-start;
  margin-right: auto;
}
.navbar-end{
  justify-content: flex-end;
  margin-left: auto;
}
.navbar .container {
  display: flex;
}
.navbar-item {
  display: flex;
  align-items: center;
}

</style>
