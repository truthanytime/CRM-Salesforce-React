import { LoadingButton } from '@mui/lab';
import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  Container,
  Divider,
  Grid,
  IconButton,
  Paper,
  styled,
  Typography,
} from '@mui/material';
import { ReactComponent as CrossIcon } from 'assets/icons/cross.svg';
import { ReactComponent as NavBackIcon } from 'assets/icons/navBack.svg';
import { Modal, ModalContainer, ModalHeader, ModalMain, PaginatedModalFooter, TextButton } from 'components/ui';
import { useFirestore } from 'firebase-redux/useFirestore';
import { openAuthWindow } from 'pages/IntegrationRedirect/popup';
import { FC, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useContact } from 'store/contact/hooks';
import * as actions from 'store/integration-status/actions';
import { useIntegrationStatus } from 'store/integration-status/hooks';
import { IntegrationSession } from 'store/integration-status/types';
import { useIntegration } from 'store/integration/hooks';
import { useUser } from 'store/user/hooks';

interface Props {
  open: boolean;
  toggleOpen: () => void;
  postAction?: () => void;
}

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(2),
  textAlign: 'center',
  color: theme.palette.text.secondary,
  height: '128px',
  width: '128px',
  borderRadius: '4px',
}));

const EmailProviderModal: FC<Props> = ({ open, toggleOpen, postAction }) => {
  enum PageEnum {
    first,
    second,
    third,
  }

  const { user } = useUser();
  const { authorize, authorizeRedirectUrl } = useIntegration();
  const [page, setPage] = useState<PageEnum>(PageEnum.first);
  const [loading, setLoading] = useState<boolean>(false);
  const {
    data: { applicationStatus },
    success,
  } = useIntegrationStatus();
  const firestore = useFirestore<IntegrationSession>('google-sessions');

  const showEmailComposer = () => {
    toggleOpen();
    if (postAction) {
      postAction();
    }
  };

  const navPage = (back?: boolean) => {
    let nextPage: PageEnum;
    if (back) {
      nextPage = PageEnum.second;
    } else {
      nextPage = page === PageEnum.first ? PageEnum.second : page === PageEnum.second ? PageEnum.third : PageEnum.third;
    }
    setPage(nextPage);
  };

  const onSubmit = async () => {
    setLoading(true);
    try {
      // do auth integration here
      authorize({ id: 'gmail' });
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    if (user) {
      const { userId } = user;
      firestore.doc(String(userId), actions, { listen: true, listenerName: 'statusListener' });
    }
  }, []);

  useEffect(() => {
    if (authorizeRedirectUrl) {
      openAuthWindow(authorizeRedirectUrl, 'authpopup');
    }
  }, [authorizeRedirectUrl]);

  useEffect(() => {
    if (open && Boolean(success)) {
      setLoading(false);
      navPage();
      /* navigate(generatePath(PRIVATE_ABS_ROUTE_PATHS.contactDetail, { id: String(contact?.contactId) }));
       * closeModal(); */
    }
  }, [open, applicationStatus]);

  return (
    <Modal open={open} onClose={toggleOpen}>
      <ModalContainer>
        <ModalHeader>
          <Typography variant="h3" sx={{ color: 'neutral.main' }}>
            {'Connect an Inbox'}
          </Typography>

          <IconButton onClick={toggleOpen}>
            <CrossIcon />
          </IconButton>
        </ModalHeader>
        <ModalMain>
          {page === PageEnum.first ? (
            <Container sx={{ width: '320px' }}>
              <Container sx={{ marginBottom: '20px' }}>
                <Typography variant="b16" sx={{ color: 'neutral.main', textAlign: 'center' }}>
                  {'Choose your email provider'}
                </Typography>
              </Container>
              <Grid container rowSpacing={2} columnSpacing={{ xs: 2 }}>
                <Grid item xs={6}>
                  <Card sx={{ maxWidth: 128, height: 128 }}>
                    <CardActionArea>
                      <CardContent>
                        <Container sx={{ marginBottom: '10px' }}>
                          <img src="/assets/icons/google.png" alt="" style={{ width: '50px' }} />
                        </Container>
                        <Typography variant="body2" component="h4" sx={{ textAlign: 'center' }}>
                          Google/Gmail
                        </Typography>
                      </CardContent>
                    </CardActionArea>
                  </Card>
                </Grid>
                <Grid item xs={6}>
                  <Item></Item>
                </Grid>
                <Grid item xs={6}>
                  <Item></Item>
                </Grid>
                <Grid item xs={6}>
                  <Item></Item>
                </Grid>
              </Grid>
            </Container>
          ) : page === PageEnum.second ? (
            <p>PAGE 2</p>
          ) : (
            <p>PAGE 3</p>
          )}
        </ModalMain>
        <Divider />
        <PaginatedModalFooter>
          <Box sx={{ width: 250 }}>
            {page === PageEnum.second && (
              <TextButton onClick={(_) => navPage(true)} sx={{ fontWeight: 400 }}>
                <NavBackIcon style={{ marginRight: 10 }} />
                Back to Step 1
              </TextButton>
            )}
          </Box>
          <span>
            <strong>{page === PageEnum.first ? '1' : page === PageEnum.second ? '2' : ''}</strong>
            {page === PageEnum.third ? '' : '/2'}
          </span>
          <Box sx={{ width: page === PageEnum.third ? 300 : 250, display: 'flex', flexDirection: 'row-reverse' }}>
            <LoadingButton
              variant="contained"
              loading={Boolean(loading)}
              onClick={
                page === PageEnum.second ? onSubmit : page === PageEnum.third ? showEmailComposer : () => navPage()
              }
            >
              {page !== PageEnum.third ? 'Next' : 'Send your first email'}
            </LoadingButton>
            <TextButton sx={{ marginRight: 3 }} onClick={toggleOpen}>
              Cancel
            </TextButton>
          </Box>
        </PaginatedModalFooter>
      </ModalContainer>
    </Modal>
  );
};

export default EmailProviderModal;
