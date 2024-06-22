import {Component} from 'react'
import {Link} from 'react-router-dom'
import Loader from 'react-loader-spinner'

import Item from '../Item'

import './index.css'

const statusConstant = {
  initial: 'INITIAL',
  inProgress: 'IN_PROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class HomePage extends Component {
  state = {listData: [], apiStatus: statusConstant.initial}

  componentDidMount() {
    this.getData()
  }

  getData = async () => {
    this.setState({apiStatus: statusConstant.inProgress})
    const apiUrl = 'https://apis.ccbp.in/te/courses'
    const option = {
      method: 'GET',
    }
    const response = await fetch(apiUrl, option)
    if (response.ok) {
      const data = await response.json()
      console.log(data)
      const formateData = data.courses.map(each => ({
        id: each.id,
        name: each.name,
        logoUrl: each.logo_url,
      }))
      this.setState({listData: formateData})
      this.setState({apiStatus: statusConstant.success})
    } else {
      this.setState({apiStatus: statusConstant.failure})
    }
  }

  renderLoadingView = () => (
    <div data-testid="loader">
      <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" />
    </div>
  )

  renderfailView = () => (
    <div>
      <Link to="/">
        <div>
          <img
            src="https://assets.ccbp.in/frontend/react-js/tech-era/website-logo-img.png"
            alt="website logo"
          />
        </div>
      </Link>
      <div>
        <img
          src="https://assets.ccbp.in/frontend/react-js/tech-era/failure-img.png"
          alt="failure view"
        />
        <h1>Oops! Something Went wRONG</h1>
        <p>We cannot seem to find the page you are looking for</p>
        <button type="button" onClick={this.getData}>
          Retry
        </button>
      </div>
    </div>
  )

  renderData = () => {
    const {listData} = this.state
    return (
      <>
        <h1 className="courseHeading">Courses</h1>
        <ul className="unorderContainer">
          {listData.map(each => (
            <Item details={each} key={each.id} />
          ))}
        </ul>
      </>
    )
  }

  renderAllResult = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case statusConstant.failure:
        return this.renderfailView()
      case statusConstant.inProgress:
        return this.renderLoadingView()
      case statusConstant.success:
        return this.renderData()
      default:
        return null
    }
  }

  render() {
    return (
      <div className="CustomHomePage">
        <nav className="nav-Container">
          <Link to="/">
            <img
              src="https://assets.ccbp.in/frontend/react-js/tech-era/website-logo-img.png"
              alt="website logo"
              className="logo-image"
            />
          </Link>
        </nav>

        <div>{this.renderAllResult()}</div>
      </div>
    )
  }
}
export default HomePage
