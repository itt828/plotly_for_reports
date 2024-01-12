export type Scatter = {
  type: 'scatter'
  mode: 'markers' | 'lines'
  x: number[]
  y: number[]
  line: { shape: 'spline' }
}
