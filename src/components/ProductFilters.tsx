"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function ProductFilters() {
  const categories = [
    { label: "All", value: "" },
    { label: "Smartphones", value: "smartphones" },
    { label: "Laptops", value: "laptops" },
    { label: "Tablets", value: "tablets" },
    { label: "Accessories", value: "mobile-accessories" },
  ];

  const brands = [
    "Apple",
    "Samsung",
    "Lenovo",
    "Asus",
    "HP",
  ];

  return(
    <div className="flex flex-wrap gap-3 mt-6 ml-9">
      {categories.map(category => (
        <button
          key={category.value}
          className="
            rounded-full
            border
            text-zinc-600
            cursor-pointer
            px-4 py-1
            text-sm
            hover:border-purple-500
            hover:text-purple-600
          "
        >
        {category.label}
        </button>
      ))}

      <div className="flex flex-wrap gap-4">
        <Select>
          <SelectTrigger className="w-40">
            <SelectValue placeholder="Brand" />
          </SelectTrigger>

          <SelectContent>
            {brands.map((brand) => (
              <SelectItem
                key={brand}
                value={brand.toLowerCase()}
              >
                {brand}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  )
}