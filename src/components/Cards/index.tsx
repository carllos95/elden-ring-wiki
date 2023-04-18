import Link from 'next/link';
interface CardsProps {
  item:
  {
    description: string
    id: string
    image: string
    name: string
    category: string,
  }
  key: string
}

export default function Cards({ item }: CardsProps) {
  return <Link href={`/weapons/${item.id}`} className="w-[300px] bg-gray-800 rounded-lg mb-4 p-3 mx-2">
    <img className="w-full" src={item.image} alt={item.name} />
    <div className="mt-3">
      <h2 className="text-lg font-bold text-center">{item.name}</h2>
      <h3 className="text-md font-bold text-center">{item.category}</h3>
    </div>
  </Link>
}
