import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-skills',
  imports: [CommonModule],
  templateUrl: './skills.html',
  styleUrl: './skills.scss',
})
export class SkillsComponent {
  skills = [
    { icon: '⚡', name: 'C# / .NET', level: 85, color: '#a78bfa', category: 'Backend' },
    { icon: '🅰️', name: 'Angular', level: 82, color: '#ef4444', category: 'Frontend' },
    { icon: '🗄️', name: 'MS SQL Server', level: 90, color: '#10b981', category: 'Database' },
    { icon: '🐍', name: 'Python', level: 70, color: '#eab308', category: 'Backend' },
    { icon: '☕', name: 'Java', level: 75, color: '#f97316', category: 'Backend' },
    { icon: '🔥', name: 'Firebase', level: 78, color: '#fb923c', category: 'Database / BaaS' },
    { icon: '🐳', name: 'Docker', level: 65, color: '#38bdf8', category: 'DevOps' },
    { icon: '📊', name: 'MS Office', level: 95, color: '#34d399', category: 'Productivity' },
    { icon: '🏭', name: 'SAP-CRM', level: 70, color: '#64748b', category: 'Enterprise' },
  ];
}
