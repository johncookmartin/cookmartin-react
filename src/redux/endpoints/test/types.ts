// Response types for test endpoints

export interface WhoAmIPubResponse {
  message: string;
  timestamp: string;
}

export interface WhoAmIPrivResponse {
  message: string;
  timestamp: string;
  userId?: string;
  email?: string;
}
