import React, { FC } from 'react';

import { Box, Grid, InputLabel, Typography } from '@mui/material';

import { CustomInput } from 'components/CustomInput';
import { CustomSelect } from 'components/CustomSelect';
import { GridItem } from 'components/ui';
import useNewRule from 'pages/NewRule/hook/NewRuleHook';
import { RuleCategory, RuleRiskLevel, DepartmentType } from 'store/dataRaptorRule/types';

interface RuleTypeInterface {
  [key: string]: any;
}

const RuleType: FC<RuleTypeInterface> = (props: RuleTypeInterface) => {
  const {
    ruleName,
    violationScore,
    description,
    category,
    riskLevel,
    department,
    setRuleName,
    setViolationScore,
    setDescription,
    setCategory,
    setRiskLevel,
    setDepartment,
  } = useNewRule();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.id === 'ruleName') {
      setRuleName(e.target.value);
    }
    if (e.target.id === 'violationScore') {
      setViolationScore(Number(e.target.value as unknown));
    }
    if (e.target.id === 'description') {
      setDescription(e.target.value);
    }
  };

  return (
    <Box
      {...props}
      sx={{
        m: 2.5,
        bgcolor: 'white',
        borderRadius: 1,
        p: 3,
        display: 'flex',
        flex: 3,
      }}
    >
      <Box flex={2} mr={3}>
        <Grid container display="flex" justifyContent="flex-start">
          <GridItem item xs={12} sx={{ rowGap: '2px' }}>
            <CustomInput
              id="ruleName"
              name="ruleName"
              label="Rule name"
              labelSx={{ fontWeight: 'bold' }}
              placeholder="Full Name Rule"
              fullWidth
              value={ruleName}
              onChange={handleChange}
            />
          </GridItem>
        </Grid>
        <Grid container display="flex" mt={1}>
          <GridItem item xs={3} sx={{ rowGap: '2px' }} paddingRight={1}>
            <CustomInput
              id="violationScore"
              name="violationScore"
              label="Violation Score"
              labelSx={{ fontWeight: 'bold', mb: 2.3 }}
              placeholder="1-100"
              fullWidth
              type="number"
              value={violationScore}
              onChange={handleChange}
            />
          </GridItem>
          <GridItem xs={3} paddingX={1}>
            <InputLabel htmlFor="id" sx={{ fontWeight: 'bold' }}>
              Rule Type
            </InputLabel>
            <CustomSelect<string>
              id="category"
              name="category"
              variant="outlined"
              placeholder="Rule Category"
              value={category}
              options={Object.keys(RuleCategory).map((item) => ({
                label: item,
                value: item,
              }))}
              disabled={false}
              sx={{ backgroundColor: 'neutral.white', width: '100%' }}
              onSelect={async (value) => {
                setCategory(value as RuleCategory);
              }}
            />
          </GridItem>
          <GridItem xs={3} paddingX={1}>
            <InputLabel htmlFor="id" sx={{ fontWeight: 'bold' }}>
              Risk Level
            </InputLabel>
            <CustomSelect<string>
              id="riskLevel"
              name="riskLevel"
              variant="outlined"
              placeholder="Rule RiskLevel"
              value={riskLevel}
              options={Object.keys(RuleRiskLevel).map((item) => ({
                label: item,
                value: item,
              }))}
              disabled={false}
              sx={{ backgroundColor: 'neutral.white', width: '100%' }}
              onSelect={async (value) => {
                setRiskLevel(value as RuleRiskLevel);
              }}
            />
          </GridItem>
          <GridItem xs={3} paddingLeft={1}>
            <InputLabel htmlFor="id" sx={{ fontWeight: 'bold' }}>
              Department
            </InputLabel>
            <CustomSelect<string>
              id="department"
              name="department"
              variant="outlined"
              placeholder="Department"
              value={department}
              options={Object.keys(DepartmentType).map((item) => ({
                label: item,
                value: item,
              }))}
              disabled={false}
              sx={{ backgroundColor: 'neutral.white', width: '100%' }}
              onSelect={async (value) => {
                setDepartment(value as DepartmentType);
              }}
            />
          </GridItem>
        </Grid>
      </Box>
      <Box flex={1}>
        <Grid>
          <GridItem item xs={6} sx={{ rowGap: '2px' }}>
            <Typography variant="p12" color="neutral.main" mb={1} fontWeight={700} sx={{ opacity: 0.6 }}>
              Rule Description
            </Typography>
            <textarea
              id="description"
              name="description"
              placeholder="Type rule description here..."
              style={{
                resize: 'none',
                height: 128,
                borderColor: '#E1E5ED',
                padding: 8,
              }}
              value={description}
              onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
                setDescription(e.target.value);
              }}
            />
          </GridItem>
        </Grid>
      </Box>
    </Box>
  );
};

export default RuleType;
