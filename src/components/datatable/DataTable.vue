<template>
  <div>
    <h1
      v-if="title"
      class="title"
    >
      {{ title }}
    </h1>
    <b-field class="mb-6">
      <b-input
        v-model="search"
        placeholder="Search..."
        :icon="icons.search"
        :icon-right="search ? icons.clear : ''"
        icon-right-clickable
        @icon-right-click="search = ''"
      />
    </b-field>

    <b-modal
      v-model="filter_dialog.active"
      has-modal-card
      trap-focus
      aria-role="dialog"
      aria-label="Filter"
      aria-modal
    >
      <template #default="props">
        <dialog-filter
          :dactive="filter_dialog.active"
          :fname="fields[filter_dialog.col].name"
          :items="filterLists[filter_dialog.col]"
          :filters="filters[filter_dialog.col]"
          @selection="$set(filters, filter_dialog.col, $event)"
          @close="props.close"
        />
      </template>
    </b-modal>

    <table class="datatable table is-bordered">
      <thead>
        <!-- Headers -->
        <tr>
          <th
            v-for="(field, i) in fields"
            :key="field.name"
            :class="getHeadClasses(i, field.headCls)"
            @click="toggleSort(i)"
          >
            <v-popover
              :trigger="isFilterActive(i) ? 'manual' : 'hover'"
              :open="isFilterActive(i)"
              placement="top"
              popover-class="po-filter"
              :auto-hide="false"
              :disabled="!isFilterAvailable(i) && !isSortAvailable(i)"
            >
              {{ field.name }} {{ getSortIcon(i) }}
              <template slot="popover">
                <!--
                <b-button
                  v-if="isSortAvailable(i)"
                  class="mx-1"
                  :type="isSortActive(i) ? 'is-primary' : ''"
                  :icon-right="isSortActive(i, false) ? icons.sortZA : icons.sortAZ"
                  @click="toggleSort(i)"
                />-->
                <b-button
                  v-if="isFilterAvailable(i)"
                  size="is-small"
                  :type="isFilterActive(i) ? 'is-primary' : ''"
                  :icon-right="icons.filter"
                  @click="showFilterDialog(i)"
                />
                <b-button
                  v-if="isFilterActive(i)"
                  class="ml-1"
                  size="is-small"
                  type="is-danger"
                  :icon-right="icons.filter_off"
                  @click="clearFilter(i)"
                />
              </template>
            </v-popover>
          </th>
        </tr>
      </thead>
      <tbody>
        <!-- Items -->
        <template v-for="(item, i_item) in tdata_filtered">
          <tr
            v-for="(n, i_itrow) in numItemRows[i_item]"
            :key="i_item + '.' + i_itrow"
            :class="{'first-itrow': i_itrow===0, even: !(i_item % 2)}"
          >
            <template
              v-for="(col, i_col) in item"
            >
              <component
                :is="fields[i_col].cell(col[i_itrow])"
                v-if="(numItemRows[i_item] - col.length) === 0 || i_itrow===0"
                :key="i_col"
                :rowspan="(numItemRows[i_item] - col.length) === 0 ? 1 : numItemRows[i_item]"
              />
            </template>
          </tr>
        </template>
      </tbody>
    </table>
  </div>
</template>

<script>

import {
  mdiCloseCircle,
  mdiFilter, mdiFilterOff, mdiMagnify,
  mdiSortAlphabeticalAscending, mdiSortAlphabeticalDescending,
} from '@mdi/js';
import DialogFilter from './DialogFilter.vue';

export default {
  name: 'DataTable',
  components: { DialogFilter },

  props: {
    fields: {
      type: Array,
      required: true,
    },
    data: {
      type: Array,
      required: true,
    },
    title: {
      type: String,
      default: '',
    },
    fixedHeight: {
      type: String,
      default: '',
    },
  },

  data: () => ({
    icons: {
      search: mdiMagnify,
      clear: mdiCloseCircle,
      filter: mdiFilter,
      filter_off: mdiFilterOff,
      sortAZ: mdiSortAlphabeticalAscending,
      sortZA: mdiSortAlphabeticalDescending,
    },
    // Filter selections, [col_id] => sel_id[]
    filters: [],
    // Search field input
    search: '',
    // Sorting direction: true^=A-Z, false^=Z-a
    sort_dir: true,
    // Column to be sorted
    sort_col: 0,
    dialog_filter_active: false,
    filter_dialog: {
      active: false,
      col: 0,
    },
  }),

  computed: {
    // Sorted table data
    tdata() {
      const tdata = [...this.data];
      if(!(this.sort_col > -1)) return tdata;

      return tdata.sort((item_a, item_b) => {
        const a = item_a[this.sort_col][0];
        const b = item_b[this.sort_col][0];

        let cmp = this.fields[this.sort_col].compare(a, b);
        if(!this.sort_dir) cmp *= -1;
        return cmp;
      });
    },
    // Searched+filtered table data
    tdata_filtered() {
      // Shortcut if there are no filters / search
      const hasFilter = this.filters.length > 0;
      const hasSearch = this.search && this.search.trim();
      if(!hasFilter && !hasSearch) return this.tdata;

      const searchWords = this.search.toLowerCase().split(' ').filter(
        (word) => word.trim(),
      );

      return this.tdata.slice(0).filter(
        (item, i_item) => {
          if(hasSearch) {
            if(!searchWords.some(
              (word) => this.searchables[i_item].includes(word),
            )) return false;
          }

          if(hasFilter) {
            if(!this.filterables[i_item].every(
              (col, i_col) => {
                // If the field is empty, treat as matched if there is no filter
                if(!Array.isArray(col) || col.length === 0) {
                  return !Array.isArray(this.filters[i_col]) || this.filters[i_col].length === 0;
                }
                return col.some((entry) => {
                  // Is filter disabled -> treat as matched
                  if(!Array.isArray(this.filters[i_col]) || this.filters[i_col].length === 0) {
                    return true;
                  }
                  return this.filters[i_col].includes(entry);
                });
              },
            )) return false;
          }
          return true;
        },
      );
    },
    // The amount of rows occupied by each table item, [i_item] => num_rows
    numItemRows() {
      return this.tdata_filtered.map(
        (it) => it.map((fl) => fl.length).reduce((a, b) => Math.max(a, b)),
      );
    },
    // Walk through the tdata object and obtain the searchable string for each value
    // [i_item] => [i_col] => [i_entry] => searchable
    searchables() {
      return this.tdata.map((item) => {
        let searchable = '';
        item.forEach(
          (col, i_col) => col.forEach((entry) => {
            const res = this.fields[i_col].getSearchable(entry);
            if(res && res.toString() !== '') searchable += res.toString().toLowerCase();
          }),
        );
        return searchable;
      });
    },
    // Walk through the tdata object and obtain the filterable string for each value
    // [i_item] => [i_col] => [i_entry] => filterable
    filterables() {
      return this.tdata.map((item) => item.map((col, i_col) => col.reduce(
        (result, entry) => {
          const res = this.fields[i_col].getFilterable(entry);
          if(res === null || res === undefined || res === '') return result;

          if(Array.isArray(res)) {
            res.forEach((ri) => {
              if(ri !== null && ri !== undefined && ri !== '') result.push(ri);
            });
          }
          else result.push(res);
          return result;
        }, [],
      )));
    },
    // Accumulate filterables for all columns to be shown in the filter menus
    // [i_col] => filterable[]
    filterLists() {
      const filterLists = [];

      this.filterables.forEach((item) => {
        item.forEach((col, i_col) => {
          col.forEach((filterable) => {
            if(!Array.isArray(filterLists[i_col])) filterLists[i_col] = [];
            if(filterable !== '' && filterable !== null && !filterLists[i_col].includes(filterable)) {
              filterLists[i_col].push(filterable);
            }
          });
        });
      });

      filterLists.forEach((list, i_col) => list.sort(
        (a, b) => this.fields[i_col].compareFilterable(a, b),
      ));
      return filterLists;
    },
    // Selected filters for each column
    // [i_col] => filterable[] (selected)
    /*
    filters() {
      console.log('COMP filters');
      return this.filter_selections.map((selection, col) => selection.map(
        (i_sel) => this.filterLists[col][i_sel],
      ));
    },
    */
  },

  mounted() {
  },

  methods: {
    isSortAvailable(i_col) {
      return this.fields[i_col].sortEnabled;
    },
    isSortActive(i_col, dir) {
      if(dir !== undefined) return i_col === this.sort_col && dir === this.sort_dir;
      return i_col === this.sort_col;
    },
    getHeadClasses(i_col, hcls) {
      let res = [];
      if(Array.isArray(hcls)) res = hcls.slice(0);

      if(this.isSortAvailable(i_col)) res.push('sortable');
      if(this.isSortActive(i_col)) res.push('sorted');

      if(this.isFilterAvailable(i_col)) res.push('filterable');

      return res;
    },
    getSortIcon(i_col) {
      if(i_col === this.sort_col) return this.sort_dir ? '▼' : '▲';
      return '';
    },
    toggleSort(i_col) {
      if(!this.isSortAvailable(i_col)) return;

      if(this.isSortActive(i_col)) this.sort_dir = !this.sort_dir;
      else {
        this.sort_col = i_col;
        this.sort_dir = true;
      }
    },
    setSort(i_col, dir) {
      if(this.isSortActive(i_col, dir)) {
        this.sort_col = -1;
      }
      else {
        this.sort_col = i_col;
        this.sort_dir = dir;
      }
    },
    // Can this column be filtered?
    isFilterAvailable(i_col) {
      return Array.isArray(this.filterLists[i_col]) && this.filterLists[i_col].length > 0;
    },
    // Is filter of certain column active
    isFilterActive(i_col) {
      return Array.isArray(this.filters[i_col]) && this.filters[i_col].length > 0;
    },
    // Remove the filter from a certain column
    clearFilter(i_col) {
      this.$set(this.filters, i_col, []);
    },
    showFilterDialog(i_col) {
      this.filter_dialog.col = i_col;
      this.filter_dialog.active = true;
    },
  },
};
</script>

<style lang="sass">
@use "~bulma/sass/utilities/derived-variables"
@use "~bulma-prefers-dark/sass/utilities/mixins"

.datatable
  width: 100%

  thead th
    border-bottom-width: 2px !important
    padding: 0
    user-select: none
    white-space: nowrap

    &.sortable, &.filterable
      cursor: pointer

      &:hover
        border-bottom-color: derived-variables.$black
        +mixins.prefers-scheme(dark)
          border-bottom-color: derived-variables.$white

    &.sorted
      border-bottom-color: derived-variables.$primary

    .trigger
      width: 100%
      padding: 0.5em 0.75em

  tbody tr
    &.first-itrow:not(:first-child) > td
      // Thick border between items
      border-top-width: 2px

    &.even
      // Tinted even rows
      background-color: derived-variables.$scheme-main-bis
      +mixins.prefers-scheme(dark)
        background-color: derived-variables.$black-ter

  .tinycol
    text-align: center !important
    &.td, .trigger
      padding: 0.5em 0.2em

.tooltip.popover.po-filter .popover-inner
  padding: 0.3rem
</style>
