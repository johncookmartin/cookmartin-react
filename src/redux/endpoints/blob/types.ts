// Request and response types for blob storage endpoints

export interface UploadPdfRequest {
  file: File;
  path: string;
}

export interface UploadPdfResponse {
  ok: boolean;
  url: string;
  path: string;
}

export interface BlobErrorResponse {
  error: string;
}
