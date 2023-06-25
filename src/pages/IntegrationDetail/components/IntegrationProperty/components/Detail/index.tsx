import { Box, Typography } from '@mui/material';
import { ChipGroups } from 'components/ChipGroups';
import { CustomLinkLabel } from 'components/CustomLinkLabel';
import { TextValue } from 'components/ui/text';
import { FC } from 'react';
import { arrayChunck } from 'utils';
import { FieldContainer, FieldValue, PropertyTitle } from '../../../ui';

interface Props {
  providerName: string;
  providerLink: string;
  totalInstalls: string;
  categories: string[];
  features: string[];
  languages: string;
}

const Detail: FC<Props> = ({ providerName, providerLink, totalInstalls, categories, features, languages }) => {
  const FieldTitle: FC<{ children: string }> = ({ children }) => (
    <Typography component="p" variant="labelRegular12" sx={{ color: 'neutral.n400' }}>
      {children}
    </Typography>
  );
  const FieldValue = TextValue;

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
      <PropertyTitle>Details</PropertyTitle>
      <FieldContainer>
        <FieldTitle>Provider</FieldTitle>
        <CustomLinkLabel href={providerLink} linkText={providerName} withIcon />
      </FieldContainer>
      <FieldContainer>
        <FieldTitle>Total Installs</FieldTitle>
        <FieldValue>{totalInstalls}</FieldValue>
      </FieldContainer>
      <FieldContainer>
        <FieldTitle>Category</FieldTitle>
        {arrayChunck<string>(categories, 2).map((chunk, index) => (
          <ChipGroups key={index} labels={chunk} />
        ))}
      </FieldContainer>
      <FieldContainer>
        <FieldTitle>Features</FieldTitle>
        {arrayChunck<string>(features, 2).map((chunk, index) => (
          <ChipGroups key={index} labels={chunk} />
        ))}
      </FieldContainer>
      <FieldContainer>
        <FieldTitle>Languages this app is available in</FieldTitle>
        <FieldValue>{languages}</FieldValue>
      </FieldContainer>
    </Box>
  );
};
export default Detail;
