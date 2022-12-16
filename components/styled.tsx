import styled from '@emotion/styled';

import { COLOR_VAR, POKEMON_TYPES, EVOLUTION_COLOR, STATS_COLOR } from '../utils/consts';
import { Dialog } from '@mui/material';

type StyledProps = {
  type: keyof typeof POKEMON_TYPES
}

type StyledSection = {
  background: keyof typeof COLOR_VAR,
  index: number
}

type StatColor = {
  index: number
}

type PokemonTypeNavbar = {
  active: boolean,
  color: keyof typeof POKEMON_TYPES
}

type Position = {
  left: string,
  top: string
}

type AccentProps = {
  color: keyof typeof POKEMON_TYPES,
  top: string,
  left: string,
  right: string,
  bottom: string,
  opacity: number,
  rotation: string
}

type Nav = {
  active: boolean
}

export const MainContainer = styled('div')`
  display: flex;
  flex-direction: column;
  gap: 24px;
  padding-bottom: 54px;
`

export const FlexContainer = styled('div')`
  display: flex;
  gap: 16px;
`

export const EvolutionFlexContainer = styled('div')`
  display: flex;
  gap: 54px;
`

export const SectionContainer = styled('section')<StyledSection>`
  padding: 0 142px;
  position: relative;
  z-index: ${props => props.index};
  background-color: ${props =>
    props.background ? COLOR_VAR[props.background] : '#FFF'
  };
  overflow: hidden;
`

export const LanguageContainer = styled('div')`
  display: flex;
  padding: 10px 142px;
  background-color: ${COLOR_VAR['grey']};
  justify-content: flex-end;
`

export const HeaderContainer = styled('header')`
  padding: 0 142px;
  display: flex;
  gap: 40px;
  align-items: center;
`

export const NavItems = styled('div')<Nav>`
  font-family: 'Poppins';
  font-style: normal;
  font-weight: 700;
  font-size: 16px;
  line-height: 24px;
  text-align: center;
  flex: none;
  flex-grow: 0;
  color: ${props => props.active ? '#E6AB09' : '#42494D'};
`
export const HalfContainer = styled('div')`
  width: 50%;
`
export const SmallContainer = styled('div')`
  width: 30%;
`
export const FixedContainer = styled('div')`
  max-width: 534px;
  width: 100%;
  padding: 270px 0;
`
// Title
export const PokeMainTitle = styled('p')`
  font-family: 'Poppins';
  font-style: normal;
  font-weight: 700;
  font-size: 52px;
  line-height: 78px;
  color: #42494D;
  flex: none;
  order: 0;
  flex-grow: 0;
`

export const PokeSubTitle = styled('p')`
  font-family: 'Poppins';
  font-style: normal;
  font-weight: 400;
  font-size: 20px;
  line-height: 30px;
  color: #7B8082;
  flex: none;
  order: 1;
  align-self: stretch;
  flex-grow: 0;
  padding-top: 16px;
  padding-bottom: 72px;
`

export const PokeCardTitleContainer = styled('div')`
  padding: 80px 0 58px 0;
  text-align: center;
`

export const PokeCardSectionMainTitle = styled('p')`
  font-family: 'Poppins';
  font-style: normal;
  font-weight: 700;
  font-size: 40px;
  line-height: 60px;
  color: #42494D;
  flex: none;
  order: 0;
  flex-grow: 0;
`

export const PokeCardSectionSubTitle = styled('p')`
  font-family: 'Poppins';
  font-style: normal;
  font-weight: 400;
  font-size: 24px;
  line-height: 36px;
  color: #42494D;
  flex: none;
  order: 1;
  flex-grow: 0;
`

export const ButtonStyle = {
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'center',
  alignItems: 'center',
  padding: '8px 16px',
  width: '240px',
  height: '56px',
  background: '#E6AB09',
  borderRadius: '14px',
  flex: 'none',
  order: '1',
  flexGrow: '0',
  fontWeight: '700',
  fontSize: '20px',
  lineHeight: '30px',
  color: '#FFFFFF',
  textTransform: 'none'
} as const

export const MoreButtonStyle = {
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'center',
  alignItems: 'center',
  padding: '10px 25px',
  width: '167px',
  height: '50px',
  background: '#E6AB09',
  borderRadius: '14px',

  fontFamily: 'Poppins',
  fontStyle: 'normal',
  fontWeight: '700',
  fontSize: '20px',
  lineHeight: '30px',
  color: '#FFFFFF',
  textTransform: 'none'
} as const

export const PokeCardContainer = styled('div')`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 120px;
  padding-bottom: 72px;
`

export const PokeCard = styled('div')`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 40px 24px 40px 24px;
  gap: 10px;
  width: 325.33px;
  height: auto;
  background: #FFFFFF;
  box-shadow: 5px 10px 25px rgba(0, 0, 0, 0.35);
  border-radius: 24px;
  flex: none;
  order: 0;
  flex-grow: 0;
  cursor: pointer;
`

export const PokeImage = styled('div')`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 10px;
  gap: 10px;
  width: 275px;
  height: 275px;
  background: #B3B6B8;
  flex: none;
  order: 0;
  flex-grow: 0;
`

export const PokeNumber = styled('span')`
  font-family: 'Poppins';
  font-style: normal;
  font-weight: 700;
  font-size: 20px;
  line-height: 20px;
  color: #B3B6B8;
  flex: none;
  order: 1;
  align-self: stretch;
  flex-grow: 0;
`

export const PokeName = styled('div')`
  font-family: 'Poppins';
  font-style: normal;
  font-weight: 700;
  font-size: 40px;
  line-height: 60px;
  color: #42494D;
  flex: none;
  order: 2;
  align-self: stretch;
  flex-grow: 0;
  text-transform: capitalize;
`

export const PokeType = styled('span')<StyledProps>`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  padding: 7px 25px;
  gap: 10px;
  background-color: ${props =>
    props.type ? POKEMON_TYPES[props.type] : '#FFF'
  };
  border-radius: 25px;
  font-style: normal;
  font-weight: 700;
  font-size: 20px;
  line-height: 18px;
  color: #FFFFFF;

  display: block;
  flex-grow: 0;
  flex-shrink: 1;
  flex-basis: auto;
  align-self: auto;
  order: 0;
  text-transform: capitalize;
`

export const PokeTypeContainer = styled('div')`
  display: flex;
  flex-wrap: wrap;
  order: 3;
  align-self: flex-start;
  gap: 16px;
`
export const PokeDetailConatainer = styled('div')`
  display: flex;
  flex-direction: column;
  gap: 16px;
  min-width: 240px
`

export const PokeDetailImage = styled('div')`
  width: 400px;
  height: 400px;
`
export const PokeDetailName = styled('p')`
  font-family: 'Poppins';
  font-style: normal;
  font-weight: 700;
  font-size: 40px;
  line-height: 60px;
  color: #42494D;
  text-transform: capitalize;
`
export const SpaceContainer = styled('div')`
  display: flex;
  justify-content: space-between;
`
export const KeyTitle = styled('span')`
  font-family: 'Poppins';
  font-style: normal;
  font-weight: 700;
  font-size: 20px;
  line-height: 30px;
  color: #42494D;
`

export const KeyValue = styled('span')`
  font-family: 'Poppins';
  font-style: normal;
  font-weight: 400;
  font-size: 20px;
  line-height: 30px;
  color: #42494D;
  text-transform: Capitalize;
`
export const AbilityListContainer = styled('ul')`
`
export const AbilityList = styled('li')`
  text-transform: Capitalize;
`
export const SmallPokeType = styled('span')<StyledProps>`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  padding: 7px 25px;
  gap: 14px;
  border-radius: 25px;
  background-color: ${props =>
    props.type ? POKEMON_TYPES[props.type] : '#FFF'
  };
  font-style: normal;
  font-weight: 700;
  font-size: 20px;
  line-height: 18px;
  color: #FFFFFF;
  text-transform: capitalize;
  cursor: pointer;
`
export const WrapFlexContainer = styled('div')`
  display: flex;  
  gap: 16px;
  flex-wrap: wrap;
  align-content: flex-start;
`

export const Sprites = styled('div')`
  width: 169.17px;
  height: 169.17px;
  border: 1px solid grey;
  border-radius: 8px;
`
export const Stats = styled('div')<StatColor>`
  border: 18px solid ${props => STATS_COLOR[props.index]};
  padding: 10px;
  border-radius: 50%;
  width: 169.17px;
  height: 169.17px;
  text-align: center;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
`
export const StatsValue = styled('span')<StatColor>`
  color: ${props => STATS_COLOR[props.index]};
  font-family: 'Poppins';
  font-style: normal;
  font-weight: 700;
  font-size: 50px;
  line-height: 60px;
  text-align: center;
`

export const EvolutionBorder = styled('div')<StatColor>`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 10px 50px;
  gap: 10px;
  width: 197.5px;
  height: 197.5px;
  border: 10px solid ${props => EVOLUTION_COLOR[props.index]};
  border-radius: 100px;
`

export const EvolutionChain = styled('div')`
  :not(:last-child):after {
    content: url(/arrow.svg);
  }
  display: flex;
  align-items: center;
  gap: 54px;
  cursor: pointer;
}
`
export const EvolutionImage = styled('div')`
  display: flex;
  gap: 16px;
`

export const EvolutionWrapper = styled('div')`
  display: flex;
  flex-direction: column;
  gap: 10px;
`

export const TitleSection = styled('p')`
  font-family: 'Poppins';
  font-style: normal;
  font-weight: 700;
  font-size: 20px;
  line-height: 30px;
  color: #42494D;
  padding-bottom: 30px;
`

export const DialogModal = styled(Dialog)();
export const DialogSection = styled('div')`
  min-width: 300px;
  background-color: #FFFFFF;
  padding: 36px;
`;

export const EvolutionTitle = styled('p')`
  font-family: 'Poppins';
  font-style: normal;
  font-weight: 700;
  font-size: 20px;
  line-height: 30px;
  text-align: center;
  color: #42494D;
  text-transform: Capitalize;
`;

export const PaginationText = styled('div')<StyledProps>`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 0px;
  gap: 21.41px;  
  font-weight: 700;
  font-size: 20px;
  line-height: 20px;
  color: ${props => POKEMON_TYPES[props.type] || '#FFF'};
`

export const PokemonTypeNavbar = styled('div')`
  width: 180px;
`
export const PokemonTypeNavbarTitle = styled('div')`
  font-family: 'Poppins';
  font-style: normal;
  font-weight: 700;
  font-size: 16px;
  line-height: 24px;
  display: flex;
  align-items: center;
  color: #42494D;
  padding-bottom: 8px;

`
export const PokemonTypeNavbarList = styled('ul')`
  display: flex;
  flex-direction: column;
  gap: 4px;
`

export const PokemonTypeNavbarListItem = styled('li')<PokemonTypeNavbar>`
  font-family: 'Poppins';
  font-style: normal;
  font-weight: 700;
  font-size: 14px;
  line-height: 21px;
  cursor: pointer;
  text-transform: capitalize;
  color: ${props => props.active ? POKEMON_TYPES[props.color] : '#7B8082'}
`

export const PokemonTypePageTitle = styled('div')`
  font-family: 'Poppins';
  font-style: normal;
  font-weight: 700;
  font-size: 40px;
  line-height: 60px;
  color: #42494D;
  text-transform: capitalize;

`
export const PokemonTypePageCard = styled('div')`
  display: flex;
  flex-direction: column;
  padding: 20px;
  gap: 24px;

  background: rgba(255, 255, 255, 0.85);
  box-shadow: 0px 0px 32px rgba(0, 0, 0, 0.08);
  border-radius: 24px;
  flex: none;
  align-self: stretch;
  flex-grow: 0;
`
export const PokemonTypePageColumn = styled('div')`
  display: flex;
  gap: 32px;
  cursor: pointer;
  border-bottom: 1px solid #B3B6B8;
  padding-bottom: 16px;
  align-items: center;
`
export const PokemonTableTitle = styled('div')`
  font-family: 'Poppins';
  font-style: normal;
  font-weight: 700;
  font-size: 20px;
  line-height: 15px;
  color: #42494D;
  text-transform: capitalize;
  align-self: center;
`
export const PokemonBoxTableContainer = styled('div')`
  padding: 0 24px;
  border-right: 1px solid #B3B6B8;
  min-height: 100px;
  display: flex;
`

export const MainTypeContainer = styled('div')`
  padding: 86px 140px;
  display: flex;
  gap: 57px;
`

export const TableContainer = styled('div')`
  flex-grow: 1;
  gap: 24px;
  display: flex;
  flex-direction: column;
  padding-left: 57px;
  border-left: 1px solid #B3B6B8;
`

export const PokemonTableTitleId = styled(PokemonTableTitle)`
  min-width: 72px;
`

export const PokemonTableTitleName = styled(PokemonTableTitle)`
  min-width: 180px;
`

export const TinyPokeType = styled(SmallPokeType)`
  font-size: 12px;
  line-height: 14px;
`

export const GrowBox = styled(PokemonBoxTableContainer)`
  flex-grow: 1
`

export const Accent = styled('div')<AccentProps>`
  border-radius: 50%;
  position: absolute;
  width: 673px;
  height: 673px;
  
  left: ${props => props.left};
  top: ${props => props.top};
  right: ${props => props.right};
  bottom: ${props => props.bottom};
  background: transparent;
  border: 140px solid ${props => POKEMON_TYPES[props.color]};
  content: '';
  transform: rotate(${props => props.rotation}deg);
  z-index: -1;
  opacity: ${props => props.opacity};
`

export const PokemonPosition = styled('div')`
  position: relative;
`

export const PokemonPlacement = styled('div')<Position>`
  position: absolute;
  top: ${props => props.top};
  left: ${props => props.left};
`