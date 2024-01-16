import { User } from "../interfaces/types.d"

const APP_URL = 'https://randomuser.me/api/?results=10&seed=users&page='

export const fetchUsers = async ( { pageParam = 1 }: { pageParam?: number }) => {
  try {
        const resp = await fetch(APP_URL+`${pageParam}`)
        
        if(!resp.ok){
             throw new Error("Not fecth Data")   
        }
        const response = await resp.json()
        const currentPage  = Number(response.info.page)
        const nextCursor = currentPage > 10 ? undefined : currentPage + 1
        return {
            users: response.results as User[],
            nextCursor
        }
    } catch (data) {
        return {users: []}
    }
}