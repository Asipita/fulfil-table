import { useQuery } from "react-query";

async function getter(url: string) {
    const response  = await fetch(url)
    const result = await response.json()

    return result
}

export function usePosts() {
    return useQuery('posts', ()=>getter('https://jsonplaceholder.typicode.com/photos?_page=1&_limit=100'))
}