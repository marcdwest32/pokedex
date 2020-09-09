import React from 'react'
import axios from 'axios'
import styles from '../../styles/Home.module.css'
import Link from 'next/link'
import { Card, CardFooter, CardHeader } from 'reactstrap'

const pokeman = ({ pokeman }) => {
  console.log(pokeman)
  const { abilities, id, name, types } = pokeman
  const dreamImg = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${id}.svg`
  const officialImg = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`

  return (
    <Card className={styles.container}>
      <div key={id}>
        <CardHeader>
          <h1 style={{ textAlign: 'center' }}>
            {id}: {name}
          </h1>
        </CardHeader>
        <div className='types' key={`types${id}`}>
          <h2>types</h2>
          {types &&
            types.map((type, i) => {
              return (
                <h3>
                  {i + 1}: {type.type.name}
                </h3>
              )
            })}
        </div>
        <div id='name'>
          <img src={dreamImg} style={{ height: 400 }} className='image_dream' />
          <img
            src={officialImg}
            style={{ height: 400 }}
            className='image_official'
          />
        </div>
        <div className='abilities' key={`abilities${id}`}>
          <h2>abilities</h2>
          {abilities &&
            abilities.map((ability, i) => {
              return (
                <h3 onClick={getAbilities}>
                  {i + 1}: {ability.ability.name}
                </h3>
              )
            })}
        </div>
      </div>
      <CardFooter>
        <Link href='/'>
          <a>
            <b>home</b>
          </a>
        </Link>
      </CardFooter>
    </Card>
  )
}

export async function getStaticPaths() {
  return { fallback: true, paths: [{ params: { name: '' } }] }
}

export async function getStaticProps({ params }) {
  const name = params.name
  const url = `https://pokeapi.co/api/v2/pokemon/${name}`
  const response = await axios.get(url)
  const pokeman = response.data
  return { props: { pokeman } }
}

export default pokeman
