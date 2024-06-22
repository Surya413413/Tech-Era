const CourseItem = props => {
  const {courese} = props
  const {id, name, imageUrl, description} = courese
  return (
    <li>
      <img src={imageUrl} alt="website logo" />
      <p>{name}</p>
      <p>{description}</p>
    </li>
  )
}
export default CourseItem
