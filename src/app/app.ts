import { Component, signal } from '@angular/core';
import { NavbarComponent } from './navbar/navbar';
import { FooterComponent } from './footer/footer';
import { HomeComponent } from './pages/home/home';
import { AboutComponent } from './pages/about/about';
import { SkillsComponent } from './pages/skills/skills';
import { ProjectsComponent } from './pages/projects/projects';
import { ContactComponent } from './pages/contact/contact';

@Component({
  selector: 'app-root',
  imports: [NavbarComponent, FooterComponent, HomeComponent, AboutComponent, SkillsComponent, ProjectsComponent, ContactComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('angular-portfolio');
}
