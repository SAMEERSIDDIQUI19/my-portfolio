import { Component, OnInit, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { trigger, style, animate, transition } from '@angular/animations';

interface Project {
  name: string;
  description: string;
  language: string;
  topics: string[];
  isPrivate: boolean;
  status: string;
  techStack: string[];
  architecture: string;
  keyFeatures: string[];
  performance: {
    loadTime: string;
    databaseOptimizations: string[];
  };
  liveUrl?: string;
  githubUrl?: string;
  image?: string;
  isFreelance?: boolean;
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
        style({ opacity: 0, transform: 'translateY(30px)' }),
        animate('600ms cubic-bezier(0.16, 1, 0.3, 1)', style({ opacity: 1, transform: 'translateY(0)' }))
      ])
    ]),
    trigger('cardHover', [
      transition('* => *', [
        style({ transform: 'scale(1)' }),
        animate('300ms cubic-bezier(0.16, 1, 0.3, 1)', style({ transform: 'scale(1.02)' }))
      ])
    ]),
    trigger('slideIn', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateX(-20px)' }),
        animate('400ms ease-out', style({ opacity: 1, transform: 'translateX(0)' }))
      ])
    ])
  ]
})
export class ProjectsComponent implements OnInit {
  projects: Project[] = [];
  loading = true;
  showPrivateMessage = true;
  hoveredProject = signal<string | null>(null);
  expandedProject = signal<Project | null>(null);
  filterCategory = signal<string>('all');
  
  categories = [
    { id: 'all', name: 'All Projects' },
    { id: 'angular', name: 'Angular' },
    { id: 'dotnet', name: '.NET' },
    { id: 'fullstack', name: 'Full Stack' },
    { id: 'freelance', name: 'Freelance' },
  ];
  
  filteredProjects = computed(() => {
    const category = this.filterCategory();
    if (category === 'all') return this.projects;
    return this.projects.filter(project => {
      const topics = project.topics.join(' ').toLowerCase();
      return topics.includes(category.toLowerCase());
    });
  });

  ngOnInit() {
    this.loadProjects();
  }

  loadProjects() {
    // Simulate loading time
    setTimeout(() => {
      this.projects = [
        {
          name: 'AdminCRM',
          description: 'Built a comprehensive configuration module with multiple screens that can manage all databases simultaneously. Developed using Angular 17 with advanced database management capabilities.',
          language: 'Angular 17',
          topics: ['angular', 'typescript', 'database-management'],
          isPrivate: true,
          status: 'Completed',
          techStack: ['Angular 17+', 'TypeScript', 'RxJS', 'Tailwind CSS', 'Firebase'],
          architecture: 'Modular architecture with standalone components, signals for state management, and lazy-loaded routes for optimal performance.',
          keyFeatures: ['Multi-database management', 'Real-time configuration updates', 'Responsive dashboard', 'Role-based access control'],
          performance: {
            loadTime: '< 1.2s',
            databaseOptimizations: ['Indexed queries', 'Connection pooling', 'Caching strategies']
          }
        },
        {
          name: 'AdminCRM API',
          description: 'Backend API service for AdminCRM system built with .NET Core and SQL Database. Provides robust data management and configuration services for the frontend application.',
          language: '.NET Core',
          topics: ['dotnet-core', 'sql-server', 'web-api'],
          isPrivate: true,
          status: 'Completed',
          techStack: ['.NET Core 8', 'Entity Framework Core', 'SQL Server', 'JWT Authentication', 'Swagger'],
          architecture: 'RESTful API with layered architecture, dependency injection, and middleware pipeline for security and logging.',
          keyFeatures: ['RESTful endpoints', 'JWT authentication', 'Swagger documentation', 'Error handling middleware'],
          performance: {
            loadTime: '< 200ms',
            databaseOptimizations: ['Stored procedures', 'Query optimization', 'Connection pooling']
          }
        },
        {
          name: 'CRM System',
          description: 'Developed multiple systems to manage various operations using .NET WebForms and SQL. Integrated comprehensive email management system and implemented merchant management functionality.',
          language: '.NET WebForms',
          topics: ['webforms', 'sql', 'email-integration'],
          isPrivate: true,
          status: 'Completed',
          techStack: ['.NET Framework', 'ASP.NET WebForms', 'SQL Server', 'SMTP', 'AJAX'],
          architecture: 'Traditional WebForms architecture with master pages, user controls, and server-side event handling.',
          keyFeatures: ['Email management system', 'Merchant management', 'Reporting modules', 'User authentication'],
          performance: {
            loadTime: '< 2s',
            databaseOptimizations: ['Indexing', 'Query optimization', 'View caching']
          }
        },
        {
          name: 'HRMS (Human Resource Management)',
          description: 'Automated ZKTeco attendance machines to directly fetch data, display it in the database, and present it per employee. Implemented multiple setup screens for management using .NET Core MVC.',
          language: '.NET Core MVC',
          topics: ['mvc', 'sql', 'zkteco-integration'],
          isPrivate: true,
          status: 'Completed',
          techStack: ['.NET Core MVC', 'Entity Framework', 'SQL Server', 'ZKTeco SDK', 'SignalR'],
          architecture: 'MVC pattern with repository pattern, dependency injection, and real-time updates using SignalR.',
          keyFeatures: ['Biometric attendance integration', 'Real-time dashboard', 'Employee management', 'Automated reporting'],
          performance: {
            loadTime: '< 1.5s',
            databaseOptimizations: ['Batch processing', 'Async operations', 'Efficient queries']
          }
        },
        {
          name: 'LMS (Learning Management System)',
          description: 'Created comprehensive modules for adding courses and course content management. Built with .NET Core MVC and SQL database for educational content delivery and management.',
          language: '.NET Core MVC',
          topics: ['mvc', 'sql', 'education-tech'],
          isPrivate: true,
          status: 'Completed',
          techStack: ['.NET Core MVC', 'Entity Framework', 'SQL Server', 'Bootstrap', 'jQuery'],
          architecture: 'MVC architecture with service layer, repository pattern, and comprehensive course management modules.',
          keyFeatures: ['Course management', 'Content delivery system', 'User progress tracking', 'Assessment modules'],
          performance: {
            loadTime: '< 1.8s',
            databaseOptimizations: ['Content caching', 'Lazy loading', 'Query optimization']
          }
        },
        // ── Freelancing Projects ──────────────────────────────────────
        {
          name: 'LogoNDesign',
          description: 'A comprehensive design platform for creating and managing logos and branding materials. Built with WebForms and SQL Server for robust content management and user data storage.',
          language: 'ASP.NET WebForms',
          topics: ['webforms', 'sql', 'freelance'],
          isPrivate: false,
          isFreelance: true,
          status: 'Live',
          techStack: ['ASP.NET WebForms', 'SQL Server', 'HTML/CSS', 'JavaScript', 'ADO.NET'],
          architecture: 'WebForms architecture with master pages, user controls, and ADO.NET data access layer for scalable content management.',
          keyFeatures: ['Logo creation tools', 'Brand asset management', 'User content storage', 'Admin dashboard'],
          performance: {
            loadTime: '< 2s',
            databaseOptimizations: ['Stored procedures', 'Indexed queries', 'Connection pooling']
          }
        },
        {
          name: 'DesignAndCodeLab',
          description: 'An interactive platform combining design resources with coding tutorials and tools. Developed using WebForms and SQL for seamless content delivery and user engagement.',
          language: 'ASP.NET WebForms',
          topics: ['webforms', 'sql', 'freelance'],
          isPrivate: false,
          isFreelance: true,
          status: 'Live',
          techStack: ['ASP.NET WebForms', 'SQL Server', 'Bootstrap', 'jQuery', 'ADO.NET'],
          architecture: 'Content-driven WebForms architecture with modular user controls and a layered data access pattern.',
          keyFeatures: ['Design resource library', 'Interactive coding examples', 'User engagement tracking', 'Content management'],
          performance: {
            loadTime: '< 2s',
            databaseOptimizations: ['Query caching', 'Indexed tables', 'Batch operations']
          }
        },
        {
          name: 'DesigNagArtistry',
          description: 'A modern portfolio and showcase platform for digital art and design work. Built with Next.js and PostgreSQL for SSR, optimal performance, and dynamic content management — demonstrating cross-framework versatility.',
          language: 'Next.js',
          topics: ['nextjs', 'postgresql', 'freelance', 'fullstack'],
          isPrivate: false,
          isFreelance: true,
          status: 'Live',
          techStack: ['Next.js 14', 'PostgreSQL', 'Prisma ORM', 'Tailwind CSS', 'Vercel'],
          architecture: 'SSR/SSG hybrid with App Router, Prisma ORM for type-safe DB access, and edge-optimised deployments on Vercel.',
          keyFeatures: ['Server-side rendering', 'Dynamic portfolio showcase', 'CMS-driven content', 'SEO optimised'],
          performance: {
            loadTime: '< 0.9s',
            databaseOptimizations: ['Connection pooling', 'Prisma query optimisation', 'Incremental static regeneration']
          }
        },
        {
          name: 'Car-Chatbot',
          description: 'An intelligent chatbot specialising in automotive information and assistance. Leverages ChromaDB for vector-based knowledge retrieval and NLP to deliver context-aware, accurate responses.',
          language: 'Python',
          topics: ['python', 'nlp', 'ai', 'freelance'],
          isPrivate: false,
          isFreelance: true,
          status: 'Live',
          techStack: ['Python', 'ChromaDB', 'LangChain', 'OpenAI API', 'FastAPI'],
          architecture: 'RAG (Retrieval-Augmented Generation) pipeline with ChromaDB vector store, LangChain orchestration, and FastAPI REST interface.',
          keyFeatures: ['Vector-based knowledge retrieval', 'Context-aware NLP responses', 'Automotive knowledge base', 'REST API interface'],
          performance: {
            loadTime: '< 1.5s',
            databaseOptimizations: ['Vector indexing', 'Similarity search tuning', 'Response caching']
          }
        },
        {
          name: 'Mouseover',
          description: 'A desktop automation utility built as a WinForms application for automated mouse movement and control, assisting with repetitive task automation on Windows.',
          language: 'C# WinForms',
          topics: ['csharp', 'winforms', 'freelance'],
          isPrivate: false,
          isFreelance: true,
          status: 'Personal Use',
          techStack: ['C#', 'WinForms', '.NET Framework', 'Windows API', 'System.Windows.Forms'],
          architecture: 'Event-driven WinForms architecture with P/Invoke calls to Windows API for low-level mouse control and automation hooks.',
          keyFeatures: ['Automated mouse movement', 'Configurable automation sequences', 'System tray integration', 'Hotkey controls'],
          performance: {
            loadTime: 'Instant',
            databaseOptimizations: ['In-memory config', 'Lightweight footprint']
          }
        },
        {
          name: 'DesigNagar',
          description: 'A community platform for designers and artists to showcase work and collaborate. Built with WebForms and SQL for user management, authentication, and content storage.',
          language: 'ASP.NET WebForms',
          topics: ['webforms', 'sql', 'freelance'],
          isPrivate: false,
          isFreelance: true,
          status: 'In Progress',
          techStack: ['ASP.NET WebForms', 'SQL Server', 'AJAX', 'jQuery', 'ADO.NET'],
          architecture: 'Community platform architecture with role-based auth, WebForms master pages, and a layered SQL data access layer.',
          keyFeatures: ['Portfolio showcase', 'Community collaboration tools', 'User authentication & roles', 'Content moderation'],
          performance: {
            loadTime: '< 2.5s',
            databaseOptimizations: ['Indexed queries', 'Stored procedures', 'Session caching']
          }
        },
      ];
      this.loading = false;
    }, 1500);
  }
  
  onProjectHover(projectName: string) {
    this.hoveredProject.set(projectName);
  }
  
  onProjectLeave() {
    this.hoveredProject.set(null);
  }
  
  expandProject(project: Project) {
    this.expandedProject.set(project);
  }
  
  closeExpandedView() {
    this.expandedProject.set(null);
  }
  
  setFilter(category: string) {
    this.filterCategory.set(category);
  }
}
