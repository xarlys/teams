import { View, Text } from 'react-native'
import React from 'react'
import { Container, Subtitle, Title } from './styles'

type Props = {
  title: string
  subtitle: string
}

const Highlight = ({ title, subtitle }: Props) => {
  return (
    <Container>
      <Title>{title}</Title>
      <Subtitle>{subtitle}</Subtitle>
    </Container>
  )
}

export {Highlight}