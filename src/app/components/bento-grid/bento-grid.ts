import { Component, signal, computed, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { trigger, style, animate, transition } from '@angular/animations';

interface TechCategory {
  name: string;
  icon: string;
  technologies: string[];
  color: string;
}

interface ContributionDay {
  date: string;
  count: number;
  level: 0 | 1 | 2 | 3 | 4;
}

@Component({
  selector: 'app-bento-grid',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './bento-grid.html',
  styleUrls: ['./bento-grid.scss'],
  animations: [
    trigger('fadeIn', [
      transition(':enter', [
        style({ opacity: 0, transform: 'scale(0.95)' }),
        animate('400ms ease-out', style({ opacity: 1, transform: 'scale(1)' }))
      ])
    ]),
    trigger('slideIn', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(20px)' }),
        animate('500ms ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
      ])
    ])
  ]
})
export class BentoGridComponent implements OnInit {
  // Signals for reactive state
  hoveredCard = signal<string | null>(null);
  serverStatus = signal<'online' | 'offline' | 'maintenance'>('online');
  contributionData = signal<ContributionDay[]>([]);

  // Tech categories data
  techCategories: TechCategory[] = [
    {
      name: 'Frontend',
      icon: '🎨',
      technologies: ['Angular 17+', 'Next.js', 'TypeScript', 'Tailwind CSS', 'React'],
      color: '#3b82f6'
    },
    {
      name: 'Backend',
      icon: '⚙️',
      technologies: ['.NET Core', 'Node.js', 'Python', 'Web API', 'REST/GraphQL'],
      color: '#10b981'
    },
    {
      name: 'Databases',
      icon: '🗄️',
      technologies: ['PostgreSQL', 'SQL Server', 'Firebase', 'MongoDB', 'Redis'],
      color: '#a855f7'
    },
    {
      name: 'DevOps',
      icon: '🚀',
      technologies: ['Docker', 'Git', 'CI/CD', 'Azure', 'AWS'],
      color: '#f59e0b'
    }
  ];

  // Computed signals
  totalTechnologies = computed(() => {
    return this.techCategories.reduce((total, category) => total + category.technologies.length, 0);
  });

  contributionLevel = computed(() => {
    const data = this.contributionData();
    const total = data.reduce((sum, day) => sum + day.count, 0);
    if (total > 100) return 'high';
    if (total > 50) return 'medium';
    return 'low';
  });

  ngOnInit() {
    this.generateMockContributions();
    this.startServerStatusSimulation();
  }

  private generateMockContributions() {
    const contributions: ContributionDay[] = [];
    const today = new Date();
    
    for (let i = 364; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(date.getDate() - i);
      
      const count = Math.random() > 0.7 ? Math.floor(Math.random() * 10) : 0;
      let level: 0 | 1 | 2 | 3 | 4 = 0;
      
      if (count === 0) level = 0;
      else if (count <= 2) level = 1;
      else if (count <= 4) level = 2;
      else if (count <= 6) level = 3;
      else level = 4;

      contributions.push({
        date: date.toISOString().split('T')[0],
        count,
        level
      });
    }
    
    this.contributionData.set(contributions);
  }

  private startServerStatusSimulation() {
    setInterval(() => {
      const statuses: ('online' | 'offline' | 'maintenance')[] = ['online', 'online', 'online', 'maintenance'];
      this.serverStatus.set(statuses[Math.floor(Math.random() * statuses.length)]);
    }, 10000);
  }

  onCardHover(cardId: string) {
    this.hoveredCard.set(cardId);
  }

  onCardLeave() {
    this.hoveredCard.set(null);
  }

  getStatusIcon() {
    switch (this.serverStatus()) {
      case 'online':
        return '●';
      case 'offline':
        return '●';
      case 'maintenance':
        return '⚠';
    }
  }

  getStatusColor() {
    switch (this.serverStatus()) {
      case 'online':
        return '#10b981';
      case 'offline':
        return '#ef4444';
      case 'maintenance':
        return '#f59e0b';
    }
  }
}
