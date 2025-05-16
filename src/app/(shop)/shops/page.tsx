import { ShopHeader } from "@/components/shop-page/header";
import { SuperMarket } from "@/components/shop-page/super-market";

function ShopsPage() {
  return (
    <section>
      <ShopHeader isLogo={true} />
      <SuperMarket />
    </section>
  );
}
export default ShopsPage;
