const mockData = [...Array(59).keys()].map((x) => ({ id: x + 1, name: `name-${x + 1}` }))
type PageData<T> = {
  count: number
  page: number
  page_size: number
  data: T[]
}
const mockFetchPageData = (params: { page: number; page_size: number }): Promise<PageData<any>> => {
  console.log(params, 'params')
  const { page, page_size } = params
  return new Promise((resolve) => {
    setTimeout(() => {
      const startIndex = (page - 1) * page_size
      const endIndex = startIndex + page_size
      const data = mockData.slice(startIndex, endIndex)
      resolve({
        count: mockData.length,
        page,
        page_size,
        data
      })
    }, 1000) // 模拟网络延迟
  })
}
