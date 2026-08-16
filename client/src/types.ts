export interface Client {
  id: number;
  name: string;
  phone: string;
  email: string;
  createdAt: string;
}

export interface ServiceOrder {
  id: number;
  client_id: number;
  device: string;
  issue: string;
  status: ServiceStatus;
  client?: Client;
}

export type ServiceStatus =
  | "open"
  | "in_progress"
  | "done";