"use client";

import { useState, useEffect } from "react";
import { FaSearch } from "react-icons/fa";

interface SearchBarProps {
    onSearch: (query: string) => void;
}

export default function SearchBar({ onSearch }: SearchBarProps) {
    const [query, setQuery] = useState("");

    useEffect(() => {
        const timeoutId = setTimeout(() => {
            onSearch(query);
        }, 300); // 300ms debounce

        return () => clearTimeout(timeoutId);
    }, [query, onSearch]);

    return (
        <div className="relative w-full max-w-md">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaSearch className="text-gray-400" />
            </div>
            <input
                type="text"
                className="block w-full pl-10 pr-3 py-2 border border-gray-700 rounded-full leading-5 bg-gray-900/50 text-gray-300 placeholder-gray-500 focus:outline-none focus:bg-gray-900 focus:border-red-500 focus:ring-1 focus:ring-red-500 sm:text-sm transition-all duration-300 backdrop-blur-sm"
                placeholder="Search movies..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
            />
        </div>
    );
}
