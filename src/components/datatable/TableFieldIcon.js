import SvgIcon from '../util/SvgIcon.vue';

import TableField from './TableField';

export default class TableFieldIcon extends TableField {
  constructor(name, icons, tiny) {
    super(name);
    if(tiny) this.headCls.push('tinycol');
    this.icons = icons;
  }

  cell(val) {
    const { icons } = this;

    return {
      render() {
        return (
          <td class="tinycol">
            <SvgIcon
              icon={icons[val][1]}
              class={icons[val][2]}
              v-tooltip={icons[val][0]}
            />
          </td>
        );
      },
    };
  }

  getSearchable(val) {
    return this.icons[val][0];
  }

  getFilterable(val) {
    return this.icons[val][0];
  }
}
