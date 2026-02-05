export interface RegistrationFormData {
  // Step 1: Personal Information
  firstName: string
  lastName: string
  email: string
  phone: string
  
  // Step 2: Account Details
  username: string
  password: string
  confirmPassword: string
  
  // Step 3: Additional Information
  country: string
  dateOfBirth: string
  acceptTerms: boolean
  subscribeNewsletter: boolean
}

export interface RegistrationFormErrors {
  [key: string]: string | undefined
}
