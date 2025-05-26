export default (dateString: string, locale?: string) =>
  new Date(dateString).toLocaleString(locale ?? "en-BE", {
    dateStyle: "short",
  });
