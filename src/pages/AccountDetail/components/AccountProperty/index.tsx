import { PRIVATE_ABS_ROUTE_PATHS } from 'core/constants';
import { FC, useCallback, useEffect, useMemo, useState } from 'react';
import { BackToRoute, Container, DeleteButton, ProfileHead, PropertyContainer } from './ui';
import format from 'date-fns/format';
import { ReactComponent as ArrowLeft } from 'assets/icons/navBack.svg';
import { ReactComponent as DeleteIcon } from 'assets/icons/delete.svg';
import { ReactComponent as DotsIcon } from 'assets/icons/dots.svg';
import { ReactComponent as AccountRoundIcon } from 'assets/icons/accountRound.svg';
import { Divider, Typography } from '@mui/material';
import PopoverWrapper from 'components/PopoverWrapper';
import { DeleteModal } from 'components/DeleteModal';
import { useNavigate } from 'react-router-dom';
import TitleContainer from 'components/TitileContainer/TitleContainer';
import { StyledDropDownPanel } from 'components/DropDownPanel';
import { useAccount } from 'store/account/hooks';
import { CustomSelect } from 'components/CustomSelect';
import { Account, ACCOUNT_INDUSTRY_OPTIONS, ACCOUNT_STATUS_OPTIONS } from 'store/account/types';
import { Loader } from 'components/Loader';
import { EditableInput } from 'components/Editable';
import { getAccountStages as getAccountStagesApi } from 'http/account/accountStage';
import { getAccountTypes as getAccountTypesApi } from 'http/account/accountType';
import { OptionValue } from 'core/types';

const AccountProperty: FC = () => {
  const navigate = useNavigate();
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [accStages, setAccStages] = useState<OptionValue<number>[]>([]);
  const [accTypes, setAccTypes] = useState<OptionValue<number>[]>([]);

  const { loading, error, account, accounts, getAccounts, deleteAccount, updateAccount } = useAccount();

  const accountId = account?.accountId;

  useEffect(() => {
    getAccountStagesApi().then((res) => {
      setAccStages(
        res.map((acc) => {
          return { label: acc.accountStageName, value: acc.accountStageId };
        }),
      );
    });
    getAccountTypesApi().then((res) => {
      setAccTypes(
        res.map((acc) => {
          return { label: acc.accountTypeName, value: acc.accountTypeId };
        }),
      );
    });
    getAccounts();
  }, [accountId, getAccounts]);

  const accountSuggestions = useMemo(
    () =>
      accounts
        .filter((acc) => acc.accountId !== account?.accountId)
        .map((acc) => {
          return { label: acc.accountName, value: acc.accountId };
        }),
    [accounts, account],
  );

  const toggleModalOpen = useCallback(() => {
    setModalOpen((prevState) => !prevState);
  }, []);

  const handleDelete = async () => {
    account && deleteAccount(account.accountId);
    toggleModalOpen();
    navigate(PRIVATE_ABS_ROUTE_PATHS.accounts);
  };

  const handleUpdate = (data: Partial<Account>) => {
    account && updateAccount({ accountId: account.accountId, data });
  };

  return (
    <Container>
      <BackToRoute to={PRIVATE_ABS_ROUTE_PATHS.accounts}>
        <ArrowLeft />
        {'Back to Accounts'}
      </BackToRoute>
      <ProfileHead>
        <AccountRoundIcon />
        <div className="main-profile">
          <div className="main-profile-content">
            <Typography variant="p12">Name</Typography>
            <Typography variant="h3">{account?.accountName ?? ''}</Typography>
          </div>
          <PopoverWrapper icon={<DotsIcon />}>
            <DeleteButton startIcon={<DeleteIcon />} onClick={() => setModalOpen(true)}>
              {'Delete account'}
            </DeleteButton>
          </PopoverWrapper>
          <DeleteModal
            open={modalOpen}
            toggleOpen={toggleModalOpen}
            loading={loading}
            error={error}
            onDelete={handleDelete}
            entity={'account'}
          />
        </div>
      </ProfileHead>
      <Divider />

      <PropertyContainer>
        <StyledDropDownPanel title={'Core Information'}>
          <TitleContainer label="Account Name">
            <Typography variant="p14">{account?.accountName ?? '-'}</Typography>
          </TitleContainer>

          <TitleContainer label="Account Description">
            <Typography variant="p14">{account?.description ?? '-'}</Typography>
          </TitleContainer>

          <TitleContainer label="Child of">
            <CustomSelect<number>
              value={account?.childOf ?? 0}
              options={accountSuggestions}
              onSelect={async (value) => handleUpdate({ childOf: value })}
            />
          </TitleContainer>

          <EditableInput
            id="webURL"
            name="webURL"
            label="Website"
            value={account?.webURL ?? ''}
            fullWidth
            onSave={async (value) => handleUpdate({ webURL: value })}
          />

          <TitleContainer label="Account Revenue">
            <Typography variant="p14" sx={{ fontWeight: 600 }}>
              {account?.revenuePerYear ?? '-'}
            </Typography>
          </TitleContainer>

          <TitleContainer label="Industry">
            <CustomSelect<number>
              value={account?.industryId ?? 0}
              options={ACCOUNT_INDUSTRY_OPTIONS}
              onSelect={async (value) => handleUpdate({ industryId: value })}
            />
          </TitleContainer>

          <TitleContainer label="Primary Contact">
            {/* <Typography variant="p14">{account?.accountPrimaryContact ?? '-'}</Typography> */}
          </TitleContainer>

          <TitleContainer label="Account Stage">
            <CustomSelect<number>
              value={account?.accountStageId ?? 0}
              options={accStages}
              onSelect={async (value) => handleUpdate({ accountStageId: value })}
            />
          </TitleContainer>

          <TitleContainer label="Account Status">
            <CustomSelect<string>
              value={account?.accountStatus ? 'active' : 'inactive'}
              options={ACCOUNT_STATUS_OPTIONS}
              onSelect={async (value) => handleUpdate({ accountStatus: value === 'active' })}
            />
          </TitleContainer>

          <TitleContainer label="Account Type">
            <CustomSelect<number>
              value={account?.accountTypeId ?? 0}
              options={accTypes}
              onSelect={async (value) => handleUpdate({ accountTypeId: value })}
            />
          </TitleContainer>
        </StyledDropDownPanel>

        <StyledDropDownPanel title={'Billing Address'}>
          <TitleContainer label="Billing Street">
            <Typography variant="p14">{account?.contactInfo?.street ?? '-'}</Typography>
          </TitleContainer>

          <TitleContainer label="Billing City">
            <Typography variant="p14">{account?.contactInfo?.city ?? '-'}</Typography>
          </TitleContainer>

          <TitleContainer label="Billing State">
            <Typography variant="p14">{account?.contactInfo?.addressState ?? '-'}</Typography>
          </TitleContainer>

          <TitleContainer label="Billing Country">
            <Typography variant="p14">{account?.contactInfo?.country ?? '-'}</Typography>
          </TitleContainer>

          <TitleContainer label="Billing Zip Code">
            <Typography variant="p14">{account?.contactInfo?.zip ?? '-'}</Typography>
          </TitleContainer>
        </StyledDropDownPanel>

        <StyledDropDownPanel title={'System Information'}>
          <TitleContainer label="Created Date">
            <Typography variant="p14">
              {account?.createDate ? format(new Date(account?.createDate), 'PP') : '-'}
            </Typography>
          </TitleContainer>

          <TitleContainer label="Last Updated on">
            <Typography variant="p14">
              {account?.updateDate ? format(new Date(account?.updateDate), 'PP') : '-'}
            </Typography>
          </TitleContainer>

          <TitleContainer label="Last Updated by" icon="user">
            <Typography variant="p14">{account?.tenantUser?.userName ?? '-'}</Typography>
          </TitleContainer>
        </StyledDropDownPanel>
      </PropertyContainer>
      {loading && <Loader />}
    </Container>
  );
};

export default AccountProperty;
