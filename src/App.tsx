import React from "react";
import { makeMove } from "./gameFunctions";
import { MonteCarlo } from "./MonteCarlo";

const monteCarlo = new MonteCarlo();

const App = () => {
	const [gameState, setGameState] = React.useState([
		[0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0],
	]);


	const gameBoardStyle = {
		display: "grid",
		gridTemplateRows: "100px 100px 100px 100px 100px 100px",
		gridTemplateColumns: "100px 100px 100px 100px 100px 100px 100px",
	};

	const makeTurn = (column: number) => {
		const newGameState = makeMove(gameState, column, 1);
		if (newGameState === null) {
			return;
		}
		setGameState([...newGameState]);
	};

	return (
		<div style={gameBoardStyle}>
			{gameState.flat().map((cell, index) => (
				<Cell
					key={index}
					column={index % 7}
					player={cell}
					onClick={makeTurn}
				/>
			))}
		</div>
	);
};

const Cell = (props: {
	column: number;
	player: number;
	onClick: (column: number) => void;
}) => {
	const cellStyle = {
		background: "#00ccff",
		display: "flex",
		alignItems: "center",
		justifyContent: "center",
	};

	const contentsStyle = {
		background: "white",
		borderStyle: "solid",
		height: "80px",
		width: "80px",
		borderRadius: "40px",
	};

	if (props.player === 1) {
		contentsStyle.background = "red";
	} else if (props.player === 2) {
		contentsStyle.background = "yellow";
	}

	return (
		<div style={cellStyle} onClick={() => props.onClick(props.column)}>
			<div style={contentsStyle}></div>
		</div>
	);
};

export default App;
