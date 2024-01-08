export const groupItems = ({ data, groupSize }: { data: Array<any>; groupSize: number }) => {
  const map = new Map()
  const numberOfGroups = Math.ceil(data.length / groupSize)

  for (let i = 0; i < numberOfGroups; i++) {
    map.set(i, [])
    for (let j = 0; j < groupSize; j++) {
      const dataIndex = i * groupSize + j
      if (dataIndex < data.length) {
        map.get(i).push(data[dataIndex])
      }
    }
  }

  return Array.from(map.values())
}
