import axios from "axios"
import { useRouter } from "next/router"
import Router from 'next/router'
import Cards from "../../components/Cards"
import Link from "next/link"
import { FaArrowLeft } from 'react-icons/fa'

interface TagProps {
  tag: string,
  items: [{
    name: string,
    description: string,
    id: string,
    image: string,
    location: string,
    category: string,
  }]
}

export default function Tag({ tag, items }: TagProps) {

  const route = useRouter()


  function nextPage() {
    const page = Number(route.query.index) + 1
    Router.push(`/${tag}/${page}`)
  }

  function prevPage() {
    const page = Number(route.query.index) - 1
    Router.push(`/${tag}/${page}`)
  }


  return (
    <>
      <div>
        <Link href="/" className="p-4 m-5 w-fit bg-slate-800 rounded-md hover:bg-slate-900 flex items-center ">
          Back to Categories
        </Link>
      </div>
      <div className="sm:flex-none w-full flex justify-center flex-wrap p-10 ">
        {items.map(item => (
          <Cards key={item.id} item={item} />
        ))}
      </div>
      <div className=" w-full flex justify-center items-center p-10">
        <button className={`bg-slate-600 px-3 py-1 rounded-md mr-5 ${Number(route.query.index) > 1 ? 'hover:bg-slate-700' : 'bg-slate-600'}`} disabled={Number(route.query.index) === 1 ? true : false} onClick={() => prevPage()}> Anterior</button>
        <button className={`bg-slate-600 px-3 py-1 rounded-md hover:bg-slate-700`} onClick={() => nextPage()}> Proximo</button>

      </div>
    </>
  )
}

export async function getStaticPaths() {

  const totalWeaponsPages = 38
  const totalArmorsPages = 71
  const totalClassesPages = 2
  let totalStaticWeapons = []

  for (let i = 1; i <= totalWeaponsPages; i++) {
    totalStaticWeapons.push({ tag: 'weapons', page: i })
  }

  for (let i = 1; i <= totalArmorsPages; i++) {
    totalStaticWeapons.push({ tag: 'armors', page: i })
  }
  for (let i = 1; i <= totalClassesPages; i++) {
    totalStaticWeapons.push({ tag: 'classes', page: i })
  }

  const paths = totalStaticWeapons.map(e => ({
    params: { tag: e.tag, index: e.page.toString() }
  }))

  return {
    paths,
    fallback: false, // can also be true or 'blocking'
  }
}

export async function getStaticProps({ params }: any) {
  const { tag, index } = params

  const response = await axios({
    url: `https://eldenring.fanapis.com/api/${tag}?limit=8&page=${index}`,
    method: 'get'
  })

  const itemsReponse = response.data.data

  return {
    props: {
      tag,
      items: itemsReponse || []
    }
  }
}

// export async function getServerSideProps(ctx: any) {
//   const { tag, page } = ctx.query

//   const response = await axios({
//     url: `https://eldenring.fanapis.com/api/${tag}?limit=10&page=${page}`,
//     method: 'get'
//   })

//   const itemsReponse = response.data.data

//   return {
//     props: {
//       tag,
//       items: itemsReponse || []
//     }
//   }
// }
