import { Inter } from "next/font/google";
import Layout from "@/template/Layout";
import Banner from "@/components/Banner";
import RoupasHome from "@/components/RoupasHome";
import Banner2 from "@/components/Banner2";
import { Button } from "@nextui-org/react";
import SunglassesHome from "@/components/SunglassesHome";


export default function Home() {

  return (
    <>
    <Layout color="transparent" title="Home">
    <Banner />
    <RoupasHome value="mens-shirts" value2="mens-shoes"/>
    <Banner2 />
    <SunglassesHome />
    </Layout>
    </>
 
  );
}
