import { parse } from 'csv-parse/browser/esm/sync'

export const xyFromCsv = (xyRaw: string, xx?: number, yy?: number) => {
  try {
    const xxx = xx ?? 0
    const yyy = yy ?? 1
    const records: number[][] = parse(xyRaw)
    const x: number[] = records.map((v) => Number(v[xxx]))
    const y: number[] = records.map((v) => Number(v[yyy]))
    return { x, y }
  } catch (error) {
    return undefined
  }
}

export const xyToCsv = (x: number[], y: number[]) => {
  return x.map((v, i) => `${v},${y[i]}`).join('\n')
}
