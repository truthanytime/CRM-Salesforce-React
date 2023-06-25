import { FC, useState } from 'react';
import { Typography, IconButton, Divider, Box } from '@mui/material';
import { useSelector } from 'react-redux';

import { inactivateUser as inactivateUserApi, reactivateUser as reactivateUserApi } from 'http/user';
import { updateUser as updateUserApi } from 'http/user';
import { ReactComponent as CrossIcon } from 'assets/icons/cross.svg';
import { SecondaryRedLoadingButton } from 'components/ui';
import { EditableInput } from 'components/Editable';
import { CustomSelect } from 'components/CustomSelect';
import { UserType } from 'core/types';
import { USER_ROLE_OPTIONS } from 'core/constants';
import { userSelector, useUser } from 'store/user/hooks';
import { RootState } from 'store/types';
import { useAuth } from 'store/auth/hooks';
import { Container, Modal, Header, HeaderTitleContainer, Footer, Main, NameContainer, RoleSelectContainer } from './ui';

interface UserDetailsModalProps {
  open: boolean;
  toggleOpen: () => void;
  userId?: number;
}

const UserDetailsModal: FC<UserDetailsModalProps> = ({ open, toggleOpen, userId }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const { user: currentUser, updateUser } = useUser();
  const user = useSelector((state: RootState) => userSelector(state, userId));
  const { isAdmin } = useAuth();

  const onClose = () => {
    if (error) setError(false);
    if (loading) setLoading(false);
    toggleOpen();
  };

  const toggleActiveUser = async () => {
    if (!user) return;
    if (error) setError(true);
    setLoading(true);
    try {
      const action = user.userActive ? inactivateUserApi : reactivateUserApi;
      await action(user.userId);
      updateUser({ userId: user.userId, user: { userActive: !user.userActive } });
    } catch (err) {
      setError(true);
    }
    setLoading(false);
  };

  return (
    <Modal open={open} onClose={onClose} keepMounted>
      <Container>
        <Header>
          <HeaderTitleContainer>
            <Typography variant="p16">User details</Typography>
          </HeaderTitleContainer>

          <IconButton onClick={onClose} sx={{ marginRight: -1 }}>
            <CrossIcon />
          </IconButton>
        </Header>

        <Main>
          <NameContainer>
            <EditableInput
              id="userName"
              name="userName"
              label="Name"
              value={user?.userName ?? ''}
              fullWidth
              small={false}
              onSave={async (value) => {
                if (!user?.userId) return;
                await updateUserApi(user.userId, { userName: value });
                updateUser({ userId: user.userId, user: { userName: value } });
              }}
            />
          </NameContainer>

          <RoleSelectContainer>
            <Typography variant="labelRegular12" sx={{ color: 'neutral.n400' }}>
              Role
            </Typography>

            <CustomSelect<UserType>
              value={user?.userType as UserType}
              options={USER_ROLE_OPTIONS}
              onSelect={async (value) => {
                if (!user?.userId) return;
                await updateUserApi(user.userId, { userType: value });
                updateUser({ userId: user.userId, user: { userType: value } });
              }}
            />
          </RoleSelectContainer>

          <Divider sx={{ marginTop: 3 }} />

          <Box marginTop={3}>
            <EditableInput
              id="workEmail"
              name="workEmail"
              label="Work email"
              value={user?.userEmail ?? ''}
              fullWidth
              type="email"
              onSave={async (value) => {
                if (!user?.userId) return;
                await updateUserApi(user.userId, { userEmail: value });
                updateUser({ userId: user.userId, user: { userEmail: value } });
              }}
            />
          </Box>

          <Box marginTop={2}>
            <EditableInput
              id="phoneNumber"
              name="phoneNumber"
              label="Work phone number"
              value={user?.contactInfo?.phoneNumber ?? ''}
              fullWidth
              type="tel"
              onSave={async (value) => {
                if (!user?.userId) return;
                await updateUserApi(user.userId, { phoneNumber: value });
                updateUser({ userId: user.userId, contactInfo: { phoneNumber: value } });
              }}
            />
          </Box>

          <Box marginTop={2}>
            <EditableInput
              id="mobileNumber"
              name="mobileNumber"
              label="Additional number"
              value={user?.contactInfo.mobileNumber ?? ''}
              fullWidth
              type="tel"
              onSave={async (value) => {
                if (!user?.userId) return;
                await updateUserApi(user.userId, { mobileNumber: value });
                updateUser({ userId: user.userId, contactInfo: { mobileNumber: value } });
              }}
            />
          </Box>
        </Main>

        {isAdmin && userId !== currentUser?.userId && (
          <>
            <Divider />

            <Footer>
              <SecondaryRedLoadingButton fullWidth onClick={toggleActiveUser} loading={loading}>
                {user?.userActive ? 'Inactivate User' : 'Reactivate User'}
              </SecondaryRedLoadingButton>

              {!!error && (
                <Typography variant="caption" sx={{ color: 'red.main', marginTop: 1.5 }}>
                  {typeof error === 'string' ? error : 'Something went wrong!'}
                </Typography>
              )}
            </Footer>
          </>
        )}
      </Container>
    </Modal>
  );
};

export default UserDetailsModal;
