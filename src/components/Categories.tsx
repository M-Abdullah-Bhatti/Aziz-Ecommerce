// components/CategorySection.tsx
import React from "react";
import CategoryCard from "./CategoryCard";
import { Icon } from "next/dist/lib/metadata/types/metadata-types";

interface Category {
  name: string;
  iconUrl: any;
}

interface CategorySectionProps {
  categories: Category[];
}

const CategorySection: React.FC<CategorySectionProps> = ({ categories }) => {
  return (
    <div className="container mx-auto py-8 bg-slate-600">
      <h2 className="text-2xl font-semibold mb-4 text-center">Categories</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 px-2 py-3">
        {categories.map((category, index) => (
          <CategoryCard
            key={index}
            name={category.name}
            iconUrl={category.iconUrl}
          />
        ))}
      </div>
    </div>
  );
};

export default CategorySection;
