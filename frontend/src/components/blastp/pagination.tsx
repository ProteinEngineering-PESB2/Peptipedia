import { Dispatch, SetStateAction } from "react";
import { Button } from "@mui/material";
export interface IPagination {
  from: number;
  limit: number;
}

interface PaginationComponentProps {
  pagination: IPagination;
  setPagination: Dispatch<SetStateAction<IPagination>>;
  total: number;
  step: number;
}

    {/* <button
      className={`py-2 px-3 ml-0 leading-tight text-gray-900 bg-white rounded-l-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-neutral-600 dark:border-gray-700 dark:text-gray-200 dark:hover:bg-neutral-500 dark:hover:text-white ${
        pagination.from === 0 ? "cursor-not-allowed" : "cursor-pointer"
      }`}
      disabled={pagination.from === 0}
      onClick={() =>
        setPagination({
          from: pagination.from - step,
          limit: pagination.limit - step,
        })
      }
    >
      Previous
    </button>
    
    <button
      className={`py-2 px-3 leading-tight text-gray-900 bg-white rounded-r-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-neutral-600 dark:border-gray-700 dark:text-gray-200 dark:hover:bg-neutral-500 dark:hover:text-white ${
        pagination.limit >= total
          ? "cursor-not-allowed"
          : "cursor-pointer"
      }`}
      disabled={pagination.limit >= total}
      onClick={() =>
        setPagination({
          from: pagination.from + step,
          limit: pagination.limit + step,
        })
      }
    >
      Next
    </button>*/}
export default function PaginationComponent({
  pagination,
  setPagination,
  total,
  step,
}: PaginationComponentProps) {
  return (
  <>
    <Button variant="outlined" disabled={pagination.from === 0} onClick={() =>
        setPagination({
          from: pagination.from - step,
          limit: pagination.limit - step,
        })
      }
      >Previous</Button>
    <Button variant="outlined" disabled={pagination.from === 0} onClick={() =>
        setPagination({
          from: pagination.from + step,
          limit: pagination.limit + step,
        })
      }
      >Next</Button>
    </> 
  );
}
