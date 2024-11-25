import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link } from "@inertiajs/react";
import React from "react";
import { LuArrowRight } from "react-icons/lu";
import TasksTable from "../Task/TasksTable";

const Show = ({ auth, user, tasks, queryParams }) => {
  return (
    <AuthenticatedLayout
      user={auth.user}
      header={
        <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
          {`User: ${user.name}`}
        </h2>
      }
    >
      <Head title={`User: ${user.name}`} />

      <div className="py-12">
        <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-gray-800">
            <div className="p-6 text-gray-900 dark:text-gray-100">
              <div>
                <img
                  src={user.image_path}
                  className="w-full h-64 object-cover rounded-t-lg "
                  alt={user.name}
                />
              </div>
              <div className="p-4 mb-3">
                <small className="text-gray-800 dark:text-gray-200">
                  ID : {user.id}
                </small>
                <h1 className="text-2xl font-bold mb-2 ">{user.name}</h1>
                <p className="text-gray-800 dark:text-gray-200">Description</p>
                <p className="mt-2 text-gray-600 dark:text-gray-400 ">
                  {user.description}
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-6 bg-gray-100 dark:bg-gray-700 dark:text-gray-200 rounded-lg shadow-lg">
                {/* Status */}
                <div className="p-4 rounded-lg shadow-sm bg-white dark:bg-gray-800">
                  <label
                    htmlFor=""
                    className="text-sm font-semibold text-gray-600 dark:text-gray-300"
                  >
                    Status
                  </label>
                  <p
                    className={`mt-2 px-3 py-1 rounded w-fit text-sm font-medium text-white ${
                      user.status === "pending"
                        ? "bg-amber-500"
                        : user.status === "in_progress"
                        ? "bg-blue-500"
                        : user.status === "completed"
                        ? "bg-green-500"
                        : "bg-gray-500"
                    }`}
                  >
                    {user.status === "pending" && "Pending"}
                    {user.status === "in_progress" && "In Progress"}
                    {user.status === "completed" && "Completed"}
                  </p>
                </div>

                {/* Created By */}
                <div className="p-4 rounded-lg shadow-sm bg-white dark:bg-gray-800">
                  <label
                    htmlFor=""
                    className="text-sm font-semibold text-gray-600 dark:text-gray-300"
                  >
                    Created By
                  </label>
                  <div className="mt-2">
                    <p className="text-lg font-medium text-gray-900 dark:text-gray-100">
                      {user.created_by["name"]}
                    </p>
                    <small className="text-sm text-gray-500 dark:text-gray-400">
                      {user.created_by["email"]}
                    </small>
                  </div>
                </div>

                {/* Create Date */}
                <div className="p-4 rounded-lg shadow-sm bg-white dark:bg-gray-800">
                  <label
                    htmlFor=""
                    className="text-sm font-semibold text-gray-600 dark:text-gray-300"
                  >
                    Create Date
                  </label>
                  <p className="mt-2 text-gray-900 dark:text-gray-100">
                    {user.created_at}
                  </p>
                </div>

                {/* Updated By */}
                <div className="p-4 rounded-lg shadow-sm bg-white dark:bg-gray-800">
                  <label
                    htmlFor=""
                    className="text-sm font-semibold text-gray-600 dark:text-gray-300"
                  >
                    Updated By
                  </label>
                  <div className="mt-2">
                    <p className="text-lg font-medium text-gray-900 dark:text-gray-100">
                      {user.updated_by["name"]}
                    </p>
                    <small className="text-sm text-gray-500 dark:text-gray-400">
                      {user.updated_by["email"]}
                    </small>
                  </div>
                </div>

                {/* Due Date */}
                <div className="p-4 rounded-lg shadow-sm bg-white dark:bg-gray-800">
                  <label
                    htmlFor=""
                    className="text-sm font-semibold text-gray-600 dark:text-gray-300"
                  >
                    Due Date
                  </label>
                  <p className="mt-2 text-gray-900 dark:text-gray-100">
                    {user.due_date}
                  </p>
                </div>
              </div>

              <div className="mt-8 text-end">
                <Link
                  href={route("user.index")}
                  className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded hover:text-white duration-150 "
                >
                  User List{" "}
                  <LuArrowRight className="inline-flex animate-bounce " />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="py-12">
        <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-gray-800">
            <div className="p-6 text-gray-900 dark:text-gray-100">
              <TasksTable
                tasks={tasks}
                queryParams={queryParams}
                hideUserName={true}
              />
            </div>
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
};

export default Show;
