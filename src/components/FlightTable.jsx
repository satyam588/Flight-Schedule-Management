import React, { Fragment } from "react";
import { List } from "react-window";
import { Box, Button, Checkbox, TextField, Switch } from "@mui/material";

const ROW_HEIGHT = 60;

const doo = [
  { id: 1, name: "Mon" },
  { id: 2, name: "Tue" },
  { id: 3, name: "Wed" },
  { id: 4, name: "Thu" },
  { id: 5, name: "Fri" },
  { id: 6, name: "Sat" },
  { id: 7, name: "Sun" },
];

const columns = [
  { key: "select", width: 50 },
  { key: "flightNumber", width: 120, label: "Flight" },
  { key: "aoc", width: 80, label: "AOC" },
  { key: "bodyType", width: 120, label: "Body type" },
  { key: "daysOfOperation", width: 150, label: "Days" },
  { key: "origin", width: 80, label: "Origin" },
  { key: "destination", width: 80, label: "Dest" },
  { key: "std", width: 120, label: "STD" },
  { key: "sta", width: 120, label: "STA" },
  { key: "startDate", width: 190, label: "Start Date" },
  { key: "endDate", width: 190, label: "End Date" },
  { key: "status", width: 120, label: "Status" },
  { key: "actions", width: 220, label: "Actions" },
];

const Cell = ({ width, children }) => (
  <Box
    sx={{
      flex: `0 0 ${width}px`,
      width: `${width}px`,
      boxSizing: "border-box",
      padding: "0 8px",
      overflow: "hidden",
    }}
  >
    {children}
  </Box>
);

export default function FlightTable(props) {
  const {
    data,
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
  } = props;

  const handleSelect = (id) => {
    setSelectedRows((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id],
    );
  };

  const Row = React.memo(({ index, style }) => {
    const row = data[index];
    const isEdit = editingId === row.id;

    return (
      <Box
        style={style}
        sx={{
          display: "flex",
          alignItems: "center",
          borderBottom: "1px solid #eee",
          marginTop: ROW_HEIGHT / 8,
        }}
      >
        <Cell width={50}>
          <Checkbox
            checked={selectedRows.includes(row.id)}
            onChange={() => handleSelect(row.id)}
          />
        </Cell>

        <Cell width={120}>{row.flightNumber}</Cell>
        <Cell width={80}>{row.aoc}</Cell>
        <Cell width={120}>{row.bodyType}</Cell>
        <Cell width={150}>
          <small>
            {row.daysOfOperation
              ?.map((id) => doo.find((d) => d.id === id)?.name)
              .filter(Boolean)
              .join(", ")}
          </small>
        </Cell>
        <Cell width={80}>{row.origin}</Cell>
        <Cell width={80}>{row.destination}</Cell>

        <Cell width={120}>
          {isEdit ? (
            <TextField
              key={row.id + "-std"}
              size="small"
              value={tempRow.std}
              onChange={(e) =>
                setTempRow((prev) => ({
                  ...prev,
                  std: e.target.value,
                }))
              }
            />
          ) : (
            row.std
          )}
        </Cell>

        <Cell width={120}>
          {isEdit ? (
            <TextField
              key={row.id + "-sta"}
              size="small"
              value={tempRow.sta}
              onChange={(e) => setTempRow({ ...tempRow, sta: e.target.value })}
            />
          ) : (
            row.sta
          )}
        </Cell>

        <Cell width={190}>
          {isEdit ? (
            <TextField
              type="date"
              size="small"
              value={tempRow.startDate}
              onChange={(e) =>
                setTempRow({ ...tempRow, startDate: e.target.value })
              }
            />
          ) : (
            row.startDate
          )}
        </Cell>

        <Cell width={190}>
          {isEdit ? (
            <TextField
              type="date"
              size="small"
              value={tempRow.endDate}
              onChange={(e) =>
                setTempRow({ ...tempRow, endDate: e.target.value })
              }
            />
          ) : (
            row.endDate
          )}
        </Cell>

        <Cell width={120}>
          <Switch
            checked={row.status === "Active"}
            onChange={() => toggleStatus(row.id)}
          />
        </Cell>

        <Cell width={220}>
          {isEdit ? (
            <>
              <Button size="small" onClick={saveEdit}>
                {loadingRows[row.id] ? "Saving..." : "Save"}
              </Button>
              <Button size="small" onClick={cancelEdit}>
                Cancel
              </Button>
            </>
          ) : (
            <Button size="small" onClick={() => startEdit(row)}>
              Edit
            </Button>
          )}

          <Button size="small" color="error" onClick={() => deleteRow(row.id)}>
            Delete
          </Button>
        </Cell>
      </Box>
    );
  });

  return (
    <Fragment>
      <Box p={1}>
        <Button
          variant="contained"
          color="error"
          disabled={!selectedRows.length}
          onClick={deleteSelected}
          sx={{ mb: 1 }}
        >
          Delete Selected
        </Button>
      </Box>

      <Box
        sx={{
          height: 600,
          display: "flex",
          flexDirection: "column",
          border: "1px solid #ddd",
          borderRadius: 2,
          overflow: "hidden",
        }}
      >
        <List
          rowComponent={Row}
          rowCount={data.length}
          rowHeight={ROW_HEIGHT}
          rowProps={{ data }}
          itemKey={(index) => data[index].id}
        >
          <Box
            sx={{
              display: "flex",
              background: "#f5f5f5",
              borderBottom: "1px solid #ddd",
              flexShrink: 0,
              height: ROW_HEIGHT,
              alignItems: "center",
              position: "sticky",
              top: 0,
              zIndex: 1,
              width: columns.reduce((sum, col) => sum + col.width, 0),
            }}
          >
            {columns.map((col) => (
              <Cell key={col.key} width={col.width}>
                <b>{col.label || ""}</b>
              </Cell>
            ))}
          </Box>
        </List>
      </Box>
    </Fragment>
  );
}
