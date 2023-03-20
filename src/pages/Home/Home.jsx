import axios from 'axios'
import React from 'react'
import styles from './Home.module.css'
import { Link } from 'react-router-dom'
import { DataContext } from '../../context/ContextProvider'

export const Home = () => {
  const { searchDataHome, searchQuery } = React.useContext(DataContext)

  const [webData, setWebData] = React.useState({})
  const [genres, setGenres] = React.useState([])
  let static_src =
    'https://img.freepik.com/free-psd/electro-music-festival-poster-template_23-2148947807.jpg?w=1380&t=st=1679264350~exp=1679264950~hmac=0df85660868911322a27e4ee9d1fffced7346d2aa4a4f8cc279ad1b764bbe354'

  React.useEffect(() => {
    let todayDate = new Date().toLocaleDateString()
    todayDate = todayDate.split('/').reverse().join('-')
    let tempData = {}
    let uniqueGenres = {}
    let tempGenres = []

    axios.get(`https://api.tvmaze.com/schedule/web?date=${todayDate}`).then(({ data }) => {
      for (let ele of data) {
        let genres = ele._embedded.show.genres

        for (let genre of genres) {
          let cur_name = ele._embedded.show.name
          let show = ele._embedded.show
          if (tempData[genre] === undefined) {
            tempData[genre] = [show]
            uniqueGenres[genre] = [cur_name]
          } else {
            if (!uniqueGenres[genre].includes(cur_name)) {
              tempData[genre].push(show)
              uniqueGenres[genre].push(cur_name)
            }
          }
        }
      }

      for (let key in tempData) {
        tempGenres.push({ size: tempData[key].length, name: key })
      }

      tempGenres.sort((a, b) => b.size - a.size)

      setWebData(tempData)
      setGenres(tempGenres)

      // clear the unwanted data
      uniqueGenres = {}
      tempGenres = []
      tempData = {}
    })
  }, [])

  return (
    <div className={styles.home}>
      {searchQuery.length === 0 ? (
        <>
          {genres.length && (
            <>
              <h1>Today's Collection</h1>
              {genres.map((genre) => {
                return (
                  <>
                    <div
                      key={genre.name + '_' + Math.random([1, 2, 3, 4, 5, 6, 7, 8, 9])}
                      className={styles.genre_container}
                    >
                      <h2 className={styles.genre_title}>{genre.name}</h2>
                      <div className={styles.card_slider}>
                        {webData[genre.name].map((show) => {
                          return (
                            <Link
                              to={`/show/${show.id}/${show.name.toLowerCase().split(' ').join('-')}`}
                              key={show.id + '_' + genre.name + '_' + show.updated}
                              className={styles.card}
                            >
                              <img src={show.image?.original ? show.image?.original : static_src} alt="poster" />
                              <p>{show.name}</p>
                            </Link>
                          )
                        })}
                      </div>
                    </div>
                    <span className={styles.divder}></span>
                  </>
                )
              })}
            </>
          )}
        </>
      ) : (
        <>
          <h1>Search Result for {searchQuery}...</h1>
					<div className={styles.search_result}>
          {searchDataHome.map(({ show }) => {
            return (
              <Link
                to={`/show/${show.id}/${show.name.toLowerCase().split(' ').join('-')}`}
                key={show.id + '_' + show.updated}
                className={styles.block_card}
              >
                <div>
                  <img src={show.image?.original ? show.image?.original : static_src} alt="poster" />
                </div>
                <div>
                  <h2>{show.name}</h2>
									<table>
              <tbody>
                <tr>
                  <td>Rating:</td>
                  <td>
                    <p>{show.rating.average ? show.rating.average: "Not Given"}</p>
                  </td>
                </tr>
                <tr>
                  <td>Language:</td>
                  <td>
                    <p>{show.language ?show.language: "Not Given" }</p>
                  </td>
                </tr>
                <tr>
                  <td>Runtime:</td>
                  <td >{show.averageRuntime} {' min.'}</td>
                </tr>
              </tbody>
            </table>
                </div>
              </Link>
            )
          })}
					</div>
        </>
      )}
    </div>
  )
}
