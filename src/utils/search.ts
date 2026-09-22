import type { PickerItem } from "../types";

export const normalizeSearchText = (value: string) =>
  value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();

export const matchesPickerItem = (item: PickerItem, text: string) => {
  const normalizedText = normalizeSearchText(text);
  return (
    normalizeSearchText(item.label).includes(normalizedText) ||
    normalizeSearchText(String(item.value)).includes(normalizedText)
  );
};

export const comparePickerItems = (
  first: PickerItem,
  second: PickerItem,
  text: string,
) => {
  const normalizedText = normalizeSearchText(text);
  const firstIndex = normalizeSearchText(first.label).indexOf(normalizedText);
  const secondIndex = normalizeSearchText(second.label).indexOf(normalizedText);

  return firstIndex - secondIndex;
};
