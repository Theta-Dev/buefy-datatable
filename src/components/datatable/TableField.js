export default class TableField {
  constructor(name) {
    this.name = name;
    this.headCls = [];
    this.sortEnabled = true;
  }

  cell(val) {
    return {
      render() {
        return (
          <td>
            {val}
          </td>
        );
      },
    };
  }

  compare(a, b) {
    if(a === undefined && b === undefined) return 0;
    if(a === undefined) return 1;
    if(b === undefined) return -1;

    const aNumber = parseInt(a, 10);
    const bNumber = parseInt(b, 10);

    if(!Number.isNaN(aNumber) && !Number.isNaN(bNumber)) {
      return aNumber - bNumber;
    }

    const aString = a.toString();
    const bString = b.toString();

    if(aString < bString) return -1;
    if(aString > bString) return 1;
    return 0;
  }

  compareFilterable(a, b) {
    return this.compare(a, b);
  }

  getSearchable(val) {
    return val.toString().toLowerCase();
  }

  getFilterable(val) {
    return val;
  }
}
