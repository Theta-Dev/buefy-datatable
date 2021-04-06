<template>
  <div class="container">
    <DataTable
      title="DataTable Demo"
      :fields="tableFields"
      :data="tableData"
    />
  </div>
</template>

<script>
import {
  mdiAccountTie, mdiDialpad, mdiDomain, mdiLaptop, mdiMessage,
} from '@mdi/js';

import mockData from '../mock.json';
import DataTable from '../components/datatable/DataTable.vue';

import TableField from '../components/datatable/TableField';
import TableFieldTiny from '../components/datatable/TableFieldTiny';
import TableFieldDummy from '../components/datatable/TableFieldDummy';
import TableFieldIcon from '../components/datatable/TableFieldIcon';
import TableFieldDate from '../components/datatable/TableFieldDate';
import TableFieldList from '../components/datatable/TableFieldList';

const ICONS = {
  0: ['Domain', mdiDomain, 'has-text-primary'],
  1: ['Message', mdiMessage, 'has-text-success'],
  2: ['Dial', mdiDialpad, 'has-text-danger'],
  3: ['Computer', mdiLaptop, 'has-text-warning'],
  4: ['Account', mdiAccountTie, 'has-text-info'],
};

export default {
  name: 'HelloWorld',
  components: { DataTable },

  data: () => ({
    tableFields: [
      new TableFieldTiny('Nr.'),
      new TableField('Name'),
      new TableField('Departments'),
      new TableFieldDummy('Dummy'),
      new TableFieldIcon('Icon', ICONS, true),
      new TableFieldDate('Date'),
      new TableFieldList('Cars'),
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
