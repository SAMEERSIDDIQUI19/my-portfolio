import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-home',
  imports: [],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class HomeComponent implements OnInit, OnDestroy {
  typedText = '';
  fullText = 'Software Developer';
  typewriterTexts = [
    'Full-Stack Developer',
    'Frontend Specialist',
    'Backend Engineer',
    'Problem Solver'
  ];
  currentTextIndex = 0;
  isDeleting = false;
  typeSpeed = 100;
  deleteSpeed = 50;
  pauseTime = 2000;
  private typewriterInterval: any;
  
  profileImageUrl: string = 'assets/images/profile.jpg?v=' + Date.now();

  ngOnDestroy() {
    if (this.typewriterInterval) {
      clearInterval(this.typewriterInterval);
    }
  }

  startTypewriter() {
    this.typewriterInterval = setInterval(() => {
      const currentFullText = this.typewriterTexts[this.currentTextIndex];
      
      if (!this.isDeleting) {
        // Typing
        this.typedText = currentFullText.substring(0, this.typedText.length + 1);
        
        if (this.typedText === currentFullText) {
          // Pause before deleting
          setTimeout(() => {
            this.isDeleting = true;
          }, this.pauseTime);
        }
      } else {
        // Deleting
        this.typedText = currentFullText.substring(0, this.typedText.length - 1);
        
        if (this.typedText === '') {
          this.isDeleting = false;
          this.currentTextIndex = (this.currentTextIndex + 1) % this.typewriterTexts.length;
        }
      }
    }, this.isDeleting ? this.deleteSpeed : this.typeSpeed);
  }

  scrollToSection(sectionId: string): void {
    const element = document.getElementById(sectionId);
    if (element) {
      const navbarHeight = 80;
      const elementPosition = element.offsetTop - navbarHeight;
      
      window.scrollTo({
        top: elementPosition,
        behavior: 'smooth'
      });
    }
  }

  ngOnInit() {
    this.startTypewriter();
  }

  onImageError(event: any): void {
    console.error('Image failed to load:', this.profileImageUrl);
    console.error('Error event:', event);
    // Try alternative paths
    if (this.profileImageUrl === '/assets/images/profile.jpg') {
      this.profileImageUrl = 'assets/images/profile.jpg';
    } else if (this.profileImageUrl === 'assets/images/profile.jpg') {
      this.profileImageUrl = './assets/images/profile.jpg';
    }
  }

  onImageLoad(event: any): void {
    console.log('Image loaded successfully:', this.profileImageUrl);
  }

  downloadCv(): void {
    const link = document.createElement('a');
    link.href = 'assets/cv/SAMEER-AHMED-SIDDIQUI-Resume.pdf';
    link.download = 'SAMEER-AHMED-SIDDIQUI-Resume.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
}
