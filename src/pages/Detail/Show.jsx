import axios from 'axios'
import React from 'react'
import { useLocation } from 'react-router'
import { StarRating } from '../../components/StarRating/StarRating'
import styles from './Show.module.css'
import parse from 'html-react-parser'

export const Show = () => {
  const [showData, setShowData] = React.useState({})
  const [cast, setCast] = React.useState([])

  const location = useLocation()

	let static_src =
    'https://img.freepik.com/free-psd/electro-music-festival-poster-template_23-2148947807.jpg?w=1380&t=st=1679264350~exp=1679264950~hmac=0df85660868911322a27e4ee9d1fffced7346d2aa4a4f8cc279ad1b764bbe354'


  React.useEffect(() => {
    const show_id = location.pathname.split('/')[2]

    axios
      .get(`https://api.tvmaze.com/shows/${show_id}?embed=cast`)
      .then(({ data }) => {
        setShowData(data)

				let arr = data._embedded?.cast.map((cast) => cast.person.name)
				setCast(arr)
      })
      .catch((error) => {
        alert(error.message)
      })
  }, [])

  return (
    <>
      {showData?.id && (
        <div className={styles.show}>
          <div className={styles.image}>
            <img src={showData.image.original ? showData.image.original : static_src} alt="poster" />
          </div>
          <div className={styles.info}>
            <div className={styles.title}>
              <h1>
                {showData.name} {showData.rating.average && <span>({showData.rating.average})</span>}
              </h1>
              {showData.rating.average && <StarRating rating={showData.rating.average} />}
            </div>
            <div className={styles.additional_info}>
              <p>{showData.premiered.split('-')[0]}</p>
              <b>|</b>
              <p>
                {showData.averageRuntime} {' min.'}
              </p>
              <b>|</b>
              <p>Director</p>
            </div>
            <table>
              <tbody>
                <tr>
                  <td>Cast:</td>
                  <td className={styles.cast}>
                    {cast.slice(0, 10 + 1).join(', ')}, and more...
                  </td>
                </tr>
                <tr>
                  <td>Language:</td>
                  <td>
                    <p>{showData.language}</p>
                  </td>
                </tr>
                <tr>
                  <td>Country:</td>
                  <td>
                    <p>{showData.webChannel?.country?.name ? showData.webChannel.country.name : showData.network?.country?.name ? showData.network.country.name : "Not Given"}</p>
                  </td>
                </tr>
                <tr>
                  <td>Movie Description:</td>
                  <td >{parse(showData.summary)}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}
    </>
  )
}
