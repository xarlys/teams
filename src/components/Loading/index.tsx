import { Text } from 'react-native'
import React from 'react'
import { Container, LoadIndicator } from './styles'

const Loading = () => {
  return (
    <Container>
      <LoadIndicator />
    </Container>
  )
}

export { Loading }