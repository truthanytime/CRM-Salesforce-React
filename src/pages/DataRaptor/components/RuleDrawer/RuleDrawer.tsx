import React, { FC, SyntheticEvent, useEffect, useState } from 'react';
import { Box, Card, Divider, Drawer, Grid, Menu, MenuItem, Stack, Typography } from '@mui/material';
import { ReactComponent as CrossIcon } from 'assets/icons/cross.svg';
import { GridItem, SecondaryButton } from 'components/ui';
import { RuleModal } from '../RuleModal';
import { useDataRaptor } from 'store/dataRaptor/hooks';
import { useDataRaptorRule } from 'store/dataRaptorRule/hooks';
import { ReactComponent as DotsIcon } from 'assets/icons/dots.svg';
import { ActionButton, RuleSwitch } from './ui';
import { CircularProgress } from '@mui/material';
import { useNavigate } from 'react-router-dom';

interface RuleDrawerProps {
  displayed: boolean;
  toggle: (value: boolean | undefined) => void;
}

export const RuleDrawer: FC<RuleDrawerProps> = (props: RuleDrawerProps) => {
  const navigate = useNavigate();
  const [ruleModalOpen, setRuleModalOpen] = useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const { selectedMigration, selectedTable } = useDataRaptor();
  const {
    getRulesByMigrationAndTable,
    data: dataRaptorRuleData,
    setSelectedRuleId,
    deleteRuleById,
    deleteRuleByIdLoading,
    updateRuleById,
    updateRuleByIdLoading,
  } = useDataRaptorRule();
  const { rulesByMigrationAndTable, selectedRuleId } = dataRaptorRuleData;
  const { displayed, toggle } = props;

  const toggleRuleModal = () => {
    setRuleModalOpen((prevState) => !prevState);
  };

  useEffect(() => {
    if (selectedMigration && selectedTable) {
      getRulesByMigrationAndTable({ migrationId: selectedMigration, table: selectedTable });
    }
  }, [selectedMigration, selectedTable]);

  const handleMenuOpen = (event: any) => {
    const ruleId = event.currentTarget.id.split('|')[2];
    setSelectedRuleId(ruleId);
    setAnchorEl(event.currentTarget);
  };

  const handleCreateNewRule = () => {
    setSelectedRuleId('');
    // toggleRuleModal();
    navigate('/d/new-rule');
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedRuleId('');
  };

  const handleMenuDelete = () => {
    if (selectedRuleId) {
      deleteRuleById({
        ruleId: selectedRuleId,
        onSuccess: () => {
          getRulesByMigrationAndTable({ migrationId: selectedMigration, table: selectedTable });
          setSelectedRuleId('');
          setAnchorEl(null);
        },
        onError: () => {
          setSelectedRuleId('');
          setAnchorEl(null);
        },
      });
    }
  };

  const handleMenuEdit = () => {
    setAnchorEl(null);
    toggleRuleModal();
  };

  const handleToggleActivationRule = (event: SyntheticEvent) => {
    if (!rulesByMigrationAndTable) return;
    const id = event.currentTarget.children[0].id.split('|')[2];
    const ruleRecord = rulesByMigrationAndTable.find((record) => record.ruleId === id);
    if (!ruleRecord) return;
    setSelectedRuleId(id);
    updateRuleById({
      ruleId: id,
      data: { active: !ruleRecord.active },
      onSuccess: () => {
        getRulesByMigrationAndTable({ migrationId: selectedMigration, table: selectedTable });
        setSelectedRuleId('');
      },
      onError: () => {
        setSelectedRuleId('');
      },
    });
  };

  const getRuleStatusLabel = (status: string, active: boolean) => {
    if (status === 'completed' && active) {
      return (
        <Typography
          variant="p12"
          sx={{
            color: 'neutral.white',
            width: 'fit-content',
            backgroundColor: 'green.main',
            fontWeight: 'bold',
            px: 2,
            py: 1,
            borderRadius: '100px',
          }}
        >
          Active
        </Typography>
      );
    } else if (status === 'completed' && !active) {
      return (
        <Typography
          variant="p12"
          sx={{
            color: 'neutral.main',
            width: 'fit-content',
            backgroundColor: 'neutral.n200',
            fontWeight: 'bold',
            px: 2,
            py: 1,
            borderRadius: '100px',
          }}
        >
          Inactive
        </Typography>
      );
    } else if (status === 'processing' || status == 'requested') {
      return (
        <Typography
          variant="p12"
          sx={{
            color: 'neutral.white',
            width: 'fit-content',
            backgroundColor: 'orange.main',
            fontWeight: 'bold',
            px: 2,
            py: 1,
            borderRadius: '100px',
          }}
        >
          Processing
        </Typography>
      );
    } else {
      return (
        <Typography
          variant="p12"
          sx={{
            color: 'neutral.white',
            width: 'fit-content',
            backgroundColor: 'red.main',
            fontWeight: 'bold',
            px: 2,
            py: 1,
            borderRadius: '100px',
          }}
        >
          Failed
        </Typography>
      );
    }
  };

  return (
    <div>
      <RuleModal open={ruleModalOpen} toggleOpen={toggleRuleModal} />
      <>
        <Drawer anchor={'right'} open={displayed} onClose={() => toggle(false)}>
          <Box sx={{ width: '576px', height: '700px', marginTop: 7, px: 3, py: 3 }} role="presentation">
            <Stack sx={{ mx: 1, width: '100%' }}>
              <Stack direction="row" justifyContent="space-between" alignItems="center">
                <Typography variant="h6" sx={{ color: 'neutral.main', fontWeight: 'bold' }}>
                  Rules
                </Typography>
                <CrossIcon onClick={() => toggle(false)} cursor="pointer" />
              </Stack>
              <Grid>
                <Typography variant="p12" color="neutral.200">
                  Turn on and off the rules for re-scoring
                </Typography>
              </Grid>
              <Divider sx={{ my: 2 }} />
              <SecondaryButton onClick={handleCreateNewRule}>+ Create new rule</SecondaryButton>
              <Divider sx={{ my: 2 }} />
              {rulesByMigrationAndTable &&
                rulesByMigrationAndTable.map((rule) => {
                  return (
                    <>
                      <Card
                        key={rule.ruleId}
                        sx={{ padding: 1.5, backgroundColor: 'darkBg.main', rowGap: 1, boxShadow: 0, mb: 1.5 }}
                      >
                        <Grid container sx={{ display: 'flex', justifyContent: 'space-between' }}>
                          <Grid item sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                            <Typography variant="p14" sx={{ color: 'neutral.main', fontWeight: 'bold' }}>
                              {rule.name}
                            </Typography>
                          </Grid>
                          <Grid item sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                            <ActionButton
                              id={`menu|button|${rule.ruleId}`}
                              aria-controls={open ? 'basic-menu' : undefined}
                              aria-haspopup="true"
                              aria-expanded={open ? 'true' : undefined}
                              onClick={handleMenuOpen}
                            >
                              <DotsIcon />
                            </ActionButton>
                            <RuleSwitch
                              sx={{ ml: 1 }}
                              checked={rule.active}
                              id={`ruleDrawer|switch|${rule.ruleId}`}
                              onClick={handleToggleActivationRule}
                            />
                            {selectedRuleId === rule.ruleId && updateRuleByIdLoading && (
                              <CircularProgress size={22} sx={{ ml: 1 }} />
                            )}
                          </Grid>
                        </Grid>
                        <Divider sx={{ my: 2 }} />
                        <Grid container>
                          <GridItem item sx={{ width: 'fit-content' }}>
                            <Typography variant="p12" sx={{ color: 'neutral.n400', mr: 1 }}>
                              Description:
                            </Typography>
                          </GridItem>
                          <GridItem item>
                            <Typography variant="p12" sx={{ color: 'neutral.main', ml: 1 }}>
                              {rule.description}
                            </Typography>
                          </GridItem>
                        </Grid>
                        <Divider sx={{ my: 2 }} />
                        <Grid container sx={{ alignItems: 'center' }}>
                          <Grid container xs={6} sx={{ justifyContent: 'space-between' }}>
                            <GridItem item sx={{ my: 'auto' }}>
                              <Typography variant="p12" sx={{ color: 'neutral.n400', width: 'fit-content' }}>
                                Violation Score:
                              </Typography>
                            </GridItem>
                            <GridItem item sx={{ my: 'auto', mr: 2 }}>
                              <Typography
                                variant="p12"
                                sx={{
                                  color: 'primary.main',
                                  backgroundColor: 'primary.subtone2',
                                  fontWeight: 'bold',
                                  width: 'fit-content',
                                  p: 1,
                                  borderRadius: '100%',
                                }}
                              >
                                {rule.violationScore}
                              </Typography>
                            </GridItem>
                          </Grid>
                          <Grid container xs={6} sx={{ justifyContent: 'space-between' }}>
                            <GridItem item sx={{ my: 'auto' }}>
                              <Typography variant="p12" sx={{ color: 'neutral.n400' }}>
                                Status:
                              </Typography>
                            </GridItem>
                            <GridItem item sx={{ my: 'auto' }}>
                              {getRuleStatusLabel(rule.status, rule.active)}
                            </GridItem>
                          </Grid>
                        </Grid>
                        <Divider sx={{ mt: 1, mb: 0 }} />
                      </Card>
                    </>
                  );
                })}
            </Stack>
          </Box>
          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleMenuClose}
            MenuListProps={{
              'aria-labelledby': 'basic-button',
            }}
          >
            <MenuItem onClick={handleMenuEdit}>
              <Typography variant="p14" sx={{ color: 'neutral' }}>
                Edit
              </Typography>
            </MenuItem>
            <MenuItem onClick={handleMenuDelete}>
              {deleteRuleByIdLoading && <CircularProgress color="error" size={'15px'} sx={{ mr: '5px' }} />}
              <Typography variant="p14" sx={{ color: 'red.main' }}>
                Delete
              </Typography>
            </MenuItem>
          </Menu>
        </Drawer>
      </>
    </div>
  );
};

export default RuleDrawer;
