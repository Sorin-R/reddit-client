export default function CategoryTabs({
  categories,
  activeCategory,
  onSelect,
}) {
  return (
    <div style={{ display: "flex", gap: "0.5rem", overflowX: "auto" }}>
      {categories.map((category) => (
        <button
          key={category}
          onClick={() => onSelect(category)}
          style={{
            padding: "0.5rem 1rem",
            borderRadius: "999px",
            border: "1px solid #ddd",
            background:
              activeCategory === category ? "#ff4500" : "transparent",
            color: activeCategory === category ? "#fff" : "#000",
          }}
        >
          {category}
        </button>
      ))}
    </div>
  );
}