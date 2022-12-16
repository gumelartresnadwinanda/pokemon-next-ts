import Image from 'next/image';
import pokemon from '../public/pokemon.png';
import Link from "next/link";
import { useRouter } from "next/router";
import { HeaderContainer, NavItems } from './styled';
import { TransContent } from '../utils/trans-content';

export default function Header() {
  const router = useRouter();
  const { locale } = router;
  const { home, pokemonType } = TransContent[locale || 'en'];

  return (
    <HeaderContainer>
      <Image src={pokemon} alt="pokemon" width={82} />
      <Link href="/"><NavItems className={router.pathname == "/" ? "active" : ""}>{home}</NavItems></Link>
      <Link href="type"><NavItems className={router.pathname == "/type" ? "active" : ""}>{pokemonType}</NavItems></Link>
    </HeaderContainer>
  )
}
