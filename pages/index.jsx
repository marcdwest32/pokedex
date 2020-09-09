import React, { useState, useEffect } from 'react'
import { Redirect } from 'react-router-dom'
import Head from 'next/head'
import Link from 'next/link'
import styles from '../styles/Home.module.css'
import axios from 'axios'
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  CardImg,
  CardText,
  CardTitle,
  CardSubtitle,
  Container,
  Col,
  Row,
  Form,
  FormGroup,
  Label,
  Input,
} from 'reactstrap'

const Home = ({ pokemon }) => {
  const [search, setSearch] = useState('')
  const normalUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/`
  const shinyUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/`

  return (
    <Container styles={styles.container}>
      <Head>
        <title>Pokedex</title>
      </Head>
      <Form id='search'>
        <FormGroup>
          <Label for='search'>I choose you! </Label>
          <Input
            type='text'
            name='search'
            id='search'
            onChange={(e) => {
              setSearch(e.target.value)
            }}
          />
          <Link color='secondary' size='lg' active href={`/pokemon/${search}`}>
            search
          </Link>{' '}
        </FormGroup>
      </Form>
      <main className={styles.main}>
        <div className='grid'>
          {pokemon &&
            pokemon.map((pokeman, i) => {
              return (
                <div key={i + 1}>
                  <Card style={{ paddingTop: '20px' }}>
                    <CardHeader style={{ textAlign: 'center' }}>
                      <h1>
                        {i + 1} {pokeman.name}
                      </h1>
                    </CardHeader>
                    <Link href={`/pokemon/${pokeman.name}`} passHref>
                      <div id='home'>
                        <img
                          className='image_on'
                          src={`${normalUrl}${i + 1}.png`}
                          style={{ height: 400, cursor: 'pointer' }}
                        />
                        <img
                          className='image_off'
                          src={`${shinyUrl}${i + 1}.png`}
                          style={{ height: 400, cursor: 'pointer' }}
                        />
                      </div>
                    </Link>
                  </Card>
                </div>
              )
            })}
        </div>
      </main>
    </Container>
  )
}

export async function getStaticProps() {
  const url = `https://pokeapi.co/api/v2/pokemon?limit=807`
  const response = await axios.get(url)
  const pokemon = response.data.results
  return { props: { pokemon } }
}

export default Home
