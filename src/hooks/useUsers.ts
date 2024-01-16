import { useInfiniteQuery, useQueryClient } from "@tanstack/react-query"
import { fetchUsers } from "../services/fetchUsers"


const useUsers = () => {
  
    const { data, isLoading, isError, hasNextPage, fetchNextPage } = useInfiniteQuery({
        queryKey: ['users'],
        queryFn: fetchUsers,
        initialPageParam: 1,
        getNextPageParam: (lastPage) => lastPage.nextCursor,
        refetchOnWindowFocus: false,
      })
    
      const queryClient = useQueryClient()
    

      return {
        users: data?.pages.flatMap( page => page.users) ?? [],
        queryClient,
        isLoading,
        isError,
        hasNextPage,
        fetchNextPage
      }

}

export default useUsers
