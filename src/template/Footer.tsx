import { Lobster } from "next/font/google";
const lobster = Lobster({
  subsets: ['latin'],
  weight: '400',
});

export default function Footer() {

  return (
    

<footer className="bg-white rounded-lg shadow dark:bg-gray-900 m-4">
    <div className="w-full max-w-screen-xl mx-auto p-4 md:py-8">
        <div className="sm:flex sm:items-center sm:justify-between">
            <a href="https://flowbite.com/" className="flex items-center mb-4 sm:mb-0 space-x-3 rtl:space-x-reverse">
               
                <span className={`text-4xl p-[12px] ${lobster.className}`}>4Streets</span>
            </a>
            <ul className="flex flex-wrap items-center mb-6 text-sm font-medium text-gray-500 sm:mb-0 dark:text-gray-400">
                <li>
                    <a href="#" className="hover:underline me-4 md:me-6">Sobre Nós</a>
                </li>
                <li>
                    <a href="#" className="hover:underline me-4 md:me-6">Política de privacidade</a>
                </li>
                <li>
                    <a href="#" className="hover:underline me-4 md:me-6">Licença</a>
                </li>
                <li>
                    <a href="#" className="hover:underline">Contato</a>
                </li>
            </ul>
        </div>
        <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
        <span className="block text-sm text-gray-500 sm:text-center dark:text-gray-400">© 2024 <a href="https://flowbite.com/" className="hover:underline">4StreetS</a>. Todo direito reservado.</span>
    </div>
</footer>


  );
}
