import useSWR from 'swr'

const fetcher = (url: string) => fetch(url).then((res) => res.json())

export function useRemaining() {
  const { data, mutate, isLoading } = useSWR(`/api/remaining`, fetcher, {
    revalidateOnReconnect: false,
    revalidateOnFocus: false
  })

  return {
    data,
    mutate,
    isLoading
  }
}
