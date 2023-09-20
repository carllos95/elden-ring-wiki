import SideMenu from '@/components/SideMenu'
import Head from 'next/head'
import Link from 'next/link'
import { routes } from 'routes'

export default function Home() {
  const routesArray = routes

  return (
    <>
      <Head>
        <title>Elden Ring Wiki</title>
        <meta name="description" content="Elden Ring Wiki" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className='flex'>
        {/* <SideMenu /> */}
        <div className='md:px-16 md:py-8 lg:px-10 lg:py-10'>
          <div className='flex sm:p-[100px] justify-center flex-wrap p-[20px]'>
            {routesArray?.map(e => (
              <Link key={e.tag} href={`/${e.tag}`} className='w-[300px] relative mr-0 mb-5 sm:mr-5 transition-all duration-500 hover:scale-[1.1] hover:transition-all hover:duration-500'>
                <img src={`${e.img}`} alt={`${e.name}`} className='w-full h-[185px] object-cover' />
                <h3 className='text-grayNormal font-bold text-xl absolute bottom-3 right-3'>{e.name}</h3>
              </Link>
            ))}
          </div>
        </div>
      </main>
    </>
  )
}


