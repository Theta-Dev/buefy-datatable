import TableField from './TableField';

export default class TableFieldDate extends TableField {
  compare(a, b) {
    function strToDate(st) {
      const pattern = /(\d{2})\.(\d{2})\.(\d{4})/;
      return new Date(st.replace(pattern, '$3-$2-$1'));
    }
    const dA = strToDate(a);
    const dB = strToDate(b);

    if(dA === dB) return 0;
    return dA > dB ? 1 : -1;
  }
}
