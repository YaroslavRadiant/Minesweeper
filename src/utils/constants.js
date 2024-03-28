export const Mine = -1

export const Mask = {
  Transparent: { key: 0 },
  Fill: { key: 1 },
  Flag: { key: 2 },
  Question: { key: 3 },
}

export const mapMaskToView = {
  [Mask.Transparent.key]: null,
  [Mask.Fill.key]: '',
  [Mask.Flag.key]: '🚩',
  [Mask.Question.key]: '❓',
}
