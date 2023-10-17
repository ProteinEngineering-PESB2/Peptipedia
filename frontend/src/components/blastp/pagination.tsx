import { Dispatch, SetStateAction } from "react";
import { Button, Grid } from "@mui/material";
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
export default function PaginationComponent({
  pagination,
  setPagination,
  total,
  step,
}: PaginationComponentProps) {
  return (
  <Grid container justifyContent="flex-end">
    <Button variant="outlined" disabled={pagination.from === 1} onClick={() =>
        setPagination({
          from: pagination.from - step,
          limit: pagination.limit - step,
        })
      }
      >Previous</Button>
    <Button variant="outlined" disabled={pagination.limit >= total} onClick={() =>
        setPagination({
          from: pagination.from + step,
          limit: pagination.limit + step,
        })
      }
    >Next</Button>
  </Grid>
  );
}
