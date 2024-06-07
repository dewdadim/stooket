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

interface RequestPurchaseEmailProps {
  product: Product
  seller: User
  buyer: User
  purchaseId: string
}

export const RequestPurchaseEmail = ({
  product,
  buyer,
  seller,
  purchaseId,
}: RequestPurchaseEmailProps) => {
  return (
    <Html>
      <Head />
      <Preview>Request purchase from Stooket</Preview>
      <Body style={main}>
        <Container style={container}>
          <Img
            src={`https://stooket.com/logo/stooket-logo.png`}
            width="40"
            height="40"
            alt="Stooket"
          />
          <Section>
            <Text style={text}>Hi {seller.name},</Text>
            <Text style={text}>@{buyer.username} request to purchase:</Text>
            <div className="flext mt-8 gap-2">
              <Img
                src={product.thumbnail!}
                width="150"
                height="150"
                alt={product.title!}
              />
              <div>
                <Text style={text}>{product.title}</Text>
                <Text>Category: {product.category}</Text>
              </div>
            </div>
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
}
