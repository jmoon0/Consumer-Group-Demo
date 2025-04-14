import { Heart } from "lucide-react";

import { Button } from "@/components/ui/button";
import type { Product } from "../types/Product";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <div className="group">
      <div className="relative mb-2 aspect-square overflow-hidden bg-gray-100">
        <img
          src={product.image || "/placeholder.svg"}
          alt={product.name}
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
        {product.isNew && (
          <div className="absolute left-2 top-2 rounded bg-black px-2 py-1 text-xs text-white">
            New
          </div>
        )}
        <Button
          variant="ghost"
          size="icon"
          className="absolute right-2 top-2 h-8 w-8 rounded-full bg-white opacity-0 shadow-sm transition-opacity group-hover:opacity-100"
        >
          <Heart className="h-4 w-4" />
        </Button>
      </div>
      <div>
        {product.salePrice ? (
          <div className="flex items-center gap-2">
            <span className="font-medium text-red-600">
              ${product.salePrice}
            </span>
            <span className="text-sm text-gray-500 line-through">
              ${product.price}
            </span>
          </div>
        ) : (
          <span className="font-medium">${product.price}</span>
        )}
        <h3 className="mt-1 text-sm font-medium">{product.name}</h3>
        <p className="text-sm text-gray-500">{product.category}</p>
        <p className="mt-1 text-xs text-gray-500">{product.colors} Colors</p>
      </div>
    </div>
  );
}
