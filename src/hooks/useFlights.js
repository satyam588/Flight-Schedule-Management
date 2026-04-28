import { useEffect, useMemo, useState } from "react";
import flightsData from "../flights.json";
import { filterFlights, searchFlights } from "../utils/helpers";

export default function useFlights() {
  const [flights, setFlights] = useState([]);
  const [filters, setFilters] = useState({});
  const [search, setSearch] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [tempRow, setTempRow] = useState({});
  const [loadingRows, setLoadingRows] = useState({});
  const [selectedRows, setSelectedRows] = useState([]);

  useEffect(() => {
    setFlights(flightsData?.flights);
  }, []);

  const filteredData = useMemo(() => {
    let data = filterFlights(flights, filters);
    return searchFlights(data, search);
  }, [flights, filters, search]);

  const startEdit = (row) => {
    setEditingId(row.id);
    setTempRow(row);
  };

  const cancelEdit = () => {
    setEditingId(null);
    setTempRow({});
  };

  const saveEdit = () => {
    const id = editingId;

    setLoadingRows((p) => ({ ...p, [id]: true }));

    setTimeout(() => {
      const fail = Math.random() < 0.2;

      if (fail) {
        alert("Save failed!");
      } else {
        setFlights((prev) => prev.map((f) => (f.id === id ? tempRow : f)));
      }

      setLoadingRows((p) => ({ ...p, [id]: false }));
      setEditingId(null);
    }, 800);
  };

  const toggleStatus = (id) => {
    setFlights((prev) =>
      prev.map((f) =>
        f.id === id
          ? { ...f, status: f.status === "Active" ? "Inactive" : "Active" }
          : f,
      ),
    );
  };

  const deleteRow = (id) => {
    setFlights((prev) => prev.filter((f) => f.id !== id));
  };

  const deleteSelected = () => {
    setFlights((prev) => prev.filter((f) => !selectedRows.includes(f.id)));
    setSelectedRows([]);
  };

  return {
    data: filteredData,
    filters,
    setFilters,
    search,
    setSearch,
    editingId,
    tempRow,
    setTempRow,
    startEdit,
    cancelEdit,
    saveEdit,
    toggleStatus,
    deleteRow,
    loadingRows,
    selectedRows,
    setSelectedRows,
    deleteSelected,
  };
}
