export interface MLResponse {
  status: boolean;
  output: string;
  time_exec : string;
  log_file_name : string;
  output_csv_name : string;
  error_count : string;
  warning_count : string;
  unique_error_count : string;
  unique_warning_count : string;
}
