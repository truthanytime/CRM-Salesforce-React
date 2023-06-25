import { FC, useEffect, useState } from 'react';
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
import { Operators } from './Constants';
import { FormSwitch, TextButton } from './ui';

interface RuleFormValues {
  ruleName: string;
  violationScore: number;
  description: string;
  category: RuleCategory;
  riskLevel: RuleRiskLevel;
  where: (Condition | LogicalOperator | Parenthesis)[];
}

interface RuleModalProps {
  open: boolean;
  toggleOpen: () => void;
}

interface Option {
  value: string;
  label: string;
  xsd_type?: string;
}

const RuleModal: FC<RuleModalProps> = ({ open, toggleOpen }) => {
  const { fields, selectedTable, selectedMigration } = useDataRaptor();
  const { error, loading, success, createRule, getRulesByMigrationAndTable, setError, setSuccess, setLoading } =
    useDataRaptorRule();
  const [tableOptions, setTableOptions] = useState<Option[]>([]);
  const [fieldOptionsMap, setFieldOptionsMap] = useState({});

  const { data } = useMigration();
  const { migratedTables, migratedTableField } = data;

  const clearDataRaptorRuleStatus = () => {
    setError(false);
    setSuccess(false);
    setLoading(false);
  };

  const validationSchema = yup.object({
    ruleName: yup.string().required('Required').min(3, 'Length Name < 3 letters'),
    violationScore: yup
      .number()
      .required('Required')
      .min(1, 'Introduce a number between 1 - 100')
      .max(100, 'Introduce a number between 1 - 100'),
    description: yup.string().optional(),
  });

  useEffect(() => {
    const options = migratedTables.map((table) => {
      return { value: table.table_name, label: table.table_name };
    });
    setTableOptions(options);
  }, [migratedTables]);

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

  const initialValues: RuleFormValues = {
    ruleName: '',
    violationScore: 0,
    description: '',
    category: RuleCategory.DataValidation,
    riskLevel: RuleRiskLevel.Medium,
    where: [{ field: '', operator: '', value: '', type: RuleConditionComponentType.CONDITIONAL }],
  };

  const toggleModalHandler = () => {
    clearDataRaptorRuleStatus();
    toggleOpen();
  };

  const createPostWherePayload = (component: Condition | RuleConditionComponent | LogicalOperator) => {
    if (component.type === RuleConditionComponentType.CONDITIONAL) {
      const condition = component as Condition;
      console.log(condition);
      if (!condition.field || !condition.operator || condition.value === null || condition.value === undefined) {
        setError('Please fill all your open query inputs');
        throw new Error('Please fill all you open query inputs');
      }
      return {
        field: `${selectedTable}.${condition.field}`,
        operator: condition.operator,
        value: condition.isValueField ? `${selectedTable}.${condition.value}` : condition.value,
        isValueField: condition.isValueField,
        type: RuleConditionComponentType.CONDITIONAL,
      };
    } else {
      return component;
    }
  };

  const handleCreateOrUpdateRule = (values: RuleFormValues, actions: FormikHelpers<RuleFormValues>) => {
    const data: CreateDataRaptorRuleDto = {
      name: values.ruleName,
      table: selectedTable,
      violationScore: values.violationScore,
      active: true,
      description: values.description,
      category: values.category,
      riskLevel: values.riskLevel,
      frontEndObject: values,
      rule: {
        table: selectedTable,
        where: values.where.map(createPostWherePayload),
      },
    };

    createRule({
      migrationId: selectedMigration,
      rule: data,
      onSuccess: (_data: DataRaptorRule) => {
        toggleModalHandler();
        actions.setSubmitting(false);
        getRulesByMigrationAndTable({ migrationId: selectedMigration, table: selectedTable });
      },
    });
  };

  return (
    <Modal open={open} onClose={toggleModalHandler} disableEscapeKeyDown={false}>
      <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleCreateOrUpdateRule}>
        {({ values, touched, errors, isValid, dirty, handleChange, handleBlur, setFieldValue, handleSubmit }) => {
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
                  //@ts-ignore
                  options={fieldOptionsMap[selectedTable].filter((option: Option) => option.xsd_type === filterType)}
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
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
              </GridItem>
            );
          };

          const addLogicalOperator = (index: number) => {
            console.log('Add logical operator function running index:', index);
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
            console.log('Resulting Where:', values.where);
          };

          const handleConditionComponentDelete = (index: number) => {
            let indexToDelete = index;
            let countToDelete = 1;
            const whereCopy = JSON.parse(JSON.stringify(values.where)) as (Condition | Parenthesis | LogicalOperator)[];
            if (whereCopy[index - 1].type === RuleConditionComponentType.LOGICAL_OPERATOR) {
              indexToDelete -= 1;
              countToDelete += 1;
            }
            whereCopy.splice(indexToDelete, countToDelete);
            setFieldValue('where', whereCopy);
          };

          const renderConditionComponents = (where: (Condition | Parenthesis | LogicalOperator)[]) => {
            return where.map((whereValue, index) => {
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
                          //@ts-ignore
                          options={fieldOptionsMap[selectedTable]}
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
                      <GridItem
                        xs={1}
                        sx={{ display: 'flex', alignItems: 'center', textAlign: 'center', rowGap: '0px' }}
                      >
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
                      <GridItem xs={4.5}>{getInput(values.where[index] as Condition, index)}</GridItem>
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
            });
          };

          return (
            <ModalContainer maxWidth={'80%'}>
              <ModalHeader>
                <Typography variant="h3" sx={{ color: 'neutral.main' }}>
                  New Rule
                </Typography>
                <IconButton onClick={toggleModalHandler}>
                  <CrossIcon />
                </IconButton>
              </ModalHeader>
              <Divider />
              <>
                <Form noValidate>
                  <ModalMain>
                    <Grid container display="flex" justifyContent="flex-start">
                      <GridItem xs={6} sx={{ rowGap: '2px' }}>
                        <CustomInput
                          id="ruleName"
                          name="ruleName"
                          label="Rule name"
                          labelSx={{ fontWeight: 'bold' }}
                          placeholder="Full Name Rule"
                          fullWidth
                          value={values.ruleName}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          error={touched.ruleName && !!errors.ruleName}
                        />
                        {touched.ruleName && !!errors.ruleName && (
                          <Typography variant="caption" sx={{ color: 'red.main' }}>
                            {errors.ruleName}
                          </Typography>
                        )}
                      </GridItem>
                      <GridItem xs={2} marginLeft={2} sx={{ rowGap: '2px' }}>
                        <CustomInput
                          id="violationScore"
                          name="violationScore"
                          label="Violation Score"
                          labelSx={{ fontWeight: 'bold' }}
                          placeholder="1-100"
                          fullWidth
                          type="number"
                          value={values.violationScore}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          error={touched.violationScore && !!errors.violationScore}
                        />
                        {touched.violationScore && !!errors.violationScore && (
                          <Typography variant="caption" sx={{ color: 'red.main' }}>
                            {errors.violationScore}
                          </Typography>
                        )}
                      </GridItem>
                    </Grid>
                    <Grid container display="flex">
                      <GridItem xs={6} sx={{ rowGap: '2px' }}>
                        <CustomInput
                          id="description"
                          name="description"
                          label="Rule Description"
                          labelSx={{ fontWeight: 'bold' }}
                          placeholder="Description"
                          fullWidth
                          type="text"
                          value={values.description}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          error={touched.description && !!errors.description}
                        />
                        {touched.description && !!errors.description && (
                          <Typography variant="caption" sx={{ color: 'red.main' }}>
                            {errors.description}
                          </Typography>
                        )}
                      </GridItem>
                      <GridItem xs={2} sx={{ marginLeft: '1.66%' }}>
                        <InputLabel htmlFor="id" sx={{ fontWeight: 'bold' }}>
                          Rule Type
                        </InputLabel>
                        <CustomSelect<string>
                          id="category"
                          name="category"
                          variant="outlined"
                          placeholder="Rule Category"
                          value={values.category}
                          options={Object.keys(RuleCategory).map((item) => ({
                            label: item,
                            value: item,
                          }))}
                          disabled={true}
                          sx={{ backgroundColor: 'neutral.white', width: '100%' }}
                          onSelect={async (value) => setFieldValue('category', value)}
                        />
                      </GridItem>
                      <GridItem xs={2} sx={{ marginLeft: '1.66%' }}>
                        <InputLabel htmlFor="id" sx={{ fontWeight: 'bold' }}>
                          Risk Level
                        </InputLabel>
                        <CustomSelect<string>
                          id="riskLevel"
                          name="riskLevel"
                          variant="outlined"
                          placeholder="Rule RiskLevel"
                          value={values.riskLevel}
                          options={Object.keys(RuleRiskLevel).map((item) => ({
                            label: item,
                            value: item,
                          }))}
                          disabled={false}
                          sx={{ backgroundColor: 'neutral.white', width: '100%' }}
                          onSelect={async (value) => setFieldValue('riskLevel', value)}
                        />
                      </GridItem>
                    </Grid>
                    <Grid
                      container
                      display="flex"
                      justifyContent="flex-start"
                      sx={{ backgroundColor: 'darkBg.main', p: 1.5, rowGap: 2 }}
                    >
                      <Grid container display="flex" justifyContent="center">
                        <GridItem xs={1}>
                          <Typography variant="labelRegular12" component="label" ml={1} my={'auto'} fontWeight={'bold'}>
                            Where:
                          </Typography>
                        </GridItem>
                        <GridItem xs={4}>
                          <CustomSelect<string>
                            id="where[0].table"
                            name="where[0].table"
                            variant="outlined"
                            placeholder="Table"
                            value={selectedTable}
                            options={tableOptions}
                            disabled={true}
                            sx={{ backgroundColor: 'neutral.white', width: '90%' }}
                            onSelect={async (value) => setFieldValue('where[0].table', value)}
                          />
                        </GridItem>
                      </Grid>
                      <Grid container display="flex" justifyContent="flex-start" sx={{ rowGap: 1 }}>
                        {/* TODO Apply for each element on the Where array */}
                        {renderConditionComponents(values.where)}
                      </Grid>
                    </Grid>
                  </ModalMain>
                  <Divider />
                  <Box sx={{ width: '100%', display: 'flex', justifyContent: 'end', mt: '16px' }}>
                    <LoadingButton
                      type="submit"
                      sx={{ width: 'fit-content', display: 'block' }}
                      variant="contained"
                      onClick={(event) => {
                        event.preventDefault();
                        handleSubmit();
                      }}
                      loading={loading}
                      disabled={!(isValid && dirty)}
                    >
                      Add rule
                    </LoadingButton>
                  </Box>
                  {error && (
                    <Box sx={{ width: '100%', display: 'flex', justifyContent: 'end', mt: '5px' }}>
                      <Typography variant="caption" sx={{ color: 'red.main', textAlign: 'center' }}>
                        {error}
                      </Typography>
                    </Box>
                  )}
                </Form>
              </>
            </ModalContainer>
          );
        }}
      </Formik>
    </Modal>
  );
};

export default RuleModal;
