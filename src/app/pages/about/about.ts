import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-about',
  imports: [CommonModule],
  templateUrl: './about.html',
  styleUrl: './about.scss',
})
export class AboutComponent {
  education = [
    { icon: '🎓', degree: 'BS Computer Science', institution: 'IQRA University', period: '2023 – Present' },
    { icon: '⚡', degree: 'BS Electronic Engineering', institution: 'Sir Syed University of Engineering & Technology', period: '2022 – 2023' },
    { icon: '🔧', degree: 'Diploma in Electrical Engineering', institution: 'Aligarh Institute and College', period: '2019 – 2022' },
    { icon: '📚', degree: 'Intermediate', institution: 'GDBC Gulistan-e-Jouhar', period: '2017 – 2018' },
    { icon: '🏫', degree: 'Matriculation', institution: 'Shaheen Public School', period: '2016' },
  ];
}
