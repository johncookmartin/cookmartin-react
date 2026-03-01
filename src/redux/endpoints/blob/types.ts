// Request and response types for blob storage endpoints

export interface UploadResumeRequest {
  file: File;
}

export interface UploadResumeResponse {
  ok: boolean;
  url: string;
  path: string;
}

export interface BlobErrorResponse {
  error: string;
}
