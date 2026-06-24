import { Component, signal } from '@angular/core';
import { NavbarComponent } from './navbar/navbar';
import { FooterComponent } from './footer/footer';
import { AboutComponent } from './pages/about/about';
import { SkillsComponent } from './pages/skills/skills';
import { ProjectsComponent } from './pages/projects/projects';
import { HeroComponent } from './components/hero/hero';
import { BentoGridComponent } from './components/bento-grid/bento-grid';
import { ContactFormComponent } from './components/contact-form/contact-form';

@Component({
  selector: 'app-root',
  imports: [
    NavbarComponent,
    FooterComponent,
    AboutComponent,
    SkillsComponent,
    ProjectsComponent,
    HeroComponent,
    BentoGridComponent,
    ContactFormComponent,
  ],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('angular-portfolio');
}
