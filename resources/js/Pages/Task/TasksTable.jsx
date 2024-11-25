import React from "react";
import Pagination from "@/Components/Pagination";
import SelectInput from "@/Components/SelectInput";
import TableHeading from "@/Components/TableHeading";
import TextInput from "@/Components/TextInput";
import { Link, router } from "@inertiajs/react";
import { LuFileEdit, LuTrash2 } from "react-icons/lu";

const TasksTable = ({ tasks, queryParams = null, hideProjectName = false }) => {
  queryParams = queryParams || {};
  const searchFieldChanged = (name, value) => {
    if (value) {
      queryParams[name] = value;
    } else {
      delete queryParams[name];
    }

    router.get(route("task.index"), queryParams);
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
    router.get(route("task.index"), queryParams);
  };

  const deleteTask = (task) => {
    if (confirm("Are you sure you want to delete this task?")) {
      router.delete(route("task.destroy", task.id));
    }
  };
  return (
    <>
      <div className="overflow-x-auto">
        {tasks?.data?.length ? (
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
                {!hideProjectName && (
                  <TableHeading sortable={false}>Project Name</TableHeading>
                )}
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
                <TableHeading sortable={false}>Created By</TableHeading>
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
                {!hideProjectName && (
                  <th
                    scope="col"
                    className="border border-gray-300 dark:border-gray-700 px-4 py-2 text-left"
                  ></th>
                )}
                <th
                  scope="col"
                  className="border border-gray-300 dark:border-gray-700 px-4 py-2 text-left"
                >
                  <TextInput
                    className="w-full "
                    defaultValue={queryParams.name}
                    placeholder="search ..."
                    onBlur={(e) => searchFieldChanged("name", e.target.value)}
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
              {tasks?.data?.map((task) => (
                <tr
                  key={task.id}
                  className="hover:bg-gray-100 dark:hover:bg-gray-800"
                >
                  <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">
                    {task.id}
                  </td>
                  <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">
                    <img
                      src={task.image_path || "https://via.placeholder.com/50"}
                      alt={task.name || "No image"}
                      className="w-10 h-10 rounded"
                    />
                  </td>
                  {!hideProjectName && (
                    <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">
                      {task.project.name}
                    </td>
                  )}
                  <td className="border  border-gray-300 dark:border-gray-700 px-4 py-2">
                    <Link
                      href={route("task.show", task.id)}
                      className="hover:underline text-gray-800 dark:text-white duration-300"
                    >
                      {task.name}
                    </Link>
                  </td>
                  <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">
                    <span
                      className={`px-3 py-1 text-white rounded ${
                        task.status === "pending"
                          ? "bg-amber-500"
                          : task.status === "in_progress"
                          ? "bg-blue-500"
                          : task.status === "completed"
                          ? "bg-green-500"
                          : "bg-gray-500"
                      }`}
                    >
                      {task.status === "pending" && "Pending"}
                      {task.status === "in_progress" && "In Progress"}
                      {task.status === "completed" && "Completed"}
                    </span>
                  </td>

                  <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">
                    <div className="text-sm">
                      <div className="text-nowrap">
                        <span className="font-semibold">Created: </span>
                        {task.created_at}
                      </div>
                      <div className="text-red-600 text-nowrap">
                        <span className="font-semibold">Due: </span>
                        {task.due_date}
                      </div>
                    </div>
                  </td>
                  <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">
                    {task.created_by["name"]}
                  </td>
                  <td className="border border-gray-300 dark:border-gray-700 px-4 py-2 ">
                    <div className="flex space-x-2">
                      <Link
                        href={route("task.edit", task.id)}
                        className="px-3 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600"
                        title="Edit this product"
                      >
                        <LuFileEdit />
                      </Link>
                      <button
                        href={route("task.destroy", task.id)}
                        className="px-3 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                        title="Delete this product"
                        onClick={() => deleteTask(task)}
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
          <p className="text-center py-6">No tasks found.</p>
        )}
      </div>
      <div className="mt-4">
        <Pagination links={tasks.meta.links} />
      </div>
    </>
  );
};

export default TasksTable;
