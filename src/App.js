import {Route, Switch, Redirect} from 'react-router-dom'

import HomePage from './component/HomePage'
import CourseDetails from './component/CourseDetails'
import NotFound from './component/NotFound'
import './App.css'

const App = () => (
  <div>
    <Switch>
      <Route exact path="/" component={HomePage} />
      <Route exact path="/courses/:id" component={CourseDetails} />
      <Route exact path="/not-found" component={NotFound} />
      <Redirect to="/not-found" />
    </Switch>
  </div>
)

export default App
