import { Box, Card, Stack, Typography } from '@mui/material';
import { ReactComponent as AddRuleIcon } from 'assets/icons/addRule.svg';
import { IndividualRuleCard } from 'components/IndividualRuleCard';
import { PrimaryButton } from 'components/ui';
import theme from 'core/theme';
import { FC, useEffect, useState, useCallback, useMemo } from 'react';
import { useDataRaptor } from 'store/dataRaptor/hooks';
import { useDataRaptorRule } from 'store/dataRaptorRule/hooks';
import { RuleCategory } from 'store/dataRaptorRule/types';
import { useMigration } from 'store/migration/hooks';
interface ConfidenceScoreGridProps {
  toggleRuleDrawer: () => void;
}

interface ViolatedRowCountByRuleCategory {
  count: number;
  category: string;
}
const ConfidenceScoreGrid: FC<ConfidenceScoreGridProps> = (props: ConfidenceScoreGridProps) => {
  const { toggleRuleDrawer } = props;
  const { success, data } = useMigration();
  const {
    data: { rulesByMigrationAndTable },
  } = useDataRaptorRule();

  const { selectedTable } = useDataRaptor();

  const [avg_score, setAvgScore] = useState<number>(100);
  const [updated_at, setUpdatedAt] = useState<string>();
  const [noRule, setNoRule] = useState<boolean>(false);
  const [violatedRowCountByRuleCategory, setViolatedRowCountByRuleCategory] =
    useState<ViolatedRowCountByRuleCategory[]>();

  useEffect(() => {
    if (rulesByMigrationAndTable && rulesByMigrationAndTable.length !== 0) {
      setNoRule(false);
      const temp = [
        ...Object.values(RuleCategory).map((item) => ({
          category: item,
          count: 0,
        })),
      ];
      rulesByMigrationAndTable?.forEach((rule) => {
        const index = temp.findIndex((item) => item.category === rule.category);
        if (index > -1) {
          const tempCategory = temp[index];
          tempCategory.count += rule.violatedRowCount;
          temp.splice(index, 1, tempCategory);
        }
      });
      setViolatedRowCountByRuleCategory(temp);
    } else {
      setNoRule(true);
    }
  }, [rulesByMigrationAndTable]);

  useEffect(() => {
    if (success) {
      const index = data.migratedTables.findIndex((item) => item.table_name === selectedTable);
      if (index > -1) {
        setAvgScore(Number(data.migratedTables[index].avg_confidence_score));
        const date: Date = data.migratedTables[index].updated_at
          ? new Date(data.migratedTables[index].updated_at)
          : new Date(Date.now());
        setUpdatedAt(date.toLocaleString());
      }
    }
  }, [success, selectedTable, data.migratedTables]);

  const cardState = useMemo(() => {
    if (avg_score > 70) {
      return {
        color: theme.palette.green.main,
        text: 'Good',
      };
    }
    if (avg_score > 50) {
      return {
        color: theme.palette.orange.main,
        text: 'Average',
      };
    }
    return {
      color: theme.palette.red.main,
      text: 'Poor',
    };
  }, [avg_score]);

  return (
    <>
      <Typography variant="h3" sx={{ p: 3 }}>
        Confidence Score
      </Typography>

      {noRule ? (
        <Box sx={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}>
          <Stack direction="row" justifyContent="center">
            <AddRuleIcon width={64} height={64} />
          </Stack>
          <Typography
            variant="labelRegular12"
            component="p"
            sx={{ color: 'neutral.n400', my: 3, textAlign: 'center', width: 240 }}
          >
            Add a new rule to see a Confidence Score of the records
          </Typography>
          <PrimaryButton onClick={toggleRuleDrawer}>Rules</PrimaryButton>
        </Box>
      ) : (
        <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', p: '16px' }}>
          <Stack direction="row" justifyContent="flex-start">
            <Typography fontSize={10} lineHeight="16px" color={theme.palette.primary.gray}>
              Last updated on
            </Typography>
            <Typography fontSize={12} lineHeight="16px" color={theme.palette.neutral.main} ml={1}>
              {updated_at}
            </Typography>
          </Stack>
          <Stack direction="row" justifyContent="flex-start">
            <Card sx={{ bgcolor: cardState.color, width: '145px', height: '76px', borderRadius: 1, mt: 2.5, p: 2 }}>
              <Typography variant="labelRegular10" color={theme.palette.neutral.white}>
                {cardState.text}
              </Typography>
              <Typography variant="h3" color={theme.palette.neutral.white}>
                {avg_score.toFixed(0)} / 100
              </Typography>
            </Card>
          </Stack>
          <Stack direction="column" justifyContent="flex-start" mt={1}>
            {violatedRowCountByRuleCategory?.map((individualRule) => (
              <IndividualRuleCard
                count={individualRule.count ? individualRule.count : 0}
                title={individualRule.category}
                key={individualRule.category}
                highlight={false}
              ></IndividualRuleCard>
            ))}
          </Stack>
        </Box>
      )}
    </>
  );
};

export default ConfidenceScoreGrid;
