import ReactDOM from "react-dom"
import { css } from "@emotion/react"

const Modal = ({ children, hide }) => ReactDOM.createPortal(
	<div
		onClick={hide}
		css={css`
			position: absolute;
			top: 0;
			bottom: 0;
			right: 0;
			left: 0;
			background-color: rgba(0, 0, 0, 0.6);
			display: flex;
			justify-content: center;
			align-items: center;
		`}
	>
		<div
			onClick={(e) => e.stopPropagation()}
			css={css`
				padding: 30px;
				background-color: white;
				border-radius: 5px;
			`}
		>
			{ children }
		</div>
	</div>
, document.querySelector("#modal"))

export default Modal
