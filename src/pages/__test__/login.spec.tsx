import React from "react";
import { ApolloProvider } from "@apollo/client";
import { createMockClient, MockApolloClient } from "mock-apollo-client";
import { render, RenderResult, waitFor } from "@testing-library/react";
import { HelmetProvider } from "react-helmet-async";
import Login, { LOGIN_MUTATION } from "../login";
import { BrowserRouter as Router } from "react-router-dom";
import userEvent from "@testing-library/user-event";

describe("<Login />", () => {
  let renderResult: RenderResult;
  let mockedClient: MockApolloClient;

  beforeEach(async () => {
    await waitFor(() => {
      mockedClient = createMockClient();

      renderResult = render(
        <HelmetProvider>
          <Router>
            <ApolloProvider client={mockedClient}>
              <Login />
            </ApolloProvider>
          </Router>
        </HelmetProvider>
      );
    });
  });

  it("should render", async () => {
    await waitFor(() => {
      expect(document.title).toBe("Login | Nuber Eats");
    });
  });

  it("should display email validation errors", async () => {
    const { getByPlaceholderText, getByRole } = renderResult;
    const email = getByPlaceholderText(/email/i);
    await waitFor(() => {
      userEvent.type(email, "this@wont");
    });

    let errorMessage = getByRole("alert");
    expect(errorMessage).toHaveTextContent(/Please enter a valid email/i);
    await waitFor(() => {
      userEvent.clear(email);
    });
    errorMessage = getByRole("alert");
    expect(errorMessage).toHaveTextContent(/email is required/i);
  });

  it("should display password validation errors", async () => {
    const { getByPlaceholderText, debug, getByRole } = renderResult;
    const email = getByPlaceholderText(/email/i);
    const submitBtn = getByRole("button");
    await waitFor(() => {
      userEvent.type(email, "this@wont.com");
      userEvent.click(submitBtn);
    });
    let errorMessage = getByRole("alert");
    expect(errorMessage).toHaveTextContent(/password is required/i);
  });

  it("should submit form and call mutation", async () => {
    const { getByPlaceholderText, debug, getByRole } = renderResult;
    const formData = {
      email: "real@test.com",
      password: "12345",
    };
    const email = getByPlaceholderText(/email/i);
    const password = getByPlaceholderText(/password/i);
    const submitBtn = getByRole("button");

    const mockedMutationResponse = jest.fn().mockResolvedValue({
      data: {
        login: {
          ok: true,
          token: "XXXXX",
          error: null,
        },
      },
    });
    mockedClient.setRequestHandler(LOGIN_MUTATION, mockedMutationResponse);
    jest.spyOn(Storage.prototype, "setItem");
    await waitFor(() => {
      userEvent.type(email, formData.email);
      userEvent.type(password, formData.password);
      userEvent.click(submitBtn);
    });

    expect(mockedMutationResponse).toHaveBeenCalledTimes(1);
    // 먼저 {} 빈칸을 넣어보고 에러에서 그 값을 확인할 수 있다.
    expect(mockedMutationResponse).toHaveBeenCalledWith({
      loginInput: {
        email: formData.email,
        password: formData.password,
      },
    });
    expect(localStorage.setItem).toHaveBeenCalledWith("nuber-token", "XXXXX");
  });

  it("should submit form and call mutation with error", async () => {
    const { getByPlaceholderText, debug, getByRole } = renderResult;
    const formData = {
      email: "real@test.com",
      password: "12345",
    };
    const email = getByPlaceholderText(/email/i);
    const password = getByPlaceholderText(/password/i);
    const submitBtn = getByRole("button");

    const mockedMutationResponse = jest.fn().mockResolvedValue({
      data: {
        login: {
          ok: false,
          error: "error-hohoho",
        },
      },
    });
    mockedClient.setRequestHandler(LOGIN_MUTATION, mockedMutationResponse);

    await waitFor(() => {
      userEvent.type(email, formData.email);
      userEvent.type(password, formData.password);
      userEvent.click(submitBtn);
    });

    let errorMessage = getByRole("alert");
    expect(errorMessage).toHaveTextContent(/error-hohoho/i);

    expect(mockedMutationResponse).toHaveBeenCalledTimes(1);
    // 먼저 {} 빈칸을 넣어보고 에러에서 그 값을 확인할 수 있다.
    expect(mockedMutationResponse).toHaveBeenCalledWith({
      loginInput: {
        email: formData.email,
        password: formData.password,
      },
    });
  });
});
