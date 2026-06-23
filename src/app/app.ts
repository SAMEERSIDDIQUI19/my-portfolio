import { Component, signal } from '@angular/core';
import { NavbarComponent } from './navbar/navbar';
import { FooterComponent } from './footer/footer';
import { HeroComponent } from './components/hero/hero';
import { BentoGridComponent } from './components/bento-grid/bento-grid';
import { ProjectsComponent } from './pages/projects/projects';
import { ContactFormComponent } from './components/contact-form/contact-form';

@Component({
  selector: 'app-root',
  imports: [NavbarComponent, FooterComponent, HeroComponent, BentoGridComponent, ProjectsComponent, ContactFormComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('angular-portfolio');
}
