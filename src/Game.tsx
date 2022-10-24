import { useEffect, useState } from 'react';
import { Board } from './components/board';
import { Card } from './components/card';
import { CardList } from './components/cart-list';
import { WinModal, WinModalContent, WinModalTitle } from './components/win-modal';
import { MemoryCard } from './model';
import { generateRandom } from './utils';

export interface MemoryProps {
  size: number;
  duration: number;
}

function MemoryGame({ size, duration }: MemoryProps) {

  const [items, setItems] = useState<MemoryCard[]>([]);
  const [history, setHistory] = useState<number[]>([]);
  const [locked, setLocked] = useState(false);

  const handleItemClick = (clickedIndex: number) => {
    if (locked) return

    const newHistory = [...history, clickedIndex]
    const tmpItems = [...items];

    displayLastPlayedCard(clickedIndex);

    if (!isFirstPlay() && !twoLastPlayedCardsMatch(newHistory)) {
      setLocked(true);

      setTimeout(() => {
        hideTwoLastPlayedCards(newHistory);
        setLocked(false);
      }, duration);
    }

    setItems(tmpItems);
    setHistory(newHistory);
  }

  const displayLastPlayedCard = (clickedIndex: number) => {
    const temporary = [...items];
    temporary[clickedIndex].visible = true;
    setItems(temporary)
  }
  const twoLastPlayedCardsMatch = (history: number[]) => {
    return items[history[history.length - 1]].value === items[history[history.length - 2]].value;
  }
  const hideTwoLastPlayedCards = (history: number[]) => {
    const temporary = [...items];
    temporary[history[history.length - 1]].visible = false;
    temporary[history[history.length - 2]].visible = false;
    setItems(temporary)
  }

  const isFirstPlay = () => history.length % 2 === 0
  const isFinished = () => items.findIndex(item => !item.visible) === -1;

  useEffect(() => {
    setItems(generateRandom(size));
  }, []);

  if (size % 2 !== 0) {
    return <p>The size must be an even number.</p>
  }
  if (size <= 2) {
    return <p>The size must be greater then 2.</p>
  }

  return (
    <Board>
      <CardList>
        {items.map((item, index) => (
          <Card key={index} visible={item.visible} onClick={() => handleItemClick(index)}>
            {item.value}
          </Card>
        ))}
      </CardList>
      {isFinished() && (<WinModal>
        <WinModalTitle>You win !</WinModalTitle>
        <WinModalContent>in {history.length} clicks</WinModalContent>
      </WinModal>)}
    </Board>
  );
}

export default MemoryGame;
