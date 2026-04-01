export const formatDateShort = (dateInput: string, locale: string): string => {
  const date = new Date(dateInput);
  return new Intl.DateTimeFormat(locale, {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  }).format(date);
};

export const formatDateLong = (dateInput: string, locale: string): string => {
  const date = new Date(dateInput);
  const month = new Intl.DateTimeFormat(locale, { month: "short" }).format(
    date,
  );
  const day = String(date.getDate()).padStart(2, "0");
  const year = date.getFullYear();
  return `${day} / ${month} / ${year}`;
};

export const formatDateTime = (dateInput: Date, locale: string): string => {
  const month = new Intl.DateTimeFormat(locale, { month: "short" }).format(
    dateInput,
  );
  const day = String(dateInput.getDate()).padStart(2, "0");
  const year = dateInput.getFullYear();
  const time = dateInput.toLocaleTimeString(locale, { hour12: false });

  return `${day} / ${month} / ${year} - ${time}`;
};
