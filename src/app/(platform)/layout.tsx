import ModalProvider from "@/components/providers/ModalProvider";
import QueryProvider from "@/components/providers/QueryProvider";
import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from "sonner";
const PlatformLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <ClerkProvider>
      <QueryProvider>
        <Toaster></Toaster>
        <ModalProvider></ModalProvider>
        {children}
      </QueryProvider>
    </ClerkProvider>
  );
};
export default PlatformLayout;
