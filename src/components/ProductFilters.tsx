"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from '@/lib/utils';
import { Dispatch, SetStateAction } from "react";
import { CgClose } from "react-icons/cg";

type ProductFiltersProps = {
  categories: string[];
  setCategories: Dispatch<SetStateAction<string[]>>;
  brand: string;
  setBrand: (value: string) => void;
  search: string;
  setSearch: (value: string) => void;
};  

export function ProductFilters({
  categories,
  setCategories,
  brand,
  setBrand,
  search,
  setSearch
}: ProductFiltersProps) {

  const categoriesType = [
    { label: "All", value: "all" },
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

  const toggleCategory = (category: string) => {
    if (category === "all") {
      setCategories([]);
      return;
    }

    setCategories((currentCategories) =>
      currentCategories.includes(category)
        ? currentCategories.filter((item) => item !== category)
        : [...currentCategories, category]
    );
  };

  return(
    <div className="flex flex-wrap items-center gap-3 mt-6 px-4 md:px-9">
      {categoriesType.map((data) => (
        <button
          key={data.value}
          onClick={() => toggleCategory(data.value)}
          className={cn(
            "cursor-pointer rounded-full border px-4 py-1 text-sm text-zinc-600",
            data.value === "all"
              ? categories.length === 0 && "border-purple-500 text-purple-500"
              : categories.includes(data.value) &&
                  "border-purple-500 text-purple-500"
          )}
        >
          {data.label}
        </button>
      ))}

      <div className="flex items-center gap-4">
        <Select value={brand} onValueChange={setBrand}>
          <SelectTrigger 
            className={cn(
              "w-40 border border-zinc-200 bg-white text-zinc-600",
              brand && "ring-1 ring-purple-500 text-purple-500"
            )}
            >
            <SelectValue placeholder="Brand" />
          </SelectTrigger>

          <SelectContent className="p-2">
            {brands.map((brand) => (
              <SelectItem
                key={brand}
                value={brand.toLowerCase()}
                className="data-highlighted:bg-purple-100" 
              >
                {brand}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
          {brand && (
            <button
              onClick={() => setBrand("")}
              className="cursor-pointer text-zinc-500"
            >
              <CgClose />
            </button>
          )}
      </div>
        <input 
          className="md:ml-auto rounded-xl border border-zinc-200 bg-white px-3 py-1 text-sm text-zinc-600 outline-none placeholder:text-zinc-400 focus:border-purple-400" 
          placeholder="Search products..." 
          value={search} 
          onChange={(e) => setSearch(e.target.value)} 
        />
    </div>
  )
}