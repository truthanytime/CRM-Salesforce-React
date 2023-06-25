import { Grid, IconButton, Stack, Typography, TextField, InputAdornment, Divider } from '@mui/material';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import SearchIcon from '@mui/icons-material/Search';
import { VerticalDivider } from 'pages/DataValidation/ui';
import theme from 'core/theme';
import { DuplicateDetectionPageStatus } from 'store/duplicateDetection/types';
import { PrimaryButton } from 'components/ui';
interface HeaderInterfac {
  handleBack: () => void;
  handleSearchTextChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  pageStatus: DuplicateDetectionPageStatus;
  openMergeModal: () => void;
}
const Header = ({ handleBack, handleSearchTextChange, pageStatus, openMergeModal }: HeaderInterfac) => {
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
            Duplicate Detection
          </Typography>
          <VerticalDivider />
          <Typography variant="labelRegular12" sx={{ color: 'neutral.n400' }} component="p">
            Review the errors in the records and correct them in the source tables
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
        <TextField
          size="small"
          variant="outlined"
          placeholder="Search"
          onChange={handleSearchTextChange}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
          sx={{
            width: '228px',
            '& .MuiOutlinedInput-root .MuiInputBase-input': {
              paddingLeft: '0',
            },
          }}
        />
        {pageStatus === DuplicateDetectionPageStatus.ROWS && (
          <>
            <Divider orientation="vertical" sx={{ height: 24, mx: 2 }}></Divider>
            <PrimaryButton onClick={openMergeModal}>Merge</PrimaryButton>
          </>
        )}
      </Grid>
    </Grid>
  );
};

export default Header;
