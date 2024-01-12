export type Scatter = {
  type: 'scatter'
  mode: 'markers' | 'lines' | 'lines+markers'
  x: number[]
  y: number[]
  line: { shape: 'spline' | 'linear' }
  show: boolean
}

export type GraphConfig = {
  x: {
    title: string
    min?: number
    max?: number
  }
  y: {
    title: string
    min?: number
    max?: number
  }
}
