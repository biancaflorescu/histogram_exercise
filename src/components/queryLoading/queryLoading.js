import Spinner from "react-bootstrap/Spinner";
import "./queryLoading.css";

const QueryLoading = () => {
  return (
    <div class="spinner-container">
      <Spinner animation="border" role="status" variant="light">
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    </div>
  );
};

export default QueryLoading;
