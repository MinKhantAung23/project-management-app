import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link } from "@inertiajs/react";
import React from "react";
import { LuArrowRight } from "react-icons/lu";
import TasksTable from "../Task/TasksTable";

const Show = ({ auth, tasks, task, queryParams }) => {
  return (
    <AuthenticatedLayout
      user={auth.user}
      header={
        <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
          {`Task: ${task.name}`}
        </h2>
      }
    >
      <Head title={`Task: ${task.name}`} />

      <div className="py-12">
        <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-gray-800">
            <div className="p-6 text-gray-900 dark:text-gray-100">
              <div>
                <img
                  src={task.image_path}
                  className="w-full h-64 object-cover rounded-t-lg "
                  alt={task.name}
                />
              </div>
              <div className="p-4 mb-3">
                <small className="text-gray-800 dark:text-gray-200">
                  ID : {task.id}
                </small>
                <h1 className="text-2xl font-bold mb-2 ">{task.name}</h1>
                <p className="text-gray-800 dark:text-gray-200">Description</p>
                <p className="mt-2 text-gray-600 dark:text-gray-400 ">
                  {task.description}
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-6 bg-gray-100 dark:bg-gray-700 dark:text-gray-200 rounded-lg shadow-lg">
                {/* Project */}
                <div className="p-4 rounded-lg shadow-sm bg-white dark:bg-gray-800">
                  <label
                    htmlFor=""
                    className="text-sm font-semibold text-gray-600 dark:text-gray-300"
                  >
                    Project
                  </label>
                  <div className="mt-2">
                    <p className="text-lg font-medium text-gray-900 dark:text-gray-100">
                      <Link href={route("project.show", task.project.id)}>
                        {task.project["name"]}
                      </Link>
                    </p>
                  </div>
                </div>
                {/* Assigned User */}
                <div className="p-4 rounded-lg shadow-sm bg-white dark:bg-gray-800">
                  <label
                    htmlFor=""
                    className="text-sm font-semibold text-gray-600 dark:text-gray-300"
                  >
                    Assigned User
                  </label>
                  <div className="mt-2">
                    <p className="text-lg font-medium text-gray-900 dark:text-gray-100">
                      {task.assigned_user["name"]}
                    </p>
                    <small className="text-sm text-gray-500 dark:text-gray-400">
                      {task.assigned_user["email"]}
                    </small>
                  </div>
                </div>
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
                      {task.updated_by["name"]}
                    </p>
                    <small className="text-sm text-gray-500 dark:text-gray-400">
                      {task.updated_by["email"]}
                    </small>
                  </div>
                </div>
                {/* Priority */}
                <div className="p-4 rounded-lg shadow-sm bg-white dark:bg-gray-800">
                  <label
                    htmlFor=""
                    className="text-sm font-semibold text-gray-600 dark:text-gray-300"
                  >
                    Priority
                  </label>
                  <p
                    className={`mt-2 px-3 py-1 rounded w-fit text-sm font-medium text-white ${
                      task.priority === "low"
                        ? " bg-blue-500"
                        : task.priority === "meduium"
                        ? "bg-amber-500"
                        : task.priority === "high"
                        ? "bg-red-500"
                        : "bg-gray-500"
                    }`}
                  >
                    {task.priority === "low" && "Low"}
                    {task.priority === "meduium" && "Medium"}
                    {task.priority === "high" && "High"}
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
                      {task.created_by["name"]}
                    </p>
                    <small className="text-sm text-gray-500 dark:text-gray-400">
                      {task.created_by["email"]}
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
                    {task.created_at}
                  </p>
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
                    {task.due_date}
                  </p>
                </div>
                <div className="mt-8 text-end">
                  <Link
                    href={route("task.index")}
                    className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded hover:text-white duration-150 "
                  >
                    Task List{" "}
                    <LuArrowRight className="inline-flex animate-bounce " />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
};

export default Show;
