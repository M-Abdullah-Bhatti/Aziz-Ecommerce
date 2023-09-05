// components/CategoryCard.tsx
import Image from "next/image";
import React from "react";

interface CategoryCardProps {
  name: string;
  iconUrl: string;
}

const CategoryCard: React.FC<CategoryCardProps> = ({ name, iconUrl }) => {
  return (
    <div className="flex flex-col items-center justify-center gap-4 h-[150px] p-4 bg-white shadow-gray-800 shadow-lg rounded-lg">
      <div className="text-3xl">{iconUrl}</div>
      <h3 className="text-lg font-semibold">{name}</h3>
    </div>
  );
};

export default CategoryCard;
