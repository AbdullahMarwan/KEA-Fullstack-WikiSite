// src/context/SearchContext.tsx
import React, {
  createContext,
  useContext,
  useRef,
  MutableRefObject,
} from "react";

interface SearchContextType {
  searchInputRef: MutableRefObject<HTMLInputElement | null>;
  focusSearchInput: () => void;
}

const SearchContext = createContext<SearchContextType | undefined>(undefined);

export const SearchProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const searchInputRef = useRef<HTMLInputElement | null>(null);

  const focusSearchInput = () => {
    if (searchInputRef.current) {
      searchInputRef.current.focus();
    }
  };

  return (
    <SearchContext.Provider value={{ searchInputRef, focusSearchInput }}>
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
