export interface Errors {
  Id: string;
  Error_Summary: string;
  Error_Message: string;
  Severity: string;
  Detected_ts: string;
  Remediation: string | Array<string>;
}
