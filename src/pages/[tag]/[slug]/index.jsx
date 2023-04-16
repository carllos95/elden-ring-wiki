import axios from "axios"

export default function Slug({ item }) {
  return <div>{item?.name}</div>
}

export async function getStaticPaths() {
  return {
    paths: [],
    fallback: true, // can also be true or 'blocking'
  }
}

export async function getStaticProps({ params }) {
  const { tag, slug } = params

  const response = await axios(`https://eldenring.fanapis.com/api/${tag}?name=${slug}`,
  )

  const item = response.data.data[0]
  return {
    props: {
      // tag,
      item: item
    }
  }
}
