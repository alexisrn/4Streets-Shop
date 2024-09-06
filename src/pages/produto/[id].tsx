import AccordionComp from '@/components/Accordion';
import { useCart } from '@/context/CartContext';
import Layout from '@/template/Layout';
import { getProductsID } from '@/utils/api';
import { Accordion, Button, Spinner } from '@nextui-org/react';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

export default function Produto() {
  const router = useRouter();
  const { id } = router.query;
  const [produto, setProduto] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [imagePrimary, setImagePrimary] = useState<string | null>(null);
  const { addToCart } = useCart();
  
  const handleAddToCart = (item: { id: number; title: string; price: number }) => {
    addToCart(item);
    router.push('/cart');
  };

  useEffect(() => {
    if (id) {
      const fetchProduct = async () => {
        try {
          const productId = Array.isArray(id) ? id[0] : id;
          const data = await getProductsID(productId);
          setProduto(data);
          setImagePrimary(data.thumbnail);
          setLoading(false);
        } catch (error) {
          setLoading(false);
        }
      };
      fetchProduct();
    }
  }, [id]);

  if (loading) {
    return <div className='flex justify-center items-center h-screen'><Spinner/></div>;
  }

  if (!produto) {
    return <div className='text-center mt-10'>Produto não encontrado</div>;
  }

  return (
    <Layout color="bg-black/90" title={`${produto.title} - 4Streets`}>
      <div className='w-full pt-[100px] h-full'>
        <div className='flex flex-col lg:flex-row justify-center items-center lg:items-start'>  
          <div className='w-full lg:w-1/2 h-[400px] lg:h-[500px] flex flex-col lg:flex-row px-4 lg:px-10'>
           {/* // Miniaturas das imagens do produto */}
            <div className='w-full lg:w-[20%] flex lg:flex-col justify-between gap-2 mb-4 lg:mb-0'>
              {produto.images && produto.images.length > 0 ? (
                produto.images.map((image: string, index: number) => (
                  <div key={index} className='w-full h-[75px] cursor-pointer' onClick={() => setImagePrimary(image)}>
                    <img src={image} alt={`Image ${index + 1}`} className="w-full h-full object-cover rounded-lg" />
                  </div>
                ))
              ) : (
                <p>Sem imagens adicionais.</p>
              )}
            </div>
            {/* Imagem principal */}
            <div className='w-full lg:w-[80%] h-full flex items-center justify-center'>
              <img src={imagePrimary || produto.thumbnail} alt={produto.title} className="w-[80%] h-auto object-contain" />
            </div>
          </div>

          {/* Informações do produto */}
          <div className='w-full lg:w-1/2 h-full flex flex-col gap-3 px-4 lg:px-0'>
            <h1 className='text-[32px] lg:text-[40px]'>{produto.title}</h1>
            <p className='text-lg lg:text-xl'>{produto.category}</p>
            <p className='text-red-600 font-bold text-2xl lg:text-3xl'>R$ {produto.price}</p>
            <span className='text-lg lg:text-2xl'>{produto.description}</span>
            <span className='text-md lg:text-xl'>Tamanho: {produto.dimensions.width}</span>

            <div>
              <Button 
                onClick={() => handleAddToCart({ id: produto.id, title: produto.title, price: produto.price })}
                className="bg-black hover:bg-black text-white font-semibold py-2 px-4 lg:px-9 rounded text-[18px] lg:text-[20px]">
                Adicionar no carrinho
              </Button>
            </div>

            <div className='mt-5'>
              <span className='text-md lg:text-xl'>Tag</span>
              <p>{produto.tags}</p>
              <span className='text-md lg:text-xl'>SKU</span>
              <p>{produto.sku}</p>
            </div>
          </div>
        </div>

        <div className='px-4 lg:px-8 mt-10'>
          <AccordionComp 
            title={produto.title} 
            description={produto.description}
            stock={produto.stock}
            warrantyInformation={produto.warrantyInformation}
            shippingInformation={produto.shippingInformation}
            reviews={produto.reviews}
          />
        </div>
      </div>
    </Layout>
  );
}
