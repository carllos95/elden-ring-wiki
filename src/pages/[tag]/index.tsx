import axios from "axios"
import Link from 'next/link'

export default function Tag({ arrayItems, tag }) {
  return <div className="p-4">
    <h1 className="text-5xl mb-8">{tag?.replace(tag?.charAt(0), tag?.charAt(0).toUpperCase())}</h1>
    {arrayItems && arrayItems?.data?.map(e => (
      <Link className="flex flex-col hover:underline" key={e.id} href={`/${tag}/${e.name}`} passHref>
        {e.name}
      </Link>
    ))
    }
  </div >
}

export async function getStaticPaths() {
  return {
    paths: [],
    fallback: true, // can also be true or 'blocking'
  }
}

export async function getStaticProps({ params }: any) {
  const { tag } = params

  const response = await axios(`https://eldenring.fanapis.com/api/${tag}?limit=10`)

  const arrayItems = response.data

  return {
    props: {
      tag,
      arrayItems
    }
  }
}
