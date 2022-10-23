import { MemoryCard } from "./model";

export const generateRandom = (size: number): MemoryCard[] => {
  const items = [];

  for (let i = 0; i < (size / 2); i++) {
    items.push({
      visible: false,
      value: i+1
    });
    items.push({
      visible: false,
      value: i+1
    });
  }

  return items.sort(_ => Math.random() - 0.5);
}
