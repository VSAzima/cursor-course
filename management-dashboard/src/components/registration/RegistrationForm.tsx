import { useState } from 'react'
import { Button } from '../common/Button'
import { Input } from '../common/Input'
import { Select } from '../common/Select'
import type { RegistrationFormData, RegistrationFormErrors } from '../../types/registration'

const STEPS = [
  { id: 1, title: 'Personal Information', description: 'Tell us about yourself' },
  { id: 2, title: 'Account Details', description: 'Create your account credentials' },
  { id: 3, title: 'Additional Information', description: 'A few more details' },
  { id: 4, title: 'Review & Submit', description: 'Review your information' },
]

const COUNTRIES = [
  { value: '', label: 'Select a country' },
  { value: 'us', label: 'United States' },
  { value: 'ca', label: 'Canada' },
  { value: 'uk', label: 'United Kingdom' },
  { value: 'au', label: 'Australia' },
  { value: 'de', label: 'Germany' },
  { value: 'fr', label: 'France' },
  { value: 'jp', label: 'Japan' },
  { value: 'other', label: 'Other' },
]

export const RegistrationForm = () => {
  const [currentStep, setCurrentStep] = useState(1)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState<RegistrationFormData>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    username: '',
    password: '',
    confirmPassword: '',
    country: '',
    dateOfBirth: '',
    acceptTerms: false,
    subscribeNewsletter: false,
  })
  
  const [errors, setErrors] = useState<RegistrationFormErrors>({})

  const validateStep = (step: number): boolean => {
    const newErrors: RegistrationFormErrors = {}

    if (step === 1) {
      if (!formData.firstName.trim()) {
        newErrors.firstName = 'First name is required'
      } else if (formData.firstName.trim().length < 2) {
        newErrors.firstName = 'First name must be at least 2 characters'
      }

      if (!formData.lastName.trim()) {
        newErrors.lastName = 'Last name is required'
      } else if (formData.lastName.trim().length < 2) {
        newErrors.lastName = 'Last name must be at least 2 characters'
      }

      if (!formData.email.trim()) {
        newErrors.email = 'Email is required'
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
        newErrors.email = 'Please enter a valid email address'
      }

      if (formData.phone && formData.phone.replace(/\D/g, '').length < 10) {
        newErrors.phone = 'Please enter a valid phone number'
      }
    }

    if (step === 2) {
      if (!formData.username.trim()) {
        newErrors.username = 'Username is required'
      } else if (formData.username.length < 3) {
        newErrors.username = 'Username must be at least 3 characters'
      } else if (!/^[a-zA-Z0-9_]+$/.test(formData.username)) {
        newErrors.username = 'Username can only contain letters, numbers, and underscores'
      }

      if (!formData.password) {
        newErrors.password = 'Password is required'
      } else if (formData.password.length < 8) {
        newErrors.password = 'Password must be at least 8 characters'
      } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(formData.password)) {
        newErrors.password = 'Password must contain uppercase, lowercase, and a number'
      }

      if (!formData.confirmPassword) {
        newErrors.confirmPassword = 'Please confirm your password'
      } else if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = 'Passwords do not match'
      }
    }

    if (step === 3) {
      if (!formData.country) {
        newErrors.country = 'Please select a country'
      }

      if (!formData.dateOfBirth) {
        newErrors.dateOfBirth = 'Date of birth is required'
      } else {
        const birthDate = new Date(formData.dateOfBirth)
        const today = new Date()
        const age = today.getFullYear() - birthDate.getFullYear()
        const monthDiff = today.getMonth() - birthDate.getMonth()
        
        if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
          const actualAge = age - 1
          if (actualAge < 18) {
            newErrors.dateOfBirth = 'You must be at least 18 years old'
          }
        } else if (age < 18) {
          newErrors.dateOfBirth = 'You must be at least 18 years old'
        }
      }

      if (!formData.acceptTerms) {
        newErrors.acceptTerms = 'You must accept the terms and conditions'
      }
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleInputChange = (field: keyof RegistrationFormData, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    // Clear error for this field when user starts typing
    if (errors[field]) {
      setErrors(prev => {
        const newErrors = { ...prev }
        delete newErrors[field]
        return newErrors
      })
    }
  }

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => Math.min(prev + 1, STEPS.length))
    }
  }

  const handlePrevious = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1))
  }

  const handleSubmit = async () => {
    if (!validateStep(3)) {
      setCurrentStep(3)
      return
    }

    setIsSubmitting(true)
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    console.log('Registration data:', formData)
    alert('Registration successful! Check console for submitted data.')
    
    setIsSubmitting(false)
  }

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Input
                id="firstName"
                label="First Name"
                type="text"
                value={formData.firstName}
                onChange={(e) => handleInputChange('firstName', e.target.value)}
                placeholder="Enter your first name"
                required
                error={errors.firstName}
                autoComplete="given-name"
              />
              <Input
                id="lastName"
                label="Last Name"
                type="text"
                value={formData.lastName}
                onChange={(e) => handleInputChange('lastName', e.target.value)}
                placeholder="Enter your last name"
                required
                error={errors.lastName}
                autoComplete="family-name"
              />
            </div>
            
            <Input
              id="email"
              label="Email Address"
              type="email"
              value={formData.email}
              onChange={(e) => handleInputChange('email', e.target.value)}
              placeholder="example@domain.com"
              required
              error={errors.email}
              autoComplete="email"
            />
            
            <Input
              id="phone"
              label="Phone Number"
              type="tel"
              value={formData.phone}
              onChange={(e) => handleInputChange('phone', e.target.value)}
              placeholder="+1 (555) 000-0000"
              error={errors.phone}
              helperText="Optional - Enter your phone number"
              autoComplete="tel"
            />
          </div>
        )

      case 2:
        return (
          <div className="space-y-6">
            <Input
              id="username"
              label="Username"
              type="text"
              value={formData.username}
              onChange={(e) => handleInputChange('username', e.target.value)}
              placeholder="Choose a username"
              required
              error={errors.username}
              helperText="3+ characters, letters, numbers, and underscores only"
              autoComplete="username"
            />
            
            <Input
              id="password"
              label="Password"
              type="password"
              value={formData.password}
              onChange={(e) => handleInputChange('password', e.target.value)}
              placeholder="Create a strong password"
              required
              error={errors.password}
              helperText="8+ characters with uppercase, lowercase, and a number"
              autoComplete="new-password"
            />
            
            <Input
              id="confirmPassword"
              label="Confirm Password"
              type="password"
              value={formData.confirmPassword}
              onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
              placeholder="Re-enter your password"
              required
              error={errors.confirmPassword}
              autoComplete="new-password"
            />
          </div>
        )

      case 3:
        return (
          <div className="space-y-6">
            <Select
              id="country"
              label="Country"
              value={formData.country}
              onChange={(e) => handleInputChange('country', e.target.value)}
              options={COUNTRIES}
              required
              error={errors.country}
            />
            
            <Input
              id="dateOfBirth"
              label="Date of Birth"
              type="date"
              value={formData.dateOfBirth}
              onChange={(e) => handleInputChange('dateOfBirth', e.target.value)}
              required
              error={errors.dateOfBirth}
              helperText="You must be at least 18 years old"
            />
            
            <div className="space-y-4">
              <div className="flex items-start">
                <div className="flex items-center h-5">
                  <input
                    id="acceptTerms"
                    type="checkbox"
                    checked={formData.acceptTerms}
                    onChange={(e) => handleInputChange('acceptTerms', e.target.checked)}
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  />
                </div>
                <label htmlFor="acceptTerms" className="ml-3 text-sm">
                  <span className="font-medium text-gray-700 dark:text-gray-300">
                    I accept the{' '}
                    <a href="#" className="text-blue-600 hover:underline dark:text-blue-400">
                      Terms and Conditions
                    </a>
                    {' '}and{' '}
                    <a href="#" className="text-blue-600 hover:underline dark:text-blue-400">
                      Privacy Policy
                    </a>
                    <span className="text-red-500 ml-1">*</span>
                  </span>
                  {errors.acceptTerms && (
                    <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                      {errors.acceptTerms}
                    </p>
                  )}
                </label>
              </div>
              
              <div className="flex items-start">
                <div className="flex items-center h-5">
                  <input
                    id="subscribeNewsletter"
                    type="checkbox"
                    checked={formData.subscribeNewsletter}
                    onChange={(e) => handleInputChange('subscribeNewsletter', e.target.checked)}
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  />
                </div>
                <label htmlFor="subscribeNewsletter" className="ml-3 text-sm text-gray-700 dark:text-gray-300">
                  Subscribe to our newsletter for updates and special offers
                </label>
              </div>
            </div>
          </div>
        )

      case 4:
        return (
          <div className="space-y-6">
            <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6 space-y-4">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Review Your Information
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium text-gray-500 dark:text-gray-400">First Name</p>
                  <p className="text-gray-900 dark:text-white">{formData.firstName}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Last Name</p>
                  <p className="text-gray-900 dark:text-white">{formData.lastName}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Email</p>
                  <p className="text-gray-900 dark:text-white">{formData.email}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Phone</p>
                  <p className="text-gray-900 dark:text-white">{formData.phone || 'Not provided'}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Username</p>
                  <p className="text-gray-900 dark:text-white">{formData.username}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Country</p>
                  <p className="text-gray-900 dark:text-white">
                    {COUNTRIES.find(c => c.value === formData.country)?.label || 'Not selected'}
                  </p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Date of Birth</p>
                  <p className="text-gray-900 dark:text-white">
                    {formData.dateOfBirth ? new Date(formData.dateOfBirth).toLocaleDateString() : 'Not provided'}
                  </p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Newsletter</p>
                  <p className="text-gray-900 dark:text-white">
                    {formData.subscribeNewsletter ? 'Subscribed' : 'Not subscribed'}
                  </p>
                </div>
              </div>
            </div>
            
            <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
              <p className="text-sm text-blue-800 dark:text-blue-200">
                <strong>Note:</strong> By submitting this form, you agree to our Terms and Conditions and Privacy Policy.
              </p>
            </div>
          </div>
        )

      default:
        return null
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Create Your Account
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Fill out the form below to get started
          </p>
        </div>

        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            {STEPS.map((step, index) => (
              <div key={step.id} className="flex items-center flex-1">
                <div className="flex flex-col items-center flex-1">
                  <div
                    className={`
                      w-10 h-10 rounded-full flex items-center justify-center font-semibold text-sm transition-all
                      ${
                        currentStep > step.id
                          ? 'bg-blue-600 text-white'
                          : currentStep === step.id
                          ? 'bg-blue-600 text-white ring-4 ring-blue-200 dark:ring-blue-800'
                          : 'bg-gray-200 dark:bg-gray-700 text-gray-500 dark:text-gray-400'
                      }
                    `}
                  >
                    {currentStep > step.id ? (
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    ) : (
                      step.id
                    )}
                  </div>
                  <div className="mt-2 text-center">
                    <p
                      className={`text-xs font-medium ${
                        currentStep >= step.id
                          ? 'text-gray-900 dark:text-white'
                          : 'text-gray-500 dark:text-gray-400'
                      }`}
                    >
                      {step.title}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 hidden sm:block">
                      {step.description}
                    </p>
                  </div>
                </div>
                {index < STEPS.length - 1 && (
                  <div
                    className={`h-0.5 flex-1 mx-2 ${
                      currentStep > step.id
                        ? 'bg-blue-600'
                        : 'bg-gray-200 dark:bg-gray-700'
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Form Card */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 md:p-8">
          <div className="mb-6">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
              {STEPS[currentStep - 1].title}
            </h2>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
              {STEPS[currentStep - 1].description}
            </p>
          </div>

          {renderStepContent()}

          {/* Navigation Buttons */}
          <div className="flex justify-between mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
            <Button
              variant="outline"
              onClick={handlePrevious}
              disabled={currentStep === 1}
              leftIcon={
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              }
            >
              Previous
            </Button>

            {currentStep < STEPS.length ? (
              <Button
                variant="primary"
                onClick={handleNext}
                rightIcon={
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                }
              >
                Next
              </Button>
            ) : (
              <Button
                variant="primary"
                onClick={handleSubmit}
                isLoading={isSubmitting}
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Submitting...' : 'Submit Registration'}
              </Button>
            )}
          </div>
        </div>

        {/* Step Indicator Text */}
        <div className="text-center mt-6">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Step {currentStep} of {STEPS.length}
          </p>
        </div>
      </div>
    </div>
  )
}
