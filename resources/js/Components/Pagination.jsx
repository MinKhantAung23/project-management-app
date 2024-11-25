import React from "react";
import { Link } from "@inertiajs/react";

const Pagination = ({ links }) => {
  if (!links || links.length <= 1) return null;

  return (
    <nav className="pagination flex items-center justify-center space-x-2 mt-4">
      {links?.map((link, index) => (
        <Link
          key={index}
          href={link.url}
          className={`px-3 py-1 rounded ${
            link.active
              ? "bg-blue-500 text-white"
              : "bg-gray-200 text-gray-700 hover:bg-gray-300"
          } ${!link.url ? "pointer-events-none text-gray-400 " : ""}`}
          dangerouslySetInnerHTML={{ __html: link.label }}
        ></Link>
      ))}
    </nav>
  );
};

export default Pagination;
