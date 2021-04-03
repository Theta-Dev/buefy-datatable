<template>
  <div class="container">
    <DataTable
      title="DataTable Demo"
      :fields="tableFields"
      :data="tableData"
      fixed-height="220"
    />
  </div>
</template>

<script>
import {
  mdiAccountTie, mdiDialpad, mdiDomain, mdiLaptop, mdiMessage,
} from '@mdi/js';

import mockData from './mock.json';
import DataTable from './datatable/DataTable.vue';

import TableField from './datatable/TableField';
import TableFieldTiny from './datatable/TableFieldTiny';
import TableFieldDummy from './datatable/TableFieldDummy';
import TableFieldIcon from './datatable/TableFieldIcon';
import TableFieldDate from './datatable/TableFieldDate';
import TableFieldList from './datatable/TableFieldList';

const ICONS = {
  0: ['Domain', mdiDomain, 'is-primary'],
  1: ['Message', mdiMessage, 'is-success'],
  2: ['Dial', mdiDialpad, 'is-danger'],
  3: ['Computer', mdiLaptop, 'is-warning'],
  4: ['Account', mdiAccountTie, 'is-info'],
};

export default {
  name: 'HelloWorld',
  components: { DataTable },

  data: () => ({
    tableFields: [
      new TableFieldTiny('Nr.'),
      new TableField('Name'),
      new TableField('Task'),
      new TableFieldDummy('Dummy'),
      new TableFieldIcon('Icon', ICONS, true),
      new TableFieldDate('Date'),
      new TableFieldList('List'),
    ],

    test: new TableField('HelloWorld'),
    testin: '',
  }),

  computed: {
    tableData() {
      return mockData.map((item, i) => {
        const titem = [[i + 1]];
        titem.push(...Object.values(item));
        return titem;
      });
    },
  },
};
</script>
