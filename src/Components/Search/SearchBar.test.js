import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import SearchBar from "./SearchBar";

describe("SearchBar", () => {
    // reinitialized before every test
    let searchMock;

    beforeEach(() => {
        // mocks the performSearch function that is called by the searchBar
        searchMock = jest.fn();
        // fake timers are used so we don't have to wait for searchBar delay
        // https://testing-library.com/docs/using-fake-timers/
        jest.useFakeTimers();
    });

    afterEach(() => {
        jest.runOnlyPendingTimers();
        jest.useRealTimers();
    });

    it("Can be typed in", () => {
        render(<SearchBar performSearch={searchMock} />);
        const searchBar = screen.getByRole("textbox");
        userEvent.type(searchBar, "string");
        expect(searchBar).toHaveValue("string");
    });

    it("Calls the search function with the correct values", () => {
        render(<SearchBar performSearch={searchMock} />);
        const searchBar = screen.getByRole("textbox");
        // type in 'a' and make sure the search function is called
        userEvent.type(searchBar, "a");
        jest.runAllTimers();
        expect(searchMock).toHaveBeenCalled();
        expect(searchMock).toHaveBeenCalledWith("a");
        userEvent.type(searchBar, "hello");
        userEvent.type(searchBar, "hello");
        console.log(searchBar.value);
    });

    it("Does not call the search function prematurely", () => {
        render(<SearchBar performSearch={searchMock} msDelay={5} />);
        const searchBar = screen.getByRole("textbox");
        userEvent.type(searchBar, "a");
        // search should not have been called yet
        jest.advanceTimersByTime(1);
        expect(searchMock).toHaveBeenCalledTimes(0);
        // After the full 5 ms, search should be called
        jest.advanceTimersByTime(5);
        expect(searchMock).toHaveBeenCalled();
    });
});
