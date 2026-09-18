import { useCallback, useEffect, useState } from "react";
import {
  createSubCategory,
  createTicketCategory,
  deleteSubCategory,
  deleteTicketCategory,
  getTicketCategories,
  updateSubCategory,
  updateTicketCategory,
} from "../services/ticketCategoryService";
import type { TicketCategory } from "../types";
import { getApiErrorMessage } from "../types";

export const useTicketCategories = () => {
  const [categories, setCategories] = useState<TicketCategory[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchCategories = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await getTicketCategories();
      setCategories(data);
    } catch (err) {
      setError(getApiErrorMessage(err, "Failed to load ticket categories"));
      setCategories([]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  const createCategory = async (payload: {
    name: string;
    subCategories?: string[];
  }) => {
    setIsSaving(true);
    try {
      const result = await createTicketCategory(payload);
      await fetchCategories();
      return result;
    } finally {
      setIsSaving(false);
    }
  };

  const renameCategory = async (id: string, name: string) => {
    setIsSaving(true);
    try {
      const result = await updateTicketCategory(id, { name });
      await fetchCategories();
      return result;
    } finally {
      setIsSaving(false);
    }
  };

  const removeCategory = async (id: string) => {
    setIsSaving(true);
    try {
      await deleteTicketCategory(id);
      await fetchCategories();
    } finally {
      setIsSaving(false);
    }
  };

  const addSubCategory = async (categoryId: string, name: string) => {
    setIsSaving(true);
    try {
      const result = await createSubCategory(categoryId, { name });
      await fetchCategories();
      return result;
    } finally {
      setIsSaving(false);
    }
  };

  const renameSubCategory = async (id: string, name: string) => {
    setIsSaving(true);
    try {
      const result = await updateSubCategory(id, { name });
      await fetchCategories();
      return result;
    } finally {
      setIsSaving(false);
    }
  };

  const removeSubCategory = async (id: string) => {
    setIsSaving(true);
    try {
      await deleteSubCategory(id);
      await fetchCategories();
    } finally {
      setIsSaving(false);
    }
  };

  return {
    categories,
    isLoading,
    isSaving,
    error,
    fetchCategories,
    createCategory,
    renameCategory,
    removeCategory,
    addSubCategory,
    renameSubCategory,
    removeSubCategory,
  };
};
