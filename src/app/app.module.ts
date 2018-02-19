import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RestangularModule, Restangular } from 'ngx-restangular';
import { ClarityModule } from '@clr/angular';
import { JwtModule } from '@auth0/angular-jwt';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

// Components
import { AppComponent } from './app.component';
import { RecipesComponent } from './recipes/recipes.component';
import { RecipeDetailComponent } from './recipe-detail/recipe-detail.component';
import { AppRoutingModule } from './/app-routing.module';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { SavedComponent } from './saved/saved.component';
import { SavedDetailComponent } from './saved/saved-detail/saved-detail.component';
import { LoginComponent } from './login/login.component';

// Services
import { RecipeService } from './recipe.service';
import { SavedService } from './saved/saved.service';
import { AuthenticationService } from './shared/authentication.service';
import { RegisterComponent } from './register/register.component';
import { DashboardComponent } from './dashboard/dashboard.component';



export function RestangularConfigFactory(RestangularProvider) {
  RestangularProvider.setBaseUrl('http://localhost:3000');
}


@NgModule({
  declarations: [
    AppComponent,
    RecipesComponent,
    RecipeDetailComponent,
    LandingPageComponent,
    PageNotFoundComponent,
    SavedComponent,
    SavedDetailComponent,

    LoginComponent,

    RegisterComponent,

    DashboardComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    ClarityModule,
    RestangularModule.forRoot(RestangularConfigFactory),
    JwtModule.forRoot({
      config: {
        tokenGetter: () => {
          return localStorage.getItem('currentUser');
        },
        skipWhenExpired: true,
        whitelistedDomains: ['http://yummy.test']
      },
    })
  ],
  providers: [RecipeService, SavedService, HttpClientModule, AuthenticationService],
  bootstrap: [AppComponent]
})
export class AppModule {

}
