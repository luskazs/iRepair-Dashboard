export interface Client {
  id: number;
  name: string;
  phone: string;
  email: string;
  createdAt: string;
}

export interface ServiceOrder {
  id: number;
  deviceModel: string;
  description: string;
  status: string;
  client: Client;
}