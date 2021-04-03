import TableField from './TableField';

export default class TableFieldList extends TableField {
  constructor(name) {
    super(name);
    this.sortEnabled = false;
  }

  cell(val) {
    const valstr = val.join(', ');

    return {
      render() {
        return (
          <td>
            {valstr}
          </td>
        );
      },
    };
  }

  getSearchable(val) {
    return val.join(' ').toLowerCase();
  }

  getFilterable(val) {
    return val.map((vi) => vi.toString());
  }
}
