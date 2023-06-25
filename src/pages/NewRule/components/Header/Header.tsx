import { Grid, IconButton, Stack, Typography, TextField, InputAdornment } from '@mui/material';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import { VerticalDivider } from '../../ui';
import theme from 'core/theme';
import { PrimaryButton, SecondaryButton } from 'components/ui';
import useNewRule from 'pages/NewRule/hook/NewRuleHook';

interface HeaderInterfac {
  handleBack: () => void;
  handleCancel?: () => void;
  handleSaveAsTemplate?: () => void;
  handleAddARule?: () => void;
}
const Header = ({ handleBack }: HeaderInterfac) => {
  const { handleCreateOrUpdateRule } = useNewRule();
  return (
    <Grid container spacing={2} sx={{ backgroundColor: 'neutral.white', padding: '24px 32px 16px' }}>
      <Grid item xs={12} sm={6}>
        <Stack direction="row" alignItems="center">
          <IconButton
            onClick={handleBack}
            sx={{
              marginRight: 1,
              border: 1,
              color: theme.palette.blue.main,
              borderRadius: 2,
            }}
          >
            <KeyboardBackspaceIcon></KeyboardBackspaceIcon>
          </IconButton>
          <Typography variant="h2" sx={{ color: 'neutral.main' }}>
            New Rule
          </Typography>
          <VerticalDivider />
          <Typography variant="labelRegular12" sx={{ color: 'neutral.n400' }} component="p">
            Data health and anomaly detection solution
          </Typography>
        </Stack>
      </Grid>
      <Grid
        item
        xs={12}
        sm={6}
        sx={{
          display: 'flex',
          justifyContent: 'flex-end',
          alignItems: 'center',
        }}
      >
        <SecondaryButton sx={{ mr: 1 }}>Cancel</SecondaryButton>
        <SecondaryButton>Save as a template</SecondaryButton>
        <VerticalDivider></VerticalDivider>
        <PrimaryButton
          onClick={() => {
            handleCreateOrUpdateRule();
          }}
        >
          Add rule
        </PrimaryButton>
      </Grid>
    </Grid>
  );
};

export default Header;
