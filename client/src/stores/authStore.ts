import { create } from "zustand";
import { persist } from "zustand/middleware";
import {
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  User as FirebaseUser,
} from "firebase/auth";
import { auth } from "@/lib/firebase";

interface User {
  id: string;
  email: string;
  name: string;
  role: "admin" | "editor" | "viewer";
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  setUser: (user: User | null) => void;
  checkAuth: () => Promise<void>;
  initializeAuth: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      isLoading: false,

      login: async (email: string, password: string) => {
        set({ isLoading: true });
        try {
          const userCredential = await signInWithEmailAndPassword(
            auth,
            email,
            password
          );
          const firebaseUser = userCredential.user;

          const user: User = {
            id: firebaseUser.uid,
            email: firebaseUser.email || "",
            name: firebaseUser.displayName || "Administrador",
            role: "admin",
          };

          set({ user, isAuthenticated: true });
        } catch (error: any) {
          set({ isAuthenticated: false, user: null });
          const errorMessage =
            error.code === "auth/user-not-found"
              ? "Usuário não encontrado"
              : error.code === "auth/wrong-password"
                ? "Senha incorreta"
                : error.code === "auth/invalid-email"
                  ? "Email inválido"
                  : error.message || "Erro ao fazer login";
          throw new Error(errorMessage);
        } finally {
          set({ isLoading: false });
        }
      },

      logout: async () => {
        try {
          await signOut(auth);
          set({ user: null, isAuthenticated: false });
        } catch (error) {
          console.error("Erro ao fazer logout:", error);
          throw error;
        }
      },

      setUser: (user) => {
        set({ user, isAuthenticated: !!user });
      },

      checkAuth: async () => {
        return new Promise((resolve) => {
          const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
            if (firebaseUser) {
              const user: User = {
                id: firebaseUser.uid,
                email: firebaseUser.email || "",
                name: firebaseUser.displayName || "Administrador",
                role: "admin",
              };
              set({ user, isAuthenticated: true });
            } else {
              set({ user: null, isAuthenticated: false });
            }
            unsubscribe();
            resolve(undefined);
          });
        });
      },

      initializeAuth: () => {
        const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
          if (firebaseUser) {
            const user: User = {
              id: firebaseUser.uid,
              email: firebaseUser.email || "",
              name: firebaseUser.displayName || "Administrador",
              role: "admin",
            };
            set({ user, isAuthenticated: true, isLoading: false });
          } else {
            set({ user: null, isAuthenticated: false, isLoading: false });
          }
        });

        // Retornar a função de desinscrição para limpeza
        return unsubscribe;
      },
    }),
    {
      name: "auth-storage",
    }
  )
);
