import {
  Body,
  Button,
  Container,
  Head,
  Html,
  Img,
  Preview,
  Section,
  Text,
} from '@react-email/components'
import * as React from 'react'

interface ResetPasswordEmailProps {
  userId: string
  userFirstname?: string
  resetPasswordToken: string
}

export const ResetPasswordEmail = ({
  userId,
  userFirstname,
  resetPasswordToken,
}: ResetPasswordEmailProps) => {
  return (
    <Html>
      <Head />
      <Preview>Dropbox reset your password</Preview>
      <Body style={main}>
        <Container style={container}>
          <Img
            src={`https://stooket.com/logo/stooket-logo.png`}
            width="40"
            height="40"
            alt="Stooket"
          />
          <Section>
            <Text style={text}>Hi {userFirstname},</Text>
            <Text style={text}>
              Someone recently requested a password change for your Stooket
              account. If this was you, you can set a new password here:
            </Text>
            <Button
              style={button}
              href={`https://stooket.com/reset-password?token=${resetPasswordToken}&userId=${userId}`}
            >
              Reset password
            </Button>
            <Text style={text}>
              If you don&apos;t want to change your password or didn&apos;t
              request this, just ignore and delete this message.
            </Text>
            <Text style={text}>
              To keep your account secure, please don&apos;t forward this email
              to anyone.
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  )
}

const main = {
  backgroundColor: '#f6f9fc',
  padding: '10px 0',
}

const container = {
  backgroundColor: '#ffffff',
  border: '1px solid #f0f0f0',
  padding: '45px',
}

const text = {
  fontSize: '16px',
  fontFamily:
    "'Open Sans', 'HelveticaNeue-Light', 'Helvetica Neue Light', 'Helvetica Neue', Helvetica, Arial, 'Lucida Grande', sans-serif",
  fontWeight: '500',
  color: '#404040',
  lineHeight: '26px',
}

const button = {
  backgroundColor: '#007ee6',
  borderRadius: '4px',
  color: '#fff',
  fontFamily: "'Open Sans', 'Helvetica Neue', Arial",
  fontSize: '15px',
  textDecoration: 'none',
  textAlign: 'center' as const,
  display: 'block',
  width: '210px',
  padding: '14px 7px',
}

const anchor = {
  textDecoration: 'underline',
}
