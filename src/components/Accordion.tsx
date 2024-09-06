import React from "react";
import {Accordion, AccordionItem} from "@nextui-org/react";

export default function AccordionComp(props:any) {
  const defaultContent =
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.";

  return (
    <Accordion defaultExpandedKeys={["1"]}>
      <AccordionItem key="1" aria-label="Accordion 1"  title={<span className="text-3xl">Descrição</span>}>
        {props.description}
        <ul>
            <li>Produto em Stock: {props.stock}</li>
            <li>Garantia: {props.warrantyInformation} </li>
            <li>Envio: {props.shippingInformation} </li>
        </ul>
      
        
      </AccordionItem>
      <AccordionItem
        key="2"
        aria-label="Accordion 2"
        
        title={<span className="text-3xl">Reviews</span>}
      >
         {props.reviews && props.reviews.length > 0 ? (
              props.reviews.map((review: any, index: number) => (
                <div key={index} className='border-b py-4'>
                  <p className='text-lg font-semibold'>{review.reviewerName}</p>
                  <p className='text-sm text-gray-600'>{review.reviewerEmail}</p>
                  <p className='mt-2'>Rating: {review.rating}/5</p>
                  <p className='mt-2'>"{review.comment}"</p>
                  <p className='mt-2 text-gray-500 text-sm'>
                    {new Date(review.date).toLocaleDateString()}
                  </p>
                </div>
              ))
            ) : (
              <p>Nenhum review disponível para este produto.</p>
            )}
      </AccordionItem>
     
    </Accordion>
  );
}
