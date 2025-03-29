// src/context/SearchContext.tsx
import React, {
  createContext,
  useContext,
  useRef,
  useState,
  MutableRefObject,
  useEffect,
} from "react";
import { useLocation } from "react-router-dom";

interface SearchContextType {
  searchInputRef: MutableRefObject<HTMLInputElement | null>;
  focusSearchInput: () => void;
  isSearchVisible: boolean;
  setSearchVisible: (visible: boolean) => void;
}

const SearchContext = createContext<SearchContextType | undefined>(undefined);

export const SearchProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const searchInputRef = useRef<HTMLInputElement | null>(null);
  const [isSearchVisible, setSearchVisible] = useState(false);
  const location = useLocation();

  // Determine if we're on the homepage
  const isHomePage = location.pathname === "/";

  // Focus the search input and make it visible
  const focusSearchInput = () => {
    setSearchVisible(true);
    if (searchInputRef.current) {
      setTimeout(() => {
        if (searchInputRef.current) {
          searchInputRef.current.focus();
        }
      }, 100); // Small delay to ensure DOM is updated
    }
  };

  useEffect(() => {
    // Close search bar when clicking outside (except on homepage)
    if (!isHomePage) {
      const handleClickOutside = (event: MouseEvent) => {
        if (
          isSearchVisible &&
          searchInputRef.current &&
          !searchInputRef.current.contains(event.target as Node)
        ) {
          // Check if the click was on the search icon
          const searchIcon = document.querySelector(".search-icon");
          if (!searchIcon?.contains(event.target as Node)) {
            setSearchVisible(false);
          }
        }
      };

      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }
  }, [isSearchVisible, isHomePage]);

  return (
    <SearchContext.Provider
      value={{
        searchInputRef,
        focusSearchInput,
        isSearchVisible: isHomePage || isSearchVisible, // Always visible on homepage
        setSearchVisible,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
};

export const useSearch = () => {
  const context = useContext(SearchContext);
  if (context === undefined) {
    throw new Error("useSearch must be used within a SearchProvider");
  }
  return context;
};
