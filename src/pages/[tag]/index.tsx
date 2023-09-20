/* eslint-disable @next/next/no-img-element */
import axios from "axios"
import Link from 'next/link'
import { useRouter } from "next/router"
import { useEffect, useState } from "react"

interface TagProps {
  arrayItems:
  {
    data: [
      {
        id: string
        name: string
        image: string
        category: string
      }
    ]
  }
  tag: string,
  categories: [
    {
      name: string
    }
  ]
}

interface ObjectsProps {
  id: string
  name: string
  image: string
  category: string
}

export default function Tag({ arrayItems, tag, categories }: TagProps) {
  const [newArrayItems, setNewArrayItems] = useState<ObjectsProps[]>()

  const [page, setPage] = useState(1)

  useEffect(() => {
    setNewArrayItems(arrayItems.data)
  }, [arrayItems])

  useEffect(() => {
    (async () => {
      try {
        if (page >= 1) {
          const response = await axios(`https://eldenring.fanapis.com/api/${tag}?limit=10&page=${page}`)
          setNewArrayItems(response.data.data)
        }
      } catch (err) {
        console.log(err)
      }
    })()
  }, [page, tag])

  function handleCard(name: string) {
    const filterArray = newArrayItems?.filter(e => e.name === name)

    console.log(filterArray)
  }

  return <div className="p-4">
    <h1 className="text-5xl mb-8">{tag && tag}</h1>
    <div className="flex flex-wrap justify-center">

      {newArrayItems && newArrayItems.length > 0 && newArrayItems.map(e => (
        <button className="flex flex-col hover:underline mr-2 mb-4" key={e.id} onClick={() => handleCard(e.name)}>
          <img className="w-[200px]" src={e.image} alt="" />
          <span>
            {e.category}
          </span>
          <h2>
            {e.name}
          </h2>
        </button>
      ))
      }
    </div>
    <div className="flex justify-center gap-3">
      <button type="button" onClick={() => page > 1 && setPage(page - 1)}>{'<<'}</button>
      <p>{page}</p>
      <button type="button" onClick={() => newArrayItems && newArrayItems.length > 9 && setPage(page + 1)}>{'>>'}</button>
    </div>
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

  let categories: any[] = []

  function removeDuplicatesByProperty(arr: any[], prop: string) {
    const uniqueObjects = arr.reduce((acc, cur) => {
      if (!acc[cur[prop]]) {
        acc[cur[prop]] = cur;
      }
      return acc;
    }, {});

    return Object.values(uniqueObjects);
  }
  async function getTotalPages(apiUrl: string) {
    const response = await axios.get(apiUrl);
    const limit = response.data.count;
    const totalItems = response.data.total;
    return Math.ceil(totalItems / limit);
  }

  if (tag === 'weapons' || tag === 'armors' || tag === 'shields') {
    const pages = await getTotalPages(`https://eldenring.fanapis.com/api/${tag}?limit=20&page=1`)

    let categoriesArray: { name: string }[] = []

    for (let i = 0; i < pages; i++) {
      const getGategories = await axios(`https://eldenring.fanapis.com/api/${tag}?limit=20&page=${i}`)
      const mappingCategories = getGategories.data.data.map((e: { category: string }) => e.category)

      mappingCategories.map((e: string) => {
        categoriesArray.push({ name: e })
      })
    }

    categories = removeDuplicatesByProperty(categoriesArray, 'name')
  }

  return {
    props: {
      tag,
      arrayItems,
      categories
    }
  }
}
