import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

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

  onSubmit() {
    if (this.formData.name && this.formData.email && this.formData.subject && this.formData.message) {
      // In a real application, you would send this data to a backend service
      // For now, we'll just simulate a successful submission
      console.log('Form submitted:', this.formData);

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
    } else {
      this.submitSuccess = false;
      this.submitMessage = 'Please fill in all required fields.';
    }
  }
}
