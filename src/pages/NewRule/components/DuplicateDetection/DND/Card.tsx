import { FC, useState, useMemo } from 'react';
import { memo } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import { ReactComponent as DotsIcon } from 'assets/icons/dots.svg';
import { ReactComponent as DragHandleIcon } from 'assets/icons/drag-handle.svg';
import { Box, IconButton, Typography, alpha } from '@mui/material';
import { CardContainer } from './ui';
import { CustomMenu } from 'components/CustomMenu';
import { DuplicateDetectionRule, matchCriteriaValue, matchingTypeEnum } from './Container';
import theme from 'core/theme';
import { CustomSelect } from 'components/CustomSelect';
import { useMigration } from 'store/migration/hooks';

export const ItemTypes = {
  CARD: 'card',
};

export interface Item {
  originalIndex: number;
  card: DuplicateDetectionRule;
  isDemo: boolean;
}

export interface CardProps {
  card: DuplicateDetectionRule;
  moveCard: (card: DuplicateDetectionRule, to: number) => void;
  findCard: (card: DuplicateDetectionRule) => { index: number };
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
  const {
    data: { migratedTableField },
  } = useMigration();

  const originalIndex = findCard(card).index;

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

  return (
    <CardContainer
      ref={drop}
      sx={{
        borderColor: isDemo ? 'lightBg.main' : alpha(theme.palette.primary.subtone2 as string, 1),
        backgroundColor: isDemo ? 'lightBg.main' : alpha(theme.palette.primary.subtone2 as string, 0.2),
      }}
    >
      <Box ref={drag} className="card-header">
        <IconButton sx={{ cursor: isDragging ? 'move' : 'grab' }}>
          <DragHandleIcon />
        </IconButton>

        {isDemo && (
          <Typography variant="p14" sx={{ mr: 'auto', color: isDemo ? 'neutral.main' : 'neutral.n400' }}>
            {card.field}
          </Typography>
        )}

        {!isDemo && (
          <Box sx={{ display: 'flex', flex: 4 }}>
            <CustomSelect<string>
              id={`cards[${originalIndex}].field`}
              name={`cards[${originalIndex}].field`}
              variant="outlined"
              placeholder="Field"
              value={card.field}
              options={migratedTableField.map((item) => ({
                label: item.fieldName,
                value: item.fieldName,
              }))}
              disabled={false}
              sx={{ backgroundColor: 'neutral.white', flex: 1 }}
              onSelect={async (value) => {
                // setFieldValue('where[0].table', value)
              }}
            />
            {/* <CustomSelect<string>
              id={`cards[${originalIndex}].matchingType`}
              name={`cards[${originalIndex}].matchingType`}
              variant="outlined"
              placeholder="MatchingType"
              value={card.matchingType}
              options={Object.keys(matchingTypeEnum).map(item => ({
                label: item,
                value: item
              }))}
              disabled={false}
              sx={{ backgroundColor: 'neutral.white', flex: 1 }}
              onSelect={async (value) => {
                // setFieldValue('where[0].table', value)
              }}
            />
            <CustomSelect<string>
              id={`cards[${originalIndex}].matchingCriteria`}
              name={`cards[${originalIndex}].matchingCriteria`}
              variant="outlined"
              placeholder="Field"
              value={card.operator}
              options={Object.keys(matchCriteriaValue).map(item => ({
                label: `${matchCriteriaValue[item]} ${}`
              }))}
              disabled={false}
              sx={{ backgroundColor: 'neutral.white', flex: 1 }}
              onSelect={async (value) => {
                // setFieldValue('where[0].table', value)
              }}
            /> */}
            <CustomMenu
              icon={<DotsIcon />}
              childItems={['Clear', 'Duplicate', 'Delete']}
              onSelect={handleActionSelect}
            />
          </Box>
        )}
      </Box>
    </CardContainer>
  );
});
