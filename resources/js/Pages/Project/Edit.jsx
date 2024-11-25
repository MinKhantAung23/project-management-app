import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import SelectInput from "@/Components/SelectInput";
import TextAreaInput from "@/Components/TextAreaInput";
import TextInput from "@/Components/TextInput";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, useForm } from "@inertiajs/react";
import React from "react";

const Edit = ({ auth, project }) => {
  const { data, setData, post, processing, errors } = useForm({
    image: "",
    image_path: project.image_path || "",
    name: project.name || "",
    description: project.description || "",
    status: project.status || "",
    due_date: project.due_date || "",
    _method: "put",
  });

  const onSubmit = (e) => {
    e.preventDefault();
    post(route("project.update", project.id));
  };
  return (
    <AuthenticatedLayout
      user={auth.user}
      header={
        <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
          Edit Project "{project.name}"
        </h2>
      }
    >
      <Head title="Create New Project" />
      <div className="py-12">
        <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-gray-800">
            <div className="p-6 text-gray-900 dark:text-gray-100">
              <form
                onSubmit={onSubmit}
                className="max-w-3xl mx-auto p-6 bg-white dark:bg-gray-800 rounded-lg shadow-sm space-y-6"
              >
                {/* Project Image */}
                <div className="mb-4">
                  <label
                    htmlFor="project_image_path"
                    className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2"
                  >
                    Project Image
                  </label>

                  <div className="flex items-center justify-center w-full">
                    <label
                      htmlFor="project_image_path"
                      className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:bg-gray-700 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-600"
                    >
                      <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        {data.image_path ? (
                          <img
                            className="w-16 h-16 rounded-lg mb-1 text-gray-400"
                            src={data.image_path}
                            alt="image"
                          />
                        ) : (
                          <svg
                            className="w-8 h-8 mb-1 text-gray-400"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2 2-2m-10 6L7 20h14a2 2 0 002-2V6a2 2 0 00-2-2H7a2 2 0 00-2 2v12a2 2 0 002 2z"
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
                        id="project_image_path"
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

                {/* Project Name */}
                <div>
                  <InputLabel
                    htmlFor="project_name"
                    value="Project Name"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                  />
                  <TextInput
                    id="project_name"
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

                {/* Project Description */}
                <div>
                  <InputLabel
                    htmlFor="project_description"
                    value="Project Description"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                  />
                  <TextAreaInput
                    id="project_description"
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

                {/* Project Status */}
                <div>
                  <InputLabel
                    htmlFor="project_status"
                    value="Project Status"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                  />
                  <SelectInput
                    name="status"
                    id="project_status"
                    onChange={(e) => setData("status", e.target.value)}
                    value={data.status}
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

                {/* Project Due Date */}
                <div>
                  <InputLabel
                    htmlFor="project_due_date"
                    value="Project Due Date"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                  />
                  <TextInput
                    id="project_due_date"
                    type="date"
                    name="due_date"
                    value={data.due_date || ""}
                    format="dd-mm-yyyy"
                    onChange={(e) => setData("due_date", e.target.value)}
                    className="block w-full text-sm text-gray-900 bg-gray-50 dark:bg-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
                  />
                  <InputError
                    message={errors.due_date}
                    className="mt-2 text-sm text-red-500"
                  />
                </div>

                {/* Submit Button */}
                <div className="text-right flex justify-end gap-3">
                  <Link
                    href={route("project.index")}
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
