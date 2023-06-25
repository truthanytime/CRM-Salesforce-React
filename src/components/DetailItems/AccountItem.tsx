import { Divider } from '@mui/material';
import { CustomSelect } from 'components/CustomSelect';
import TitleContainer from 'components/TitileContainer/TitleContainer';
import { AccountContact } from 'http/account/accountContact';
import { FC } from 'react';
import { AccountContainer } from './ui';

interface AccountItemProps {
  item: AccountContact;
}
const AccountItem: FC<AccountItemProps> = ({ item }) => {
  const account = item.account;
  return (
    <>
      <AccountContainer>
        <TitleContainer label="Account Name" icon="deal">
          <CustomSelect<number>
            value={account?.accountId ?? 0}
            options={[{ label: account?.accountName ?? '', value: account?.accountId ?? 0 }]}
          />
        </TitleContainer>
      </AccountContainer>
      <Divider />
    </>
  );
};

export default AccountItem;
