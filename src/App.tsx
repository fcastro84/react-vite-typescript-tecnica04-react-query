import { useMemo, useState } from 'react'
import './App.css'
import { SortedBy, User } from './interfaces/types.d'
import Userslist from './components/Userslist'
import useUsers from './hooks/useUsers'

function App() {

  const { users, queryClient, isError, isLoading, hasNextPage, fetchNextPage} = useUsers()

  const [showColor, setShowColor] = useState(false)
  const [sorting, setSorting] = useState<SortedBy>(SortedBy.NONE)
  const [filterCountry, setFilterCountry] = useState('')
  

  const handleToogleColor = () => {
    setShowColor(!showColor)
  }

  const handleToogleSortByCountry = () => {
    const sort = ( sorting === SortedBy.NONE || sorting === SortedBy.LAST || sorting === SortedBy.NAME) ? SortedBy.COUNTRY : SortedBy.NONE 
    setSorting(sort)
  }

  const handleSort = (sort: SortedBy) => {
    setSorting(sort)
  }

  const handleDeleteUser =  ( email: string ) => {
    const dataState = queryClient.getQueryData(['users'])
    queryClient.setQueryData(['users'], ()  => {
       const {pageParams, pages} = dataState as {pageParams : number[], pages: {users: User[], nextCursor: number}[]}
       const pagesUpdate = []
       for (let index = 0; index < pages.length; index++) {
        const element = pages[index];
        const {users, nextCursor} = element
        const userUpdate = users.filter( (user: User) => user.email !== email)
        pagesUpdate.push({users: userUpdate, nextCursor})
       }
       return {pageParams, pages: pagesUpdate}
    })
  }

  const handleReset =  () => {
     queryClient.resetQueries({queryKey: ['users'], exact: true })
     
  }
  
  const filterUser = useMemo(() => {
    return filterCountry !== '' && filterCountry.length > 0
                          ? users.filter( user => user.location.country.toLowerCase().includes(filterCountry.toLowerCase()))
                          : users
  }, [users, filterCountry])

 

  const sortingUser = useMemo(() => {
    
    //Variante 1
    // if( sorting === SortedBy.NONE) return filterUser

    // if( sorting === SortedBy.NAME){
    //   return filterUser.toSorted((a: User,b:User) => a.name.first.localeCompare(b.name.first))
    // }

    // if( sorting === SortedBy.LAST){
    //   return filterUser.toSorted((a: User,b:User) => a.name.last.localeCompare(b.name.last))
    // }

    // if( sorting === SortedBy.COUNTRY){
    //   return filterUser.toSorted((a: User,b:User) => a.location.country.localeCompare(b.location.country))
    // }

    //Variante 2
    // switch (sorting) {
    //   case SortedBy.NAME: {
    //     return filterUser.toSorted((a: User,b:User) => a.name.first.localeCompare(b.name.first))
    //   }
    //   case SortedBy.LAST: {
    //     return filterUser.toSorted((a: User,b:User) => a.name.last.localeCompare(b.name.last))
    //   }
    //   case SortedBy.COUNTRY: {
    //     return filterUser.toSorted((a: User,b:User) => a.location.country.localeCompare(b.location.country))
    //   }
    //   default:
    //     return filterUser
    // }

    //Variante 3 Midulive
    if( sorting === SortedBy.NONE) return filterUser

    const compareProperties: Record<string, (user: User) => string> = {
      [SortedBy.COUNTRY]: user => user.location.country,
      [SortedBy.NAME]: user => user.name.first,
      [SortedBy.LAST]: user => user.name.last
    }

    return filterUser.toSorted( (a, b) => {
      const extractProperty = compareProperties[sorting]
      return extractProperty(a).localeCompare(extractProperty(b))
    })
   
  }, [sorting, filterUser] )

   
  return (
    <>
      <header className="navbar bg-neutral text-neutral-content justify-center p-10 flex-col gap-4">
        <h1 className='text-center text-6xl'>Prueba Técnica (React + TypeScript + React Query)</h1>
        <p className='text-lg'>El objetivo de esta prueba técnica es crear una aplicación similar a la que se proporciona en este <a href="https://midu-react-11.surge.sh/" target='_blank' className='link ml-3 font-extrabold'> EXAMPLE </a> </p>
        <p className='text-lg'>El código final de este ejercicio lo puede encontrar en este <a href="https://github.com/fcastro84/react-vite-typescript-tecnica04-react-query" target='_blank' className='link ml-3 font-extrabold'> REPO </a> </p>
      </header>
      <nav className="menu menu-horizontal bg-white w-full border justify-center gap-4 p-4 mb-6">
        <button className='btn btn-outline btn-primary' onClick={handleToogleColor}>Colorear rows</button>
        <button className='btn btn-outline btn-primary' onClick={handleToogleSortByCountry}>Ordenar por país</button>
        <button className='btn btn-outline btn-primary' onClick={handleReset}>Resetear estado</button>
        <input type="text" className='input input-bordered w-full max-w-xs' placeholder='Filtra por país' onChange={(e) => {setFilterCountry(e.target.value)}} />
      </nav>

      {
        users.length > 0 && 
        <Userslist sortingUser={sortingUser} showColor={showColor} deleteUser={handleDeleteUser} changeSort={handleSort} />
      }

      {isLoading && (
        <>
          <span className=" justify-center loading loading-spinner text-primary w-20 h-20"></span>
          <span className=" justify-center loading loading-spinner text-primary w-20 h-20"></span>
          <span className=" justify-center loading loading-spinner text-primary w-20 h-20"></span>
        </>
       
      )}

      {isError && (
        <div role="alert" className="alert alert-error">
          <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
          <span>Error! Ocurrió un error.</span>
        </div>
      )}

      {!isLoading && !isError && users.length === 0 && (
        <div role="alert" className="alert alert-info">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="stroke-current shrink-0 w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
          <span>No hay usuarios.</span>
      </div>
      )}

      {!isLoading && !isError && hasNextPage === true && 
          <button className='btn btn-success text-white mt-4' onClick={() => { void fetchNextPage() }}>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 13.5 12 21m0 0-7.5-7.5M12 21V3" />
              </svg> Cargar más resultados
          </button>
      }
      
      {!isLoading && !isError && hasNextPage === false && (
        <div role="alert" className="alert alert-success mt-4">
          <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
          <span>No hay más resultados.</span>
      </div>
      )}
      
    </>
  )
}

export default App
