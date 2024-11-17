import React from "react";

const CategorySection = ({ title, items, onItemClick }) => (
    <section className="mt-6">
        <h2 className="text-xl font-semibold mb-4 px-4">{title}</h2>
        <div className="overflow-x-auto hide-scrollbar">
            <div className="inline-flex space-x-4 px-4">
                {items.map((item, index) => (
                    <div
                        key={index}
                        className="w-72 flex-none cursor-pointer"
                        onClick={() => onItemClick?.(item)}
                    >
                        <div className="aspect-video rounded-lg overflow-hidden bg-gray-800">
                            <img
                                src={item.image}
                                alt={item.title}
                                className="w-full h-full object-cover"
                            />
                        </div>
                        <h3 className="font-medium mt-2">{item.title}</h3>
                        <p className="text-sm text-gray-400">
                            {item.description}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    </section>
);

export default CategorySection;
