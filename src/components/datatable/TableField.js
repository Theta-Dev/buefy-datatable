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
    // INFO: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort
    // ECMA specification: http://www.ecma-international.org/ecma-262/6.0/#sec-sortcompare

    if(a === undefined && b === undefined) return 0;
    if(a === undefined) return 1;
    if(b === undefined) return -1;

    if(Number.isFinite(a) && Number.isFinite(b)) {
      return a - b;
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
