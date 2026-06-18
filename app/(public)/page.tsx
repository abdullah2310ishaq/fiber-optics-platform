import { HeroCarousel } from "@/components/public/hero-carousel";
import { HomeSections } from "@/components/public/home-sections";
import { getProducts } from "@/lib/firestore/products";

export default async function HomePage() {
  const products = await getProducts();
  const featured = products.slice(0, 6);

  return (
    <div className="-mt-16 overflow-hidden lg:-mt-[4.5rem]">
      <HeroCarousel />
      <HomeSections products={featured} />
    </div>
  );
}
