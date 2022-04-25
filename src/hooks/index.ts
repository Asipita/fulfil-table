import { useQuery } from "react-query";

async function getter(url: string) {
  const response = await fetch(url);
  const result = await response.json();
  return result;
}

export function usePosts(page: number) {
  return useQuery(["posts", page], () =>
    getter(
      `https://jsonplaceholder.typicode.com/photos?_page=${page}&_limit=100`
    )
  );
}
