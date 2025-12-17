"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaChevronDown, FaChevronUp, FaFilter } from "react-icons/fa";

interface FilterSectionProps {
    title: string;
    options: string[];
    selected: string[];
    onChange: (option: string) => void;
}

function FilterSection({ title, options, selected, onChange }: FilterSectionProps) {
    const [isOpen, setIsOpen] = useState(true);

    return (
        <div className="mb-6 border-b border-gray-800 pb-4 last:border-0">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center justify-between w-full text-left mb-3 group"
            >
                <span className="text-sm font-semibold text-gray-300 group-hover:text-white transition-colors">
                    {title}
                </span>
                {isOpen ? (
                    <FaChevronUp className="text-xs text-gray-500" />
                ) : (
                    <FaChevronDown className="text-xs text-gray-500" />
                )}
            </button>
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden"
                    >
                        <div className="flex flex-wrap gap-2">
                            {options.map((option) => (
                                <button
                                    key={option}
                                    onClick={() => onChange(option)}
                                    className={`px-3 py-1.5 text-xs rounded-full border transition-all duration-200 ${selected.includes(option)
                                            ? "bg-red-600 border-red-600 text-white"
                                            : "bg-transparent border-gray-700 text-gray-400 hover:border-gray-500 hover:text-gray-200"
                                        }`}
                                >
                                    {option}
                                </button>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

interface FilterSidebarProps {
    filters: {
        languages: string[];
        genres: string[];
        formats: string[];
    };
    selectedFilters: {
        languages: string[];
        genres: string[];
        formats: string[];
    };
    onFilterChange: (type: "languages" | "genres" | "formats", value: string) => void;
    onClear: () => void;
}

export default function FilterSidebar({
    filters,
    selectedFilters,
    onFilterChange,
    onClear,
}: FilterSidebarProps) {
    return (
        <div className="w-full lg:w-64 flex-shrink-0">
            <div className="sticky top-24 bg-gray-900/50 backdrop-blur-xl rounded-xl border border-gray-800 p-5">
                <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-2 text-white font-bold">
                        <FaFilter className="text-red-500" />
                        <span>Filters</span>
                    </div>
                    <button
                        onClick={onClear}
                        className="text-xs text-gray-500 hover:text-red-400 transition-colors"
                    >
                        Clear All
                    </button>
                </div>

                <FilterSection
                    title="Languages"
                    options={filters.languages}
                    selected={selectedFilters.languages}
                    onChange={(val) => onFilterChange("languages", val)}
                />
                <FilterSection
                    title="Genres"
                    options={filters.genres}
                    selected={selectedFilters.genres}
                    onChange={(val) => onFilterChange("genres", val)}
                />
                <FilterSection
                    title="Format"
                    options={filters.formats}
                    selected={selectedFilters.formats}
                    onChange={(val) => onFilterChange("formats", val)}
                />
            </div>
        </div>
    );
}
