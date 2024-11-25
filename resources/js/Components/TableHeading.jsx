import React from "react";
import { LuChevronDown, LuChevronUp, LuTrash } from "react-icons/lu";

const TableHeading = ({
  name = null,
  sort_field = null,
  sort_direction = null,
  sortChanged = () => {},
  sortable = true,
  children,
}) => {
  return (
    <th
      onClick={(e) => sortChanged(name)}
      scope="col"
      className="border border-gray-300 text-nowrap dark:border-gray-700 px-4 py-2 text-left"
    >
      <div className="flex  items-center gap-2">
        {sortable && (
          <div className="cursor-pointer">
            <LuChevronUp
              className={`size-5 hover:text-blue-500 active:text-red-500 ${
                sort_field === name && sort_direction === "asc"
                  ? "text-red-500"
                  : ""
              }`}
            />
            <LuChevronDown
              className={`size-5 -mt-2 hover:text-blue-500 active:text-red-500 ${
                sort_field === name && sort_direction === "desc"
                  ? "text-red-500"
                  : ""
              }`}
            />
          </div>
        )}
        {children}
      </div>
    </th>
  );
};

export default TableHeading;
