import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link } from "@inertiajs/react";

export default function Dashboard({
  auth,
  myPendingTasks,
  pendingTasks,
  myInProgressTasks,
  inProgressTasks,
  myCompletedTasks,
  completedTasks,
  activeTasks,
}) {
  return (
    <AuthenticatedLayout
      header={
        <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
          Dashboard
        </h2>
      }
    >
      <Head title="Dashboard" />

      <div className="py-12">
        <div className="mx-auto max-w-7xl sm:px-6 lg:px-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-gray-800">
            <div className="p-6  text-gray-900 dark:text-gray-100 text-center">
              <h3 className="text-2xl font-bold mb-2 text-amber-600 dark:text-amber-400">
                Pending Tasks
              </h3>
              <p className="text-gray-800 dark:text-gray-200 text-xl ">
                <span className="font-bold mr-2">{myPendingTasks}</span> /{" "}
                <span>{pendingTasks}</span>
              </p>
            </div>
          </div>
          <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-gray-800">
            <div className="p-6  text-gray-900 dark:text-gray-100 text-center">
              <h3 className="text-2xl font-bold mb-2 text-blue-600 dark:text-blue-400">
                Progress Tasks
              </h3>
              <p className="text-gray-800 dark:text-gray-200 text-xl ">
                <span className="font-bold mr-2">{myInProgressTasks}</span> /{" "}
                <span>{inProgressTasks}</span>
              </p>
            </div>
          </div>
          <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-gray-800">
            <div className="p-6  text-gray-900 dark:text-gray-100 text-center">
              <h3 className="text-2xl font-bold mb-2 text-green-600 dark:text-green-400">
                Completed Tasks
              </h3>
              <p className="text-gray-800 dark:text-gray-200 text-xl ">
                <span className="font-bold mr-2">{myCompletedTasks}</span> /{" "}
                <span>{completedTasks}</span>
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* My tasks */}
      <div className="py-4">
        <div className="mx-auto max-w-7xl sm:px-6 lg:px-8 grid grid-cols-1 gap-6">
          <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-gray-800">
            <div className="p-6  text-gray-900 dark:text-gray-100">
              <h3 className="text-2xl font-bold mb-2 text-gray-600 dark:text-gray-400">
                My Active Tasks
              </h3>

              <table className="min-w-full divide-y divide-gray-200 ">
                <thead className="bg-gray-50 dark:bg-gray-800 ">
                  <tr className="text-xs font-semibold tracking-wide text-left text-gray-500 uppercase border-b dark:border-gray-700">
                    <th className="border px-4 py-2">ID</th>
                    <th className="border px-4 py-2">Project Name</th>
                    <th className="border px-4 py-2">Name</th>
                    <th className="border px-4 py-2">Status</th>
                    <th className="border px-4 py-2">Due Date</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200 dark:bg-gray-800">
                  {activeTasks?.data?.map((task) => (
                    <tr
                      key={task.id}
                      className="text-xs font-semibold tracking-wide text-left text-gray-500 uppercase border-b dark:border-gray-700"
                    >
                      <td className="border px-4 py-2">{task.id}</td>
                      <td className="border px-4 py-2">
                        <Link
                          href={route("project.show", task.project.id)}
                          className="hover:underline hover:text-blue-500 duration-300"
                        >
                          {task.project.name}
                        </Link>
                      </td>
                      <td className="border px-4 py-2">
                        <Link
                          href={route("task.show", task.id)}
                          className="hover:underline hover:text-blue-500 duration-300"
                        >
                          {task.name}
                        </Link>
                      </td>
                      <td className="border px-4 py-2 text-nowrap">
                        <span
                          className={`px-2 py-1 text-white rounded ${
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
                      <td className="border px-4 py-2">{task.due_date}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
