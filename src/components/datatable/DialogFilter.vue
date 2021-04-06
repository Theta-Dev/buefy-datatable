<template>
  <div class="modal-card">
    <header class="modal-card-head">
      <p class="modal-card-title">
        Filter: {{ fname }}
      </p>

      <button
        class="button mx-1 is-primary"
        @click="selectAll(true)"
      >
        <svg-icon :icon="icons.checkAll" />
      </button>
      <button
        class="button mx-1 is-danger"
        @click="selectAll(false)"
      >
        <svg-icon :icon="icons.checkNone" />
      </button>
    </header>
    <section class="modal-card-body">
      <div class="control has-icons-left">
        <input
          ref="search"
          v-model="search"
          placeholder="Enter filter..."
          class="input mb-3"
          @keyup.enter="searchInput()"
        >
        <svg-icon
          class="is-left"
          :icon="icons.search"
        />
      </div>
      <table class="table is-bordered">
        <thead>
          <tr>
            <th>Item</th>
            <th>Count</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(item) in items"
            :key="item"
          >
            <td
              :class="selection.includes(item) ? 'is-primary' : ''"
              @click="toggleItem(item)"
            >
              {{ item }}
            </td>
            <td
              :class="selection.includes(item) ? 'is-primary' : ''"
              @click="toggleItem(item)"
            >
              {{ filterCounts[item] }}
            </td>
          </tr>
        </tbody>
      </table>
    </section>
    <footer class="modal-card-foot">
      <button
        class="button is-primary"
        @click="submit()"
      >
        OK
      </button>
      <button
        class="button"
        @click="$emit('close')"
      >
        Close
      </button>
    </footer>
  </div>
</template>

<script>
import { mdiCheckboxMultipleBlankOutline, mdiCheckboxMultipleMarked, mdiMagnify } from '@mdi/js';
import SvgIcon from '../util/SvgIcon.vue';

export default {
  name: 'DialogFilter',

  components: {
    SvgIcon,
  },

  props: {
    dactive: {
      type: Boolean,
      default: false,
    },
    fname: {
      type: String,
      default: '',
    },
    items: {
      type: Array,
      default: () => [],
    },
    filters: {
      type: Array,
      default: () => [],
    },
    filterCounts: {
      type: [Array, Object],
      default: () => {},
    },
  },
  data: () => ({
    icons: {
      search: mdiMagnify,
      checkAll: mdiCheckboxMultipleMarked,
      checkNone: mdiCheckboxMultipleBlankOutline,
    },
    selection: [],
    search: '',
  }),
  watch: {
    dactive(dactive) {
      if(!dactive) return;
      this.open();
    },
  },
  mounted() {
    this.open();
  },
  methods: {
    open() {
      this.selection = this.filters.slice(0);

      this.$refs.search.focus();
    },
    toggleItem(item) {
      const sel_i = this.selection.indexOf(item);
      if(sel_i === -1) this.selection.push(item);
      else this.selection.splice(sel_i, 1);
    },
    searchInput() {
      const search = this.search.toString().toLowerCase().trim();
      if(!search) return;

      this.items.forEach((item) => {
        if(item.toString().toLowerCase().startsWith(search)) this.selection.push(item);
      });

      this.search = '';
    },
    selectAll(state) {
      if(state) this.selection = this.items.slice(0);
      else this.selection = [];
    },
    submit() {
      if(this.selection.length === this.items.length) this.selection = [];
      this.$emit('selection', this.selection);
      this.$emit('close');
    },
  },
};
</script>

<style scoped lang="sass">
table
  width: 100%

  td
    cursor: pointer
</style>
