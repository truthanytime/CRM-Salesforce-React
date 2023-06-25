import { Box, Divider, Typography, IconButton } from '@mui/material';
import update from 'immutability-helper';
import { FC, memo, useCallback, useState, useContext } from 'react';
import { useDrop } from 'react-dnd';

import { Card, Item, ItemTypes } from './Card';
import { ThirdMain, CardPanel, CardAddBox } from './ui';
import { ReactComponent as ArrowLeft } from 'assets/icons/navBack.svg';
import { ReactComponent as CrossIcon } from 'assets/icons/cross.svg';
import { ButtonGroup, ModalFooter, BackTo, ModalContainer, ModalHeader } from '../../ui';
import { LoadingButton, TextButton } from 'components/ui';
import { PipelineFormContext, PipelineFormSteps } from 'pages/HyperFunnel/PipelinesProvider';
import { useFormikContext } from 'formik';
import { usePipelines } from 'pages/HyperFunnel/PipelinesProvider';
import { Pipeline, PipelineStage } from 'pages/HyperFunnel/PipelinesProvider';

export interface ContainerState {
  cards: any[];
}

interface DealStageType {
  value: string;
  color: string;
}

export const DEAL_STAGE_TYPES: DealStageType[] = [
  { value: 'Pre-Sales', color: 'primary.main' },
  { value: 'Sales', color: 'green.main' },
  { value: 'Post-Sales', color: 'orange.main' },
];

export const Container: FC = memo(function Container() {
  const [hoverIndex, setHoverIndex] = useState<number | undefined>();
  const { baseStages, createPipeline, setEditPipeline } = usePipelines();
  const { onClose, setStep } = useContext(PipelineFormContext);
  const { values, setValues, setFieldValue } = useFormikContext<Pipeline>();
  const cards = values.pipelineStages;

  const { editPipeline } = usePipelines();

  const findCard = useCallback(
    (cardItem: PipelineStage) => {
      setHoverIndex(undefined);
      return {
        card: cardItem,
        index: cards.indexOf(cardItem),
      };
    },
    [cards],
  );

  const moveCard = useCallback(
    (cardItem: PipelineStage, atIndex: number) => {
      const { card, index } = findCard(cardItem);
      setHoverIndex(undefined);
      setValues(
        update(values, {
          pipelineStages: {
            $splice: [
              [index, 1],
              [atIndex, 0, card],
            ],
          },
        }),
      );
    },
    [findCard, values, setValues],
  );

  const hoverCard = useCallback(
    (index: number) => {
      setHoverIndex(index);
    },
    [setHoverIndex],
  );

  const addCard = useCallback(
    (card: PipelineStage, index: number) => {
      const newCards = [
        ...cards.slice(0, index),
        {
          ...card,
          createdAt: new Date(),
        },
        ...cards.slice(index),
      ];
      setFieldValue('pipelineStage', newCards);
    },
    [setFieldValue, cards],
  );

  const [{ isOver }, drop] = useDrop(
    () => ({
      accept: ItemTypes.CARD,
      drop: ({ card, isDemo }: Item) => {
        if (!isDemo || hoverIndex === undefined) return;
        addCard(card, hoverIndex);
      },
      collect: (monitor: any) => ({
        isOver: monitor.isOver(),
      }),
    }),
    [hoverIndex],
  );

  const [, otherDrop] = useDrop(
    () => ({
      accept: ItemTypes.CARD,
      drop: ({ card, isDemo }: Item) => {
        if (!isDemo) return;
        setValues(update(values, { pipelineStages: { $push: [{ ...card, createdAt: new Date() }] } }));
      },
    }),
    [values],
  );

  const handleDelete = useCallback(
    (index: number) => {
      setValues(update(values, { pipelineStages: { $splice: [[index, 1]] } }));
    },
    [values, setValues],
  );

  const DIVIDER = <Divider sx={{ backgroundColor: 'primary.main', my: 1, height: 2 }} />;

  const isEmpty = cards.length === 0;

  const closeModal = () => {
    onClose();
    setEditPipeline(null);
  };
  const submit = () => {
    createPipeline(values);
    closeModal();
  };

  return (
    <ModalContainer sx={{ width: 960 }}>
      <ModalHeader>
        <Typography variant="h3" sx={{ color: 'neutral.main' }}>
          {'Pipeline Stages'}
        </Typography>

        <IconButton onClick={closeModal}>
          <CrossIcon />
        </IconButton>
      </ModalHeader>
      <ThirdMain sx={{ height: 496 }}>
        <CardPanel className="left-card-panel">
          <Typography variant="b16" sx={{ mb: 1 }}>
            Stages
          </Typography>
          {DEAL_STAGE_TYPES.map((stageType, index) => (
            <Box key={index}>
              <Typography
                variant="p12"
                sx={{
                  textTransform: 'uppercase',
                  py: '12px',
                  mt: '4px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                }}
              >
                <Box sx={{ width: 6, height: 6, backgroundColor: stageType.color, borderRadius: '50%' }}>{''}</Box>
                {stageType.value} {'STAGE'}
              </Typography>
              {baseStages
                .filter((stage) => stage.type === stageType.value)
                .map((card, idx) => (
                  <Card card={card} moveCard={moveCard} findCard={findCard} isDemo key={idx} />
                ))}
            </Box>
          ))}
        </CardPanel>

        <CardPanel className="right-card-panel" sx={{ backgroundColor: 'darkBg.main' }}>
          <Typography variant="b16" sx={{ mb: 1 }}>
            Configure your Stages
          </Typography>
          <Box ref={drop} className="first">
            {cards.map((card, idx) => (
              <>
                {hoverIndex === idx && isOver && DIVIDER}
                <Card
                  card={card}
                  moveCard={moveCard}
                  findCard={findCard}
                  hoverCard={() => hoverCard(idx)}
                  deleteCard={() => handleDelete(idx)}
                  duplicateCard={() => addCard(card, idx)}
                  key={idx}
                  order={idx}
                />
              </>
            ))}
          </Box>
          <CardAddBox ref={otherDrop} sx={isEmpty ? { border: '1px dashed #CDD2DF', borderRadius: '4px' } : {}}>
            {isEmpty && (
              <>
                <Typography variant="p12" sx={{ color: 'neutral.n400' }}>
                  {'You have not added any stages yet'}
                </Typography>
                <Typography variant="p12" sx={{ color: 'neutral.n400' }}>
                  {'Drag&Drop stages from the left side here'}
                </Typography>
              </>
            )}
          </CardAddBox>
        </CardPanel>
      </ThirdMain>
      <ModalFooter>
        <BackTo onClick={() => setStep(PipelineFormSteps.SECOND)}>
          <ArrowLeft />
          <Typography variant="p12">Back to Step 2</Typography>
        </BackTo>

        <Box>
          <Typography variant="p14">{3}</Typography>
          <Typography variant="p14" sx={{ color: 'neutral.n400' }}>
            {' / 3'}
          </Typography>
        </Box>

        <ButtonGroup>
          <TextButton sx={{ marginRight: 3 }} onClick={() => onClose}>
            Cancel
          </TextButton>
          <LoadingButton variant="contained" onClick={submit}>
            {editPipeline ? 'Update Pipeline' : 'Create Pipeline'}
          </LoadingButton>
        </ButtonGroup>
      </ModalFooter>
    </ModalContainer>
  );
});
