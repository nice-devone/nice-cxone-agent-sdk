/**
 * Interface for digital Attachment format to be sent while replying
 */
export interface DigitalFileAttachment {
    /**
    * @remarks - uploaded file name
    */
    friendlyName: string;
    /**
    * @remarks - s3 bucket link url of uploaded file
    */
    url: string;
}
