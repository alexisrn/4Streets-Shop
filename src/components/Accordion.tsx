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
      </AccordionItem>
     
    </Accordion>
  );
}
