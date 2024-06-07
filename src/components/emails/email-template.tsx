import * as React from 'react'

interface EmailTemplateProps {
  firstName: string
}

export const EmailTemplate: React.FC<Readonly<EmailTemplateProps>> = ({
  firstName,
}) => (
  <div>
    <h1>Welcome, {firstName}!</h1>
    <p>Happy to see you get this email!!</p>
  </div>
)
