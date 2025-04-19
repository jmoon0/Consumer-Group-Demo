import Breadcrumb from "./Breadcrumb";
import Footer from "./Footer";
import Header from "./Header";
import MobileFilters from "./MobileFilters";
import ProductGrid from "./ProductGrid";
import { products } from "../util/data";
import { useState } from "react";
import { Loader2 } from "lucide-react";

export default function ProductPage() {
  const [filteredProducts, setFilteredProducts] = useState(products);
  const [isLoading, setIsLoading] = useState(false);

  const handleSearch = async (query: string) => {
    setIsLoading(true);

    // Data of all products
    const productSummary = products.map(
      ({ id, name, category, description, fit, sport, price }) => ({
        id,
        name,
        category,
        description,
        fit,
        sport,
        price,
      })
    );

    if (!query.trim() || query.length < 10) {
      setFilteredProducts(products);
      setIsLoading(false);
      return;
    }

    const userMessage = query.trim();

    const systemPrompt = `You are a helpful search engine for the Nike website. 
    Use the provided t-shirt data to filter products and suggest ones that match the user's preferences. 
    Respond with a helpful explanation, but end your response with a single line containing only a JSON array of matching product IDs.'

    Here is the product data:
    ${JSON.stringify(productSummary, null, 2)}`;

    try {
      const res = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${import.meta.env.VITE_OPENAI_API_KEY}`,
        },
        body: JSON.stringify({
          model: "gpt-3.5-turbo",
          messages: [
            { role: "system", content: systemPrompt },
            { role: "user", content: userMessage },
          ],
          temperature: 0.2,
        }),
      });

      const data = await res.json();
      const gptResponse =
        data.choices?.[0]?.message?.content || "Sorry, no response.";

      try {
        const lines = gptResponse.trim().split("\n");
        const lastLine = lines[lines.length - 1];
        const match = lastLine.match(/\[[\d,\s]+\]/);
        console.log(match);
        if (match) {
          const ids = JSON.parse(match[0]);
          if (Array.isArray(ids) && ids.every((id) => typeof id === "number")) {
            // Filter the original products array to find objects matching the IDs
            const matchedProducts = products.filter((product) =>
              ids.includes(product.id)
            );
            // Update the state with the matched products
            setFilteredProducts(matchedProducts);

            console.log("Matched IDs:", ids);
          }
        }
      } catch (err) {
        console.warn("Could not parse GPT response as ID list:", err);
      }
    } catch (error) {
      console.error("Error calling OpenAI:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen flex-col">
      <Header onSearch={handleSearch} />

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
            {isLoading ? (
              // Display Loading indicator when isLoading is true
              <div className="flex justify-center items-center pt-10 h-64">
                <Loader2 className="h-12 w-12 animate-spin text-gray-500" />
              </div>
            ) : (
              // Display ProductGrid when not loading
              <ProductGrid products={filteredProducts} />
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
