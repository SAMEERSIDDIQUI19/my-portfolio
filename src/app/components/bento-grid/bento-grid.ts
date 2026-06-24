import { Component, signal, computed, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { trigger, style, animate, transition, keyframes, query, stagger } from '@angular/animations';

interface TechCategory {
  name: string;
  icon: string;
  technologies: string[];
  color: string;
  description: string;
}

interface ContributionDay {
  date: string;
  count: number;
  level: 0 | 1 | 2 | 3 | 4;
}

interface ServerMetric {
  name: string;
  value: number;
  unit: string;
  trend: 'up' | 'down' | 'stable';
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
        animate('400ms cubic-bezier(0.16, 1, 0.3, 1)', style({ opacity: 1, transform: 'scale(1)' }))
      ])
    ]),
    trigger('slideIn', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(20px)' }),
        animate('500ms cubic-bezier(0.16, 1, 0.3, 1)', style({ opacity: 1, transform: 'translateY(0)' }))
      ])
    ]),
    trigger('pulse', [
      transition('* => *', [
        animate('2s ease-in-out infinite', keyframes([
          style({ transform: 'scale(1)', opacity: 1 }),
          style({ transform: 'scale(1.05)', opacity: 0.8 }),
          style({ transform: 'scale(1)', opacity: 1 })
        ]))
      ])
    ]),
    trigger('bentoCard', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(30px)' }),
        animate('600ms cubic-bezier(0.16, 1, 0.3, 1)', style({ opacity: 1, transform: 'translateY(0)' }))
      ])
    ])
  ]
})
export class BentoGridComponent implements OnInit, OnDestroy {
  // Signals for reactive state
  hoveredCard = signal<string | null>(null);
  serverStatus = signal<'online' | 'offline' | 'maintenance'>('online');
  contributionData = signal<ContributionDay[]>([]);
  serverMetrics = signal<ServerMetric[]>([]);
  selectedCategory = signal<TechCategory | null>(null);
  isExpanded = signal(false);

  // Enhanced tech categories data
  techCategories: TechCategory[] = [
    {
      name: 'Frontend',
      icon: '🎨',
      technologies: ['Angular 17+', 'Next.js', 'TypeScript', 'Tailwind CSS', 'React', 'Vue.js'],
      color: '#3b82f6',
      description: 'Building responsive, performant user interfaces with modern frameworks'
    },
    {
      name: 'Backend',
      icon: '⚙️',
      technologies: ['.NET Core', 'Node.js', 'Python', 'Web API', 'REST/GraphQL', 'Microservices'],
      color: '#10b981',
      description: 'Scalable server-side solutions and API architecture'
    },
    {
      name: 'Databases',
      icon: '🗄️',
      technologies: ['PostgreSQL', 'SQL Server', 'Firebase', 'MongoDB', 'Redis', 'Elasticsearch'],
      color: '#a855f7',
      description: 'Data modeling, optimization, and database architecture'
    },
    {
      name: 'DevOps',
      icon: '🚀',
      technologies: ['Docker', 'Git', 'CI/CD', 'Azure', 'AWS', 'Kubernetes'],
      color: '#f59e0b',
      description: 'Infrastructure automation, deployment pipelines, and cloud architecture'
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
    this.initializeServerMetrics();
  }

  ngOnDestroy() {
    // Cleanup intervals if any
  }

  private initializeServerMetrics() {
    const metrics: ServerMetric[] = [
      { name: 'Uptime', value: 99.9, unit: '%', trend: 'up' },
      { name: 'Response Time', value: 45, unit: 'ms', trend: 'down' },
      { name: 'Requests/sec', value: 1250, unit: 'req/s', trend: 'up' },
      { name: 'Error Rate', value: 0.01, unit: '%', trend: 'stable' }
    ];
    this.serverMetrics.set(metrics);
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

  selectCategory(category: TechCategory) {
    this.selectedCategory.set(category);
    this.isExpanded.set(true);
  }

  closeExpandedView() {
    this.isExpanded.set(false);
    this.selectedCategory.set(null);
  }

  getTrendIcon(trend: 'up' | 'down' | 'stable'): string {
    switch (trend) {
      case 'up': return '↑';
      case 'down': return '↓';
      case 'stable': return '→';
    }
  }

  getTrendColor(trend: 'up' | 'down' | 'stable'): string {
    switch (trend) {
      case 'up': return '#10b981';
      case 'down': return '#ef4444';
      case 'stable': return '#64748b';
    }
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
