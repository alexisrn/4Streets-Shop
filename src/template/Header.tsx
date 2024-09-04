import { useEffect, useState } from 'react';
import { Lobster } from 'next/font/google';
import { FaRegUser } from 'react-icons/fa';
import { MdOutlineShoppingBag } from 'react-icons/md';
import { RxHamburgerMenu } from 'react-icons/rx';
import { IoMdArrowDropdown } from 'react-icons/io';
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem } from '@nextui-org/react';
import Link from 'next/link';

const lobster = Lobster({
  subsets: ['latin'],
  weight: '400',
});

export default function Header(props:any) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <header
      className={`fixed w-full flex justify-between px-[30px] items-center text-white transition-colors duration-300 ${
        isScrolled ? 'bg-black/90' : props.color
      }`}
    >
      <div className='flex items-center'>
        <Link href='/'>
        <h1 className={`text-4xl p-[12px] ${lobster.className}`}>4Streets</h1>
        </Link>
        <ul className='hidden md:flex items-center gap-12 text-[20px] mt-3 ml-10'>
          <li>Ofertas</li>

          <Dropdown className='bg-black/90 text-white rounded-[8px] mt-[3px]'>
            <DropdownTrigger>
              <li className='flex items-center'>
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
              <Link href="/vestuario/roupasFeminina"> Roupas Feminina</Link>
                </DropdownItem>
              <DropdownItem key="womens-shoes">
              <Link href="/vestuario/sapatosFeminino"> Sapatos Feminino</Link>
                </DropdownItem>
            </DropdownMenu>
          </Dropdown>

          <Dropdown className='bg-black/90 text-white rounded-[8px] mt-[3px]'>
            <DropdownTrigger>
              <li className='flex items-center'>
                Acessórios <IoMdArrowDropdown />
              </li>
            </DropdownTrigger>
            <DropdownMenu aria-label="Static Actions">
              <DropdownItem key="sunglasses">Óculos</DropdownItem>
              <DropdownItem key="watches">Relógio</DropdownItem>
              <DropdownItem key="bags">Bolsa</DropdownItem>
              <DropdownItem key="jewelry">Joias</DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </ul>
      </div>

      {/* Mobile Menu */}
      <ul className="flex text-xl gap-6">
        <li className="cursor-pointer">
          <FaRegUser />
        </li>
        <Link href="/cart">  
        <li className="cursor-pointer">
          <MdOutlineShoppingBag />
        </li>
        </Link>
        <li className="md:hidden cursor-pointer" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          <RxHamburgerMenu />
        </li>
      </ul>

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
