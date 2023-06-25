import { FC } from 'react';
import { Grid } from '@mui/material';

import { updateTenant as updateTenantApi } from 'http/tenant';
import { updateUser as updateUserApi } from 'http/user';
import { TextLinkButton } from 'components/ui';
import { EditableInput } from 'components/Editable';
import { Loader } from 'components/Loader';
import { useTenant } from 'store/tenant/hooks';
import { useUser } from 'store/user/hooks';
import { Container } from './ui';

const Profile: FC = () => {
  const { loading: userLoading, user } = useUser();
  const { loading: tenantLoading, tenant } = useTenant();

  return (
    <Container position="relative">
      <Grid container spacing={2}>
        <Grid item xs={12} container spacing={3} sx={{ marginBottom: 5 }}>
          <Grid item xs={4}>
            <EditableInput
              id="accountOwner"
              name="accountOwner"
              label="Account Owner"
              value={user?.userName ?? ''}
              fullWidth
              onSave={async (value) => {
                if (!user?.userId) return;
                await updateUserApi(user.userId, { userName: value });
              }}
            />
          </Grid>

          <Grid item xs={4}>
            <EditableInput
              id="tenantName"
              name="tenantName"
              label="Company Name"
              value={tenant?.tenantName ?? ''}
              fullWidth
              onSave={async (value) => {
                if (!tenant?.tenantId) return;
                await updateTenantApi(tenant.tenantId, { tenantName: value });
              }}
            />
          </Grid>
        </Grid>

        <Grid item xs={12} container spacing={3}>
          <Grid item xs={4}>
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
              }}
            />
          </Grid>

          <Grid item xs={4}>
            {/* <EditableInput
              id="address"
              name="address"
              label="Address"
              value={tenant?.tenantAddress ?? ''}
              fullWidth
              onSave={async (value) => {
                if (!tenant?.tenantId) return;
                await updateTenantApi(tenant.tenantId, { tenantAddress: value });
              }}
            /> */}
          </Grid>
        </Grid>

        <Grid item xs={12} container spacing={3}>
          <Grid item xs={4}>
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
              }}
            />
          </Grid>

          <Grid item xs={4}>
            <EditableInput
              id="tenantEmail"
              name="tenantEmail"
              label="Company e-mail"
              value={tenant?.tenantEmail ?? ''}
              fullWidth
              onSave={async (value) => {
                if (!tenant?.tenantId) return;
                await updateTenantApi(tenant.tenantId, { tenantEmail: value });
              }}
            />
          </Grid>
        </Grid>

        <Grid item xs={12} container spacing={3}>
          <Grid item xs={4}>
            <EditableInput
              id="mobileNumber"
              name="mobileNumber"
              label="Mobile number"
              value={user?.contactInfo.mobileNumber ?? ''}
              fullWidth
              type="tel"
              onSave={async (value) => {
                if (!user?.userId) return;
                await updateUserApi(user.userId, { mobileNumber: value });
              }}
            />
          </Grid>

          <Grid item xs={4}>
            <EditableInput
              id="tenantUrl"
              name="tenantUrl"
              label="Company URL"
              value={tenant?.tenantWebsite ?? ''}
              fullWidth
              onSave={async (value) => {
                if (!tenant?.tenantId) return;
                await updateTenantApi(tenant.tenantId, { tenantWebsite: value });
              }}
            />
          </Grid>
        </Grid>

        <Grid item xs={12}>
          <TextLinkButton>Reset user&apos;s password</TextLinkButton>
        </Grid>
      </Grid>

      {(userLoading || tenantLoading) && <Loader />}
    </Container>
  );
};

export default Profile;
