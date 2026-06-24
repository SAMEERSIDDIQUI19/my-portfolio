import { Component, signal, computed, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { trigger, style, animate, transition, keyframes } from '@angular/animations';

interface TechStack {
  name: string;
  category: 'frontend' | 'backend' | 'database';
  icon?: string;
}

interface TerminalCommand {
  command: string;
  output: string;
  timestamp: string;
}

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './hero.html',
  styleUrls: ['./hero.scss'],
  animations: [
    trigger('fadeInUp', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(30px)' }),
        animate('800ms cubic-bezier(0.16, 1, 0.3, 1)', style({ opacity: 1, transform: 'translateY(0)' }))
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
    ]),
    trigger('beaconPulse', [
      transition('* => *', [
        animate('2s ease-in-out infinite', keyframes([
          style({ transform: 'scale(1)', boxShadow: '0 0 0 0 rgba(16, 185, 129, 0.7)' }),
          style({ transform: 'scale(1.1)', boxShadow: '0 0 0 20px rgba(16, 185, 129, 0)' })
        ]))
      ])
    ]),
    trigger('terminalFade', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(-12px) scale(0.98)' }),
        animate('350ms cubic-bezier(0.16, 1, 0.3, 1)', style({ opacity: 1, transform: 'translateY(0) scale(1)' }))
      ]),
      transition(':leave', [
        animate('200ms ease-in', style({ opacity: 0, transform: 'translateY(-8px) scale(0.98)' }))
      ])
    ]),
    trigger('techCardHover', [
      transition('* => *', [
        style({ transform: 'scale(1)' }),
        animate('300ms cubic-bezier(0.16, 1, 0.3, 1)', style({ transform: 'scale(1.05)' }))
      ])
    ])
  ]
})
export class HeroComponent implements OnInit, AfterViewInit, OnDestroy {
  // Signals for reactive state
  availableForWork = signal(true);
  currentTechIndex = signal(0);
  typingText = signal('');
  isTyping = signal(false);
  selectedCategory = signal<'all' | 'frontend' | 'backend' | 'database'>('all');
  showTerminal = signal(false);
  terminalHistory = signal<TerminalCommand[]>([]);
  currentCommand = '';
  isTerminalFocused = signal(false);
  
  // Enhanced tech stack data with icons
  techStack: TechStack[] = [
    { name: 'Angular 17+', category: 'frontend', icon: '⚡' },
    { name: 'Next.js', category: 'frontend', icon: '▲' },
    { name: 'TypeScript', category: 'frontend', icon: 'TS' },
    { name: 'Tailwind CSS', category: 'frontend', icon: '🎨' },
    { name: 'React', category: 'frontend', icon: '⚛️' },
    { name: '.NET Core', category: 'backend', icon: '🔷' },
    { name: 'Python', category: 'backend', icon: '🐍' },
    { name: 'Node.js', category: 'backend', icon: '🟢' },
    { name: 'PostgreSQL', category: 'database', icon: '🐘' },
    { name: 'SQL Server', category: 'database', icon: '🗄️' },
    { name: 'Firebase', category: 'database', icon: '🔥' },
    { name: 'MongoDB', category: 'database', icon: '🍃' }
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
    this.initializeTerminal();
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
    let isPaused = false;

    const tick = () => {
      if (isPaused) return;
      const currentPhrase = phrases[phraseIndex];
      if (isDeleting) {
        charIndex--;
        this.typingText.set(currentPhrase.substring(0, charIndex));
        if (charIndex === 0) {
          isDeleting = false;
          phraseIndex = (phraseIndex + 1) % phrases.length;
        }
      } else {
        charIndex++;
        this.typingText.set(currentPhrase.substring(0, charIndex));
        if (charIndex === currentPhrase.length) {
          isPaused = true;
          setTimeout(() => { isPaused = false; isDeleting = true; }, 2000);
        }
      }
      this.typingInterval = setTimeout(tick, isDeleting ? 50 : 100);
    };
    this.typingInterval = setTimeout(tick, 100);
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

  private initializeTerminal() {
    // Add initial commands to terminal
    const initialCommands: TerminalCommand[] = [
      { command: 'npm install @angular/core@latest', output: '✓ Installed Angular 17.3.0', timestamp: this.getTimestamp() },
      { command: 'ng serve', output: '✓ Local server running on http://localhost:4200', timestamp: this.getTimestamp() },
      { command: 'git status', output: 'On branch main | Your branch is up to date with origin/main', timestamp: this.getTimestamp() }
    ];
    this.terminalHistory.set(initialCommands);
  }

  private getTimestamp(): string {
    const now = new Date();
    return now.toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit' });
  }

  executeCommand(command: string) {
    if (!command.trim()) return;
    
    const timestamp = this.getTimestamp();
    let output = '';
    
    // Simulate command execution
    switch (command.toLowerCase()) {
      case 'help':
        output = 'Available commands: about, skills, projects, contact, clear';
        break;
      case 'about':
        output = 'Navigating to About section...';
        break;
      case 'skills':
        output = 'Navigating to Skills section...';
        break;
      case 'projects':
        output = 'Navigating to Projects section...';
        break;
      case 'contact':
        output = 'Navigating to Contact section...';
        break;
      case 'clear':
        this.terminalHistory.set([]);
        this.currentCommand = '';
        return;
      default:
        output = `Command not found: ${command}. Type 'help' for available commands.`;
    }
    
    this.terminalHistory.update(history => [
      ...history,
      { command, output, timestamp }
    ]);
    this.currentCommand = '';
  }

  toggleTerminal() {
    this.showTerminal.update(show => !show);
  }

  handleTerminalInput(event: KeyboardEvent) {
    if (event.key === 'Enter') {
      this.executeCommand(this.currentCommand);
    }
  }

  ngOnDestroy() {
    if (this.typingInterval) clearTimeout(this.typingInterval);
    if (this.techRotationInterval) clearInterval(this.techRotationInterval);
  }
}
