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
      {/* Header */}
      {/* <header>
        <div style={{ backgroundImage: 'url(./elden-ring-banner.jpg)' }} className='bg-${BANNER} h-[400px] bg-cover flex justify-center items-center flex-col'>

          <h1 className='text-center text-[3rem] mb-5 text-blueDark font-bold'>Elden Ring Wiki</h1>

          <h2 className='text-center text-blueDark font-bold text-lg'>Elden Ring is a third-person action RPG video game developed by FromSoftware and published by Bandai Namco Entertainment. <br /> The game is a collaborative project between director Hidetaka Miyazaki and fantasy novelist George R. R. Martin.</h2>
        </div>
      </header> */}
      <main>
        <h3 className='text-center text-grayNormal font-bold text-3xl mt-8'>Categories</h3>
        <div className='flex sm:p-[100px] justify-center flex-wrap p-[20px]'>
          <Link href='/weapons/1' className='w-[300px] relative mr-0 mb-5 sm:mr-5 transition-all duration-500 hover:scale-[1.1] hover:transition-all hover:duration-500'>
            <img src="./weapon.jpg" alt="Weapon" className='w-full h-[185px]' />
            <h3 className='text-grayNormal font-bold text-xl absolute bottom-3 right-3'>Weapons</h3>
          </Link>
          <Link href='/armors/1' className='w-[300px] relative mr-0 mb-5 sm:mr-5 transition-all duration-500 hover:scale-[1.1] hover:transition-all hover:duration-500'>
            <img src="./armors.jpg" alt="Armors" className='w-full h-[185px]' />
            <h3 className='text-grayNormal font-bold text-xl absolute bottom-3 right-3'>Armors</h3>
          </Link>
          <Link href='/classes/1' className='w-[300px] relative mr-0 mb-5 sm:mr-5 transition-all duration-500 hover:scale-[1.1] hover:transition-all hover:duration-500'>
            <img src="./classes.png" alt="Classes" className='w-full h-[185px]' />
            <h3 className='text-grayNormal font-bold text-xl absolute bottom-3 right-3'>Classes</h3>
          </Link>
        </div>

        <div></div>
      </main>
    </>
  )
}

export async function getStaticPaths() {
  return {
    paths: [],
    fallback: true,
  }
}

export async function getStaticProps({ params }: any) {
  // const { tag, slug } = params

  // const response = await axios({
  //   url: `https://eldenring.fanapis.com/api/${tag}?limit=10`,
  //   method: 'get'
  // })

  // const itemsReponse = response.data

  return {
    props: {
      // tag,
      // items: itemsReponse
    }
  }
}
