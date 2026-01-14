import SearchBar from "./SearchBar";

export default function Header({ searchTerm, onSearchChange }) {
  return (
    <header style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
      <h2 style={{ margin: 0 }}>Reddit Client</h2>
      <SearchBar value={searchTerm} onChange={onSearchChange} />
    </header>
  );
}