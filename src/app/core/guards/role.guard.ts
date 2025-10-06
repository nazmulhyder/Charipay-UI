import { inject } from "@angular/core";
import { CanActivateFn, Router } from "@angular/router";
import { AuthService } from "../services/auth.service";

export const RoleGuard: CanActivateFn = (route) => {
    const auth = inject(AuthService);
    const router = inject(Router);
    const expectedRole = route.data['role'];
    const userRole = auth.getUserRole;

    if(auth.isLoggedIn() && userRole === expectedRole) return true;
    router.navigate(['/auth/login']);

    return false;
}