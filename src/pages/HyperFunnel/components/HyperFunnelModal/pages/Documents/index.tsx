import { Tab, TabPanel, Tabs, a11yProps } from 'components/ui/tab';
import { FC, useState, SyntheticEvent, useContext, useEffect } from 'react';

import update from 'immutability-helper';
import { DropDownArea, DocumentMain, FileNotification } from './ui';
import { FileUploader } from 'react-drag-drop-files';
import { ReactComponent as UploadIcon } from 'assets/icons/upload.svg';
import { ReactComponent as PlusIcon } from 'assets/icons/plus.svg';
import { Divider, Typography, IconButton } from '@mui/material';
import { SecondaryButton, TextButton, LoadingButton } from 'components/ui';
import ReactS3Client from 'react-aws-s3-typescript';
import { Buffer } from 'buffer';
import { s3Config } from 'core/constants';
import { useUser } from 'store/user/hooks';
import FileItem from './FileItem';
import { Loader } from 'components/Loader';
import LinkItem from './LinkItem';
import { ReactComponent as ArrowLeft } from 'assets/icons/navBack.svg';
import { ReactComponent as CrossIcon } from 'assets/icons/cross.svg';
import { ButtonGroup, ModalFooter, BackTo, ModalContainer, ModalHeader } from '../../ui';
import {
  Pipeline,
  PipelineDocument,
  PipelineFormContext,
  PipelineFormSteps,
  usePipelines,
} from 'pages/HyperFunnel/PipelinesProvider';
import { useFormikContext } from 'formik';

window.Buffer = window.Buffer || Buffer;

const fileTypes = ['PDF', 'DOC', 'DOCX', 'TXT', 'XLSX', 'XLS'];

const DocumentPage: FC = () => {
  const { user } = useUser();

  const s3 = new ReactS3Client(s3Config);
  const [files, setFiles] = useState<PipelineDocument[]>([]);
  const [links, setLinks] = useState<PipelineDocument[]>([]);

  const [activeIndex, setActiveIndex] = useState(0);
  const [loading, setLoading] = useState<boolean>(false);

  const { onClose, setStep } = useContext(PipelineFormContext);
  const { values, setValues } = useFormikContext<Pipeline>();

  const { setEditPipeline } = usePipelines();

  const closeModal = () => {
    setEditPipeline(null);
    onClose();
  };

  useEffect(() => {
    setFiles(values.pipelineDocuments.filter((d) => d.type === 'document'));
    setLinks(values.pipelineDocuments.filter((d) => d.type === 'link'));
  }, [values]);

  const onTabChange = (event: SyntheticEvent, newValue: number) => {
    setActiveIndex(newValue);
  };

  const handleFileChange = async (file: any) => {
    try {
      const fileList = Object.keys(file).map((key) => file[key]);
      setLoading(() => true);

      await Promise.all(
        fileList.map(async (file) => {
          const newFileName = file.name.replace(/\..+$/, '');
          const { location, key } = await s3.uploadFile(file, `${user?.userId}/${newFileName}`);
          const fileProperty: PipelineDocument = {
            extention: String(file.name.split('.').pop()).toUpperCase(),
            size: file.size,
            name: file.name,
            location,
            fileKey: key,
            type: 'document',
          };
          setFiles((f) => [...f, fileProperty]);
        }),
      );

      setLoading(() => false);
    } catch (exception) {
      console.error(exception);
      setLoading(() => false);
    }
  };

  const handleFileDelete = (idx: number) => {
    setFiles(files.filter((file, i) => i !== idx));
  };

  const handleAddLink = () => {
    setLinks(update(links, { $push: [{ type: 'link', location: '' }] }));
  };
  const handleLinkChange = (val: string, idx: number) => {
    setLinks(update(links, { [idx]: { $merge: { location: val } } }));
  };
  const handleLinkDelete = (idx: number) => {
    setLinks(update(links, { $splice: [[idx, 1]] }));
  };

  const handleSave = () => {
    setValues(update(values, { $merge: { pipelineDocuments: [...files, ...links] } }));
    setStep(PipelineFormSteps.SECOND);
  };

  return (
    <ModalContainer>
      <ModalHeader>
        <Typography variant="h3" sx={{ color: 'neutral.main' }}>
          {'Sales Documentation'}
        </Typography>

        <IconButton onClick={closeModal}>
          <CrossIcon />
        </IconButton>
      </ModalHeader>
      <DocumentMain sx={{ height: 496 }}>
        {loading && <Loader />}
        <Tabs
          value={activeIndex}
          onChange={onTabChange}
          aria-label="sales documents"
          sx={{ '& .MuiTabs-scroller': { borderBottom: '1px solid #EEEFF1' } }}
        >
          <Tab
            label="Files"
            {...a11yProps(0)}
            icon={files.length > 0 ? <FileNotification>{files.length}</FileNotification> : undefined}
            iconPosition="end"
          />
          <Tab
            label="Links"
            {...a11yProps(1)}
            icon={files.length > 0 ? <FileNotification>{links.length}</FileNotification> : undefined}
            iconPosition="end"
          />
        </Tabs>

        <TabPanel hidden={activeIndex !== 0} sx={{ py: 3, height: '100%' }}>
          {files.map((file, idx) => (
            <FileItem key={idx} file={file} onDelete={() => handleFileDelete(idx)} />
          ))}
          <FileUploader
            classes="file-drop-zone"
            handleChange={handleFileChange}
            name="file"
            types={fileTypes}
            multiple
            onTypeError={(err: any) => console.error(err)}
            onSizeError={(err: any) => console.error(err)}
          >
            {files.length === 0 ? (
              <DropDownArea>
                <Typography variant="p12">{'You have not added any files yet'}</Typography>
                <SecondaryButton startIcon={<UploadIcon />}>Upload Documents</SecondaryButton>
                <Typography variant="p12">{'or'}</Typography>
                <Typography variant="p12">{'Drag&Drop here'}</Typography>
              </DropDownArea>
            ) : (
              <TextButton
                startIcon={<PlusIcon />}
                sx={{ fontSize: 12, fontWeight: 400, color: 'primary.main', '&:hover': { color: 'primary.main' } }}
              >
                Upload Documents
              </TextButton>
            )}
          </FileUploader>
        </TabPanel>

        <TabPanel hidden={activeIndex !== 1} sx={{ py: 3, height: '100%' }}>
          {links.length === 0 ? (
            <DropDownArea>
              <Typography variant="p12">{'You have not added any links yet'}</Typography>
              <SecondaryButton startIcon={<PlusIcon />} onClick={handleAddLink}>
                Add link
              </SecondaryButton>
            </DropDownArea>
          ) : (
            <>
              {links.map((link, idx) => (
                <LinkItem
                  key={idx}
                  link={link.location}
                  onChange={(val) => handleLinkChange(val, idx)}
                  onDelete={() => handleLinkDelete(idx)}
                />
              ))}
              <TextButton
                startIcon={<PlusIcon />}
                sx={{ fontSize: 12, fontWeight: 400, color: 'primary.main', '&:hover': { color: 'primary.main' } }}
                onClick={handleAddLink}
              >
                Add new link
              </TextButton>
            </>
          )}
        </TabPanel>

        <Divider />
      </DocumentMain>
      <ModalFooter>
        <BackTo onClick={() => setStep(PipelineFormSteps.SECOND)}>
          <ArrowLeft />
          <Typography variant="p12">Back to Pipeline creating</Typography>
        </BackTo>

        <ButtonGroup>
          <TextButton sx={{ marginRight: 3 }} onClick={closeModal}>
            Cancel
          </TextButton>
          <LoadingButton variant="contained" onClick={handleSave}>
            {'Save and back to Pipeline'}
          </LoadingButton>
        </ButtonGroup>
      </ModalFooter>
    </ModalContainer>
  );
};

export default DocumentPage;
