import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FirebaseService, ContactFormData } from '../../services/firebase.service';

@Component({
  selector: 'app-contact',
  imports: [FormsModule, CommonModule],
  templateUrl: './contact.html',
  styleUrl: './contact.scss',
})
export class ContactComponent {
  formData: ContactFormData = {
    name: '',
    email: '',
    subject: '',
    message: ''
  };

  submitMessage = '';
  submitSuccess = false;
  isSubmitting = false;

  constructor(private firebaseService: FirebaseService) {}

  async onSubmit() {
    if (this.formData.name && this.formData.email && this.formData.subject && this.formData.message) {
      this.isSubmitting = true;
      this.submitMessage = '';

      try {
        await this.firebaseService.submitContactForm(this.formData);
        
        this.submitSuccess = true;
        this.submitMessage = 'Thank you for your message! I\'ll get back to you soon.';

        // Reset form
        this.formData = {
          name: '',
          email: '',
          subject: '',
          message: ''
        };

        // Clear message after 5 seconds
        setTimeout(() => {
          this.submitMessage = '';
        }, 5000);
      } catch (error) {
        console.error('Error submitting form:', error);
        this.submitSuccess = false;
        this.submitMessage = 'Sorry, there was an error sending your message. Please try again.';
      } finally {
        this.isSubmitting = false;
      }
    } else {
      this.submitSuccess = false;
      this.submitMessage = 'Please fill in all required fields.';
    }
  }
}
