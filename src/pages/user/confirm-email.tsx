import { gql, useMutation } from "@apollo/client";
import React, { useEffect } from "react";
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
  const [verifyEmail, { data, loading }] = useMutation<verifyEmail, verifyEmailVariables>(
    VERIFY_EMAIL_MUTATION
  );

  useEffect(() => {
    console.log(window.location.href);
    const [, code] = window.location.href.split("code=");
    // verifyEmail({
    //   variables: {
    //     input: {
    //       code,
    //     },
    //   },
    // });
    // return () => {};
  }, []);
  return (
    <div className="flex flex-col items-center justify-center mt-52">
      <h2 className="text-lg mb-2 font-medium">Confirming email</h2>
      <h4 className="text-gray-700 text-sm">Please wait, don't close this page...</h4>
    </div>
  );
}
