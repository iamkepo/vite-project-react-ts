/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useCallback } from "react";
import { useHandleError } from "./useHandleError";

// Définir le type pour la fonction de changement de champ
type HandleInputChange<T> = (field: keyof T, value: any) => void;

// Hook personnalisé pour gérer l'état du formulaire de manière dynamique
export const useDataForm = <T extends object>(initialForm: T) => {
  const [data, setData] = useState<T>(initialForm);
  const [loading, setLoading] = useState<boolean>(false);
  const {error, setError, handleError} = useHandleError();

  // Fonction pour mettre à jour un champ spécifique du formulaire
  const handleInputChange: HandleInputChange<T> = (field, value) => {
    setData({ ...data, [field]: value });
  };
  const resetInputChange: HandleInputChange<T> = () => {
    setData(initialForm);
  };
  // Fonction pour gérer la soumission du formulaire
  const handleSubmit = useCallback(async (callback: (formData: T) => Promise<void>, event?: React.FormEvent<HTMLFormElement>) => {
    event?.preventDefault();
    setLoading(true);
    setError(null);
    try {
      await callback(data);
    } catch (err: any) {
      handleError(err)
    } finally {
      setLoading(false);
    }
  }, [data, handleError, setError]);

  return { 
    data, 
    handleInputChange, 
    resetInputChange, 
    handleSubmit, 
    loading, 
    error, 
    setError 
  };
};