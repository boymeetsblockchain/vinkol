import { CTA } from "@/components/home/cta";
import { Deliver } from "@/components/home/deliver";
import { ShopHero } from "@/components/shop/hero";
import { ShopList } from "@/components/shop/shop-list";

function ShopperPage() {
  return (
    <section>
      <ShopHero />
      <ShopList />
      <CTA />
      <Deliver />
    </section>
  );
}
export default ShopperPage;
