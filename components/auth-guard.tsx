"use client";

import { useEffect, useState } from "react";
import { useUser, useStackApp } from "@stackframe/stack";
import { useRouter } from "next/navigation";
import { ADMIN_EMAILS } from "@/lib/constants";

interface AuthGuardProps {
  children: React.ReactNode;
  requireAuth?: boolean;
  requireAdmin?: boolean;
}

export function AuthGuard({ children, requireAuth = true, requireAdmin = false }: AuthGuardProps) {
  const router = useRouter();
  const user = useUser();
  const app = useStackApp();
  const [isAuthorized, setIsAuthorized] = useState(false);

  useEffect(() => {
    if (requireAuth) {
      if (!user) {
        // Redirect to login if user is not authenticated
        router.push("/handler/sign-in");
      } else {
        // Trigger Sync (Fire and forget)
        fetch('/api/auth/sync', { method: 'POST' }).catch(err => console.error("Sync failed", err));

        if (requireAdmin) {
          // Check for admin role
          // Assuming user.roles contains the role list or user.selectedTeam.roles
          // We will check both for robustness, or checking if the user object has a helper
          const u = user as any;
          const hasAdminRole = u.roles?.some((r: any) => r.name === 'admin' || r === 'admin')
            || u.selectedTeam?.roles?.some((r: any) => r.name === 'admin' || r === 'admin');

          if (hasAdminRole) {
            setIsAuthorized(true);
          } else {
            // Redirect to home if user is not an admin
            router.push("/");
          }
        } else {
          setIsAuthorized(true);
        }
      }
    } else {
      setIsAuthorized(true);
    }
  }, [user, requireAuth, requireAdmin, router]);

  if (!isAuthorized) {
    return null; // Or a loading spinner
  }

  return <>{children}</>;
}
