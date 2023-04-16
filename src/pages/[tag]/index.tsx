import axios from "axios"
import Link from 'next/link'

interface TagProps {
  arrayItems:
  {
    data: [
      {
        id: string
        name: string
      }
    ]
  }
  tag: string

}

export default function Tag({ arrayItems, tag }: TagProps) {
  // const [arrayItems, setArrayItems] = useState<TagProps>()

  // useEffect(() => {
  //   (async () => {
  //     try {
  //       if (route.query.tag) {
  //         const response = await axios(`https://eldenring.fanapis.com/api/${route.query.tag}?limit=10`)
  //         setArrayItems(response.data)
  //       }
  //     } catch (err) {
  //       console.log(err)
  //     }
  //   })()
  // }, [route])

  return <div className="p-4">
    <h1 className="text-5xl mb-8">{tag && tag}</h1>
    {arrayItems && arrayItems?.data?.map(e => (
      <Link className="flex flex-col hover:underline" key={e.id} href={`/${tag}/${e.name}`} passHref>
        {e.name}
      </Link>
    ))
    }
  </div >
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

  return {
    paths: routes.map((e) => ({
      params: {
        tag: e.tag,
      },
    })
    ),
    fallback: false,
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
