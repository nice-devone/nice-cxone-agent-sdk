/**
 * Model Class for Digital contact to upload files to s3 bucket
 */
export declare class CXoneFileUploadRequest {
    /**
     * @remarks - This will store uploaded file's base64encoded file content
     */
    content: string;
    /**
     * @remarks - This represents the uploaded file's type (image/png, image/jpeg etc.)
     */
    mimeType: string;
}
