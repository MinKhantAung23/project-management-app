import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, useForm } from "@inertiajs/react";
import React from "react";

const Edit = ({ auth, user }) => {
  const { data, setData, post, processing, errors } = useForm({
    name: user.name || "",
    email: user.email || "",
    password: "",
    password_confirmation: "",
    _method: "put",
  });

  const onSubmit = (e) => {
    e.preventDefault();
    post(route("user.update", user.id));
  };
  return (
    <AuthenticatedLayout
      user={auth.user}
      header={
        <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
          Edit User "{user.name}"
        </h2>
      }
    >
      <Head title="Create New User" />
      <div className="py-12">
        <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-gray-800">
            <div className="p-6 text-gray-900 dark:text-gray-100">
              <form
                onSubmit={onSubmit}
                className="max-w-3xl mx-auto p-6 bg-white dark:bg-gray-800 rounded-lg shadow-sm space-y-6"
              >
                {/* User Name */}
                <div>
                  <InputLabel
                    htmlFor="user_name"
                    value="User Name"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                  />
                  <TextInput
                    id="user_name"
                    type="text"
                    name="name"
                    value={data.name}
                    isFocused={true}
                    onChange={(e) => setData("name", e.target.value)}
                    className="block w-full text-sm text-gray-900 bg-gray-50 dark:bg-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
                  />
                  <InputError
                    message={errors.name}
                    className="mt-2 text-sm text-red-500"
                  />
                </div>
                {/* User Email */}
                <div>
                  <InputLabel
                    htmlFor="user_email"
                    value="User Email"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                  />
                  <TextInput
                    id="user_email"
                    type="email"
                    name="email"
                    value={data.email}
                    onChange={(e) => setData("email", e.target.value)}
                    className="block w-full text-sm text-gray-900 bg-gray-50 dark:bg-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
                  />
                  <InputError
                    message={errors.email}
                    className="mt-2 text-sm text-red-500"
                  />
                </div>
                {/* User Password */}
                <div>
                  <InputLabel
                    htmlFor="user_password"
                    value="Password"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                  />
                  <TextInput
                    id="user_password"
                    type="password"
                    name="password"
                    value={data.password}
                    onChange={(e) => setData("password", e.target.value)}
                    className="block w-full text-sm text-gray-900 bg-gray-50 dark:bg-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
                  />
                  <InputError
                    message={errors.password}
                    className="mt-2 text-sm text-red-500"
                  />
                </div>
                {/* User Password */}
                <div>
                  <InputLabel
                    htmlFor="user_password_confirmation"
                    value="Confirm Password"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                  />
                  <TextInput
                    id="user_password_confirmation"
                    type="password"
                    name="password_confirmation"
                    value={data.password_confirmation}
                    onChange={(e) =>
                      setData("password_confirmation", e.target.value)
                    }
                    className="block w-full text-sm text-gray-900 bg-gray-50 dark:bg-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
                  />
                  <InputError
                    message={errors.password_confirmation}
                    className="mt-2 text-sm text-red-500"
                  />
                </div>
                {/* Submit Button */}
                <div className="text-right flex justify-end gap-3">
                  <Link
                    href={route("user.index")}
                    className="px-6 py-2 bg-gray-500 text-white font-medium text-sm rounded-lg shadow-sm hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 dark:ring-offset-gray-800"
                  >
                    Cancel
                  </Link>
                  <button
                    type="submit"
                    className="px-6 py-2 bg-blue-600 text-white font-medium text-sm rounded-lg shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:ring-offset-gray-800"
                  >
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
};

export default Edit;
