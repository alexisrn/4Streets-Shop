import { useEffect, useState } from 'react';
import { Lobster } from 'next/font/google';
import { FaRegUser } from 'react-icons/fa';
import { MdOutlineShoppingBag } from 'react-icons/md';
import { RxHamburgerMenu } from 'react-icons/rx';
import { IoMdArrowDropdown } from 'react-icons/io';
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem } from '@nextui-org/react';
import Link from 'next/link';
import { useCart } from '../context/CartContext';
import CartPage from '@/pages/cart';
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

          <Dropdown className='bg-black/90 text-white rounded-[8px] mt-[3px]'>
            <DropdownTrigger>
              <li className='flex items-center cursor-pointer'>
                Vestuário <IoMdArrowDropdown />
              </li>
            </DropdownTrigger>
            <DropdownMenu aria-label="Static Actions">
              <DropdownItem key="mens-clothing">
                <Link href="/vestuario/roupasMasculina">Roupas Masculina</Link>
              </DropdownItem>
              <DropdownItem key="mens-shoes">
                <Link href="/vestuario/tenisMasculino">Tenis Masculino</Link>
              </DropdownItem>
              <DropdownItem key="womens-clothing">
                <Link href="/vestuario/roupasFeminina">Roupas Feminina</Link>
              </DropdownItem>
              <DropdownItem key="womens-shoes">
                <Link href="/vestuario/sapatosFeminino">Sapatos Feminino</Link>
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>

          <Dropdown className='bg-black/90 text-white rounded-[8px] mt-[3px]'>
            <DropdownTrigger>
              <li className='flex items-center cursor-pointer'>
                Acessórios <IoMdArrowDropdown />
              </li>
            </DropdownTrigger>
            <DropdownMenu aria-label="Static Actions">
              <DropdownItem key="sunglasses">
               <Link href="/acessorios/oculos">Óculos</Link> 
              </DropdownItem>
              <DropdownItem key="watches">
              <Link href="/acessorios/relogios">Relógio</Link>  
                </DropdownItem>
              <DropdownItem key="bags">
              <Link href="/acessorios/bolsas">Bolsa</Link>
              </DropdownItem>
              <DropdownItem key="jewelry">
              <Link href="/acessorios/joias">Joias</Link>
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </ul>
      </div>



      {/* Mobile Menu */}
      <ul className="flex text-xl gap-6">
        <li className="cursor-pointer">
          <FaRegUser />
        </li>
        {/* <Link href="/cart"> */}
          <li className="cursor-pointer relative" onClick={toggleSidebar}>
            <MdOutlineShoppingBag />
            {cartQuantity > 0 && ( 
              <span className="absolute -top-2 -right-3 bg-red-600 text-white rounded-full px-2 py-1 text-xs">
                {cartQuantity}
              </span>
            )}
          </li>
        {/* </Link> */}
        <li className="md:hidden cursor-pointer" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          <RxHamburgerMenu />
        </li>
      </ul>


      {sidebarVisible && <SideBarCart close={toggleSidebar}/>}

      {isMenuOpen && (
        <ul className="absolute top-[60px] right-0 bg-black/90 text-white w-full p-4 flex flex-col gap-4 md:hidden">
          <li>Ofertas</li>
          <li>Vestuário</li>
          <li>Acessórios</li>
        </ul>
      )}

    </header>
  );
}
