import axios from "axios"
import Link from 'next/link'
import { useEffect, useState } from "react"
import { useRouter } from 'next/router';

interface TagProps {
  data: [
    {
      id: string
      name: string
    }
  ]
}


export default function Tag() {

  const route = useRouter()
  const [arrayItems, setArrayItems] = useState<TagProps>()

  useEffect(() => {
    (async () => {
      try {
        if (route.query.tag) {
          const response = await axios(`https://eldenring.fanapis.com/api/${route.query.tag}?limit=10`)
          setArrayItems(response.data)
        }
      } catch (err) {
        console.log(err)
      }
    })()
  }, [route])

  return <div className="p-4">
    <h1 className="text-5xl mb-8">{route.query.tag && route.query.tag}</h1>
    {arrayItems && arrayItems?.data?.map(e => (
      <Link className="flex flex-col hover:underline" key={e.id} href={`/${route.query.tag}/${e.name}`} passHref>
        {e.name}
      </Link>
    ))
    }
  </div >
}

// export async function getStaticPaths() {
//   return {
//     paths: [],
//     fallback: true, // can also be true or 'blocking'
//   }
// }

// export async function getStaticProps({ params }: any) {
//   const { tag } = params

//   const response = await axios(`https://eldenring.fanapis.com/api/${tag}?limit=10`)

//   const arrayItems = response.data

//   return {
//     props: {
//       tag,
//       arrayItems
//     }
//   }
// }
