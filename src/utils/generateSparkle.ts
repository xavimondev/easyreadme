import { random } from '.'

export const generateSparkle = ({ color }: { color: string }) => {
  return {
    id: String(random({ min: 10000, max: 99999 })),
    createdAt: Date.now(),
    // Bright yellow color:
    color,
    size: random({ min: 10, max: 25 }),
    style: {
      // Pick a random spot in the available space
      top: random({ min: 0, max: 90 }) + '%',
      left: random({ min: 0, max: 100 }) + '%',
      // Float sparkles above sibling content
      zIndex: 2
    }
  }
}
