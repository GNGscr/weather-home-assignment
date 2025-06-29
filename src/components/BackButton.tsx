import { useNavigate } from "react-router-dom";

const BackButton = () => {
    const navigate = useNavigate();
  return (
    <button className='back-btn' onClick={() => navigate(`/?${location.search}`)}>
    ← Back
  </button> 
  )
}

export default BackButton;