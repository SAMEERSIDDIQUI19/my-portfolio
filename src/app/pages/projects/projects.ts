import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Project {
  name: string;
  description: string;
  language: string;
  topics: string[];
  isPrivate: boolean;
  status: string;
}

@Component({
  selector: 'app-projects',
  imports: [CommonModule],
  templateUrl: './projects.html',
  styleUrl: './projects.scss',
})
export class ProjectsComponent implements OnInit {
  projects: Project[] = [];
  loading = true;
  showPrivateMessage = true;

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
          status: 'Completed'
        },
        {
          name: 'AdminCRM API',
          description: 'Backend API service for AdminCRM system built with .NET Core and SQL Database. Provides robust data management and configuration services for the frontend application.',
          language: '.NET Core',
          topics: ['dotnet-core', 'sql-server', 'web-api'],
          isPrivate: true,
          status: 'Completed'
        },
        {
          name: 'CRM System',
          description: 'Developed multiple systems to manage various operations using .NET WebForms and SQL. Integrated comprehensive email management system and implemented merchant management functionality.',
          language: '.NET WebForms',
          topics: ['webforms', 'sql', 'email-integration'],
          isPrivate: true,
          status: 'Completed'
        },
        {
          name: 'HRMS (Human Resource Management)',
          description: 'Automated ZKTeco attendance machines to directly fetch data, display it in the database, and present it per employee. Implemented multiple setup screens for management using .NET Core MVC.',
          language: '.NET Core MVC',
          topics: ['mvc', 'sql', 'zkteco-integration'],
          isPrivate: true,
          status: 'Completed'
        },
        {
          name: 'LMS (Learning Management System)',
          description: 'Created comprehensive modules for adding courses and course content management. Built with .NET Core MVC and SQL database for educational content delivery and management.',
          language: '.NET Core MVC',
          topics: ['mvc', 'sql', 'education-tech'],
          isPrivate: true,
          status: 'Completed'
        }
      ];
      this.loading = false;
    }, 1500);
  }
}
