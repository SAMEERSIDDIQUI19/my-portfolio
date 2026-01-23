import { Injectable } from '@angular/core';
import { collection, addDoc, Timestamp } from 'firebase/firestore';
import { db } from '../firebase.config';

export interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  constructor() { }

  async submitContactForm(formData: ContactFormData): Promise<void> {
    try {
      const contactData = {
        ...formData,
        timestamp: Timestamp.now(),
        status: 'new'
      };

      await addDoc(collection(db, 'contact-submissions'), contactData);
      console.log('Contact form submitted successfully to Firebase');
    } catch (error) {
      console.error('Error submitting contact form:', error);
      throw error;
    }
  }
}
