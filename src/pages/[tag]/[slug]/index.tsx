import axios from "axios"
import { useRouter } from 'next/router';
import { useEffect, useState } from "react";

interface SlugProps {
  id: string
  name: string
}

export default function Slug() {

  const route = useRouter()
  const [item, setItem] = useState<SlugProps>()


  useEffect(() => {
    (async () => {
      try {
        if (route.query.slug) {
          const response = await axios(`https://eldenring.fanapis.com/api/${route.query.tag}?name=${route.query.slug}`)
          setItem(response.data.data[0])
        }
      } catch (err) {
        console.log(err)
      }
    })()
  }, [route])

  console.log(item)

  return <div>{item?.name}</div>
}

export function getStaticParams() {

}

// export async function getStaticPaths() {
//   return {
//     paths: [],
//     fallback: true, // can also be true or 'blocking'
//   }
// }

// export async function getStaticProps({ params }) {
//   const { tag, slug } = params

//   const response = await axios(`https://eldenring.fanapis.com/api/${tag}?name=${slug}`,
//   )

//   const item = response.data.data[0]
//   return {
//     props: {
//       // tag,
//       item: item
//     }
//   }
// }
