/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { toast } from "../stores/appStore";

export const useHandleError = () => {
  const [error, setError] = useState<string | null>(null);


  const handleError = (err: any) => {
    if (err?.message) {
      setError(err.message);
    } else {
      setError(JSON.stringify(err));
    }
    toast.danger(error as string)
  };

  return {
    error,
    setError,
    handleError,
  };
};
