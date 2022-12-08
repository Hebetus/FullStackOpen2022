import { gql, useQuery } from '@apollo/client'
import { useEffect, useState } from 'react'

const Recommended = ({ show, favoriteGenre }) => {

const ALL_BOOKS = gql`
    query favoriteBooks($genre: String!) {
        favoriteBooks(genre: "agile") {
            title
            author {
                name
            }
            published
        }
    }
`

}

export default Recommended