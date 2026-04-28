import { TextField } from "@mui/material";

export default function SearchBar({ search, setSearch }) {
  return (
    <TextField
      size="small"
      placeholder="Search flight / origin / destination"
      value={search}
      onChange={(e) => setSearch(e.target.value)}
      style={{ marginBottom: 10, width: "100%" }}
    />
  );
}
