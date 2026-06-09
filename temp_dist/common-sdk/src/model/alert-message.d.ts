export interface AlertMessage {
    message: string;
    subMessage?: string;
    type: string;
    children?: React.ReactNode;
}
