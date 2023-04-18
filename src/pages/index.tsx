import SideMenu from '@/components/SideMenu'
import Head from 'next/head'
import Link from 'next/link'

export default function Home() {
  return (
    <>
      <Head>
        <title>Elden Ring Wiki</title>
        <meta name="description" content="Elden Ring Wiki" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className='flex'>
        <SideMenu />
        <div className='px-32 py-16'>
          <div className='flex sm:p-[100px] justify-center flex-wrap p-[20px]'>
            <Link href='/weapons' className='w-[300px] relative mr-0 mb-5 sm:mr-5 transition-all duration-500 hover:scale-[1.1] hover:transition-all hover:duration-500'>
              <img src="./weapon.jpg" alt="Weapon" className='w-full h-[185px]' />
              <h3 className='text-grayNormal font-bold text-xl absolute bottom-3 right-3'>Weapons</h3>
            </Link>
            <Link href='/armors' className='w-[300px] relative mr-0 mb-5 sm:mr-5 transition-all duration-500 hover:scale-[1.1] hover:transition-all hover:duration-500'>
              <img src="./armors.jpg" alt="Armors" className='w-full h-[185px]' />
              <h3 className='text-grayNormal font-bold text-xl absolute bottom-3 right-3'>Armors</h3>
            </Link>
            <Link href='/classes' className='w-[300px] relative mr-0 mb-5 sm:mr-5 transition-all duration-500 hover:scale-[1.1] hover:transition-all hover:duration-500'>
              <img src="./classes.png" alt="Classes" className='w-full h-[185px]' />
              <h3 className='text-grayNormal font-bold text-xl absolute bottom-3 right-3'>Classes</h3>
            </Link>
          </div>
        </div>

        <div></div>
      </main>
    </>
  )
}


