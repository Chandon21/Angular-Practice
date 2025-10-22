export interface Task {
  id?: number;       // optional, assigned by backend or json-server
  name: string;
  status: string;    // e.g., "Pending" or "Completed"
}
