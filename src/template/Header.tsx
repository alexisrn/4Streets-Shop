import { useEffect, useState } from 'react';
import { Lobster } from 'next/font/google';
import { FaRegUser } from 'react-icons/fa';
import { MdOutlineShoppingBag } from 'react-icons/md';
import { RxHamburgerMenu } from 'react-icons/rx';
import { IoMdArrowDropdown, IoMdArrowDropup } from 'react-icons/io';
import Link from 'next/link';
import { useCart } from '../context/CartContext';
import SideBarCart from '@/components/SideBarCart';

const lobster = Lobster({
  subsets: ['latin'],
  weight: '400',
});

export default function Header(props: any) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [sidebarVisible, setSidebarVisible] = useState(false);
  const { cartQuantity } = useCart(); 
  const [isVestuarioOpen, setIsVestuarioOpen] = useState(false); // controle do dropdown Vestuário no mobile
  const [isAcessoriosOpen, setIsAcessoriosOpen] = useState(false); // controle do dropdown Acessórios no mobile

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const toggleSidebar = () => {
    setSidebarVisible(!sidebarVisible);
  };

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <header
      className={`fixed w-full flex justify-between px-[30px] z-10 items-center text-white transition-colors duration-300 ${
        isScrolled ? 'bg-black/90' : props.color
      }`}
    >
      <div className='flex items-center'>
        <Link href='/'>
          <h1 className={`text-4xl p-[12px] ${lobster.className}`}>4Streets</h1>
        </Link>
        <ul className='hidden md:flex items-center gap-12 text-[20px] mt-3 ml-10'>
          <li className="cursor-pointer">
            <Link href="/">Ofertas</Link>
          </li>

          <li className="relative cursor-pointer">
            <div className="flex items-center">
              Vestuário <IoMdArrowDropdown />
            </div>
          </li>

         
          <li className="relative cursor-pointer">
            <div className="flex items-center">
              Acessórios <IoMdArrowDropdown />
            </div>
          </li>
        </ul>
      </div>


      <ul className="flex text-xl gap-6">
        <li className="cursor-pointer">
          <FaRegUser />
        </li>
        <li className="cursor-pointer relative" onClick={toggleSidebar}>
          <MdOutlineShoppingBag />
          {cartQuantity > 0 && ( 
            <span className="absolute -top-2 -right-3 bg-red-600 text-white rounded-full px-2 py-1 text-xs">
              {cartQuantity}
            </span>
          )}
        </li>
        <li className="md:hidden cursor-pointer" onClick={toggleMenu}>
          <RxHamburgerMenu />
        </li>
      </ul>

      {sidebarVisible && <SideBarCart close={toggleSidebar}/>}

      {isMenuOpen && (
        <ul className="absolute top-[60px] right-0 bg-black/90 text-white w-full p-4 flex flex-col gap-4 md:hidden">
          <li>Ofertas</li>
          <li>
            <div className="flex justify-between items-center cursor-pointer" onClick={() => setIsVestuarioOpen(!isVestuarioOpen)}>
              Vestuário {isVestuarioOpen ? <IoMdArrowDropup /> : <IoMdArrowDropdown />}
            </div>
            {isVestuarioOpen && (
              <ul className="pl-4 mt-2">
                <li><Link href="/vestuario/roupasMasculina">Roupas Masculina</Link></li>
                <li><Link href="/vestuario/tenisMasculino">Tenis Masculino</Link></li>
                <li><Link href="/vestuario/roupasFeminina">Roupas Feminina</Link></li>
                <li><Link href="/vestuario/sapatosFeminino">Sapatos Feminino</Link></li>
              </ul>
            )}
          </li>
          
          <li>
            <div className="flex justify-between items-center cursor-pointer" onClick={() => setIsAcessoriosOpen(!isAcessoriosOpen)}>
              Acessórios {isAcessoriosOpen ? <IoMdArrowDropup /> : <IoMdArrowDropdown />}
            </div>
            {isAcessoriosOpen && (
              <ul className="pl-4 mt-2">
                <li><Link href="/acessorios/oculos">Óculos</Link></li>
                <li><Link href="/acessorios/relogios">Relógio</Link></li>
                <li><Link href="/acessorios/bolsas">Bolsa</Link></li>
                <li><Link href="/acessorios/joias">Joias</Link></li>
              </ul>
            )}
          </li>
        </ul>
      )}
    </header>
  );
}
