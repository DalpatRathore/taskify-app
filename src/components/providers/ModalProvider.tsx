"use client";

import { useEffect, useState } from "react";
import CardModal from "../modal/cardModal/CardModal";

const ModalProvider = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <>
      <CardModal></CardModal>
    </>
  );
};
export default ModalProvider;
