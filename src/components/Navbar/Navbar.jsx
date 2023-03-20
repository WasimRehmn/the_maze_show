import React from 'react'
import styles from './Navbar.module.css'
import { Link, useNavigate } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import star_png from './star.png'
import language_png from './language.png'
import { DataContext } from '../../context/ContextProvider'

import axios from 'axios'

export const Navbar = () => {
  const { setSearchDataHome, setSearchQuery } = React.useContext(DataContext)

  const [searchText, setSearchText] = React.useState('')
  const [searchData, setSearchData] = React.useState([])

  const navigate = useNavigate()

  let static_src =
    'https://img.freepik.com/free-psd/electro-music-festival-poster-template_23-2148947807.jpg?w=1380&t=st=1679264350~exp=1679264950~hmac=0df85660868911322a27e4ee9d1fffced7346d2aa4a4f8cc279ad1b764bbe354'

  React.useEffect(() => {
    axios
      .get(`http://api.tvmaze.com/search/shows?q=${searchText}`)

      .then(({ data }) => {
        setSearchData(data)
      })
      .catch((err) => {
        alert(err.message)
      })
    // eslint-disable-next-line
  }, [searchText])

  const handleInputChange = (e) => {
    setSearchText(e.target.value)
  }

  const handleSearchClick = () => {
    setSearchDataHome(searchData)
    setSearchQuery(searchText)
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearchClick()
    }
  }

  const navigateWindow = (show_id, slug) => {
    navigate(`/show/${show_id}/${slug}`)
    window.location.reload()
  }
  const navigateHome = () => {
    navigate(`/`)

    window.location.reload()
  }

  return (
    <>
      <header className={styles.nav}>
        <div className={styles.logo_container}>
          <Link onClick={navigateHome}>
            <img src="https://static.tvmaze.com/images/tvm-header-logo.png" alt="logo" />
          </Link>
        </div>
        <div className={styles.pagination}>
          <div className={styles.searchbar}>
            <input
              type="search"
              placeholder="Search..."
              onChange={(e) => handleInputChange(e)}
              onKeyPress={(e) => handleKeyPress(e)}
            />
            <button type="submit" onClick={handleSearchClick}>
              <FontAwesomeIcon icon={faMagnifyingGlass} />
            </button>
          </div>
          <div>
            <FontAwesomeIcon icon={faUser} />
          </div>
        </div>
      </header>
      {searchData.length !== 0 && (
        <ul className={styles.result_box}>
          {searchData.map((data) => {
            return (
              <Link
                // to={`/show/${data.show.id}/${data.show.name.toLowerCase().split(' ').join('-')}`}
                onClick={() => navigateWindow(data.show.id, data.show.name.toLowerCase().split(' ').join('-'))}
                key={data.show.id}
              >
                <div>
                  <div>{data.show.name}</div>
                  <br />
                  <div>
                    {data.show.rating.average && (
                      <>
                        <img src={star_png} alt="icon" /> {data.show.rating.average}
                      </>
                    )}{' '}
                    {data.show.rating.average && data.show.language && <>•</>}{' '}
                    {data.show.language && (
                      <>
                        <img src={language_png} alt="icon" />
                        {data.show.language}
                      </>
                    )}
                  </div>
                </div>
                <img src={data.show.image?.original ? data.show.image.original : static_src} alt="poster" />
              </Link>
            )
          })}
        </ul>
      )}
    </>
  )
}
