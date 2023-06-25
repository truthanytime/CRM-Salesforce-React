import { FC } from 'react';
import CustomMenu from '../../../../../../components/CustomMenu/CustomMenu';
import PDFIcon from 'assets/icons/pdf.png';
import TXTIcon from 'assets/icons/txt.png';
import XLSIcon from 'assets/icons/xls.png';
import DOCIcon from 'assets/icons/doc.png';
import { ReactComponent as DotsIcon } from 'assets/icons/dots.svg';
import ReactS3Client from 'react-aws-s3-typescript';
import { FileItemContainer, VerticalDivider } from './ui';
import { Typography } from '@mui/material';
import { humanFileSize } from 'core/utils';
import { s3Config } from 'core/constants';
import { PipelineDocument } from 'pages/HyperFunnel/PipelinesProvider';

const FileItem: FC<{ file: PipelineDocument; onDelete: () => void }> = ({ file, onDelete }) => {
  let icon = PDFIcon;
  switch (file.extention) {
    case 'PDF':
      icon = PDFIcon;
      break;
    case 'DOC':
    case 'DOCX':
      icon = DOCIcon;
      break;
    case 'XLS':
    case 'XLSX':
      icon = XLSIcon;
      break;
    case 'TXT':
      icon = TXTIcon;
      break;
  }

  const handleActionSelect = (idx: number) => {
    if (idx === 0) window.open(file.location);
    else if (idx === 1) deleteFile();
  };

  const deleteFile = async () => {
    /* Import s3 config object and call the constrcutor */
    const s3 = new ReactS3Client(s3Config);

    try {
      file.fileKey && (await s3.deleteFile(file.fileKey));

      console.log('File deleted');
      onDelete();
    } catch (exception) {
      console.log(exception);
      /* handle the exception */
    }
  };

  return (
    <FileItemContainer>
      <img src={icon} width={30} />
      <Typography variant="p12"> {file.name}</Typography>
      <VerticalDivider />
      <Typography variant="p12" sx={{ color: 'neutral.n400' }}>
        {humanFileSize(file.size ?? 0)}
      </Typography>
      <CustomMenu
        icon={<DotsIcon />}
        childItems={['Open', 'Delete']}
        sx={{ ml: 'auto' }}
        onSelect={handleActionSelect}
      />
    </FileItemContainer>
  );
};

export default FileItem;
