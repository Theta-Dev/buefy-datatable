import TableField from './TableField';

export default class TableFieldTiny extends TableField {
  constructor(name) {
    super(name);
    this.headCls.push('tinycol');
  }

  cell(val) {
    return {
      render() {
        return (
          <td class="tinycol">
            {val}
          </td>
        );
      },
    };
  }
}
