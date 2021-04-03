import TableField from './TableField';

export default class TableFieldDummy extends TableField {
  constructor(name) {
    super(name);
    this.sortEnabled = false;
  }

  getSearchable() {
    return null;
  }

  getFilterable() {
    return null;
  }
}
