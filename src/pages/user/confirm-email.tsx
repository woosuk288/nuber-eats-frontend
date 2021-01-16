import { gql, useMutation } from "@apollo/client";
import React, { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { useHistory } from "react-router-dom";
import { useMe } from "../../hooks/useMe";
import { verifyEmail, verifyEmailVariables } from "../../__generated__/verifyEmail";

const VERIFY_EMAIL_MUTATION = gql`
  mutation verifyEmail($input: VerifyEmailInput!) {
    verifyEmail(input: $input) {
      ok
      error
    }
  }
`;

export default function ConfirmEmail() {
  const { refetch } = useMe();
  const history = useHistory();

  const onCompleted = async (data: verifyEmail) => {
    const {
      verifyEmail: { ok },
    } = data;

    if (ok) {
      await refetch();
      history.push("/");
    }
  };

  const [verifyEmail] = useMutation<verifyEmail, verifyEmailVariables>(VERIFY_EMAIL_MUTATION, {
    onCompleted,
  });

  useEffect(() => {
    const [, code] = window.location.href.split("code=");
    console.log(code);
    verifyEmail({
      variables: {
        input: {
          code,
        },
      },
    });
    return () => {};
  }, []);
  return (
    <div className="flex flex-col items-center justify-center mt-52">
      <Helmet>
        <title>Confirm Email | Nuber Eats</title>
      </Helmet>
      <h2 className="text-lg mb-2 font-medium">Confirming email</h2>
      <h4 className="text-gray-700 text-sm">Please wait, don't close this page...</h4>
    </div>
  );
}
