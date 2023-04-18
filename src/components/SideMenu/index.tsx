import Link from "next/link";
import { routes } from '../../../routes'
import { useState } from "react";

export default function SideMenu() {

  const [active, setActive] = useState('home')

  function filter(e: string) {
    setActive(e)
  }

  return <nav className="w-[200px] h-screen bg-gray-900 p-7">
    <ul>
      <li className="mb-2">
        <button className={`${active === 'home' && 'text-gray-400'}`} onClick={() => filter('home')}>
          Home
        </button>
      </li>
      {routes.map(e => (
        <li key={e.tag} className="mb-2">
          <button className={`${active === e.tag && 'text-gray-400'}`} onClick={() => filter(e.tag)}>
            {e.name}
          </button>
        </li>
      ))}
    </ul>
  </nav>
}
