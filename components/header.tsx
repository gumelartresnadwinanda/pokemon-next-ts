import Image from 'next/image';
import pokemon from '../public/pokemon.png';
import Link from "next/link";
import { useRouter } from "next/router";
import { HeaderContainer, NavItems } from './styled';

export default function Header() {
  const router = useRouter();
  return (
    <HeaderContainer>
      <Image src={pokemon} alt="pokemon" width={82} />
      <Link href="/"><NavItems className={router.pathname == "/" ? "active" : ""}>Home</NavItems></Link>
      <Link href="type"><NavItems className={router.pathname == "/type" ? "active" : ""}>Pokemon Type</NavItems></Link>
    </HeaderContainer>
  )
}
