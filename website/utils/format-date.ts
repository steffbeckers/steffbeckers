export default (dateString: string) =>
  new Date(dateString).toLocaleString("default", {
    dateStyle: "short",
    timeStyle: "short",
    hour12: false,
  });
