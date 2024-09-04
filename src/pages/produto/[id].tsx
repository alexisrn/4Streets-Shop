import AccordionComp from '@/components/Accordion';
import { useCart } from '@/context/CartContext';
import Layout from '@/template/Layout';
import { getProductsID } from '@/utils/api';
import { Accordion, Button, Select, SelectItem, Spinner } from '@nextui-org/react';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

export default function Produto() {
  const router = useRouter();
  const { id } = router.query;
  const [produto, setProduto] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useCart();
  
  const handleAddToCart = (item: { id: number; title: string; price: number }) => {
    addToCart(item);
    router.push('/cart'); // Navega para a página do carrinho
  };


  useEffect(() => {
    if (id) {
      const fetchProduct = async () => {
        try {
          const productId = Array.isArray(id) ? id[0] : id;
          const data = await getProductsID(productId);
          setProduto(data);
          setLoading(false);
        } catch (error) {
          setLoading(false);
        }
      };
      fetchProduct();
    }
  }, [id]);

  if (loading) {
    return <div>
      <Spinner/></div>;
  }

  if (!produto) {
    return <div>Produto não encontrado</div>;
  }

  return (
    <>
    <Layout color="bg-black/90" title={`${produto.title} - 4Streets`}>
    <div className='w-full pt-[100px] h-full'>
      <div className='flex justify-center'>  
          <div className='w-[50%] h-[500px] flex px-10'>
            <div className='w-[20%] flex flex-col justify-between gap-2'>
              <div className='w-full h-[25%] bg-blue-500'>ae</div>
              <div className='w-full h-[25%] bg-blue-500'>ae</div>
              <div className='w-full h-[25%] bg-blue-500'>ae</div>
              <div className='w-full h-[25%] bg-blue-500'>ae</div>
              
            </div>
            
            <div className='w-full h-full flex items-center justify-center'>
            <img src={produto.thumbnail} alt={produto.title} className="w-[80%] h-auto mt-4" />
            </div>
          </div>

          <div className='w-[50%] h-full flex flex-col gap-3'>
            <h1 className='text-[40px]'>{produto.title}</h1>
            <p className='text-xl'>{produto.category}</p>
            <p className='text-red-600 font-bold text-3xl'>R$ {produto.price}</p>
            <span className='text-2xl'>{produto.description}</span>
            <span className='text-xl'>Tamanho: {produto.dimensions.width}</span>
            <div>
            <Button 
            onClick={() => handleAddToCart({ id: produto.id, title: produto.title, price: produto.price })}
             className="className='bg-black hover:bg-black text-black font-semibold border-none hover:text-white py-2 px-9 border border-black hover:border-transparent rounded text-[20px]" >
            Adicionar no carrinho
            </Button>
            </div>

            <div className='mt-5'>
            <span className='text-xl'>Tag</span>
            <p>{produto.tags}</p>
            <span className='text-xl'>SKU</span>
            <p>{produto.sku}</p>
            </div>
         
          </div>

      </div>

        <div className='px-8 mt-10 '>
          <AccordionComp 
          title={produto.title} 
          description={produto.description}
          stock={produto.stock}
            warrantyInformation={produto.warrantyInformation}
            shippingInformation={produto.shippingInformation}
          
          />
          </div>
    </div>
    </Layout>
    </>
  );
}
