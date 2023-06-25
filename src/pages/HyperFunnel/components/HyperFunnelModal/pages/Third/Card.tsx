import { FC, useState, useMemo } from 'react';
import { memo } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import { ReactComponent as DotsIcon } from 'assets/icons/dots.svg';
import { ReactComponent as PlusIcon } from 'assets/icons/plus.svg';
import { ReactComponent as DragHandleIcon } from 'assets/icons/drag-handle.svg';
import { ReactComponent as ChevronDownIcon } from 'assets/icons/chevronDown.svg';
import { ReactComponent as ChevronUpIcon } from 'assets/icons/chevronUp.svg';
import { DEAL_STAGE_TYPES } from './Container';
import { Box, IconButton, Typography } from '@mui/material';
import { CardContainer } from './ui';
import { CustomInput } from 'components/CustomInput';
import { CustomMenu } from 'components/CustomMenu';
import { CustomIconButton } from 'components/ui';
import { CustomMultiDropdown } from 'components/CustomDropdown';
import { User } from 'store/user/types';
import { OptionValue } from 'core/types';
import { useFormikContext } from 'formik';

import { Pipeline, PipelineStage } from 'pages/HyperFunnel/PipelinesProvider';
import { useTenantUsers } from 'providers/TenantUsersProvider';

export const ItemTypes = {
  CARD: 'card',
};

export interface Item {
  originalIndex: number;
  card: PipelineStage;
  isDemo: boolean;
}

export interface CardProps {
  card: PipelineStage;
  moveCard: (card: PipelineStage, to: number) => void;
  findCard: (card: PipelineStage) => { index: number };
  hoverCard?: () => void;
  deleteCard?: () => void;
  duplicateCard?: () => void;
  isDemo?: boolean;
  order?: number;
}

export const Card: FC<CardProps> = memo(function Card({
  card,
  moveCard,
  findCard,
  hoverCard,
  deleteCard,
  duplicateCard,
  isDemo = false,
  order,
}: CardProps) {
  const originalIndex = findCard(card).index;
  const [open, setOpen] = useState<boolean>(false);
  const { users } = useTenantUsers();

  const { values, touched, errors, handleBlur, handleChange, setFieldValue } = useFormikContext<Pipeline>();

  const [{ isDragging }, drag] = useDrag(
    () => ({
      type: ItemTypes.CARD,
      item: { card, originalIndex, isDemo },
      collect: (monitor) => ({
        isDragging: monitor.isDragging(),
      }),
      end: (item, monitor) => {
        const { card: droppedCard, originalIndex } = item;
        const didDrop = monitor.didDrop();
        if (!didDrop && !isDemo) {
          moveCard(droppedCard, originalIndex);
        }
      },
    }),
    [card, originalIndex, moveCard],
  );

  const [, drop] = useDrop(
    () => ({
      accept: ItemTypes.CARD,
      hover: ({ card: draggedCard, isDemo: isDemoDragged }: Item) => {
        if (draggedCard !== card && !isDemo && !isDemoDragged) {
          const { index: overIndex } = findCard(card);
          moveCard(draggedCard, overIndex);
        }
        if (!isDemo && isDemoDragged) {
          hoverCard?.();
        }
      },
    }),
    [findCard, moveCard],
  );

  const handleActionSelect = (idx: number) => {
    if (idx === 0) duplicateCard?.();
    else if (idx === 1) deleteCard?.();
  };

  const userSuggestions = useMemo(() => {
    return users.reduce((acc, val) => {
      acc.push({ label: val.userName, value: val });
      return acc;
    }, [] as OptionValue<User>[]);
  }, [users]);

  const canHaveForcastCatogoryInput = card.type === 'Sales';

  return (
    <CardContainer ref={drop} sx={{ backgroundColor: isDemo ? 'lightBg.main' : 'neutral.white' }}>
      <Box ref={drag} className="card-header">
        <IconButton sx={{ cursor: isDragging ? 'move' : 'grab' }}>
          <DragHandleIcon />
        </IconButton>

        <Typography variant="p14" sx={{ mr: 'auto', color: isDemo ? 'neutral.main' : 'neutral.n400' }}>
          {card.title}
        </Typography>

        {!isDemo && (
          <Typography
            variant="labelRegular10"
            sx={{
              textTransform: 'uppercase',
              color: 'neutral.n400',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
            }}
          >
            <Box
              sx={{
                width: 6,
                height: 6,
                backgroundColor: DEAL_STAGE_TYPES.find((type) => type.value === card.type)?.color ?? 'primary.main',
                borderRadius: '50%',
              }}
            ></Box>
            {card.type}
          </Typography>
        )}

        <IconButton onClick={() => setOpen((o) => !o)}>{open ? <ChevronUpIcon /> : <ChevronDownIcon />}</IconButton>

        {!isDemo && (
          <CustomMenu icon={<DotsIcon />} childItems={['Duplicate', 'Delete']} onSelect={handleActionSelect} />
        )}
      </Box>
      {isDemo
        ? open && (
            <Box className="card-content">
              <Typography variant="p12" sx={{ color: 'neutral.n400' }}>
                {card.description}
              </Typography>
            </Box>
          )
        : order !== undefined && (
            <Box className="card-content">
              <CustomInput
                id="pipelineStageName"
                name={`pipelineStages[${order}].pipelineStageName`}
                title="Stage name"
                label="Stage name"
                placeholder="Enter the Stage name"
                fullWidth
                value={values.pipelineStages?.[order]?.pipelineStageName}
                onChange={handleChange}
              />

              {open && (
                <>
                  <CustomInput
                    id="goal"
                    name={`pipelineStages[${order}].pipelineStageDescription`}
                    title="Goal"
                    label="Goal"
                    placeholder="Enter the goal"
                    fullWidth
                    defaultValue={values.pipelineStages?.[order]?.pipelineStageDescription}
                    onChange={handleChange}
                  />

                  <CustomMultiDropdown<User>
                    id="pipelineOwners"
                    label="Owners"
                    placeholder="Enter the Team ownership"
                    value={(values.pipelineStages?.[order]?.pipelineStageOwners ?? []).map((user) => {
                      return { label: user.userName, value: user };
                    })}
                    options={userSuggestions}
                    onSelect={(value) =>
                      setFieldValue(
                        `pipelineStages[${order}].pipelineStageOwners`,
                        value.map((o) => o.value),
                      )
                    }
                    InputProps={{
                      error: touched.pipelineUsers && !!errors.pipelineUsers,
                      onBlur: handleBlur,
                    }}
                  />

                  {canHaveForcastCatogoryInput && (
                    <CustomInput
                      id="forecastCategory"
                      name={`pipelineStages[${order}].pipelineStageCategory`}
                      title="Forecast Category"
                      label="Forecast Category"
                      placeholder="Enter the forecast category"
                      fullWidth
                      value={values.pipelineStages?.[order]?.pipelineStageCategory}
                      onChange={handleChange}
                    />
                  )}

                  <CustomIconButton startIcon={<PlusIcon />} sx={{ p: 0.5, height: 20 }}>
                    Attach Documents
                  </CustomIconButton>
                </>
              )}
            </Box>
          )}
    </CardContainer>
  );
});
