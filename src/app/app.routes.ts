import { Routes } from '@angular/router';
import { AuthComponent } from './core/layouts/auth/auth.component';
import { UserComponent } from './core/layouts/user/user.component';
import { AdminComponent } from './core/layouts/admin/admin.component';
import { LoginComponent } from './core/auth/componentes/login/login.component';
import { RegisterComponent } from './core/auth/componentes/register/register.component';
import { HomeComponent } from './features/home/components/home/home.component';
import { CatogaryComponent } from './features/catogary/components/catogary/catogary.component';
import { CartListComponent } from './features/cart/components/cart-list/cart-list.component';
import { NotfoundComponent } from './core/auth/componentes/notfound/notfound.component';
import { ProductListComponent } from './features/product/components/product-list/product-list.component';
import { BrandListComponent } from './features/brands/components/brand-list/brand-list.component';
import { ProductDetailsComponent } from './features/product/components/product-details/product-details.component';
import { userExistGuard } from './core/guards/user-exist.guard';
import { homeguardGuard } from './core/guards/homeguard.guard';
import { CheckoutComponent } from './features/orders/component/checkout/checkout.component';
import { AllordersComponent } from './features/orders/component/allorders/allorders.component';
import { ForgetpassComponent } from './core/auth/componentes/forgetpass/forgetpass.component';
import { WishListComponent } from './features/wishlist/component/wish-list/wish-list.component';

export const routes: Routes = [
    { path: '', redirectTo: "home", pathMatch: 'full' },
    {
        path: '', component: AuthComponent, children: [
            { path: '', redirectTo: "register", pathMatch: 'full' },
            { path: 'login', component: LoginComponent, canActivate: [userExistGuard], title: 'login' },
            { path: 'register', component: RegisterComponent },
            { path: 'forgetpass', component: ForgetpassComponent },

        ]
    },
    {
        path: '', component: UserComponent, canActivate: [homeguardGuard], children: [
            { path: '', redirectTo: "home", pathMatch: 'full' },
            { path: 'home', component: HomeComponent},
            { path: 'category', component: CatogaryComponent },
            { path: 'products', component: ProductListComponent },
            { path: 'products-details/:id', component: ProductDetailsComponent },
            { path: 'brands', component: BrandListComponent },
            { path: 'cart', component: CartListComponent },
            { path: 'wishlist', component: WishListComponent },
            { path: 'checkout/:cartid', component: CheckoutComponent },
            { path: 'allorders', component: AllordersComponent },

        ]
    }, { path: '**', component: NotfoundComponent },
];
