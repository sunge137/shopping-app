"use client";

import { AppRouterCacheProvider } from "@mui/material-nextjs/v16-appRouter";
import StoreProvider from "@providers/StoreProvider";
import ThemeProvider from "@providers/ThemeProvider";

function AppProviders({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ThemeProvider>
      <AppRouterCacheProvider options={{ enableCssLayer: true }}>
        <StoreProvider count={1}>
          {children}
        </StoreProvider>
      </AppRouterCacheProvider>
    </ThemeProvider>
  );
}

export default AppProviders;
