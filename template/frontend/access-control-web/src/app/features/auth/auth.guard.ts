import { CanActivateFn, Router } from "@angular/router";
import { inject } from "@angular/core";
import { AuthService } from "./auth.service";
import { RouterStateSnapshot } from "@angular/router";

export const authGuard: CanActivateFn = async (route, state) => {
    const authService = inject(AuthService);
    const router = inject(Router);

    await authService.checkAuthStatus(); // Ensure the authentication status is checked before proceeding

    if (authService.isAuthenticated()) {
        return true;
    }

    router.navigate(["/login"]);
    return false;
};