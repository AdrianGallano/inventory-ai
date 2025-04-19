import { useRouter } from "next/router";
import { useEffect } from "react";

export function withAuth(Component: React.ComponentType) {
  return function ProtectedRoute(props: any) {
    const router = useRouter();

    useEffect(() => {
      const token = localStorage.getItem("access_token");
      if (!token) {
        router.push("/login");
      }
    }, [router]);

    return <Component {...props} />;
  };
}