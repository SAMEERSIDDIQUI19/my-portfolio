import { Component, signal, computed, OnInit, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { trigger, style, animate, transition, keyframes, query, stagger } from '@angular/animations';
import { Firestore, collection, addDoc } from '@angular/fire/firestore';

interface QuickMessage {
  emoji: string;
  label: string;
  subject: string;
  message: string;
}

@Component({
  selector: 'app-contact-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './contact-form.html',
  styleUrls: ['./contact-form.scss'],
  animations: [
    trigger('fadeInUp', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(20px)' }),
        animate('600ms cubic-bezier(0.16, 1, 0.3, 1)', style({ opacity: 1, transform: 'translateY(0)' }))
      ])
    ]),
    trigger('slideIn', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateX(-20px)' }),
        animate('400ms cubic-bezier(0.16, 1, 0.3, 1)', style({ opacity: 1, transform: 'translateX(0)' }))
      ])
    ]),
    trigger('pulse', [
      transition(':enter', [
        style({ opacity: 0, transform: 'scale(0.8)' }),
        animate('300ms cubic-bezier(0.16, 1, 0.3, 1)', style({ opacity: 1, transform: 'scale(1)' }))
      ])
    ]),
    trigger('chipHover', [
      transition('* => *', [
        style({ transform: 'scale(1)' }),
        animate('200ms cubic-bezier(0.16, 1, 0.3, 1)', style({ transform: 'scale(1.05)' }))
      ])
    ]),
    trigger('successPulse', [
      transition(':enter', [
        animate('0.5s ease-in-out', keyframes([
          style({ transform: 'scale(0.8)', opacity: 0 }),
          style({ transform: 'scale(1.1)', opacity: 1 }),
          style({ transform: 'scale(1)', opacity: 1 })
        ]))
      ])
    ]),
    trigger('shake', [
      transition('* => *', [
        animate('0.5s ease-in-out', keyframes([
          style({ transform: 'translateX(0)' }),
          style({ transform: 'translateX(-10px)' }),
          style({ transform: 'translateX(10px)' }),
          style({ transform: 'translateX(-10px)' }),
          style({ transform: 'translateX(10px)' }),
          style({ transform: 'translateX(0)' })
        ]))
      ])
    ])
  ]
})
export class ContactFormComponent implements OnInit {
  // Signals for reactive state
  formStatus = signal<'idle' | 'submitting' | 'success' | 'error'>('idle');
  selectedChip = signal<string | null>(null);
  showSuccessMessage = signal(false);

  // Enhanced quick message options with more conversion-focused options
  quickMessages: QuickMessage[] = [
    {
      emoji: '💼',
      label: 'Hiring Opportunity',
      subject: 'Job Opportunity - Full Stack Developer',
      message: 'Hi Sameer, I came across your portfolio and would like to discuss a potential job opportunity for a Full Stack Developer position.'
    },
    {
      emoji: '🤝',
      label: 'Project Collaboration',
      subject: 'Project Collaboration Inquiry',
      message: 'Hi Sameer, I have an exciting project idea and would love to collaborate with you on this venture.'
    },
    {
      emoji: '💬',
      label: 'Let\'s Connect',
      subject: 'Networking Connection',
      message: 'Hi Sameer, I\'ve been following your work and would love to connect and explore potential synergies.'
    },
    {
      emoji: '🚀',
      label: 'Freelance Project',
      subject: 'Freelance Project Opportunity',
      message: 'Hi Sameer, I have a freelance project that matches your expertise perfectly - let\'s discuss the details.'
    },
    {
      emoji: '💡',
      label: 'Technical Consultation',
      subject: 'Technical Consultation Request',
      message: 'Hi Sameer, I need your expert advice on a technical challenge I\'m facing with my project.'
    },
    {
      emoji: '🎯',
      label: 'Mentorship',
      subject: 'Mentorship Request',
      message: 'Hi Sameer, I would value your mentorship and guidance in my software development journey.'
    }
  ];

  // Form group
  contactForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private firestore: Firestore
  ) {
    this.contactForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      subject: ['', [Validators.required]],
      message: ['', [Validators.required, Validators.minLength(10)]]
    });

    // Reset success message after 5 seconds using effect
    effect(() => {
      const status = this.formStatus();
      if (status === 'success') {
        this.showSuccessMessage.set(true);
        setTimeout(() => {
          this.showSuccessMessage.set(false);
        }, 5000);
      }
    });
  }

  ngOnInit() {
    // Effect is now in constructor
  }

  // Computed signals
  isSubmitting = computed(() => this.formStatus() === 'submitting');
  isSuccess = computed(() => this.formStatus() === 'success');
  isError = computed(() => this.formStatus() === 'error');

  selectQuickMessage(chipLabel: string) {
    const selected = this.quickMessages.find(msg => msg.label === chipLabel);
    if (selected) {
      this.contactForm.patchValue({
        subject: selected.subject,
        message: selected.message
      });
      this.selectedChip.set(chipLabel);
      
      // Focus on message field for immediate customization
      setTimeout(() => {
        const messageField = this.contactForm.get('message');
        if (messageField) {
          messageField.markAsDirty();
        }
      }, 100);
    }
  }
  
  clearChip() {
    this.selectedChip.set(null);
  }

  async onSubmit() {
    if (this.contactForm.invalid) {
      this.markFormGroupTouched(this.contactForm);
      return;
    }

    this.formStatus.set('submitting');

    try {
      const formData = this.contactForm.value;
      await addDoc(collection(this.firestore, 'contacts'), {
        ...formData,
        createdAt: new Date(),
        quickMessage: this.selectedChip()
      });

      this.formStatus.set('success');
      this.contactForm.reset();
      this.selectedChip.set(null);
    } catch (error) {
      console.error('Error submitting form:', error);
      this.formStatus.set('error');
    }
  }

  private markFormGroupTouched(formGroup: FormGroup) {
    Object.values(formGroup.controls).forEach(control => {
      control.markAsTouched();
      if (control instanceof FormGroup) {
        this.markFormGroupTouched(control);
      }
    });
  }

  get name() { return this.contactForm.get('name'); }
  get email() { return this.contactForm.get('email'); }
  get subject() { return this.contactForm.get('subject'); }
  get message() { return this.contactForm.get('message'); }

  isFieldInvalid(fieldName: string): boolean {
    const field = this.contactForm.get(fieldName);
    return field ? field.invalid && (field.dirty || field.touched) : false;
  }

  getErrorMessage(fieldName: string): string {
    const field = this.contactForm.get(fieldName);
    if (!field) return '';

    if (field.errors?.['required']) {
      return 'This field is required';
    }
    if (field.errors?.['email']) {
      return 'Please enter a valid email address';
    }
    if (field.errors?.['minlength']) {
      return `Minimum length is ${field.errors['minlength'].requiredLength} characters`;
    }
    return '';
  }
}
