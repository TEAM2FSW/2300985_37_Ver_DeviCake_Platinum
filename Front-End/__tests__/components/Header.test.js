import Header from "@/components/Header";
import { render, screen } from "@testing-library/react";
import dataMocks from "../../__mocks__/dataMocks";

describe("Header Components", () => {
  it("[+] Renders Header Components", () => {
    render(<Header />);

    const heading = screen.getByRole("heading", {
      name: dataMocks.page.home.heading,
    });
    expect(heading).toBeInTheDocument();

    const description = screen.getByText(dataMocks.page.home.description);
    expect(description).toBeInTheDocument();
  });

  it("[+] Renders Header with Alt Text for Logo", () => {
    render(<Header />);

    const logo = screen.getByAltText(dataMocks.page.home.logo);
    expect(logo).toBeInTheDocument();
  });

  it("[+] Renders Header with Correct Styling Classes", () => {
    render(<Header />);

    const header = screen.getByRole("header");
    expect(header).toHaveClass(
      "flex",
      "flex-col",
      "items-center",
      "mb-16"
    );

    const title = screen.getByText(dataMocks.page.home.heading);
    expect(title).toHaveClass(
      "text-4xl",
      "font-semibold",
      "tracking-widest",
      "text-center",
      "uppercase",
      "text-amber-800"
    );
  });

  it("[+] Sets Document Title", () => {
    render(<Header />);

    expect(document.title).toBe("Devvi Cake");
  });

  it("[+] Renders Header with Correct Structure", () => {
    render(<Header />);

    const header = screen.getByRole("header");
    expect(header).toContainElement(screen.getByAltText(dataMocks.page.home.logo));
    expect(header).toContainElement(screen.getByText(dataMocks.page.home.heading));
    expect(header).toContainElement(screen.getByText(dataMocks.page.home.description));
  });

  it("[-] Does Not Render Non-Existent Element", () => {
    render(<Header />);

    const nonExistentElement = screen.queryByTestId("nonExistentElement");
    expect(nonExistentElement).toBeNull();
  });

  it("[-] Does Not Render Incorrect Content", () => {
    render(<Header />);

    const incorrectContent = screen.queryByText("This should not be present");
    expect(incorrectContent).toBeNull();
  });

  it("[-] Does Not Apply Incorrect Styling Classes", () => {
    render(<Header />);

    const header = screen.getByRole("header");
    expect(header).not.toHaveClass("incorrect-class");
  });

  it("[-] Does Not Render Logo with Empty Alt Text", () => {
    render(<Header />);

    const logo = screen.getByAltText("");
    expect(logo).toBeNull();
  });
});
