import { Box } from '@mui/material';
import { ModalTemplate } from 'components/ModalTemplate';
import { FC, useEffect, useMemo, useRef, useState } from 'react';
import JoditEditor from 'jodit-react';
import { ReactComponent as TemplateIcon } from 'assets/icons/template.svg';
import { ReactComponent as DocumentIcon } from 'assets/icons/document.svg';
import { ReactComponent as QuoteIcon } from 'assets/icons/quote.svg';
import { IconButton, ModalMainContent } from './ui';
import { LoadingButton, ModalFooter, TextButton } from 'components/ui';
import { InlineTitleContainer } from 'components/TitileContainer';
import { useUser } from 'store/user/hooks';
import { CustomSelect } from 'components/CustomSelect';
import { Formik, FormikProps } from 'formik';
import * as yup from 'yup';
import { CustomInput } from 'components/CustomInput';
import { CustomMultiDropdown } from 'components/CustomDropdown';
import { useContact } from 'store/contact/hooks';
import { useEmail } from 'store/email/hooks';
import { Email } from 'store/email/types';
import { useActivity } from 'store/activity/hooks';
import { ACTIVITY_STATUS, ACTIVITY_TYPE_ID, CONTACT_STAGE_ID, EMAIL_TYPE_ID, SALE_PHASE_ID } from 'types';
import { Contact } from 'store/contact/types';
import { CreateActivityDto } from 'http/activity';

interface EmailModalProps {
  open: boolean;
  toggleOpen: () => void;
}
interface FormValues {
  emailFrom: string;
  emailTo: string;
  emailSubject: string;
  emailContent: string;
}

const validationSchema = yup.object({
  emailFrom: yup.string().required('Required'),
  emailTo: yup.string().required('Required'),
  emailSubject: yup.string().required('Required'),
  emailContent: yup.string().required('Required'),
});

const EmailModal: FC<EmailModalProps> = ({ open, toggleOpen }) => {
  const editor = useRef(null);
  const { user } = useUser();
  const { getContacts, contact } = useContact();
  const { loading, connectedAccount } = useEmail();
  const { createActivity } = useActivity();

  const [emailFrom, setEmailFrom] = useState<string>(user?.userEmail || '');

  useEffect(() => {
    console.log('EMAIL COMPOSER: CONNECTED EMAIL', connectedAccount);
    if (connectedAccount) {
      setEmailFrom(connectedAccount);
    }
  }, [connectedAccount]);

  const config = useMemo(() => {
    return { readonly: false, placeholder: 'Describe the email...' };
  }, [getContacts]);

  const formRef = useRef<FormikProps<FormValues> | null>(null);

  const onSubmit = async (values: FormValues) => {
    const email: Partial<Email> = {
      ...values,
    };

    const activity: Partial<CreateActivityDto> = {
      activityTypeId: ACTIVITY_TYPE_ID.EMAIL,
      accountId: (contact as Contact)?.accountId,
      contactId: (contact as Contact)?.contactId,
      salePhaseId: SALE_PHASE_ID.PRESALES,
      tenantId: (contact as Contact)?.tenantUser?.tenantId,
      contactStageId: (contact as Contact)?.contactStageId || CONTACT_STAGE_ID.COLD,
      status: ACTIVITY_STATUS.SENT.toString(),
      emailActivityDetail: {
        emailFrom: email.emailFrom,
        emailTo: email.emailTo,
        emailSubject: email.emailSubject,
        emailBody: email.emailContent,
        emailTypeId: EMAIL_TYPE_ID.OUTGOING,
        hasAttachment: false, //TODO: future work on attachment
      },
    };
    createActivity(activity);
    toggleOpen();
  };

  const initialValues: FormValues = {
    emailFrom: emailFrom,
    emailTo: (contact as Contact)?.contactInfo?.email || '',
    emailSubject: '',
    emailContent: '',
  };

  return (
    <ModalTemplate open={open} toggleOpen={toggleOpen} icon="email" title="New Email">
      <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit} innerRef={formRef}>
        {({ values, touched, errors, isValid, dirty, handleChange, handleBlur, setFieldValue, handleSubmit }) => (
          <>
            <ModalMainContent>
              <Box>
                <IconButton startIcon={<TemplateIcon />}>Templates</IconButton>
                <IconButton startIcon={<DocumentIcon />}>Documents</IconButton>
                <IconButton startIcon={<QuoteIcon />}>Quotes</IconButton>
              </Box>

              <form noValidate>
                <InlineTitleContainer label="From">
                  <CustomSelect<string>
                    id="emailFrom"
                    name="emailFrom"
                    value={values.emailFrom}
                    options={[
                      {
                        label: emailFrom,
                        value: emailFrom,
                      },
                    ]}
                    onSelect={async (value) => setFieldValue('emailFrom', value)}
                  />
                </InlineTitleContainer>
                <InlineTitleContainer label="To">
                  <CustomMultiDropdown<string>
                    id="emailTo"
                    placeholder="Choose Contact"
                    value={
                      values.emailTo.length > 0
                        ? values.emailTo.split(',').map((v) => {
                            return { label: v, value: v };
                          })
                        : []
                    }
                    options={[
                      {
                        label: (contact as Contact)?.contactInfo?.email || '',
                        value: (contact as Contact)?.contactInfo?.email || '',
                      },
                    ]}
                    onSelect={(value) => setFieldValue('emailTo', value.map((v) => v.value).join(','))}
                    InputProps={{
                      error: touched.emailTo && !!errors.emailTo,
                      onBlur: handleBlur,
                    }}
                  />
                </InlineTitleContainer>
                <InlineTitleContainer label="Subject">
                  <CustomInput
                    id="emailSubject"
                    name="emailSubject"
                    placeholder="Write the subject"
                    fullWidth
                    value={values.emailSubject}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.emailSubject && !!errors.emailSubject}
                  />
                </InlineTitleContainer>

                <JoditEditor
                  ref={editor}
                  value={values.emailContent}
                  config={config}
                  onBlur={(newContent: string) => setFieldValue('emailContent', newContent)}
                  onChange={(newContent: string) => setFieldValue('emailContent', newContent)}
                />
              </form>
              <ModalFooter>
                <TextButton sx={{ marginRight: 3 }} onClick={toggleOpen}>
                  Cancel
                </TextButton>
                <LoadingButton
                  disabled={!(isValid && dirty)}
                  loading={loading}
                  onClick={(event) => {
                    event.preventDefault();
                    console.log('click');
                    handleSubmit();
                  }}
                  type="submit"
                >
                  Send now
                </LoadingButton>
              </ModalFooter>
            </ModalMainContent>
          </>
        )}
      </Formik>
    </ModalTemplate>
  );
};
export default EmailModal;
