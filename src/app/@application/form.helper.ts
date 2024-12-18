


export class FormHelper {


  static GetLeaveTypeKeyValue(): KeyValue[] {
    return [
      { key: 0, value: 'Casual' },
      { key: 1, value: 'Medical' },
      { key: 2, value: 'Annual' },
      { key: 3, value: 'Other' },
    ]as KeyValue[];
  }

  static GetLeaveSessionKeyValue(): KeyValue[] {
    return [
      { key: 0, value: 'Full Day' },
      { key: 1, value: 'First Half' },
      { key: 2, value: 'Second Half' },
    ]as KeyValue[];
  }
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

  public static ConvertForDropDownNew<T>(
    objectArr: T[],
    consideredKeys: { key: keyof T; value: keyof T | ((item: T) => string) }
  ): KeyValue[] {
    return objectArr.map((item) => ({
      key: item[consideredKeys.key],
      value:
        typeof consideredKeys.value === 'function'
          ? consideredKeys.value(item) // Call the function for dynamic values
          : item[consideredKeys.value] as string, // Use the property directly for static values
    }));
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
