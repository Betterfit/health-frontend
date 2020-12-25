import React from "react";
import { render as rtlRender } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "react-query";

// query clients are required in v3 of react-query.
// we export this a replacement to react testing library's render so we can wrap components that use
// the useQuery or useQueries hooks automatically in a QueryClientProvider.
// If this is not done, they will throw errors
// https://react-query-beta.tanstack.com/reference/QueryClientProvider
const render = (component: React.ReactNode) => {
    const queryClient = new QueryClient()
    rtlRender(
        <QueryClientProvider client={queryClient}>{component}</QueryClientProvider>
    );
};
export { render };
