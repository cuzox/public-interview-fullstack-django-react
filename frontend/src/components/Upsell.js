import Modal from "./Modal"
import { css } from "@emotion/react"
import colors from "../constants/colors"

const Upsell = ({ hide }) => {
	return (
		<Modal hide={hide}>
			<div css={css`

			`}>
				Upgrade your echo account now so you can access the latest features!
				<ul>
					<li> Download CSV exports </li>
					<li> Analyze queries </li>
					<li> View and execute other users' queries </li>
				</ul>
			</div>
			<div css={css`
				display: flex;
				justify-content: space-between;

				button {
					background: ${colors.INTERACTIVE};
					padding: 10px 20px;
					color: white;
					font-weight: bold;
					border-radius: 5px;
					border: none;
					margin-top: 20px;
					cursor: pointer;

					&.cancel {
						background: ${colors.BLACK}
					}
				}
			`}>
				<button className="cancel" onClick={hide}> Cancel </button>
				<button> Upgrade </button>
			</div>
		</Modal>
	)
}

export default Upsell
