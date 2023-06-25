import { PRIVATE_ABS_ROUTE_PATHS } from 'core/constants';
import { FC, useCallback, useEffect, useMemo, useState } from 'react';
import format from 'date-fns/format';
import { BackToRoute, Container, DeleteButton, ProfileHead, PropertyContainer } from './ui';
import { ReactComponent as ArrowLeft } from 'assets/icons/navBack.svg';
import { ReactComponent as DeleteIcon } from 'assets/icons/delete.svg';
import { ReactComponent as DotsIcon } from 'assets/icons/dots.svg';
// import { ReactComponent as ControlIcon } from 'assets/icons/controls.svg';
import { ReactComponent as DealRoundIcon } from 'assets/icons/accountRound.svg';
import { Divider, Typography } from '@mui/material';
import PopoverWrapper from 'components/PopoverWrapper';
import { DeleteModal } from 'components/DeleteModal';
import { useNavigate } from 'react-router-dom';
import { Deal, DEAL_STAGE_OPTIONS } from 'store/deal/types';
import TitleContainer from 'components/TitileContainer/TitleContainer';
import { CustomSelect } from 'components/CustomSelect';
import StageBar from 'components/StageBar';
import { StyledDropDownPanel } from 'components/DropDownPanel';
import { useDeal } from 'store/deal/hooks';
import { Loader } from 'components/Loader';
import { EditableDate, EditableDropDown, EditableInput } from 'components/Editable';
import { useAccount } from 'store/account/hooks';
import { OptionValue } from 'core/types';
import { useUser } from 'store/user/hooks';
import { useContact } from 'store/contact/hooks';

const DealProperty: FC = () => {
  const navigate = useNavigate();
  const [modalOpen, setModalOpen] = useState<boolean>(false);

  const { loading, error, deal, deleteDeal, updateDeal } = useDeal();
  const { accounts } = useAccount();
  const { contacts } = useContact();
  const { users } = useUser();

  const toggleModalOpen = useCallback(() => {
    setModalOpen((prevState) => !prevState);
  }, []);

  const handleDelete = async () => {
    deal && deleteDeal(deal.dealId);
    toggleModalOpen();
    navigate(PRIVATE_ABS_ROUTE_PATHS.dealScape);
  };

  const handleUpdate = (data: Partial<Deal>) => {
    deal && updateDeal({ dealId: deal.dealId, data });
  };

  const userSuggestions = useMemo(() => {
    return users.reduce((acc, val) => {
      acc.push({ label: val.userName, value: val.userId });
      return acc;
    }, [] as OptionValue<number>[]);
  }, [users]);

  const accountSuggestions = useMemo(() => {
    return accounts.reduce((acc, val) => {
      acc.push({ label: val.accountName, value: val.accountId });
      return acc;
    }, [] as OptionValue<number>[]);
  }, [accounts]);

  const contactSuggestions = useMemo(() => {
    return contacts.reduce((acc, val) => {
      acc.push({ label: `${val.firstName} ${val.lastName}`, value: val.contactId });
      return acc;
    }, [] as OptionValue<number>[]);
  }, [contacts]);

  return (
    <Container>
      <BackToRoute to={PRIVATE_ABS_ROUTE_PATHS.dealScape}>
        <ArrowLeft />
        {'Back to Deals'}
      </BackToRoute>
      <ProfileHead>
        <div>
          <DealRoundIcon />
        </div>
        <div className="profile-head">
          <div className="popover-wrapper">
            <PopoverWrapper icon={<DotsIcon />}>
              <DeleteButton startIcon={<DeleteIcon />} onClick={() => setModalOpen(true)}>
                {'Delete deal'}
              </DeleteButton>
            </PopoverWrapper>
          </div>
          <EditableInput
            id="dealName"
            name="dealName"
            label="Name"
            value={deal?.dealName ?? ''}
            small={false}
            fullWidth
            onSave={async (value) => handleUpdate({ dealName: value })}
          />
          <DeleteModal
            open={modalOpen}
            toggleOpen={toggleModalOpen}
            loading={loading}
            error={error}
            onDelete={handleDelete}
            entity={'deal'}
          />
        </div>
      </ProfileHead>
      <Divider />
      <PropertyContainer>
        <TitleContainer label="Stage">
          {/* <CustomSelect<string>
            value={deal?.dealStage ?? '-'}
            options={DEAL_STAGE_OPTIONS}
            onSelect={async (value) => handleUpdate({ dealStage: value })}
          />
          <StageBar stage={DEAL_STAGE_OPTIONS.findIndex((option) => option.value === deal?.dealStage) + 1} /> */}
        </TitleContainer>
        <StyledDropDownPanel title={'Core Information'}>
          {/* <StageBar stage={DEAL_STAGE_OPTIONS.findIndex((option) => option.value === deal?.dealStage) + 1} /> */}
          <EditableDropDown
            id="accountId"
            name="accountId"
            icon="account"
            options={accountSuggestions}
            label="Account name"
            value={deal?.accountId ?? 0}
            fullWidth
            onSave={async (value) => handleUpdate({ accountId: value })}
          />
          <EditableDropDown
            id="contactId"
            name="contactId"
            icon="contact"
            options={contactSuggestions}
            label="Contact name"
            value={deal?.contactId ?? 0}
            fullWidth
            onSave={async (value) => handleUpdate({ contactId: value })}
          />
          <EditableInput
            id="description"
            name="description"
            label="Description"
            value={deal?.description ?? ''}
            fullWidth
            isText
            onSave={async (value) => handleUpdate({ description: value })}
          />
          <TitleContainer label="Amount">
            <Typography variant="p14" sx={{ fontFamily: 600 }}>
              {deal?.totalAmount ?? '-'}
            </Typography>
          </TitleContainer>
          {/* <EditableInput
            id="campaignId"
            name="campaignId"
            label="Compaign Name"
            value={deal?.campaignId ?? ''}
            fullWidth
            onSave={async (value) => handleUpdate({ campaignId: value })}
          /> */}

          <EditableDate
            id="endDate"
            name="endDate"
            label="Close Date"
            value={deal?.endDate}
            fullWidth
            onSave={async (value) => handleUpdate({ endDate: value })}
          />

          <TitleContainer label="Forecast category">
            {/* <Typography variant="p14">{deal?.dealForecastCategory ?? '-'}</Typography> */}
          </TitleContainer>
          <TitleContainer label="Deal Type">
            {/* <Typography variant="p14">{deal?.dealType ?? '-'}</Typography> */}
          </TitleContainer>

          <EditableDropDown
            id="tenantUserId"
            name="tenantUserId"
            icon="account"
            options={userSuggestions}
            label="Owner"
            value={deal?.tenantUserId ?? 0}
            fullWidth
            onSave={async (value) => handleUpdate({ tenantUserId: value })}
          />

          <TitleContainer label="Pipeline">
            {/* <Typography variant="p14">{deal?.dealPipelineName ?? '-'}</Typography> */}
          </TitleContainer>
          <TitleContainer label="Touchpoint">
            {/* <Typography variant="p14">{deal?.dealTouchPoint ?? '-'}</Typography> */}
          </TitleContainer>
        </StyledDropDownPanel>

        <StyledDropDownPanel title={'System Information'}>
          <TitleContainer label="Created Date">
            <Typography variant="p14">
              {deal?.createdDate ? format(new Date(deal?.createdDate), 'MM/dd/yyyy') : '-'}
            </Typography>
          </TitleContainer>

          <TitleContainer label="Last Updated on">
            <Typography variant="p14">
              {deal?.updateDate ? format(new Date(deal?.updateDate), 'MM/dd/yyyy, hh:mm aa') : '-'}
            </Typography>
          </TitleContainer>
        </StyledDropDownPanel>
      </PropertyContainer>
      {loading && <Loader />}
    </Container>
  );
};

export default DealProperty;
