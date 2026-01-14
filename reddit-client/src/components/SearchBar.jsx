export default function SearchBar({ value, onChange }) {
  return (
    <input
      type="text"
      placeholder="Search posts..."
      value={value}
      onChange={(e) => onChange(e.target.value)}
      style={{ flex: 1, padding: "0.5rem" }}
    />
  );
}