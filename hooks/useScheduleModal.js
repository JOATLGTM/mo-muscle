import { useState } from 'react';

export function useScheduleModal() {
  const [showModal, setShowModal] = useState(false);

  const openModal = () => setShowModal(true);
  const closeModal = () => setShowModal(false);
  const toggleModal = () => setShowModal(prev => !prev);

  return {
    showModal,
    setShowModal,
    openModal,
    closeModal,
    toggleModal,
  };
}
