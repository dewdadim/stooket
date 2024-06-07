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
  Link,
} from '@react-email/components'
import * as React from 'react'

interface SellerCancelEmailProps {
  product: Product
  buyer: User
  purchaseId: string
  reason: string
  purchase?: Purchase & {
    cancel: { by: 'buyer' | 'seller' | string; at: Date; reason: string }
  }
}

export const SellerCancelPurchaseEmail = ({
  product,
  buyer,
  reason,
  purchaseId,
}: SellerCancelEmailProps) => {
  return (
    <Html>
      <Head />
      <Preview>Purchase has been cancelled by seller</Preview>
      <Body style={main}>
        <Container style={container}>
          <Img
            src={`https://stooket.com/logo/stooket-logo.png`}
            width="40"
            height="40"
            alt="Stooket"
          />
          <Section>
            <Text style={text}>Hi {buyer.name}</Text>
            <Text style={text}>
              Your purchase on {product.title} | ID: {purchaseId.toUpperCase()}{' '}
              has been cancelled by seller because of some circumstances:
            </Text>
            <Text style={text}>{reason}</Text>
            <Button
              style={button}
              href={`https://www.stooket.com/purchase/details/${purchaseId}`}
            >
              View Details
            </Button>
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
  padding: '14px 7px',
}
