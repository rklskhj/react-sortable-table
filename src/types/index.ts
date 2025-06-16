export interface Column {
  key: string;
  label: string;
}

export interface UserTableData extends Record<string, unknown> {
  id: string | number;
  full_name: string;
  email: string | null;
  gender: string;
  age: number | null;
  start_date: Date | string | null;
}

export interface CourseTableData extends Record<string, unknown> {
  id: string | number;
  name: string;
  country: string;
  github_username: string;
  money: string;
}

export interface DataTableProps<
  T extends Record<string, unknown> & { id: string | number }
> {
  data: T[];
  columns: Column[];
  title?: string;
  disabledColumns?: string[];
  isLoading?: boolean;
}

export interface SortConfig {
  key: string | null;
  direction: "asc" | "desc" | null;
}
