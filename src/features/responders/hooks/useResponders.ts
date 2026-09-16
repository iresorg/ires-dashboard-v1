import { useResponderStore } from "../store/respondersStore";

export const useResponders = () => {
  const {
    responders,
    pagination,
    isLoading,
    error,
    search,
    fetchResponders,
    setSearch,
    createResponder,
    updateResponder,
    activateResponder,
    deactivateResponder,
    deleteResponder,
  } = useResponderStore();

  return {
    responders,
    pagination,
    isLoading,
    error,
    search,
    fetchResponders,
    setSearch,
    createResponder,
    updateResponder,
    activateResponder,
    deactivateResponder,
    deleteResponder,
  };
};
