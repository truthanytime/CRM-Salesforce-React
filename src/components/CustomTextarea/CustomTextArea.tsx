import { FC, ReactNode } from 'react';
import { InputLabel, TextareaAutosizeProps } from '@mui/material';

import { Textarea } from './ui';

interface CustomTextAreaProps extends TextareaAutosizeProps {
  id: string;
  name: string;
  label?: string | ReactNode;
}

const CustomTextArea: FC<CustomTextAreaProps> = ({ id, name, label, ...rest }) => {
  return (
    <div>
      {label && (
        <InputLabel htmlFor={id} sx={{ marginBottom: 1 }}>
          {label}
        </InputLabel>
      )}

      <Textarea id={id} name={name} {...rest} />
    </div>
  );
};

export default CustomTextArea;
