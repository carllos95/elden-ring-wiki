import axios from "axios"

interface SlugProps {
  item: {
    id: string
    name: string
  }
}

export default function Slug({ item }: SlugProps) {

  return <div>{item?.name}</div>
}

export async function getStaticPaths() {
  const routes = [
    {
      tag: 'weapons'
    },
    {
      tag: 'ammos'
    },
    {
      tag: 'armors'
    },
    {
      tag: 'ashes'
    },
    {
      tag: 'bosses'
    },
    {
      tag: 'classes'
    },
    {
      tag: 'creatures'
    },
    {
      tag: 'incantations'
    },
    {
      tag: 'items'
    },
    {
      tag: 'locations'
    },
    {
      tag: 'npcs'
    },
    {
      tag: 'shields'
    },
    {
      tag: 'sorceries'
    },
    {
      tag: 'spirits'
    },
    {
      tag: 'talismans'
    },
    {
      tag: 'spirits'
    }
  ]

  let mapArray = []

  for (const item of routes) {
    const response = await axios(`https://eldenring.fanapis.com/api/${item.tag}`)
    const array = response.data.data

    mapArray.push(array.map((e: { name: any; }) => {
      if (e) {
        return {
          tag: item.tag,
          slug: e.name.replace(':', '')
        }
      }
    }))
  }



  let mergeArrays: {}[] = []
  mapArray.map(e => e.map((item: any) =>
    mergeArrays.push({ params: item })
  ))

  return {
    paths: mergeArrays,
    fallback: false
  }
}

export async function getStaticProps({ params }: any) {
  const { tag, slug } = params

  const response = await axios(`https://eldenring.fanapis.com/api/${tag}?name=${slug}`,
  )
  const item = response.data.data[0]
  return {
    props: {
      item: item ? item : []
    }
  }
}
