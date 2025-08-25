export default function SortSelect({
  value,
  onChange,
}: {
  value: string;
  onChange: (val: string) => void;
}) {
  return (
    <select
      className="border rounded-md px-3 py-2 text-sm"
      value={value}
      onChange={(e) => onChange(e.target.value)}
    >
      <option value="-createdAt">Newest</option>
      <option value="createdAt">Oldest</option>
      <option value="-price">Price: High → Low</option>
      <option value="price">Price: Low → High</option>
    </select>
  );
}
