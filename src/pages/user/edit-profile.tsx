import { gql, useMutation } from "@apollo/client";
import React from "react";
import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";
import { authToken, isLoggedInVar } from "../../apollo";
import { Button } from "../../components/button";
import { LOCALSTORAGE_TOKEN } from "../../constants";
import { useMe } from "../../hooks/useMe";
import { editProfile, editProfileVariables } from "../../__generated__/editProfile";

const EDIT_PROFILE_MUTATION = gql`
  mutation editProfile($input: EditProfileInput!) {
    editProfile(input: $input) {
      ok
      error
    }
  }
`;

interface IFormProps {
  email?: string;
  password?: string;
}

export default function EditProfile() {
  const { data: userData, refetch } = useMe();

  const onCompleted = async (data: editProfile) => {
    const {
      editProfile: { ok },
    } = data;
    if (ok && userData) {
      //update the cache
      const {
        me: { email: prevEmail },
      } = userData;
      const { email: newEmail } = getValues();
      if (prevEmail !== newEmail) {
        await refetch();
      }
    }
  };
  const [editProfile, { loading }] = useMutation<editProfile, editProfileVariables>(
    EDIT_PROFILE_MUTATION,
    { onCompleted }
  );
  const { register, handleSubmit, getValues, formState } = useForm<IFormProps>({
    mode: "onChange",
    defaultValues: {
      email: userData?.me.email,
    },
  });
  const onSubmit = () => {
    const { email, password } = getValues();

    editProfile({
      variables: {
        input: {
          email,
          ...(password !== "" && { password }),
        },
      },
    });
  };

  const logout = () => {
    window.location.href = "/";
    localStorage.removeItem(LOCALSTORAGE_TOKEN);
    authToken(null);
    isLoggedInVar(false);
  };

  return (
    <div className="flex flex-col items-center justify-center mt-52">
      <Helmet>
        <title>Edit Profile | Nuber Eats</title>
      </Helmet>
      <h4 className="font-medium text-left text-2xl mb-3">Edit Profile</h4>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="grid gap-3 mt-5 px-5 w-full mb-5 max-w-screen-sm"
      >
        <input
          ref={register({
            pattern: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
          })}
          className="input"
          name="email"
          type="email"
          placeholder="Email"
          autoComplete="username"
        />
        <input
          ref={register}
          className="input"
          name="password"
          type="password"
          placeholder="Password"
          autoComplete="current-password"
        />
        <Button loading={loading} canClick={formState.isValid} actionText="Save Profile"></Button>
      </form>
      <div onClick={logout} className="btn mt-20 px-10 cursor-pointer bg-red-500 hover:bg-red-300">
        Log Out
      </div>
    </div>
  );
}
