import { TestBed } from '@angular/core/testing';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterModule.forRoot([])
      ],
      declarations: [
        AppComponent,
        // AppComponent's real template renders <app-navbar> and
        // <app-footer> (see app.component.html); without declaring them
        // here TestBed throws NG0304 ("'app-navbar' is not a known
        // element") the moment the component is created, which was
        // failing all three tests below regardless of what they checked.
        NavbarComponent,
        FooterComponent,
      ],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'appSistema'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('appSistema');
  });

  it('should render the navbar and footer', () => {
    // The previous version of this test checked for an <h1> with
    // "Hello, appSistema" - leftover Angular CLI scaffolding text that
    // was never actually in app.component.html once the real navbar/
    // router-outlet/footer layout was built, so it could never have
    // passed. Checks the layout that's actually there instead.
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('app-navbar')).toBeTruthy();
    expect(compiled.querySelector('app-footer')).toBeTruthy();
    expect(compiled.querySelector('router-outlet')).toBeTruthy();
  });
});
