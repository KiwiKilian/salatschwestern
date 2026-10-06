import { Container } from "@mui/joy";
import { createRootRoute, Outlet } from "@tanstack/react-router";

import { Header } from "@/components/Header";

function RootLayout() {
  return (
    <>
      <Header />

      <Container>
        <main>
          <Outlet />
        </main>
      </Container>
    </>
  );
}

export const Route = createRootRoute({
  component: RootLayout,
});
