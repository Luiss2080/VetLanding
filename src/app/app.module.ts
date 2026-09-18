import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { InicioComponent } from './pages/inicio/inicio.component';
import { FooterComponent } from './components/footer/footer.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { ServiciosDisponiblesComponent } from './pages/servicios-disponibles/servicios-disponibles.component';
import { CatalogoProductosComponent } from './pages/catalogo-productos/catalogo-productos.component';
import { PlanesDeSaludComponent } from './pages/planes-de-salud/planes-de-salud.component';
import { ConsejosZoofiPetsComponent } from './pages/consejos-zoofi-pets/consejos-zoofi-pets.component';
import { SobreNosotrosComponent } from './pages/sobre-nosotros/sobre-nosotros.component';
import { NovedadesComponent } from './pages/novedades/novedades.component';
import { ContactenosComponent } from './pages/contactenos/contactenos.component';

@NgModule({
  declarations: [
    AppComponent,
    InicioComponent,
    FooterComponent,
    NavbarComponent,
    ServiciosDisponiblesComponent,
    CatalogoProductosComponent,
    PlanesDeSaludComponent,
    ConsejosZoofiPetsComponent,
    SobreNosotrosComponent,
    NovedadesComponent,
    ContactenosComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
