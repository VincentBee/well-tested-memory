import { act, render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Element } from './components/card';
import MemoryGame, { MemoryProps } from './Game';
import { mockGenerateRandom } from './given';

beforeAll(() => {
  jest.useFakeTimers('modern')
});

beforeEach(() => {
  givenOptions()
  givenGeneration([1, 1, 2, 2, 3, 3])
})

afterAll(() => {
  jest.useRealTimers()
});

test('Should display 6 interogations points if size is 6', () => {
  whenStartMemoryGame()
  expectMemoryLooksLike(['?', '?', '?', '?', '?', '?'])
});

test('Should display 10 interogations points if size is 10', () => {
  givenOptions({ size: 10 })
  givenGeneration([1, 1, 2, 2, 3, 3, 4, 4, 5, 5])
  whenStartMemoryGame()
  expectMemoryLooksLike(['?', '?', '?', '?', '?', '?', '?', '?', '?', '?'])
});

test('Should not be possible to create a game with odd size', () => {
  givenOptions({ size: 3 });
  whenStartMemoryGame();
  expectDoNotStartGame('The size must be an even number.')
})

test('Should not be possible to create a game with size under 2', () => {
  givenOptions({ size: 2 });
  whenStartMemoryGame();
  expectDoNotStartGame('The size must be greater then 2.')
})

test('Should display a card value when click on it', () => {
  whenMultipleClicks('2')
  expectMemoryLooksLike(['?', '1', '?', '?', '?', '?'])
});

test('should display the second card 3s is not match', () => {
  whenMultipleClicks('45')
  expectMemoryLooksLike(['?', '?', '?', '2', '3', '?'])
})

test('should not hide the second card if match', () => {
  whenMultipleClicks('43')
  expectMemoryLooksLike(['?', '?', '2', '2', '?', '?'])
})

test('should hide the first and the second after 3s if not match', () => {
  whenMultipleClicks('45---')
  expectMemoryLooksLike(['?', '?', '?', '?', '?', '?'])
})

test('should wait 5s before hidding not matchine pair', () => {
  givenOptions({ duration: 5000 })
  whenMultipleClicks('45---')
  expectMemoryLooksLike(['?', '?', '?', '2', '3', '?'])
})

test('should display a third card after a match and a click', () => {
  whenMultipleClicks('43---1')
  expectMemoryLooksLike(['1', '?', '2', '2', '?', '?'])
})

test('should not display a third card if animation not complete', () => {
  givenOptions({ duration: 5000 })
  whenMultipleClicks('45---1')
  expectMemoryLooksLike(['?', '?', '?', '2', '3', '?'])
})

test('should not display the win message until win', () => {
  whenStartMemoryGame()
  expectWinMessage().not.toBeInTheDocument();
})

test('should display win when all card are visible', () => {
  whenMultipleClicks('12---34---56')
  expectWinMessage().toBeInTheDocument();
})

test('should display the number of click of the game', () => {
  whenMultipleClicks('12---34---56')
  expectScoreOf(6).toBeInTheDocument()
})

test('should display the number of click of the game with mistakes', () => {
  whenMultipleClicks('16---12---34---56')
  expectScoreOf(8).toBeInTheDocument()
})

test('should not take the click in the count when made during animation', () => {
  whenMultipleClicks('1634---12---34---56')
  expectScoreOf(8).toBeInTheDocument()
})

const defaultOptions: MemoryProps = {
  size: 6,
  duration: 2000
}
let currentOptions = defaultOptions;
const givenOptions = (options: Partial<MemoryProps> = {}) => {
  currentOptions = {
    ...defaultOptions,
    ...options
  }
}
const givenGeneration = (expectedNumbers: number[]) => {
  mockGenerateRandom.mockReturnValue(expectedNumbers.map(value => ({
    value: value,
    visible: false,
  })))
}

const whenStartMemoryGame = () => {
  render(<MemoryGame {...currentOptions} />)
}
const whenClick = (position: number) => {
  userEvent.click(getItems()[position - 1]);
}
const whenMultipleClicks = (events: string) => {
  whenStartMemoryGame();
  for (let i = 0; i < events.length; i++) {
    if (events[i] === '-') {
      whenWait(1000);
    } else {
      whenClick(parseInt(events[i]))
    }
  }
}


const whenWait = (miliseconds: number) => {
  act(() => {
    jest.advanceTimersByTime(miliseconds);
  })
}
 
const getItems = () => screen.getAllByRole('listitem');
const expectMemoryLooksLike = (expectVisual: string[]) => {
  getItems().forEach((item, index) => {
    expect(within(item).getByText(expectVisual[index])).toBeInTheDocument();
    if (expectVisual[index] === "?") {
      expect(item.querySelector(`.${Element.styledComponentId}`)).not.toHaveStyleRule('transform');
    } else {
      expect(item.querySelector(`.${Element.styledComponentId}`)).toHaveStyleRule('transform', 'rotateY(180deg)');
    }
  })
}
function expectDoNotStartGame(message: string) {
  expect(screen.getByText(message)).toBeInTheDocument();
}
const expectWinMessage = () => expect(screen.queryByText('You win !'))
const expectScoreOf = (count: number) => expect(screen.getByText(`in ${count} clicks`))

