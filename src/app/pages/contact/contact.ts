import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Firestore, collection, addDoc, serverTimestamp } from '@angular/fire/firestore';

@Component({
  selector: 'app-contact',
  imports: [FormsModule, CommonModule],
  templateUrl: './contact.html',
  styleUrl: './contact.scss',
})
export class ContactComponent {
  formData = {
    name: '',
    email: '',
    subject: '',
    message: ''
  };

  submitMessage = '';
  submitSuccess = false;
  isSubmitting = false;

  constructor(private firestore: Firestore) {}

  async onSubmit() {
    if (this.formData.name && this.formData.email && this.formData.subject && this.formData.message) {
      this.isSubmitting = true;
      this.submitMessage = '';

      try {
        await addDoc(
          collection(this.firestore, 'contactSubmissions'),
          {
            name: this.formData.name,
            email: this.formData.email,
            subject: this.formData.subject,
            message: this.formData.message,
            timestamp: serverTimestamp(),
            status: 'new'
          }
        );
        
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
      } catch (error: any) {
        console.error('Error submitting form:', error);
        console.error('Error code:', error?.code);
        console.error('Error message:', error?.message);
        this.submitSuccess = false;
        this.submitMessage = `Error: ${error?.message || 'Sorry, there was an error sending your message. Please try again.'}`;
      } finally {
        this.isSubmitting = false;
      }
    } else {
      this.submitSuccess = false;
      this.submitMessage = 'Please fill in all required fields.';
    }
  }
}
