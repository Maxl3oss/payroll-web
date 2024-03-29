import { useAxios } from "@/helper/Axios";
import { IToken, IUser } from "@/types/global";
import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

interface AuthStore {
  user: IUser | undefined;
  accessToken: string | undefined;
  refreshToken: string | undefined;
  isLoading: boolean;
  error: string | undefined;

  setUser: (user: IUser) => void;
  setTokens: (accessToken: string, refreshToken: string) => void;
  refreshAccessToken: () => Promise<void>;
  logout: () => void;
}

const useAuthStore = create<AuthStore>()(
  devtools(
    persist((set, get) => ({
      user: undefined,
      accessToken: undefined,
      refreshToken: undefined,
      isLoading: false,
      error: undefined,

      setUser: (user: IUser) =>
        set((state) => ({ ...state, user })),

      setTokens: (accessToken: string, refreshToken: string) =>
        set((state) => ({ ...state, accessToken, refreshToken })),

      refreshAccessToken: async () => {
        try {
          set({ isLoading: true, error: undefined });

          // Replace with your actual refresh token endpoint and data structure
          const response = await useAxios.post("/auth/refresh", {
            refreshToken: get().refreshToken,
          });

          if (response && response.status === 200) {
            const { access, refresh }: IToken = response.data.token;
            set({ accessToken: access, refreshToken: refresh, isLoading: false });
          }

        } catch (error) {
          console.error("Error refreshing token:", error);
          set({ isLoading: false, error: "Failed to refresh token" });
        }
      },

      logout: () => {
        set({ user: undefined, accessToken: undefined, refreshToken: undefined, isLoading: false, error: undefined });
      }
    }),
      {
        name: "auth-store",
      }
    )
  )
);

export default useAuthStore;