import { Component, OnInit, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';

interface Repo {
  name: string;
  description: string;
  html_url: string;
  language: string;
  topics: string[];
  updated_at: string;
}

@Component({
  selector: 'app-projects',
  imports: [CommonModule],
  templateUrl: './projects.html',
  styleUrl: './projects.scss',
})
export class ProjectsComponent implements OnInit {
  private http = inject(HttpClient);
  repos: Repo[] = [];
  loading = true;
  error = false;

  ngOnInit() {
    this.fetchRepos();
  }

  fetchRepos() {
    this.http.get<Repo[]>('https://api.github.com/users/SAMEERSIDDIQUI19/repos?sort=updated&per_page=6')
      .subscribe({
        next: (data) => {
          this.repos = data;
          this.loading = false;
        },
        error: (err) => {
          console.error('Error fetching repos:', err);
          this.error = true;
          this.loading = false;
        }
      });
  }

  // Format date for display in template
  formatDate(dateString: string): string {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  }
}
