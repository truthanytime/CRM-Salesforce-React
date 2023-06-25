import { Grid, IconButton, Stack, Typography, TextField, InputAdornment } from '@mui/material';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import SearchIcon from '@mui/icons-material/Search';
import { VerticalDivider } from '../../ui';
import theme from 'core/theme';
interface HeaderInterfac {
  handleBack: () => void;
  handleSearchTextChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}
const Header = ({ handleBack, handleSearchTextChange }: HeaderInterfac) => {
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
            Data Validaton
          </Typography>
          <VerticalDivider />
          <Typography variant="labelRegular12" sx={{ color: 'neutral.n400' }} component="p">
            Review and correct records with data inconsistencies here
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
      </Grid>
    </Grid>
  );
};

export default Header;
