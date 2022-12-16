import { ReactElement, useEffect, useRef, useState } from 'react'
import React from 'react'
import MainLayout from '../layout/mainLayout'
import type { PageWithLayout } from './_app'
import { Button, MenuItem, Pagination, Select, SelectChangeEvent } from '@mui/material'
import { AbilityList, 
  AbilityListContainer, 
  Accent, 
  ButtonStyle, 
  DialogModal, 
  DialogSection, 
  FixedContainer, 
  FlexContainer, 
  HalfContainer, 
  KeyTitle, 
  KeyValue, 
  MainContainer, 
  MoreButtonStyle, 
  PaginationText, 
  PokeCard, 
  PokeCardContainer, 
  PokeCardSectionMainTitle, 
  PokeCardSectionSubTitle, 
  PokeCardTitleContainer, 
  PokeDetailConatainer, 
  PokeDetailImage, 
  PokeDetailName, 
  PokeMainTitle, 
  PokemonPlacement, 
  PokemonPosition, 
  PokeName, 
  PokeNumber, 
  PokeSubTitle, 
  PokeType, 
  PokeTypeContainer, 
  SectionContainer, 
  SmallPokeType, 
  SpaceContainer } from '../components/styled'
import { APICallP } from '../utils/axios'
import Image from 'next/image'
import { OFFICIAL_API_POKEMON, Pokemon } from '../utils/consts'
import placeholder from '../public/pokemon.png';
import { useRouter } from 'next/router'
import bulbasaur from '../public/bulbasur.png';
import charmander from '../public/charmander.png';
import squirtle from '../public/squirtle.png';


const Main: PageWithLayout = () => {
  const router = useRouter()

  const [open, setOpen] = useState(false)
  const [pokemon, setPokemon] = useState([]);
  const [count, setCount] = useState(0);
  const [selected, setSelected] = useState<Pokemon>();
  const [fetching, setFetching] = useState(false);
  const [pagination, setPagination] = useState({
    page: 1,
    rowPerPage: 9
  })
  const cardSecRef = useRef<HTMLDivElement>(null);
  
  const fetchList = async () => {
    setFetching(true);
    await APICallP(`${OFFICIAL_API_POKEMON}pokemon?limit=${pagination.rowPerPage}&offset=${(pagination.page - 1) * pagination.rowPerPage}`)
    .then((res: any) => {
      const promised = res.data.results.reduce(
        (acc: any, val: Pokemon) => {
        acc.push(
          APICallP(val.url)
          .then(( x: any ) => { return x.data })
          .catch(e => console.error(e)));
        return acc;
      }, []);
      Promise.all(promised).then((pokemonsDetail : any) => {
        setPokemon(pokemonsDetail);
        setCount(res.data.count);
      }).catch((e) => {
        console.error(e);
      })
    })
    .catch((err) => console.log(err))
    .finally(() => {
      setFetching(false);
    });
  }

  useEffect(() => {
    fetchList();
  }, [pagination]);

  const scrollToRef = () => {
    cardSecRef?.current?.scrollIntoView();
  }

  const handleChangePage = (e: any, value: number) => {
    setPagination({
      page: value,
      rowPerPage: pagination.rowPerPage
    })
    scrollToRef();
  }

  const handleChangeRowsPerPage = (event: SelectChangeEvent) => {
    setPagination({
      page: 1,
      rowPerPage: Number(event.target.value) as number
    })
    scrollToRef();
  }

  const handleOpen = (index = -1) => {
    if (index === -1) return;
    else if (pokemon[index]) setSelected(pokemon[index]);
    setOpen(true);
  }

  const handleClose = () => {
    setOpen(false);
  }

  return (
    <React.Fragment>
      <SectionContainer background='netral' index={6}>
        <FlexContainer>
          <FixedContainer>
            <PokeMainTitle>All the Pokémon data you&apos;ll ever need in one place!</PokeMainTitle>
            <PokeSubTitle>thousand of compiled data into one</PokeSubTitle>
            <Button sx={ButtonStyle} variant="contained" onClick={() => scrollToRef()}>Check PokèDex</Button>
          </FixedContainer>
          <HalfContainer>
            <PokemonPosition>
              <PokemonPlacement top='200px' left='200px'>
                <Image src={squirtle} alt="" width={252} height={252} />
              </PokemonPlacement>
              <PokemonPlacement top='300px' left='300px'>
                <Image src={bulbasaur} alt="" width={252} height={252} />
              </PokemonPlacement>
              <PokemonPlacement top='400px' left='400px'>
                <Image src={charmander} alt="" width={252} height={252} />
              </PokemonPlacement>
            </PokemonPosition>
          </HalfContainer>
        </FlexContainer>
      </SectionContainer>
      <SectionContainer background="card" ref={cardSecRef} index={5}>
        <Accent top='-15%' left='-15%' right='' bottom='' rotation='90' opacity={.5} color='netral' />
        <Accent top='' left='' right='-15%' bottom='-15%' rotation='90' opacity={.5} color='netral' />

        <PokeCardTitleContainer>
          <PokeCardSectionSubTitle>All Generation totaling {count} Pokemon</PokeCardSectionSubTitle>
        </PokeCardTitleContainer>
        <PokeCardContainer>
          {
            fetching 
            ? (
              <div>...loading</div>
            )
            : pokemon.map((poke: Pokemon, index) => (
                <PokeCard key={`poke-${index}`} onClick={() => handleOpen(index)}>
                  <Image 
                    alt={poke.name} 
                    src={!fetching 
                      ? poke?.sprites?.other?.['official-artwork']?.front_default 
                        || poke?.sprites?.front_default 
                      : placeholder} 
                    height={275}
                    width={275} 
                  />
                  <PokeNumber>{poke.id}</PokeNumber>
                  <PokeName>{poke.name}</PokeName>
                  <PokeTypeContainer>
                    {
                      poke.types.map((poketype: any, index: number) => (
                        <PokeType key={`type-${index}`} type={poketype?.type?.name}>{poketype?.type?.name}</PokeType>
                      ))
                    }
                  </PokeTypeContainer>
                </PokeCard>
              ))
            }
        </PokeCardContainer>
        <SpaceContainer className='pb-54'>
          <PaginationText type='netral'>Per Page: 
            <Select
              value={pagination.rowPerPage.toString()}
              label="Age"
              onChange={handleChangeRowsPerPage}
              sx={{
                '.MuiOutlinedInput-notchedOutline': {
                  borderColor: '#FFFFFF',
                  borderWidth: '3px',
                  color: '#FFFFFF'
                },
                '.MuiSelect-icon' : {
                  color: '#FFFFFF'
                },
                '.MuiSelect-select': {
                  color: '#FFFFFF'
                }
              }}
              
            >
              <MenuItem value={9}>9</MenuItem>
              <MenuItem value={18}>18</MenuItem>
              <MenuItem value={27}>27</MenuItem>
            </Select>
        </PaginationText>
          <Pagination 
            count={(Math.ceil(count / pagination.rowPerPage))} 
            showFirstButton 
            showLastButton
            page={pagination.page} 
            onChange={handleChangePage} 
            shape='rounded'
            variant='outlined'
            size="large"
            sx={{
              '.MuiPaginationItem-rounded' : {
                color: '#FFFFFF',
                borderColor: '#FFFFFF'
              },
              '.Mui-selected': {
                backgroundColor: '#FFFFFF !important',
                color: '#FFCB3B',
              },
            }}
          />
          <PaginationText type='netral'>Total Data: {count}</PaginationText>
        </SpaceContainer>
      </SectionContainer>

      <DialogModal
        onClose={handleClose}
        open={open}
        fullWidth
        maxWidth="md"
      >
        <DialogSection>
          {
            selected && (
              <MainContainer>
                <FlexContainer>
                  <PokeDetailImage>
                    <Image width={400} height={400} alt={selected.name} src={selected?.sprites?.other?.['official-artwork']?.front_default 
                      || selected?.sprites?.front_default } />
                  </PokeDetailImage>
                  <PokeDetailConatainer>
                    <PokeDetailName>{selected.name}</PokeDetailName>
                    <SpaceContainer>
                      <FlexContainer>
                        <KeyTitle>Weight</KeyTitle>
                        <KeyValue>{selected.weight}</KeyValue>
                      </FlexContainer>
                      <FlexContainer>
                        <KeyTitle>Height</KeyTitle>
                        <KeyValue>{selected.height}</KeyValue>
                      </FlexContainer>
                    </SpaceContainer>
                    <FlexContainer>
                      <KeyTitle>Abilities</KeyTitle>
                      <AbilityListContainer>
                        {
                          (selected.abilities || []).map((ab, index) => (
                            <AbilityList key={`ability-${index}`}>{ab?.ability?.name} {ab.isHidden ? '(hidden)' : ''}</AbilityList>
                          ))
                        }
                      </AbilityListContainer>
                    </FlexContainer>
                    <FlexContainer>
                      <KeyTitle>Type</KeyTitle>
                      <PokeTypeContainer>
                        {
                          (selected.types || []).map((ty, index) => (
                            <SmallPokeType 
                              key={`type-${index}`} 
                              type={ty.type.name}
                            >
                              {ty.type.name}
                            </SmallPokeType>
                          ))
                        }
                      </PokeTypeContainer>
                    </FlexContainer>
                    <Button sx={MoreButtonStyle} variant="contained" onClick={() => router.push(`/${selected.name}`)}>More Detail</Button>
                  </PokeDetailConatainer>
                </FlexContainer>
              </MainContainer>
            )
          }
        </DialogSection>
      </DialogModal>
    </React.Fragment>
  )
}

Main.getLayout = function getLayout(page: ReactElement) {
  return (
    <MainLayout title="PokèDex">{page}</MainLayout>
  )
}

export default Main