export default (dateString: string) =>
  new Date(dateString).toLocaleString("en-BE", {
    dateStyle: "short",
    timeStyle: "short",
    hour12: false,
  });
