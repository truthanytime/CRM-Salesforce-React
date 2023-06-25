import { FC, useEffect, useState, useCallback } from 'react';
import { Typography, Divider, IconButton, Box, Grid, InputLabel } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { ReactComponent as CrossIcon } from 'assets/icons/cross.svg';
import { GridItem, Modal, ModalContainer, ModalHeader, ModalMain } from 'components/ui';
import { Formik, Form, FormikHelpers } from 'formik';
import * as yup from 'yup';
import { CustomInput } from 'components/CustomInput';
import { CustomSelect } from 'components/CustomSelect';
import { useDataRaptor } from 'store/dataRaptor/hooks';
import { useDataRaptorRule } from 'store/dataRaptorRule/hooks';
import { CreateDataRaptorRuleDto } from 'store/dataRaptorRule/dto/createRuleDto';
import {
  RuleConditionComponentType,
  Condition,
  LogicalOperator,
  Parenthesis,
  RuleConditionComponent,
} from 'store/dataRaptorRule/dto/rulesDto';
import { useMigration } from 'store/migration/hooks';
import { FilterIndex } from 'store/dataRaptor/types';
import { DataRaptorRule, RuleCategory, RuleRiskLevel } from 'store/dataRaptorRule/types';
import { Operators } from '../../Constants';
import { FormSwitch, TextButton } from '../../ui';
import useNewRule from 'pages/NewRule/hook/NewRuleHook';
import { Option } from 'pages/NewRule/types';

const ConditionComponent: FC = () => {
  const { where, setFieldValue } = useNewRule();
  const {
    data: { migratedTableField },
  } = useMigration();
  const { selectedTable, fields } = useDataRaptor();

  const [fieldOptionsMap, setFieldOptionsMap] = useState({});

  useEffect(() => {
    if (selectedTable && fields.length > 0) {
      const key = selectedTable;
      const arrayCopy: FilterIndex[] = JSON.parse(JSON.stringify(fields));
      const sorted: FilterIndex[] = arrayCopy?.sort((a, b) => a.name.localeCompare(b.name));
      const options: Option[] = sorted?.map((field) => {
        return { value: field.name, label: field.name, xsd_type: field.xsd_type };
      });
      setFieldOptionsMap((prevState) => {
        // @ts-ignore
        prevState[key] = options;
        return prevState;
      });
    }
  }, [fields, selectedTable]);

  const getOperator = (fieldName: string) => {
    const field = migratedTableField.find((field) => field.fieldName.trim() === fieldName.trim());
    if (!field) return [];
    return Operators.filter(
      (operator) => operator.validType.includes(field.xsd_type) || operator.validType.includes('*'),
    );
  };

  const getInputType = (xsdType: string) => {
    let type = 'text';
    if (['xsd:string', 'tns:ID'].includes(xsdType)) {
      type = 'text';
    } else if (['xsd:int', 'xsd:long', 'xsd:double'].includes(xsdType)) {
      type = 'number';
    } else if (['xsd:date'].includes(xsdType)) {
      type = 'date';
    } else if (['xsd:dateTime'].includes(xsdType)) {
      type = 'datetime-local';
    } else if (['xsd:time'].includes(xsdType)) {
      type = 'time';
    } else if (['xsd:boolean'].includes(xsdType)) {
      type = 'boolean';
    }
    return type;
  };

  const getInput = (where: Condition, index: number) => {
    const field = migratedTableField.find((field) => field.fieldName.trim() === where.field.trim());
    if (where.isValueField) {
      const filterType = field?.xsd_type;
      return (
        <CustomSelect<string>
          id={`where[${index}].value`}
          name={`where[${index}].value`}
          variant="outlined"
          placeholder="Value"
          value={where.value ?? ''}
          options={((fieldOptionsMap as { [key: string]: any })[selectedTable]
            ? (fieldOptionsMap as { [key: string]: any })[selectedTable]
            : []
          ).filter((option: Option) => option.xsd_type === filterType)}
          sx={{ backgroundColor: 'neutral.white', width: '90%', mx: 'auto' }}
          onSelect={async (value) => setFieldValue(`where[${index}].value`, value)}
        />
      );
    }

    let type: string;

    if (!field) {
      type = 'text';
    } else {
      type = getInputType(field?.xsd_type);
    }

    const operator = Operators.find((operator) => operator.value === where.operator);

    if (operator?.forcedValues) {
      let selectedValues = operator.forcedValues;
      if (field?.xsd_type !== 'xsd:boolean') {
        selectedValues = operator.forcedValues.filter((value) => value !== 'True' && value !== 'False');
      }
      return (
        <CustomSelect
          id={`where[${index}].value`}
          name={`where[${index}].value`}
          placeholder="Value"
          value={where.value ?? ''}
          options={selectedValues.map((value) => {
            return { label: value, value };
          })}
          variant="outlined"
          sx={{ backgroundColor: 'neutral.white', width: '90%', mx: 'auto' }}
          onSelect={async (value) => setFieldValue(`where[${index}].value`, value)}
        />
      );
    }

    return (
      <GridItem sx={{ width: '90%', mx: 'auto' }}>
        <CustomInput
          id={`where[${index}].value`}
          name={`where[${index}].value`}
          labelSx={{ fontWeight: 'bold' }}
          placeholder="Value"
          fullWidth
          type={type}
          value={where.value ?? ''}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            //here is something not sure
            setFieldValue(`where[${index}].value`, e.target.value);
          }}
        />
      </GridItem>
    );
  };

  const addLogicalOperator = (index: number) => {
    const logicalOperatorIndex = index + 1;
    const conditionIndex = index + 2;

    const initialLogicalOperator: LogicalOperator = {
      type: RuleConditionComponentType.LOGICAL_OPERATOR,
      value: 'AND',
    };

    const initialCondition: Condition = {
      type: RuleConditionComponentType.CONDITIONAL,
      field: '',
      operator: '',
      value: undefined,
    };
    setFieldValue(`where[${logicalOperatorIndex}]`, initialLogicalOperator);
    setFieldValue(`where[${conditionIndex}]`, initialCondition);
  };

  const handleConditionComponentDelete = (index: number) => {
    let indexToDelete = index;
    let countToDelete = 1;
    const whereCopy = JSON.parse(JSON.stringify(where)) as (Condition | Parenthesis | LogicalOperator)[];
    if (whereCopy[index - 1].type === RuleConditionComponentType.LOGICAL_OPERATOR) {
      indexToDelete -= 1;
      countToDelete += 1;
    }
    whereCopy.splice(indexToDelete, countToDelete);
    setFieldValue('where', whereCopy);
  };

  return (
    <Box sx={{ width: '100%' }}>
      {where.map((whereValue: Condition | Parenthesis | LogicalOperator, index) => {
        if (whereValue.type === RuleConditionComponentType.CONDITIONAL) {
          const conditionComponent = whereValue as Condition;
          return (
            <Grid container key={index} sx={{ my: 'auto' }}>
              <Grid container display="flex" justifyContent="flex-start" alignItems="center">
                <GridItem xs={4}>
                  <CustomSelect<string>
                    id={`where[${index}].field`}
                    name={`where[${index}].field`}
                    variant="outlined"
                    placeholder="Field Name"
                    value={conditionComponent.field ?? ''}
                    options={
                      (fieldOptionsMap as { [key: string]: any })[selectedTable]
                        ? (fieldOptionsMap as { [key: string]: any })[selectedTable]
                        : []
                    }
                    sx={{ backgroundColor: 'neutral.white', width: '90%' }}
                    onSelect={async (value) => setFieldValue(`where[${index}].field`, value)}
                  />
                </GridItem>
                <GridItem xs={2}>
                  <CustomSelect<string>
                    id={`where[${index}].operator`}
                    name={`where[${index}].operator`}
                    variant="outlined"
                    placeholder="Operator"
                    value={conditionComponent.operator ?? ''}
                    options={getOperator(conditionComponent.field)}
                    sx={{ backgroundColor: 'neutral.white', width: '90%' }}
                    onSelect={async (value) => setFieldValue(`where[${index}].operator`, value)}
                  />
                </GridItem>
                <GridItem xs={1} sx={{ display: 'flex', alignItems: 'center', textAlign: 'center', rowGap: '0px' }}>
                  <FormSwitch
                    sx={{ my: 'auto', mx: 'auto' }}
                    checked={conditionComponent.isValueField}
                    onClick={async () =>
                      setFieldValue(`where[${index}].isValueField`, !conditionComponent.isValueField)
                    }
                  />
                  <Typography sx={{ my: 'auto', mx: 'auto' }} variant="labelRegular12">
                    Is Value a Field?
                  </Typography>
                </GridItem>
                <GridItem xs={4.5}>{getInput(where[index] as Condition, index)}</GridItem>
                <GridItem xs={0.5}>
                  {index != 0 && (
                    <IconButton onClick={handleConditionComponentDelete.bind(this, index)}>
                      <CrossIcon />
                    </IconButton>
                  )}
                </GridItem>
              </Grid>
              {!where[index + 1] && (
                <Grid container display="flex" justifyContent="flex-start" sx={{ my: 'auto' }}>
                  <TextButton
                    onClick={addLogicalOperator.bind(this, index)}
                    sx={{
                      mt: 0,
                      p: 0,
                      height: '100%',
                    }}
                  >
                    <Typography sx={{ m: 0 }} variant="labelRegular12">
                      Add &quot;or/and&quot;
                    </Typography>
                  </TextButton>
                </Grid>
              )}
            </Grid>
          );
        } else if (whereValue.type === RuleConditionComponentType.LOGICAL_OPERATOR) {
          const conditionComponent = whereValue as LogicalOperator;
          return (
            <Grid container key={index}>
              <Grid container display="flex" justifyContent="flex-start" xs={1.5}>
                <CustomSelect<string>
                  id={`where[${index}].logicalOperator`}
                  name={`where[${index}].logicalOperator`}
                  variant="outlined"
                  placeholder="Operator"
                  value={conditionComponent.value ?? ''}
                  options={[
                    { value: 'AND', label: 'AND' },
                    { value: 'OR', label: 'OR' },
                  ]}
                  sx={{
                    backgroundColor: 'primary.subtone2',
                    width: '100%',
                    height: '100%',
                    color: 'primary.dark',
                    'svg path': {
                      fill: '#1554FF',
                      stroke: '#1554FF',
                    },
                    '& .MuiSelect-select': {
                      py: 0,
                    },
                    p: 0,
                  }}
                  onSelect={async (value) => setFieldValue(`where[${index}].value`, value)}
                />
              </Grid>
            </Grid>
          );
        }
      })}
    </Box>
  );
};

export default ConditionComponent;
