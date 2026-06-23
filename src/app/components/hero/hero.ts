import { Component, signal, computed, OnInit, AfterViewInit, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { trigger, style, animate, transition } from '@angular/animations';

interface TechStack {
  name: string;
  category: 'frontend' | 'backend' | 'database';
}

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './hero.html',
  styleUrls: ['./hero.scss'],
  animations: [
    trigger('fadeInUp', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(20px)' }),
        animate('600ms ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
      ])
    ]),
    trigger('pulse', [
      transition(':enter', [
        style({ opacity: 0, transform: 'scale(0.8)' }),
        animate('400ms ease-out', style({ opacity: 1, transform: 'scale(1)' }))
      ])
    ]),
    trigger('typing', [
      transition('* => *', [
        style({ opacity: 0 }),
        animate('200ms ease-in', style({ opacity: 1 }))
      ])
    ])
  ]
})
export class HeroComponent implements OnInit, AfterViewInit {
  // Signals for reactive state
  availableForWork = signal(true);
  currentTechIndex = signal(0);
  typingText = signal('');
  isTyping = signal(false);
  selectedCategory = signal<'all' | 'frontend' | 'backend' | 'database'>('all');

  // Tech stack data
  techStack: TechStack[] = [
    { name: 'Angular 17+', category: 'frontend' },
    { name: 'Next.js', category: 'frontend' },
    { name: 'TypeScript', category: 'frontend' },
    { name: 'Tailwind CSS', category: 'frontend' },
    { name: '.NET Core', category: 'backend' },
    { name: 'Python', category: 'backend' },
    { name: 'Node.js', category: 'backend' },
    { name: 'PostgreSQL', category: 'database' },
    { name: 'SQL Server', category: 'database' },
    { name: 'Firebase', category: 'database' }
  ];

  // Computed signals
  filteredTechStack = computed(() => {
    const category = this.selectedCategory();
    if (category === 'all') return this.techStack;
    return this.techStack.filter(tech => tech.category === category);
  });

  currentTech = computed(() => {
    const filtered = this.filteredTechStack();
    return filtered[this.currentTechIndex() % filtered.length];
  });

  // Terminal typing effect
  private typingInterval: any;
  private techRotationInterval: any;

  ngOnInit() {
    this.startTypingEffect();
    this.startTechRotation();
  }

  ngAfterViewInit() {
    // Initialize animations after view is ready
  }

  private startTypingEffect() {
    const phrases = [
      'Full-Stack Developer',
      'Angular Solution Architect',
      'Building Scalable Solutions',
      'Crafting Premium UX'
    ];
    let phraseIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    this.typingInterval = setInterval(() => {
      const currentPhrase = phrases[phraseIndex];
      
      if (isDeleting) {
        this.typingText.set(currentPhrase.substring(0, charIndex - 1));
        charIndex--;
      } else {
        this.typingText.set(currentPhrase.substring(0, charIndex + 1));
        charIndex++;
      }

      if (!isDeleting && charIndex === currentPhrase.length) {
        isDeleting = true;
        setTimeout(() => {}, 1500); // Pause at end
      } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        phraseIndex = (phraseIndex + 1) % phrases.length;
      }
    }, isDeleting ? 50 : 100);
  }

  private startTechRotation() {
    this.techRotationInterval = setInterval(() => {
      this.currentTechIndex.update(index => index + 1);
    }, 3000);
  }

  selectCategory(category: 'all' | 'frontend' | 'backend' | 'database') {
    this.selectedCategory.set(category);
    this.currentTechIndex.set(0);
  }

  toggleAvailability() {
    this.availableForWork.update(value => !value);
  }

  ngOnDestroy() {
    if (this.typingInterval) clearInterval(this.typingInterval);
    if (this.techRotationInterval) clearInterval(this.techRotationInterval);
  }
}
