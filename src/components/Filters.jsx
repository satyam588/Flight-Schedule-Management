import {
  Box,
  Button,
  TextField,
  Select,
  MenuItem,
  FormControl,
} from "@mui/material";

const doo = [
  { id: 1, name: "Monday" },
  { id: 2, name: "Tuesday" },
  { id: 3, name: "Wednesday" },
  { id: 4, name: "Thursday" },
  { id: 5, name: "Friday" },
  { id: 6, name: "Saturday" },
  { id: 7, name: "Sunday" },
];

export default function Filters({ filters, setFilters }) {
  return (
    <Box sx={{ display: "flex", gap: 2, marginBottom: 2, flexWrap: "wrap" }}>
      <FormControl>
        <small>FROM</small>
        <TextField
          size="small"
          type="date"
          value={filters?.start || ""}
          sx={{ width: 200 }}
          onChange={(e) => setFilters((p) => ({ ...p, start: e.target.value }))}
        />
      </FormControl>

      <FormControl>
        <small>TO</small>
        <TextField
          size="small"
          type="date"
          value={filters?.end || ""}
          sx={{ width: 200 }}
          onChange={(e) => setFilters((p) => ({ ...p, end: e.target.value }))}
        />
      </FormControl>

      <FormControl>
        <small>DAYS OF OPERATION</small>
        <Select
          size="small"
          multiple
          value={filters.days || []}
          sx={{ width: 200 }}
          onChange={(e) => setFilters((p) => ({ ...p, days: e.target.value }))}
        >
          {doo.map((day) => (
            <MenuItem key={day.id} value={day.id}>
              {day.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <FormControl>
        <small>STATUS</small>
        <Select
          size="small"
          value={filters.status || ""}
          onChange={(e) =>
            setFilters((p) => ({ ...p, status: e.target.value }))
          }
          sx={{ width: 150 }}
        >
          <MenuItem value="">All Status</MenuItem>
          <MenuItem value="Active">Active</MenuItem>
          <MenuItem value="Inactive">Inactive</MenuItem>
        </Select>
      </FormControl>

      <FormControl>
        <small>AOC</small>
        <TextField
          size="small"
          value={filters?.aoc || ""}
          sx={{ width: 80 }}
          onChange={(e) => setFilters((p) => ({ ...p, aoc: e.target.value }))}
        />
      </FormControl>

      <FormControl>
        <small>BODY TYPE</small>
        <Select
          size="small"
          value={filters.bodyType || ""}
          sx={{ width: 200 }}
          onChange={(e) =>
            setFilters((p) => ({ ...p, bodyType: e.target.value }))
          }
        >
          <MenuItem value="">Select Body Type</MenuItem>
          <MenuItem key="wide_body" value="wide_body">
            wide_body
          </MenuItem>
          <MenuItem key="narrow_body" value="narrow_body">
            narrow_body
          </MenuItem>
        </Select>
      </FormControl>

      <Button onClick={() => setFilters({})} size="small" variant="outlined">
        Clear All
      </Button>
    </Box>
  );
}
