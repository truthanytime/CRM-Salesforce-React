import { Box, Divider, Typography, TextField, InputAdornment } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { FC, memo, useCallback, useState, useContext, useEffect } from 'react';
import { useDrop } from 'react-dnd';

import { Card, Item, ItemTypes } from './Card';
import { ThirdMain, CardPanel, CardAddBox } from './ui';
import { useMigration } from 'store/migration/hooks';

export enum matchingTypeEnum {
  ExactMatch = 'ExactMatch',
  FuzzyMatch = 'FuzzyMatch',
  Ignore = 'Ignore',
}

export enum matchCriteriaValue {
  'NearlyExactMatch' = 0.99,
  'VerySimilarMatch' = 0.95,
  'FairlySimilarMatch' = 0.9,
  'SimilarMatch' = 0.8,
  'LooselySimilarMatch' = 0.7,
}

export type DuplicateDetectionRule = {
  field: string;
  matchingType?: matchingTypeEnum;
  operator?: matchCriteriaValue;
  createdAt?: Date;
};

export const Container: FC = memo(function Container() {
  const {
    data: { migratedTableField },
  } = useMigration();

  const [searchText, setSearchText] = useState<string>('');
  const [hoverIndex, setHoverIndex] = useState<number | undefined>();
  const [baseCards, setBaseCards] = useState<DuplicateDetectionRule[]>([]);
  const [cards, setCards] = useState<DuplicateDetectionRule[]>([]);

  const findCard = useCallback(
    (cardItem: DuplicateDetectionRule) => {
      setHoverIndex(undefined);
      return {
        card: cardItem,
        index: cards.indexOf(cardItem),
      };
    },
    [cards],
  );

  const moveCard = useCallback(
    (cardItem: DuplicateDetectionRule, atIndex: number) => {
      const { card, index } = findCard(cardItem);
      setHoverIndex(undefined);

      const temp = [...cards];
      temp.splice(index, 1);
      temp.splice(atIndex, 0, card);
      setCards(temp);
    },
    [findCard, cards],
  );

  const hoverCard = useCallback(
    (index: number) => {
      setHoverIndex(index);
    },
    [setHoverIndex],
  );

  const addCard = useCallback(
    (card: DuplicateDetectionRule, index: number) => {
      const temp = [...cards];
      const firstHalf = temp.slice(0, index);
      const lastHalf = temp.slice(index);
      setCards([
        ...firstHalf,
        {
          ...card,
          createdAt: new Date(),
        },
        ...lastHalf,
      ]);
    },
    [cards],
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
        const temp = [...cards];
        temp.push({
          ...card,
          createdAt: new Date(),
        });
        setCards(temp);
      },
    }),
    [cards],
  );

  const handleDelete = useCallback(
    (index: number) => {
      const temp = [...cards];
      temp.splice(index, 1);
      setCards(temp);
    },
    [cards],
  );

  const handleSearchTextChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);
  }, []);

  useEffect(() => {
    if (migratedTableField && migratedTableField.length !== 0) {
      const temp = migratedTableField.map((item) => {
        return {
          field: item.fieldName,
        };
      });
      setBaseCards(temp);
    }
  }, [migratedTableField]);
  const DIVIDER = <Divider sx={{ backgroundColor: 'primary.main', my: 1, height: 2 }} />;

  const isEmpty = cards.length === 0;

  return (
    <ThirdMain sx={{ height: 496, display: 'flex', flex: 4, mt: 2 }}>
      <CardPanel className="left-card-panel" sx={{ flex: 1, marginRight: 3, backgroundColor: 'darkBg.main' }}>
        <Typography variant="b16" sx={{ mb: 1 }}>
          Table Fields
        </Typography>
        <TextField
          size="small"
          variant="outlined"
          placeholder="Search"
          onChange={handleSearchTextChange}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
          sx={{
            bgcolor: 'white',
            width: '228px',
            '& .MuiOutlinedInput-root .MuiInputBase-input': {
              paddingLeft: '0',
            },
          }}
        />
        {baseCards
          .filter((item) => item.field.toLowerCase().includes(searchText.toLowerCase()))
          .map((card, idx) => (
            <Card card={card} moveCard={moveCard} findCard={findCard} isDemo key={idx} />
          ))}
      </CardPanel>

      <CardPanel className="right-card-panel" sx={{ backgroundColor: 'darkBg.main', flex: 3 }}>
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
  );
});
