import Breadcrumb from "./Breadcrumb";
import Footer from "./Footer";
import Header from "./Header";
import MobileFilters from "./MobileFilters";
import ProductGrid from "./ProductGrid";
import { products } from "../util/data";

export default function ProductPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <Breadcrumb
        items={[
          { label: "Home", href: "/" },
          { label: "Men", href: "/men" },
          { label: "Tops", href: "#", active: true },
        ]}
      />

      {/* Main Content */}
      <main className="container mx-auto flex-1 px-4 py-6 min-w-3/4">
        <div className="mb-6">
          <h1 className="text-2xl font-bold">
            Men&apos;s Tops and T-Shirts ({products.length})
          </h1>
        </div>

        <div className="flex flex-col lg:flex-row">
          {/* Mobile Filters */}
          <MobileFilters />

          {/* Products Grid */}
          <div className="flex-1">
            <ProductGrid products={products} />
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
