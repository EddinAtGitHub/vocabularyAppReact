import React,  { useRef, useState } from "react";
import LinearProgress from '@material-ui/core/LinearProgress';
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import { Box } from "@material-ui/core";
import Tooltip from '@material-ui/core/Tooltip';


export default (props) => {
	const testWords = JSON.parse(localStorage.getItem('vocabularyRandomList'));
	const progress = useRef(5);
	const index = useRef(0);
	const values= useRef([]);
	const [value, setValue] = useState('');
	const [label, setLabel] = useState(testWords[0].native);

	const saveValues = (value) => {
		if (value) {
			values.current = [...values.current, {
				native: label,
				foreign: value
			}];
			index.current = index.current + 1;
			progress.current = progress.current + 5;
			setLabel((index.current) < testWords.length ? testWords[index.current].native : '');
			setValue('');
			if (index.current === testWords.length) {
				localStorage.setItem('vocabularyTestsList', JSON.stringify(values.current));
				props.history.push('/end');
			}
		}
	};

	return (
		<div className="comp-root-body">
			<form
				onSubmit={(event) => {
					event.preventDefault();
					saveValues(value);
				}}
			>
				<div style={{margin: "10px"}}>
					<LinearProgress
						variant="determinate"
						color="primary"
						value={progress.current}
					/>
				</div>
				<div style={{margin: "10px"}}>
					<Grid item xs={12} sm={6}>
						<Box display="flex" p={1}>
							<Box p={1} >
								{label}
							</Box>
							<Box p={1} >
								<Tooltip title="Please insert the translated word">
								<TextField
									name="f"
									variant="outlined"
									value={value}
									onChange={(event) => {
										setValue(event.target.value);
									}}
								/>
								</Tooltip>
							</Box>
						</Box>
					</Grid>
				</div>
			</form>
		</div>
	);
};