import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, router } from "@inertiajs/react";
import TasksTable from "./TasksTable";
import { LuPlus } from "react-icons/lu";
import Alert from "@/Components/Alert";

const Index = ({ auth, tasks, queryParams = null, success }) => {
  return (
    <AuthenticatedLayout
      user={auth.user}
      header={
        <div className="mb-4 flex justify-between items-center">
          <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
            Tasks
          </h2>
          <Link
            href={route("task.create")}
            className="px-5 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
          >
            Create Task <LuPlus className=" inline-flex items-center size-5" />
          </Link>
        </div>
      }
    >
      <Head title="Tasks" />
      <div className="py-12">
        <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-gray-800">
            <div className=" text-gray-900 dark:text-gray-100">
              <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-200 p-6">
                {success && (
                  <Alert message={success} type="success" duration={3000} />
                )}
                {/* Table */}
                <TasksTable tasks={tasks} queryParams={queryParams} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
};

export default Index;
