export function createField(size, Mine, minesCount) {
  const field = new Array(size * size).fill(0)
  function inc(x, y) {
    if (x >= 0 && x < size && y >= 0 && y < size) {
      if (field[y * size + x] === Mine) return

      field[y * size + x] += 1
    }
  }

  let minesPlaced = 0
  while (minesPlaced < minesCount) {
    const x = Math.floor(Math.random() * size)
    const y = Math.floor(Math.random() * size)

    if (field[y * size + x] === Mine) continue

    field[y * size + x] = Mine

    minesPlaced += 1

    inc(x + 1, y)
    inc(x - 1, y)
    inc(x, y + 1)
    inc(x, y - 1)
    inc(x + 1, y - 1)
    inc(x - 1, y - 1)
    inc(x + 1, y + 1)
    inc(x - 1, y + 1)
  }

  return field
}
