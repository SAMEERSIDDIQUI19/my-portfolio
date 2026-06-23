import { Component, OnInit, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { trigger, style, animate, transition } from '@angular/animations';

interface TechnicalHighlight {
  title: string;
  description: string;
  impact: string;
}

interface Project {
  name: string;
  description: string;
  language: string;
  topics: string[];
  isPrivate: boolean;
  status: string;
  technicalHighlights: TechnicalHighlight[];
  architecture: string[];
  liveUrl?: string;
  githubUrl?: string;
}

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './projects.html',
  styleUrl: './projects.scss',
  animations: [
    trigger('fadeInUp', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(20px)' }),
        animate('500ms ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
      ])
    ]),
    trigger('slideIn', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateX(20px)' }),
        animate('400ms ease-out', style({ opacity: 1, transform: 'translateX(0)' }))
      ])
    ])
  ]
})
export class ProjectsComponent implements OnInit {
  // Signals for reactive state
  projects = signal<Project[]>([]);
  loading = signal(true);
  showPrivateMessage = signal(true);
  hoveredProject = signal<string | null>(null);
  filter = signal<'all' | 'live' | 'completed'>('all');

  // Computed signals
  filteredProjects = computed(() => {
    const filterValue = this.filter();
    const allProjects = this.projects();
    
    if (filterValue === 'all') return allProjects;
    return allProjects.filter(project => 
      project.status.toLowerCase() === filterValue
    );
  });

  ngOnInit() {
    this.loadProjects();
  }

  loadProjects() {
    setTimeout(() => {
      this.projects.set([
        {
          name: 'AdminCRM',
          description: 'Built a comprehensive configuration module with multiple screens that can manage all databases simultaneously. Developed using Angular 17 with advanced database management capabilities.',
          language: 'Angular 17',
          topics: ['angular', 'typescript', 'database-management'],
          isPrivate: true,
          status: 'Completed',
          technicalHighlights: [
            {
              title: 'Optimized Database Queries',
              description: 'Implemented query optimization reducing response time by 40%',
              impact: 'Performance'
            },
            {
              title: 'Modular Architecture',
              description: 'Designed scalable component architecture for easy maintenance',
              impact: 'Architecture'
            }
          ],
          architecture: ['Angular 17', 'TypeScript', 'SQL Server', 'REST API']
        },
        {
          name: 'AdminCRM API',
          description: 'Backend API service for AdminCRM system built with .NET Core and SQL Database. Provides robust data management and configuration services for the frontend application.',
          language: '.NET Core',
          topics: ['dotnet-core', 'sql-server', 'web-api'],
          isPrivate: true,
          status: 'Completed',
          technicalHighlights: [
            {
              title: 'High-Performance API',
              description: 'Built RESTful API handling 10K+ requests per minute',
              impact: 'Performance'
            },
            {
              title: 'Secure Authentication',
              description: 'Implemented JWT-based authentication with role-based access',
              impact: 'Security'
            }
          ],
          architecture: ['.NET Core', 'SQL Server', 'JWT', 'Entity Framework']
        },
        {
          name: 'CRM System',
          description: 'Developed multiple systems to manage various operations using .NET WebForms and SQL. Integrated comprehensive email management system and implemented merchant management functionality.',
          language: '.NET WebForms',
          topics: ['webforms', 'sql', 'email-integration'],
          isPrivate: true,
          status: 'Completed',
          technicalHighlights: [
            {
              title: 'Email Integration',
              description: 'Built automated email system with template management',
              impact: 'Integration'
            },
            {
              title: 'Merchant Portal',
              description: 'Created comprehensive merchant management dashboard',
              impact: 'Feature'
            }
          ],
          architecture: ['.NET WebForms', 'SQL Server', 'SMTP', 'ASP.NET']
        },
        {
          name: 'HRMS (Human Resource Management)',
          description: 'Automated ZKTeco attendance machines to directly fetch data, display it in the database, and present it per employee. Implemented multiple setup screens for management using .NET Core MVC.',
          language: '.NET Core MVC',
          topics: ['mvc', 'sql', 'zkteco-integration'],
          isPrivate: true,
          status: 'Completed',
          technicalHighlights: [
            {
              title: 'Biometric Integration',
              description: 'Integrated ZKTeco attendance machines for automated data collection',
              impact: 'Integration'
            },
            {
              title: 'Real-time Dashboard',
              description: 'Built live attendance tracking dashboard with analytics',
              impact: 'Feature'
            }
          ],
          architecture: ['.NET Core MVC', 'SQL Server', 'ZKTeco API', 'SignalR']
        },
        {
          name: 'LMS (Learning Management System)',
          description: 'Created comprehensive modules for adding courses and course content management. Built with .NET Core MVC and SQL database for educational content delivery and management.',
          language: '.NET Core MVC',
          topics: ['mvc', 'sql', 'education-tech'],
          isPrivate: true,
          status: 'Completed',
          technicalHighlights: [
            {
              title: 'Course Management',
              description: 'Built modular course creation and content management system',
              impact: 'Feature'
            },
            {
              title: 'Progress Tracking',
              description: 'Implemented student progress analytics and reporting',
              impact: 'Analytics'
            }
          ],
          architecture: ['.NET Core MVC', 'SQL Server', 'Entity Framework', 'Chart.js']
        },
        {
          name: 'LogoNDesign',
          description: 'A comprehensive design platform for creating and managing logos and branding materials. Built with WebForms and SQL database for robust content management and user data storage.',
          language: 'WebForms',
          topics: ['webforms', 'sql', 'design-tools'],
          isPrivate: true,
          status: 'Live',
          technicalHighlights: [
            {
              title: 'Design Tools',
              description: 'Built custom design editor with real-time preview',
              impact: 'Feature'
            },
            {
              title: 'Asset Management',
              description: 'Implemented efficient storage and retrieval of design assets',
              impact: 'Performance'
            }
          ],
          architecture: ['WebForms', 'SQL Server', 'File Storage', 'C#']
        },
        {
          name: 'DesignAndCodeLab',
          description: 'A premium client acquisition platform showcasing design capabilities and technical expertise. Built with WebForms and SQL Server to deliver seamless user experiences and convert visitors into paying clients through strategic UX patterns.',
          language: 'WebForms',
          topics: ['webforms', 'sql', 'client-portal'],
          isPrivate: true,
          status: 'Live',
          technicalHighlights: [
            {
              title: 'Client Conversion Optimization',
              description: 'Implemented strategic UX patterns and conversion funnels to maximize client acquisition rates',
              impact: 'Performance'
            },
            {
              title: 'Dynamic Portfolio Showcase',
              description: 'Created interactive portfolio sections with real-time code previews and project demonstrations',
              impact: 'Feature'
            },
            {
              title: 'Lead Generation System',
              description: 'Built integrated contact forms and inquiry management with automated follow-up workflows',
              impact: 'Integration'
            }
          ],
          architecture: ['WebForms', 'SQL Server', 'CodeMirror', 'ASP.NET']
        },
        {
          name: 'DesigNagArtistry',
          description: 'A modern portfolio and showcase platform for digital art and design work. Built with Next.js and PostgreSQL for optimal performance and dynamic content management.',
          language: 'Next.js',
          topics: ['nextjs', 'postgresql', 'portfolio'],
          isPrivate: true,
          status: 'Live',
          technicalHighlights: [
            {
              title: 'Performance Optimization',
              description: 'Achieved 98/100 Lighthouse score with image optimization',
              impact: 'Performance'
            },
            {
              title: 'Dynamic Content',
              description: 'Implemented CMS-driven content with SSR for SEO',
              impact: 'SEO'
            }
          ],
          architecture: ['Next.js', 'PostgreSQL', 'Prisma', 'Vercel']
        },
        {
          name: 'Car-ChatBot',
          description: 'An intelligent chatbot application specialized in automotive information and assistance. Developed using Python with ChromaDB for efficient vector-based knowledge retrieval and natural language processing.',
          language: 'Python',
          topics: ['python', 'chromadb', 'chatbot', 'nlp'],
          isPrivate: false,
          status: 'Live',
          technicalHighlights: [
            {
              title: 'Vector Database',
              description: 'Implemented ChromaDB for efficient semantic search',
              impact: 'Performance'
            },
            {
              title: 'NLP Integration',
              description: 'Built natural language processing for intent recognition',
              impact: 'AI/ML'
            }
          ],
          architecture: ['Python', 'ChromaDB', 'LangChain', 'FastAPI']
        },
        {
          name: 'MouseMover',
          description: 'A desktop utility application for automated mouse movement and control. Built as a WinForms application for personal use to assist with repetitive tasks and automation.',
          language: 'WinForms',
          topics: ['winforms', 'automation', 'desktop-app'],
          isPrivate: true,
          status: 'Completed',
          technicalHighlights: [
            {
              title: 'Automation Engine',
              description: 'Built customizable automation scripts with scheduling',
              impact: 'Feature'
            },
            {
              title: 'System Integration',
              description: 'Integrated with Windows API for low-level mouse control',
              impact: 'Integration'
            }
          ],
          architecture: ['WinForms', 'C#', 'Windows API', 'Task Scheduler']
        },
        {
          name: 'DesigNagar',
          description: 'A community platform for designers and artists to showcase their work and collaborate. Developed using WebForms and SQL database for user management and content storage.',
          language: 'WebForms',
          topics: ['webforms', 'sql', 'community'],
          isPrivate: true,
          status: 'Completed',
          technicalHighlights: [
            {
              title: 'Community Features',
              description: 'Built social features including comments, likes, and follows',
              impact: 'Feature'
            },
            {
              title: 'Gallery System',
              description: 'Created responsive image gallery with lazy loading',
              impact: 'Performance'
            }
          ],
          architecture: ['WebForms', 'SQL Server', 'ASP.NET', 'Image Processing']
        }
      ]);
      this.loading.set(false);
    }, 1500);
  }

  onProjectHover(projectName: string) {
    this.hoveredProject.set(projectName);
  }

  onProjectLeave() {
    this.hoveredProject.set(null);
  }

  setFilter(filter: 'all' | 'live' | 'completed') {
    this.filter.set(filter);
  }

  getProjectStatusColor(status: string): string {
    switch (status.toLowerCase()) {
      case 'live':
        return '#10b981';
      case 'completed':
        return '#3b82f6';
      default:
        return '#64748b';
    }
  }
}
