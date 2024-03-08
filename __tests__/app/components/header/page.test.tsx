import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import Header from "@/app/components/header";

describe("Page", () => {
  it("renders a heading", () => {
    render(<Header />);

    const heading = screen.getByRole("heading", { level: 1 });

    expect(heading).toBeInTheDocument();
  });

  it("renders a subtitle", () => {
    render(<Header />);

    const subtitle = screen.getByText("ROJO arq es una nueva forma de proyectar y construir: casas, negocios y equipamientos para vivir, alquilar o invertir.");

    expect(subtitle).toBeInTheDocument();
  });

  it("renders a StripesContainer", () => {
    render(<Header />);

    const stripesContainer = screen.getByTestId("stripes-container");

    expect(stripesContainer).toBeInTheDocument();
  });

  it("renders a StripesContainer without props", () => {
    render(<Header />);

    const stripesContainer = screen.getByTestId("stripes-container");

    expect(stripesContainer).toBeInTheDocument();
  });

  it("renders the AnimatedText component", () => {
    render(<Header />);

    const animatedText = screen.getByTestId("animated-text");

    expect(animatedText).toBeInTheDocument();
  });

  it("renders a heading", () => {
    render(<Header />);

    const heading = screen.getByRole("heading", { level: 1 });

    expect(heading).toBeInTheDocument();
  });

  it("renders a StripesContainer", () => {
    render(<Header />);

    const stripesContainer = screen.getByTestId("stripes-container");

    expect(stripesContainer).toBeInTheDocument();
  });

});
