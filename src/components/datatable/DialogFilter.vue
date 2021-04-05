<template>
  <div
    class="modal-card"
    style="width: auto"
  >
    <header class="modal-card-head">
      <p class="modal-card-title">
        Filter: {{ fname }}
      </p>

      <b-button
        class="mx-1"
        type="is-primary"
        :icon-right="icons.checkAll"
        @click="selectAll(true)"
      />
      <b-button
        class="mx-1"
        type="is-danger"
        :icon-right="icons.checkNone"
        @click="selectAll(false)"
      />
    </header>
    <section class="modal-card-body">
      <b-field>
        <b-input
          ref="search"
          v-model="search"
          placeholder="Enter filter..."
          :icon="icons.search"
          @keyup.native.enter="searchInput()"
        />
      </b-field>
      <table class="table is-bordered">
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
          </tr>
        </tbody>
      </table>
    </section>
    <footer class="modal-card-foot">
      <b-button
        label="OK"
        type="is-primary"
        @click="submit()"
      />
      <b-button
        label="Close"
        @click="$emit('close')"
      />
    </footer>
  </div>
</template>

<script>
import { mdiCheckboxMultipleBlankOutline, mdiCheckboxMultipleMarked, mdiMagnify } from '@mdi/js';

export default {
  name: 'DialogFilter',
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
</style>
