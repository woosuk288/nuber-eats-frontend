import { ApolloProvider } from "@apollo/client";
import userEvent from "@testing-library/user-event";

import { createMockClient, MockApolloClient } from "mock-apollo-client";
import { render, waitFor, RenderResult } from "../../test-utils";
import { UserRole } from "../../__generated__/globalTypes";
import CreateAccount, { CREATE_ACCOUNT_MUTATION } from "../create-account";

const mockPush = jest.fn();

jest.mock("react-router-dom", () => {
  const realModule = jest.requireActual("react-router-dom");
  return {
    ...realModule,
    useHistory: () => {
      return {
        push: mockPush,
      };
    },
  };
});

describe("<CreateAccount />", () => {
  let mockedClient: MockApolloClient;
  let renderResult: RenderResult;
  beforeEach(async () => {
    await waitFor(() => {
      mockedClient = createMockClient();
      renderResult = render(
        <ApolloProvider client={mockedClient}>
          <CreateAccount />
        </ApolloProvider>
      );
    });
  });

  it("should render OK", async () => {
    await waitFor(() => {
      expect(document.title).toBe("Create Account | Nuber Eats");
    });
  });

  it("should render validation errors", async () => {
    const { getByRole, getByPlaceholderText } = renderResult;
    const email = getByPlaceholderText(/email/i);
    const password = getByPlaceholderText(/password/i);
    const button = getByRole("button");
    await waitFor(() => {
      userEvent.type(email, "wont@work");
    });
    let errorMessage = getByRole("alert");
    expect(errorMessage).toHaveTextContent(/Please enter a valid email/i);

    await waitFor(() => {
      userEvent.clear(email);
    });
    errorMessage = getByRole("alert");
    expect(errorMessage).toHaveTextContent(/Email is required/i);

    await waitFor(() => {
      userEvent.type(email, "working@email.com");
      userEvent.click(button);
    });
    errorMessage = getByRole("alert");
    expect(errorMessage).toHaveTextContent(/Password is required/i);
  });

  it("should submit mutation with form values", async () => {
    const { getByRole, getByPlaceholderText } = renderResult;
    const email = getByPlaceholderText(/email/i);
    const password = getByPlaceholderText(/password/i);
    const button = getByRole("button");
    const formData = {
      email: "working@email.com",
      password: "12345",
      role: UserRole.Client,
    };

    const mockedLoginMutationResponse = jest.fn().mockResolvedValue({
      data: {
        createAccount: {
          ok: true,
          error: "mutation-error", // 테스트를 위해 일부러!!! 메시지 넣어줌. ok라면 error없음.
        },
      },
    });
    mockedClient.setRequestHandler(CREATE_ACCOUNT_MUTATION, mockedLoginMutationResponse);
    jest.spyOn(window, "alert").mockImplementation(() => null);
    await waitFor(() => {
      userEvent.type(email, formData.email);
      userEvent.type(password, formData.password);
      userEvent.click(button);
    });

    expect(mockedLoginMutationResponse).toHaveBeenCalledTimes(1);
    expect(mockedLoginMutationResponse).toHaveBeenCalledWith({
      createAccountInput: {
        email: formData.email,
        password: formData.password,
        role: formData.role,
      },
    });
    expect(window.alert).toHaveBeenCalledTimes(1);
    expect(window.alert).toHaveBeenCalledWith("Account Created! Log in now!");
    expect(mockPush).toHaveBeenCalledWith("/");

    const mutaionError = getByRole("alert");
    expect(mutaionError).toHaveTextContent("mutation-error");
  });

  afterAll(() => {
    jest.clearAllMocks();
  });
});
