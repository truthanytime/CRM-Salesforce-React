import { FC, useCallback, useEffect, useState, useMemo } from 'react';
import { Typography, Divider, IconButton, Box, Grid, InputLabel } from '@mui/material';
import Header from './components/Header/Header';
import { useNavigate } from 'react-router-dom';
import RuleType from './components/RuleType/RuleType';
import useNewRule from './hook/NewRuleHook';
import { RuleCategory } from 'store/dataRaptorRule/types';
import DataValidationRuleDefinition from './components/DataValidation';
import DuplicateDetectionRuleDefinition from './components/DuplicateDetection/DuplicateDetection';
interface NewRuleProps {
  [key: string]: any;
}

const NewRule: FC<NewRuleProps> = (props) => {
  const { category, resetAll } = useNewRule();
  const navigate = useNavigate();
  const handleBack = useCallback(() => {
    navigate('/d/data-raptor');
  }, []);

  useEffect(() => {
    resetAll();
  }, []);

  return (
    <Box {...props}>
      <Header handleBack={handleBack}></Header>
      <RuleType></RuleType>

      {category === RuleCategory.DataValidation && <DataValidationRuleDefinition></DataValidationRuleDefinition>}
      {category === RuleCategory.DuplicateDetection && (
        <DuplicateDetectionRuleDefinition></DuplicateDetectionRuleDefinition>
      )}
    </Box>
  );
};

export default NewRule;
