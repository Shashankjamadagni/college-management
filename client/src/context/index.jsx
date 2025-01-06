import { UserProvider } from "./loginContext";

export default function RootProvider({children}) {
  return (
    <UserProvider>
      {children}
    </UserProvider>
  );
}
