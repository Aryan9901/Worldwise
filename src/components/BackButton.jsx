import Button from "./Button";
import { useNavigate } from "react-router-dom";

function BackButton({ children }) {
	const navigate = useNavigate();
	return (
		<>
			<Button
				type="back"
				onClick={(e) => {
					e.preventDefault();
					navigate(-1);
				}}
			>
				{" "}
				{children}
			</Button>
		</>
	);
}

export default BackButton;
