import { Fragment } from "react";
import FlightTable from "./components/FlightTable";
import Filters from "./components/Filters";
import SearchBar from "./components/SearchBar";
import useFlights from "./hooks/useFlights";

function App() {
  const flightsHook = useFlights();
  return (
    <Fragment>
      <div style={{ padding: 20, maxWidth: "1201px", margin: "auto" }}>
        <h2 style={{ marginBottom: "20px" }}>Flight Schedule Management</h2>

        <SearchBar {...flightsHook} />
        <Filters {...flightsHook} />
        <FlightTable {...flightsHook} />
      </div>
    </Fragment>
  );
}

export default App;
