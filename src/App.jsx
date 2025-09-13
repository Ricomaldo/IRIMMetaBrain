import styled from 'styled-components'

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  padding: 2rem;
`

const Title = styled.h1`
  color: #2c3e50;
  font-size: 2.5rem;
  margin-bottom: 1rem;
  text-align: center;
`

const Subtitle = styled.p`
  color: #7f8c8d;
  font-size: 1.2rem;
  max-width: 600px;
  text-align: center;
  line-height: 1.6;
`

function App() {
  return (
    <Container>
      <Title>IRIMStudioHall</Title>
      <Subtitle>Votre application est prête ! Vous pouvez maintenant ajouter vos composants.</Subtitle>
    </Container>
  )
}

export default App