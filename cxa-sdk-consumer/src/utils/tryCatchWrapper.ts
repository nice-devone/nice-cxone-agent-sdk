export const tryCatchWrapper = async <T>(
    asyncFunction: () => Promise<T>,
    errorHandler: (error: unknown) => void
  ): Promise<T | null> => {
    try {
      return await asyncFunction();
    } catch (error) {
      errorHandler(error);
      return null;
    }
  };
  