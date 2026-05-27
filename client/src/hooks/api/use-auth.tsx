import { getCurrentUserQueryFn } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";

type UseAuthOptions = {
  enabled?: boolean;
};

const useAuth = (options?: UseAuthOptions) => {
  const query = useQuery({
    queryKey: ["authUser"],
    queryFn: getCurrentUserQueryFn,
    staleTime: 0,
    retry: 2,
    enabled: options?.enabled ?? true,
  });
  return query;
};

export default useAuth;
