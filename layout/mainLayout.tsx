import Head from 'next/head'
import Image from 'next/image'
import Header from '../components/header';
import Language from '../components/language';

type MainLayoutProps = {
  children: React.ReactNode;
  title: string
};

export default function MainLayout(props: MainLayoutProps) {
  return (
    <div>
      <Head>
        <title>{props.title}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Language/>
      <Header/>
      {props.children}
    </div>
  )
}
