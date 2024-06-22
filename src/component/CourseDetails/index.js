import {Component} from 'react'
import Loader from 'react-loader-spinner'
import {Link} from 'react-router-dom'
import CourseItem from '../CourseItem'

import './index.css'

const statusConstant = {
  initial: 'INITIAL',
  inProgress: 'IN_PROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class CourseDetails extends Component {
  state = {itemsList: {}, apiStatus: statusConstant.initial}

  componentDidMount() {
    this.getData()
  }

  getData = async () => {
    this.setState({apiStatus: statusConstant.inProgress})

    const {match} = this.props
    const {params} = match
    const {id} = params

    const apiUrl = `https://apis.ccbp.in/te/courses/${id}`
    const option = {
      method: 'GET',
    }
    const response = await fetch(apiUrl)
    const data = await response.json()
    if (response.ok) {
      const updatedData = {
        description: data.course_details.description,
        id: data.course_details.id,
        name: data.course_details.name,
        imageUrl: data.course_details.image_url,
      }
      this.setState({
        itemsList: updatedData,
        apiStatus: statusConstant.success,
      })
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

  renderSuccessDtat = () => {
    const {itemsList} = this.state

    return (
      <div className="successContainer">
        <img src={itemsList.imageUrl} alt={itemsList.name}/>
        <h1>{itemsList.name}</h1>
        <p>{itemsList.description}</p>
      </div>
    )
  }

  renderAllResult = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case statusConstant.success:
        return this.renderSuccessDtat()
      case statusConstant.failure:
        return this.renderfailView()
      case statusConstant.inProgress:
        return this.renderLoadingView()
      default:
        return null
    }
  }

  render() {
    return (
      <>
        <nav className="nav-Container">
          <Link to="/">
            <img
              src="https://assets.ccbp.in/frontend/react-js/tech-era/website-logo-img.png"
              alt="website logo"
              className="logo-image"
            />
          </Link>
        </nav>
        <div className="courseContainer">{this.renderAllResult()}</div>
      </>
    )
  }
}
export default CourseDetails
