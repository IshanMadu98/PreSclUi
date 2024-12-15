


export class FormHelper {

  public static GetPaymentStatusValueType(): KeyValue[] {
    return [
      { key: 0, value: 'Pending' },
      { key: 1, value: 'Half Paid' },
      { key: 2, value: 'Fully Paid ' },
    ] as KeyValue[];
  }

  public static GetPaymentCategoryList(): KeyValue[] {
    return [
      { key: 1, value: 'School Fees' },
      { key: 2, value: 'Stationery' },
      { key: 3, value: 'School Development Fund' },
      { key: 4, value: 'Registration' },
      { key: 5, value: 'Refundable' },
      { key: 6, value: 'Sports' },
      { key: 7, value: 'Events' },
      { key: 8, value: 'Other' },
    ] as KeyValue[];
  }

  public static YesNoList(): KeyName[] {
    return [
      { key: true, value: 'Yes' },
      { key: false, value: 'No' },
    ] as KeyName[];
  }

  public static ConvertForDropDown<T extends Record<string, any>>(objectArr: T[], consideredKeys: { key: string, value: string }): KeyValue[] {

    const keyValues = [] as KeyValue[];

    for (const object of objectArr) {
      const keyValue = {} as KeyValue;
      for (const key of Object.keys(object)) {
        if (consideredKeys.key === key) {
          // @ts-ignore
          keyValue.key = object[key];
        }
        if (consideredKeys.value === key) {
          // @ts-ignore
          keyValue.value = object[key];
        }
      }
      keyValues.push(keyValue);
    }
    return keyValues;
  }

}
export interface KeyValue {
  key: any;
  value: string;
}
export interface KeyString {
  key: string;
  value: string;
}
export interface KeyName {
  key: boolean;
  value: string;
}
