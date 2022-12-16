import { ReactElement, useEffect, useState } from 'react'
import React from 'react'
import { 
  AbilityList, 
  AbilityListContainer, 
  EvolutionBorder, 
  EvolutionChain, 
  EvolutionFlexContainer, 
  EvolutionTitle, 
  EvolutionWrapper, 
  FlexContainer, 
  KeyTitle, 
  KeyValue, 
  MainContainer, 
  PokeDetailConatainer, 
  PokeDetailImage, 
  PokeDetailName, 
  PokeTypeContainer, 
  SectionContainer, 
  SmallPokeType, 
  SpaceContainer, 
  Sprites, 
  Stats, 
  StatsValue, 
  TitleSection, 
  WrapFlexContainer } from '../components/styled'
import MainLayout from '../layout/mainLayout'
import type { PageWithLayout } from './_app'
import { OFFICIAL_API_POKEMON, Pokemon } from '../utils/consts'
import { APICallP } from '../utils/axios'
import { useRouter } from 'next/router'
import { TransContent } from '../utils/trans-content'
import Image from 'next/image'

const Detail: PageWithLayout = () => {
  const router = useRouter()
  const { locale } = router;
  const trans = TransContent[locale || 'en'];
  const { slug } = router.query;
  const [pokeDetail, setPokeDetail] = useState<Pokemon | null>(null);
  const [evolution, setEvolution] = useState([]);
  const [image, setImage] = useState([]);
  const [error, setError] = useState(false);
  
  const checkEvolution: any = (currentData : any = [], evolves: any) => {
    const newData = [...currentData];
    if (evolves?.species?.name) newData.push(
      APICallP(`${OFFICIAL_API_POKEMON}pokemon/${evolves.species.name}`).then((res) => res.data).catch(() => null)
      );
    if (evolves?.evolves_to?.length) {
      return checkEvolution(newData, evolves.evolves_to[0]);
    } else {
      return newData;
    }
  }

  const fetchDetail = async () => {
    if (!slug) return;
    await APICallP(`${OFFICIAL_API_POKEMON}pokemon/${slug}`).then((res : any) => {
      setPokeDetail(res.data);
 
      if (res?.data?.species) {
        APICallP(res?.data?.species?.url).then((species : any) => {
          APICallP(species.data.evolution_chain.url).then((evo: any) => {
            const res = evo.data.chain;
            const evolutionChainsPromise = checkEvolution([], res);
            Promise.all(evolutionChainsPromise).then((evolutionRes : any) => {
              setEvolution(evolutionRes)
            }).catch((e: any) => {
              console.error(e);
            })
          })
        }).catch((e) => {
          setEvolution([]);
        })
      }

      const imageSet : any = [];
      const imageData = res.data.sprites;
      if (imageData) {
        for (const key in imageData) {
          if (imageData[key] && typeof imageData[key] === 'string') imageSet.push(res.data.sprites[key])
        }
      }
      setImage(imageSet);
      setError(false);
    }).catch(() => {
      setError(true);
    })
  }

  useEffect(() => {
    fetchDetail();
  }, [slug]);

  if (!pokeDetail || error) return null
  return (
    <MainContainer>
      <SectionContainer background='netral' index={1}>
        <FlexContainer>
          <PokeDetailImage>
            <Image 
              width={400} 
              height={400} 
              alt={pokeDetail.name} 
              src={pokeDetail.sprites?.other?.['official-artwork']?.front_default 
                || pokeDetail.sprites?.front_default } />
          </PokeDetailImage>
          <PokeDetailConatainer>
            <PokeDetailName>{pokeDetail.name}</PokeDetailName>
            <SpaceContainer>
              <FlexContainer>
                <KeyTitle>{trans.weight}</KeyTitle>
                <KeyValue>{pokeDetail.weight}</KeyValue>
              </FlexContainer>
              <FlexContainer>
                <KeyTitle>{trans.height}</KeyTitle>
                <KeyValue>{pokeDetail.height}</KeyValue>
              </FlexContainer>
            </SpaceContainer>
            <FlexContainer>
              <KeyTitle>{trans.abilities}</KeyTitle>
              <AbilityListContainer>
              {
                (pokeDetail.abilities || []).map((ab, index) => (
                  <AbilityList key={`ability-${index}`}>{ab?.ability?.name} {ab.isHidden ? '(hidden)' : ''}</AbilityList>
                ))
              }
              </AbilityListContainer>
            </FlexContainer>
            <FlexContainer>
              <KeyTitle>{trans.type}</KeyTitle>
              <PokeTypeContainer>
                {
                  (pokeDetail.types || []).map((ty, index) => (
                    <SmallPokeType 
                      key={`type-${index}`} 
                      type={ty.type.name}
                      onClick={() => router.push(`/type?s=${ty.type.name}`)}
                    >
                      {trans[ty.type.name]}
                    </SmallPokeType>
                  ))
                }
              </PokeTypeContainer>
            </FlexContainer>
          </PokeDetailConatainer>
        </FlexContainer>
      </SectionContainer>
      <SectionContainer background='netral' index={1}>
        <TitleSection>{trans.oImages}</TitleSection>
        <WrapFlexContainer>
          {
            image.map((img, index) => (
              <Sprites key={`image-${index}`}>
                <Image width={169.17} height={169.17} alt={`image-${index}`} src={img} />
              </Sprites>
            ))
          }
        </WrapFlexContainer>
      </SectionContainer>
      <SectionContainer background='netral' index={1}>
        <TitleSection>{trans.stats}</TitleSection>
        <FlexContainer>
          {
            pokeDetail.stats.map((st, index) => (
              <Stats key={`stat-${index}`} index={index}>
                <StatsValue index={index}>{st.base_stat}</StatsValue>
                <KeyValue>{st.stat?.name}</KeyValue>
              </Stats>
            ))
          }
        </FlexContainer>
      </SectionContainer>
      <SectionContainer background='netral' index={1}>
        <TitleSection>{trans.evolution}</TitleSection>
        <EvolutionFlexContainer>
          {
            evolution.map((ev: any, index) => (
              <EvolutionChain key={`ev-${index}`} onClick={() => router.push(`/${ev.name}`)}>
                <EvolutionWrapper>
                  <EvolutionBorder index={index}>
                    <Image 
                      src={ev.sprites?.other?.['official-artwork']?.front_default 
                      || ev.sprites?.front_default}
                      alt={ev.name}
                      width={120}
                      height={120}
                    />
                  </EvolutionBorder>
                  <EvolutionTitle>{ev.name}</EvolutionTitle>
                </EvolutionWrapper>
              </EvolutionChain>
            ))
          }
        </EvolutionFlexContainer>
      </SectionContainer>
    </MainContainer>
  )
}

Detail.getLayout = function getLayout(page: ReactElement) {
  return (
    <MainLayout title="Pokèmon Detail">{page}</MainLayout>
  )
}

export default Detail