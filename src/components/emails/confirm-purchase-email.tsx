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

interface ConfirmPurchaseEmailProps {
  product: Product
  seller: User
  buyer: User
  purchaseId: string
}

export const ConfirmPurchaseEmail = ({
  product,
  buyer,
  seller,
  purchaseId,
}: ConfirmPurchaseEmailProps) => {
  return (
    <Html>
      <Head />
      <Preview>Request purchase has been confirmed by Seller</Preview>
      <Body style={main}>
        <Container style={container}>
          <Img
            src={`https://stooket.com/logo/stooket-logo.png`}
            width="40"
            height="40"
            alt="Stooket"
          />
          <Section>
            <Text style={text}>Hi {buyer.name},</Text>
            <Text style={text}>
              Seller has confirmed your purchase request on:
            </Text>
            <Text style={text}>{product.title}</Text>
            <Text>Category: {product.category}</Text>
            <Text>RM{product.price?.toFixed(2)}</Text>
            <Text>
              You can contact seller for more information:{' '}
              <Link
                style={anchor}
                href={`https://wa.me/6${seller.phoneNumber}`}
              >
                Contact Seller
              </Link>
            </Text>
            <Button
              style={button}
              href={`https://www.stooket.com/purchase/details/${purchaseId}`}
            >
              View Request
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
