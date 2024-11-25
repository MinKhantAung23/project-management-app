import Alert from "@/Components/Alert";
import Pagination from "@/Components/Pagination";
import SelectInput from "@/Components/SelectInput";
import TableHeading from "@/Components/TableHeading";
import TextInput from "@/Components/TextInput";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, router } from "@inertiajs/react";
import React from "react";
import { LuFileEdit, LuPlus, LuPlusSquare, LuTrash2 } from "react-icons/lu";

const Index = ({ auth, projects, queryParams = null, success }) => {
  queryParams = queryParams || {};
  const [alert, setAlert] = React.useState(false);

  const searchFieldChanged = (name, value) => {
    if (value) {
      queryParams[name] = value;
    } else {
      delete queryParams[name];
    }

    router.get(route("project.index"), queryParams);
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
    router.get(route("project.index"), queryParams);
  };

  const deleteProject = (project) => {
    if (confirm("Are you sure you want to delete this project?")) {
      router.delete(route("project.destroy", project.id));
    }
  };
  return (
    <AuthenticatedLayout
      user={auth.user}
      header={
        <div className="flex justify-between items-center ">
          <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
            Projects
          </h2>
          {/* Create Product Button */}
          <Link
            href={route("project.create")}
            className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
          >
            Add new <LuPlus className="inline" />
          </Link>
        </div>
      }
    >
      <Head title="Projects" />
      {success && <Alert message={success} type="success" duration={3000} />}

      <div className="py-12">
        <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-gray-800">
            <div className=" text-gray-900 dark:text-gray-100">
              <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-200 p-6">
                {/* Table */}
                <div className="overflow-x-auto">
                  {projects?.data?.length ? (
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
                          <TableHeading sortable={false}>Image</TableHeading>
                          <TableHeading
                            name="name"
                            sortChanged={sortChanged}
                            sort_field={queryParams.sort_field}
                            sort_direction={queryParams.sort_direction}
                          >
                            Name
                          </TableHeading>
                          <TableHeading
                            name="status"
                            sortChanged={sortChanged}
                            sort_field={queryParams.sort_field}
                            sort_direction={queryParams.sort_direction}
                          >
                            Status
                          </TableHeading>
                          <TableHeading sortable={false}>Dates</TableHeading>
                          <TableHeading sortable={false}>
                            Created By
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
                            className=" border-gray-300 dark:border-gray-700 px-4 py-2 text-left"
                          ></th>
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
                              placeholder="search ..."
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
                            <SelectInput
                              className="w-full"
                              defaultValue={queryParams.status}
                              onChange={(e) =>
                                searchFieldChanged("status", e.target.value)
                              }
                            >
                              <option value="">Select Status</option>
                              <option value="pending">Pending</option>
                              <option value="in_progress">In Progress</option>
                              <option value="completed">Completed</option>
                            </SelectInput>
                          </th>
                          <th
                            scope="col"
                            className="border border-gray-300 dark:border-gray-700 px-4 py-2 text-left"
                          ></th>
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
                        {projects?.data?.map((project) => (
                          <tr
                            key={project.id}
                            className="hover:bg-gray-100 dark:hover:bg-gray-800"
                          >
                            <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">
                              {project.id}
                            </td>
                            <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">
                              <img
                                src={
                                  project.image_path ||
                                  "https://via.placeholder.com/50"
                                }
                                alt={project.name || "No image"}
                                className="w-10 h-10 rounded"
                              />
                            </td>
                            <td className="border  border-gray-300 dark:border-gray-700 px-4 py-2">
                              <Link
                                href={route("project.show", project.id)}
                                className="text-gray-800 dark:text-gray-200 hover:text-gray-600  hover:underline duration-300 "
                              >
                                {project.name}
                              </Link>
                            </td>
                            <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">
                              <span
                                className={`px-3 py-1 text-white rounded ${
                                  project.status === "pending"
                                    ? "bg-amber-500"
                                    : project.status === "in_progress"
                                    ? "bg-blue-500"
                                    : project.status === "completed"
                                    ? "bg-green-500"
                                    : "bg-gray-500"
                                }`}
                              >
                                {project.status === "pending" && "Pending"}
                                {project.status === "in_progress" &&
                                  "In Progress"}
                                {project.status === "completed" && "Completed"}
                              </span>
                            </td>

                            <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">
                              <div className="text-sm">
                                <div className="text-nowrap">
                                  <span className="font-semibold">
                                    Created:{" "}
                                  </span>
                                  {project.created_at}
                                </div>
                                <div className="text-red-600 text-nowrap">
                                  <span className="font-semibold">Due: </span>
                                  {project.due_date}
                                </div>
                              </div>
                            </td>
                            <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">
                              {project.created_by["name"]}
                            </td>
                            <td className="border border-gray-300 dark:border-gray-700 px-4 py-2 ">
                              <div className="flex space-x-2">
                                <Link
                                  href={route("project.edit", project.id)}
                                  className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600"
                                  title="Edit this product"
                                >
                                  <LuFileEdit />
                                </Link>
                                <button
                                  onClick={() => deleteProject(project)}
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
                    <p className="text-center py-6">No projects found.</p>
                  )}
                </div>
                <div className="mt-4">
                  <Pagination links={projects.meta.links} />
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
