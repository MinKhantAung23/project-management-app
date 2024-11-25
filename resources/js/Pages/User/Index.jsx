import Alert from "@/Components/Alert";
import Pagination from "@/Components/Pagination";
import SelectInput from "@/Components/SelectInput";
import TableHeading from "@/Components/TableHeading";
import TextInput from "@/Components/TextInput";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, router } from "@inertiajs/react";
import { LuFileEdit, LuPlus, LuPlusSquare, LuTrash2 } from "react-icons/lu";

const Index = ({ auth, users, queryParams = null, success }) => {
  queryParams = queryParams || {};
  const searchFieldChanged = (name, value) => {
    if (value) {
      queryParams[name] = value;
    } else {
      delete queryParams[name];
    }

    router.get(route("user.index"), queryParams);
  };

  const onKeyPress = (name, e) => {
    if (e.key !== "Enter") return;
    searchFieldChanged(name, e.target.value);
  };

  const sortChanged = (name) => {
    if (name === queryParams.sort_field) {
      if (queryParams.sort_direction === "asc") {
        queryParams.sort_direction = "desc";
      } else {
        queryParams.sort_direction = "asc";
      }
    } else {
      queryParams.sort_field = name;
      queryParams.sort_direction = "asc";
    }
    router.get(route("user.index"), queryParams);
  };

  const deleteUser = (user) => {
    if (confirm("Are you sure you want to delete this user?")) {
      router.delete(route("user.destroy", user.id));
    }
  };
  return (
    <AuthenticatedLayout
      user={auth.user}
      header={
        <div className="flex justify-between items-center ">
          <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
            Users
          </h2>
          {/* Create Product Button */}
          <Link
            href={route("user.create")}
            className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
          >
            Add new <LuPlus className="inline" />
          </Link>
        </div>
      }
    >
      <Head title="Users" />
      {success && <Alert message={success} type="success" duration={3000} />}

      <div className="py-12">
        <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-gray-800">
            <div className=" text-gray-900 dark:text-gray-100">
              <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-200 p-6">
                {/* Table */}
                <div className="overflow-x-auto">
                  {users?.data?.length ? (
                    <table className="min-w-full border-collapse border border-gray-300 dark:border-gray-700 shadow-md">
                      <thead className="bg-gray-200 dark:bg-gray-800">
                        <tr>
                          <TableHeading
                            name="id"
                            sortChanged={sortChanged}
                            sort_field={queryParams.sort_field}
                            sort_direction={queryParams.sort_direction}
                          >
                            ID{" "}
                          </TableHeading>
                          <TableHeading
                            name="name"
                            sortChanged={sortChanged}
                            sort_field={queryParams.sort_field}
                            sort_direction={queryParams.sort_direction}
                          >
                            Name
                          </TableHeading>
                          <TableHeading
                            name="email"
                            sortChanged={sortChanged}
                            sort_field={queryParams.sort_field}
                            sort_direction={queryParams.sort_direction}
                          >
                            Email
                          </TableHeading>
                          <TableHeading sortable={false}>
                            Created Date
                          </TableHeading>
                          <th
                            scope="col"
                            className="border border-gray-300 dark:border-gray-700 px-4 py-2 text-left"
                          >
                            Action
                          </th>
                        </tr>
                      </thead>
                      {/* Search Table Head */}
                      <thead className="bg-gray-100 dark:bg-gray-300">
                        <tr>
                          <th
                            scope="col"
                            className="border border-gray-300 dark:border-gray-700 px-4 py-2 text-left"
                          ></th>
                          <th
                            scope="col"
                            className="border border-gray-300 dark:border-gray-700 px-4 py-2 text-left"
                          >
                            <TextInput
                              className="w-full "
                              defaultValue={queryParams.name}
                              placeholder="search user name ..."
                              onBlur={(e) =>
                                searchFieldChanged("name", e.target.value)
                              }
                              onKeyPress={(e) => onKeyPress("name", e)}
                            />
                          </th>
                          <th
                            scope="col"
                            className="border border-gray-300 dark:border-gray-700 px-4 py-2 text-left"
                          >
                            <TextInput
                              className="w-full "
                              defaultValue={queryParams.email}
                              placeholder="search user email ..."
                              onBlur={(e) =>
                                searchFieldChanged("email", e.target.value)
                              }
                              onKeyPress={(e) => onKeyPress("email", e)}
                            />
                          </th>
                          <th
                            scope="col"
                            className="border border-gray-300 dark:border-gray-700 px-4 py-2 text-left"
                          ></th>
                          <th
                            scope="col"
                            className="border border-gray-300 dark:border-gray-700 px-4 py-2 text-left"
                          ></th>
                        </tr>
                      </thead>
                      <tbody>
                        {users?.data?.map((user) => (
                          <tr
                            key={user.id}
                            className="hover:bg-gray-100 dark:hover:bg-gray-800"
                          >
                            <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">
                              {user.id}
                            </td>
                            <td className="border  border-gray-300 dark:border-gray-700 px-4 py-2">
                              {user.name}
                            </td>
                            <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">
                              {user.email}
                            </td>
                            <td className="border text-nowrap border-gray-300 dark:border-gray-700 px-4 py-2">
                              {user.created_at}
                            </td>
                            <td className="border border-gray-300 dark:border-gray-700 px-4 py-2 ">
                              <div className="flex space-x-2">
                                <Link
                                  href={route("user.edit", user.id)}
                                  className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600"
                                  title="Edit this product"
                                >
                                  <LuFileEdit />
                                </Link>
                                <button
                                  onClick={() => deleteUser(user)}
                                  className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                                  title="Delete this product"
                                >
                                  <LuTrash2 />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  ) : (
                    <p className="text-center py-6">No users found.</p>
                  )}
                </div>
                <div className="mt-4">
                  <Pagination links={users.meta.links} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
};

export default Index;
