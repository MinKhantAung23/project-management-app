import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import SelectInput from "@/Components/SelectInput";
import TextAreaInput from "@/Components/TextAreaInput";
import TextInput from "@/Components/TextInput";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, useForm } from "@inertiajs/react";
import React from "react";

const Edit = ({ auth, task, projects, users }) => {
  const { data, setData, post, processing, errors } = useForm({
    image: "",
    image_path: task.image_path || "",
    name: task.name || "",
    description: task.description || "",
    project_id: task.project_id || "",
    assigned_user_id: task.assigned_user_id || "",
    priority: task.priority || "",
    status: task.status || "",
    due_date: task.due_date || "",
    _method: "put",
  });

  const onSubmit = (e) => {
    e.preventDefault();
    post(route("task.update", task.id));
  };
  return (
    <AuthenticatedLayout
      user={auth.user}
      header={
        <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
          Edit Task "{task.name}"
        </h2>
      }
    >
      <Head title="Create New Task" />
      <div className="py-12">
        <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-gray-800">
            <div className="p-6 text-gray-900 dark:text-gray-100">
              <form
                onSubmit={onSubmit}
                className="max-w-3xl mx-auto p-6 bg-white dark:bg-gray-800 rounded-lg shadow-sm space-y-6"
              >
                {/* Task Image */}
                <div className="mb-4">
                  <label
                    htmlFor="task_image_path"
                    className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2"
                  >
                    Task Image
                  </label>

                  <div className="flex items-center justify-center w-full">
                    <label
                      htmlFor="task_image_path"
                      className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:bg-gray-700 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-600"
                    >
                      <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        {data.image_path ? (
                          <img
                            src={data.image_path}
                            className="w-40 h-12 object-cover rounded-lg "
                            alt={data.name}
                          />
                        ) : (
                          <svg
                            aria-hidden="true"
                            className="w-10 h-10 mb-3 text-gray-400"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0-3 3m3-3v12"
                            ></path>
                          </svg>
                        )}
                        <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                          <span className="font-semibold">Click to upload</span>{" "}
                          or drag and drop
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          SVG, PNG, JPG (Max. 2MB)
                        </p>
                      </div>
                      <input
                        id="task_image_path"
                        type="file"
                        name="image"
                        className="hidden"
                        onChange={(e) => setData("image", e.target.files[0])}
                      />
                    </label>
                  </div>

                  {errors.image && (
                    <p className="mt-2 text-sm text-red-500">{errors.image}</p>
                  )}
                </div>
                {/* Project id */}
                <div>
                  <InputLabel
                    htmlFor="task_project_id"
                    value="Project"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                  />
                  <SelectInput
                    name="project_id"
                    id="task_project_id"
                    defaultValue={data?.project_id}
                    onChange={(e) => setData("project_id", e.target.value)}
                    className="block w-full text-sm text-gray-900 bg-gray-50 dark:bg-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="">Select Project</option>
                    {projects?.data?.map((project) => (
                      <option value={project.id} key={project.id}>
                        {project.name}
                      </option>
                    ))}
                  </SelectInput>
                  <InputError
                    message={errors.project_id}
                    className="mt-2 text-sm text-red-500"
                  />
                </div>
                {/* Task Name */}
                <div>
                  <InputLabel
                    htmlFor="task_name"
                    value="Task Name"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                  />
                  <TextInput
                    id="task_name"
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

                {/* Task Description */}
                <div>
                  <InputLabel
                    htmlFor="task_description"
                    value="Task Description"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                  />
                  <TextAreaInput
                    id="task_description"
                    name="description"
                    value={data.description}
                    onChange={(e) => setData("description", e.target.value)}
                    className="block w-full text-sm text-gray-900 bg-gray-50 dark:bg-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
                  />
                  <InputError
                    message={errors.description}
                    className="mt-2 text-sm text-red-500"
                  />
                </div>

                {/* Task Status */}
                <div>
                  <InputLabel
                    htmlFor="task_status"
                    value="Task Status"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                  />
                  <SelectInput
                    name="status"
                    id="task_status"
                    defaultValue={data?.status}
                    onChange={(e) => setData("status", e.target.value)}
                    className="block w-full text-sm text-gray-900 bg-gray-50 dark:bg-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="">Select Status</option>
                    <option value="pending">Pending</option>
                    <option value="in_progress">In Progress</option>
                    <option value="completed">Completed</option>
                  </SelectInput>
                  <InputError
                    message={errors.status}
                    className="mt-2 text-sm text-red-500"
                  />
                </div>
                {/* Task priority */}
                <div>
                  <InputLabel
                    htmlFor="task_priority"
                    value="Task Priority"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                  />
                  <SelectInput
                    name="priority"
                    id="task_priority"
                    defaultValue={data?.priority}
                    onChange={(e) => setData("priority", e.target.value)}
                    className="block w-full text-sm text-gray-900 bg-gray-50 dark:bg-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="">Select Priority</option>
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                  </SelectInput>
                  <InputError
                    message={errors.priority}
                    className="mt-2 text-sm text-red-500"
                  />
                </div>
                {/* Task Due Date */}
                <div>
                  <InputLabel
                    htmlFor="task_due_date"
                    value="Task Due Date"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                  />
                  <TextInput
                    id="task_due_date"
                    type="date"
                    name="due_date"
                    defaultValue={data.due_date}
                    onChange={(e) => setData("due_date", e.target.value)}
                    className="block w-full text-sm text-gray-900 bg-gray-50 dark:bg-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
                  />
                  <InputError
                    message={errors.due_date}
                    className="mt-2 text-sm text-red-500"
                  />
                </div>
                {/* Task Assigned User */}
                <div>
                  <InputLabel
                    htmlFor="task_assigned_user"
                    value="Assigned User"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                  />
                  <SelectInput
                    name="assigned_user_id"
                    id="task_assigned_user"
                    defaultValue={data?.assigned_user_id}
                    onChange={(e) =>
                      setData("assigned_user_id", e.target.value)
                    }
                    className="block w-full text-sm text-gray-900 bg-gray-50 dark:bg-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="">Select User</option>
                    {users?.data?.map((user) => (
                      <option value={user.id} key={user.id}>
                        {user.name}
                      </option>
                    ))}
                  </SelectInput>
                  <InputError
                    message={errors.assigned_user_id}
                    className="mt-2 text-sm text-red-500"
                  />
                </div>

                {/* Submit Button */}
                <div className="text-right flex justify-end gap-3">
                  <Link
                    href={route("task.index")}
                    className="px-6 py-2 bg-gray-500 text-white font-medium text-sm rounded-lg shadow-sm hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 dark:ring-offset-gray-800"
                  >
                    Cancel
                  </Link>
                  <button
                    type="submit"
                    className="px-6 py-2 bg-blue-600 text-white font-medium text-sm rounded-lg shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:ring-offset-gray-800"
                  >
                    Update
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
