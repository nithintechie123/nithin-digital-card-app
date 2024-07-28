import Cookies from 'js-cookie'

import './index.css'

const Home = props => {
  const onClickLogoutBtn = () => {
    const {history} = props

    Cookies.remove('jwt_token')
    history.replace('/login')
  }

  return (
    <div className="home-container">
      <nav className="nav-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/ebank-logo-img.png"
          alt="website logo"
          className="website-logo"
        />
        <button
          type="button"
          className="logout-button"
          onClick={onClickLogoutBtn}
        >
          Logout
        </button>
      </nav>
      <h1 className="company-motto-line">Your Flexibility, Our Excellence</h1>
      <img
        src="https://assets.ccbp.in/frontend/react-js/ebank-digital-card-img.png"
        alt="digital card"
        className="company-digital-card"
      />
    </div>
  )
}

export default Home
