import { FC } from 'react';
import { StageContainer, StageItem } from './ui';

type Props = {
  stage?: number;
};

const STAGE_COLORS: string[] = [
  'primary.subtone1',
  'primary.subtone1',
  'primary.subtone1',
  'green.main',
  'green.main',
  'orange.main',
  'orange.main',
  'orange.main',
];

const StageBar: FC<Props> = ({ stage = 0 }) => {
  return (
    <StageContainer>
      {STAGE_COLORS.map((color, idx) => (
        <StageItem sx={{ backgroundColor: idx <= stage ? color : 'darkBg.main' }} key={idx} />
      ))}
    </StageContainer>
  );
};

export default StageBar;
