export interface OperatorOption {
  value: string;
  label: string;
  valueType: string;
  valueCount: number;
  validType: string[];
  forcedFieldType?: string;
  forcedValues?: any[];
}

export const Operators: OperatorOption[] = [
  {
    value: 'IN',
    label: 'In',
    valueType: 'array',
    valueCount: 1,
    validType: ['xsd:string', 'xsd:int', 'xsd:long', 'xsd:dateTime', 'tns:ID', 'xsd:time', 'xsd:date', 'xsd:double'],
  },
  {
    value: 'NOT IN',
    label: 'Not In',
    valueType: 'array',
    valueCount: 1,
    validType: ['xsd:string', 'xsd:int', 'xsd:long', 'xsd:dateTime', 'tns:ID', 'xsd:time', 'xsd:date', 'xsd:double'],
  },
  // {
  //   value: 'BETWEEN',
  //   label: 'Between',
  //   valueType: 'xsd:string',
  //   valueCount: 1,
  //   validType: ['xsd:string', 'xsd:int', 'xsd:long', 'xsd:dateTime', 'tns:ID', 'xsd:time', 'xsd:date', 'xsd:double'],
  // },
  // {
  //   value: 'NOT BETWEEN',
  //   label: 'Not Between',
  //   valueType: 'array',
  //   valueCount: 1,
  //   validType: ['xsd:string', 'xsd:int', 'xsd:long', 'xsd:dateTime', 'tns:ID', 'xsd:time', 'xsd:date', 'xsd:double'],
  // },
  {
    value: 'IS',
    label: 'Is',
    valueType: 'Null',
    valueCount: 1,
    validType: ['*'],
    forcedFieldType: 'xsd:string',
    forcedValues: ['True', 'False', 'Null'],
  },
  {
    value: 'IS NOT',
    label: 'Is Not',
    valueType: 'Null',
    valueCount: 1,
    validType: ['*'],
    forcedFieldType: 'xsd:string',
    forcedValues: ['True', 'False', 'Null'],
  },
  {
    value: 'LIKE',
    label: 'Like',
    valueType: 'xsd:string',
    valueCount: 1,
    validType: ['xsd:string'],
    forcedFieldType: 'xsd:string',
  },
  {
    value: '=',
    label: 'Equal',
    valueType: 'xsd:string',
    valueCount: 1,
    validType: ['xsd:string', 'xsd:int', 'xsd:long', 'xsd:dateTime', 'tns:ID', 'xsd:time', 'xsd:date', 'xsd:double'],
  },
  {
    value: '!=',
    label: 'Not Equal',
    valueType: 'xsd:string',
    valueCount: 1,
    validType: ['xsd:string', 'xsd:int', 'xsd:long', 'xsd:dateTime', 'tns:ID', 'xsd:time', 'xsd:date', 'xsd:double'],
  },
  {
    value: '<',
    label: 'Less Than',
    valueType: 'xsd:string',
    valueCount: 1,
    validType: ['xsd:int', 'xsd:long', 'xsd:dateTime', 'xsd:time', 'xsd:date', 'xsd:double'],
  },
  {
    value: '<=',
    label: 'Less Than or Equal',
    valueType: 'xsd:string',
    valueCount: 1,
    validType: ['xsd:int', 'xsd:long', 'xsd:dateTime', 'xsd:time', 'xsd:date', 'xsd:double'],
  },
  {
    value: '>',
    label: 'Greater Than',
    valueType: 'xsd:string',
    valueCount: 1,
    validType: ['xsd:int', 'xsd:long', 'xsd:dateTime', 'xsd:time', 'xsd:date', 'xsd:double'],
  },
  {
    value: '>=',
    label: 'Greater Than or Equal',
    valueType: 'xsd:string',
    valueCount: 1,
    validType: ['xsd:int', 'xsd:long', 'xsd:dateTime', 'xsd:time', 'xsd:date', 'xsd:double'],
  },
];
