import { formatDateLong, formatDateShort } from "@/utils/formatDate";

describe("formatDate utils", () => {
  it("formats short date", () => {
    expect(formatDateShort("2024-08-06T00:00:00.000Z", "en-US")).toContain(
      "08",
    );
  });

  it("formats long date", () => {
    const formatted = formatDateLong("2024-08-06T00:00:00.000Z", "uk-UA");
    expect(formatted).toContain("06");
    expect(formatted).toContain("2024");
  });
});
