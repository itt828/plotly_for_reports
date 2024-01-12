import { parse } from 'csv-parse/browser/esm/sync'

export const xyFromCsv = (xyRaw: string) => {
  try {
    const records: number[][] = parse(xyRaw)
    if (!records.every((v) => v.length == 2)) return
    const x: number[] = records.map((v) => Number(v[0]))
    const y: number[] = records.map((v) => Number(v[1]))
    return { x, y }
  } catch (error) {
    return undefined
  }
}

export const xyToCsv = (x: number[], y: number[]) => {
  return x.map((v, i) => `${v},${y[i]}`).join('\n')
}
