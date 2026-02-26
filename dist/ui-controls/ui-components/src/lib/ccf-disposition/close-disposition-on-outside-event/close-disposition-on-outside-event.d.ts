interface CloseDispositionOnOutsideEventProps {
    componentId: string;
    outcomesButtonId: string;
}
/**
   * Function to listen for mouseDown event and keydown 'enter' key event
   * on the DOM and close disposition panel if clicked outside the panel
   * @example <CloseDispositionOnOutsideEvent />
  */
export declare const CloseDispositionOnOutsideEvent: ({ componentId, outcomesButtonId }: CloseDispositionOnOutsideEventProps) => null;
export {};
