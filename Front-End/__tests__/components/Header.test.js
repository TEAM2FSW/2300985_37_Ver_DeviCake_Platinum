import Header from "@/components/Header";
import { render, screen } from "@testing-library/react";
import dataMocks from "../../__mocks__/dataMocks";

describe ( "Header Components", () => {

  it("[+] Renders Header Components", () => {

    render(<Header/>)

    const heading = screen.getByRole("heading", {

      name: dataMocks.page.home.heading
    });
    expect(heading).toBeInTheDocument();

    const description = screen.getByText(dataMocks.page.home.description);
    expect(description).toBeInTheDocument();
    
  })
})