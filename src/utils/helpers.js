export const filterFlights = (data, filters) => {
  return data?.filter((f) => {
    const matchDate =
      !filters.start ||
      !filters.end ||
      (f.startDate <= filters.end && f.endDate >= filters.start);

    const matchDays =
      !filters.days?.length ||
      f.daysOfOperation.some((d) => filters.days.includes(d));

    const matchStatus = !filters.status || f.status === filters.status;

    const matchAOC = !filters.aoc || f.aoc === filters.aoc;

    const matchBody = !filters.bodyType || f.bodyType === filters.bodyType;

    return matchDate && matchDays && matchStatus && matchAOC && matchBody;
  });
};

export const searchFlights = (data, term) => {
  if (!term) return data;

  const t = term.toLowerCase();

  return data.filter(
    (f) =>
      f.flightNumber.toLowerCase().includes(t) ||
      f.origin.toLowerCase().includes(t) ||
      f.destination.toLowerCase().includes(t),
  );
};
