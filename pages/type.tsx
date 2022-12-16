import { ReactElement, useEffect, useState } from 'react'
import React from 'react'
import { Accent, MainTypeContainer, 
  PaginationText, 
  PokemonBoxTableContainer, 
  PokemonTableTitleId, 
  PokemonTableTitleName, 
  PokemonTypeNavbar, 
  PokemonTypeNavbarList, 
  PokemonTypeNavbarListItem, 
  PokemonTypeNavbarTitle, 
  PokemonTypePageCard, 
  PokemonTypePageColumn, 
  PokemonTypePageTitle, 
  SpaceContainer, 
  TableContainer, 
  TinyPokeType, 
  WrapFlexContainer } from '../components/styled'
import MainLayout from '../layout/mainLayout'
import type { PageWithLayout } from './_app'
import Image from 'next/image'
import { APICallP } from '../utils/axios'
import { OFFICIAL_API_POKEMON, Pokemon, POKEMON_TYPES } from '../utils/consts'
import placeholder from '../public/pokemon.png';
import { useRouter } from 'next/router'
import { MenuItem, Pagination, Select, SelectChangeEvent } from '@mui/material'
import { TransContent } from '../utils/trans-content'

const Type: PageWithLayout = () => {
  const router = useRouter()
  const { locale } = router;
  const trans = TransContent[locale || 'en'];
  const { query: { s }} = router;
  const baseType : any = s || 'normal';
  const [selectedType, setSelectedType] = useState<keyof typeof POKEMON_TYPES>(baseType);
  const [typeList, setTypeList] = useState([]);
  const [pokemonList, setPokemonList] = useState([]);
  const [pagination, setPagination] = useState({
    page: 1,
    rowsPerPage: 9,
    type: 'full'
  })
  const [pokemonChunk, setPokemonChunk] = useState([]);
  const [count, setCount] = useState(0);
  const [fetching, setFetching] = useState(true);

  const fetchTypes = async () => {
    await APICallP(`${OFFICIAL_API_POKEMON}type`)
    .then((types: any) => {
      setTypeList(types.data.results);
    }).catch(() => {
      setTypeList([]);
    })
  }

  const fetchPokemons = async () => {
    const page = pagination.page;
    await APICallP(`${OFFICIAL_API_POKEMON}type/${selectedType}`)
    .then((pokemons: any) => {
      setPokemonList(pokemons.data.pokemon);
      setCount(pokemons.data.pokemon.length)
      const chunk = pokemons.data.pokemon.slice((pagination.rowsPerPage * (page - 1)), (pagination.rowsPerPage * page));
      const promised = chunk.reduce(
        (acc: any, val: any) => {
        acc.push(
          APICallP(val.pokemon.url)
          .then(( x: any ) => { return x.data })
          .catch(e => console.error(e)));
        return acc;
      }, []);
      Promise.all(promised).then((pokemonsDetail : any) => {
        setPokemonChunk(pokemonsDetail);
      }).catch((e) => {
        console.error(e);
      }).finally(() => {
        setFetching(false);
      })
    }).catch(() => {
      setPokemonList([]);
      setCount(0);
    })
  }

  const fetchChunk = async () => {
    const chunk = pokemonList.slice((pagination.rowsPerPage * (pagination.page - 1)), (pagination.rowsPerPage * pagination.page));
    const promised = chunk.reduce(
      (acc: any, val: any) => {
      acc.push(
        APICallP(val.pokemon.url)
        .then(( x: any ) => { return x.data })
        .catch(e => console.error(e)));
      return acc;
    }, []);
    Promise.all(promised).then((pokemonsDetail : any) => {
      setPokemonChunk(pokemonsDetail);
    }).catch((e) => {
      console.error(e);
    }).finally(() => {
      setFetching(false);
    })

  }

  const handleSelected = (type: keyof typeof POKEMON_TYPES) => {
    setSelectedType(type);
  }

  const handleChangePage = (e: any, value: number) => {
    setPagination({
      page: value,
      rowsPerPage: pagination.rowsPerPage,
      type: 'chunk'
    })
  }

  const handleChangeRowsPerPage = (event: SelectChangeEvent) => {
    setPagination({
      page: 1,
      rowsPerPage: Number(event.target.value) as number,
      type: 'chunk'
    })
  }

  useEffect(() => {
    fetchTypes();
    fetchPokemons();
  }, [])

  useEffect(() => {
    setPagination({
      page: 1,
      rowsPerPage: pagination.rowsPerPage,
      type: 'all'
    })
  }, [selectedType])

  useEffect(() => {
    if (pagination.type === 'chunk') {
      fetchChunk();
    } else {
      fetchPokemons();
    }
  }, [pagination]);

  return (
      <MainTypeContainer>
        <Accent top='95%' left='-15%' right='' bottom='' rotation='90' opacity={1} color={selectedType} />
        <Accent top='20%' left='' right='-15%' bottom='' rotation='90' opacity={1} color={selectedType} />
          <PokemonTypeNavbar>
              <PokemonTypeNavbarTitle>{trans.pokemonType}</PokemonTypeNavbarTitle>
              <PokemonTypeNavbarList>
                {
                  typeList.map((types: any, index) => (
                    <PokemonTypeNavbarListItem 
                      key={`type-${index}`} 
                      active={selectedType === types.name} 
                      color={types.name} 
                      onClick={() => handleSelected(types.name)}>
                        {trans[types.name]}
                    </PokemonTypeNavbarListItem>
                  ))
                }
              </PokemonTypeNavbarList>
          </PokemonTypeNavbar>        
          <TableContainer>
            <PokemonTypePageTitle>{trans.pokemonWithType} {trans[selectedType]}</PokemonTypePageTitle>
            <PokemonTypePageCard>
              {
                fetching 
                ? <div>...loading</div>
                : pokemonChunk?.map((pokemon: Pokemon, index) => (
                  <PokemonTypePageColumn key={`pokemon-${index}`} onClick={() => router.push(`/${pokemon.name}`)}>
                    <PokemonBoxTableContainer>
                      <Image
                        alt="Pokemon Name"
                        src={!fetching ? pokemon?.sprites?.other?.['official-artwork']?.front_default 
                        || pokemon?.sprites?.front_default : placeholder}
                        width={100}
                        height={100}
                      />
                    </PokemonBoxTableContainer>
                    <PokemonBoxTableContainer>
                      <PokemonTableTitleId>{pokemon?.id}</PokemonTableTitleId>
                    </PokemonBoxTableContainer>
                    <PokemonBoxTableContainer>
                      <PokemonTableTitleName>{pokemon?.name}</PokemonTableTitleName>
                    </PokemonBoxTableContainer>
                    <WrapFlexContainer>
                      {
                        pokemon?.types?.map((poketype: any, index: number) => (
                          <TinyPokeType key={`type-${index}`} type={poketype?.type?.name}>{trans[poketype?.type?.name]}</TinyPokeType>
                        ))
                      }
                    </WrapFlexContainer>
                  </PokemonTypePageColumn>
                ))
              }
            </PokemonTypePageCard>
            <SpaceContainer className='pb-54'>
              <PaginationText type={selectedType}>Per {trans.page}: 
                <Select
                  value={pagination.rowsPerPage.toString()}
                  label="Age"
                  onChange={handleChangeRowsPerPage}
                  sx={{
                    '.MuiOutlinedInput-notchedOutline': {
                      borderColor: POKEMON_TYPES[selectedType],
                      borderWidth: '3px',
                      color: POKEMON_TYPES[selectedType]
                    },
                    '.MuiSelect-icon' : {
                      color: POKEMON_TYPES[selectedType]
                    },
                    '.MuiSelect-select': {
                      color: POKEMON_TYPES[selectedType]
                    }
                  }}
                >
                  <MenuItem value={9}>9</MenuItem>
                  <MenuItem value={18}>18</MenuItem>
                  <MenuItem value={27}>27</MenuItem>
                </Select>
            </PaginationText>
              <Pagination
                count={(Math.ceil(count / pagination.rowsPerPage))} 
                showFirstButton 
                showLastButton
                page={pagination.page} 
                onChange={handleChangePage} 
                shape='rounded'
                variant='outlined'
                size="large"
                sx={{
                  '.MuiPaginationItem-rounded' : {
                    color: POKEMON_TYPES[selectedType],
                    borderColor: POKEMON_TYPES[selectedType]
                  },
                  '.Mui-selected': {
                    backgroundColor: `${POKEMON_TYPES[selectedType]} !important`,
                    color: '#FFFFFF',
                  },
                }}
              />
              <PaginationText type={selectedType}>Total Data: {count}</PaginationText>
            </SpaceContainer>
          </TableContainer>
          
      </MainTypeContainer>
  )
}

Type.getLayout = function getLayout(page: ReactElement) {
  return (
    <MainLayout title="Pokèmon Types">{page}</MainLayout>
  )
}

export default Type