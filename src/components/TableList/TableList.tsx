import {
  DataGrid,
  gridPageCountSelector,
  gridPageSelector,
  useGridApiContext,
  useGridSelector,
  GridColDef,
  GridRowParams,
} from "@mui/x-data-grid";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import { useNavigate } from "react-router-dom";
import { Table } from "./style.ts";

interface TableListProps {
  columns: GridColDef[];
  rows: object[];
}

function CustomPagination() {
  const apiRef = useGridApiContext();
  const page = useGridSelector(apiRef, gridPageSelector);
  const pageCount = useGridSelector(apiRef, gridPageCountSelector);

  return (
    <Stack direction="row" spacing={2}>
      <Pagination
        color="primary"
        count={pageCount}
        page={page + 1}
        onChange={(_event, value) => apiRef.current.setPage(value - 1)}
      />
    </Stack>
  );
}

export function TableList(props: TableListProps) {
  const navigate = useNavigate();

  const { rows, columns } = props;

  const handleRowClick = (rowData: GridRowParams) => {
    navigate(`/product/${rowData.id}`);
  };

  return (
    <Table>
      <DataGrid
        onRowClick={(rowData) => handleRowClick(rowData)}
        rows={rows}
        columns={columns}
        slots={{
          pagination: CustomPagination,
        }}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 15,
            },
          },
        }}
      />
    </Table>
  );
}
