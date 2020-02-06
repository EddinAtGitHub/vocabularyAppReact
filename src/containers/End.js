import React from "react";
import IconButton from '@material-ui/core/IconButton';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import CloseIcon from '@material-ui/icons/Close';
import Button from "@material-ui/core/Button";
import { Grid, Box } from '@material-ui/core';
import { teal } from '@material-ui/core/colors';
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import TableHead from "@material-ui/core/TableHead";


export default (props) => {
	let diff = null;
	let percentage = 0;

	let columns = [
		{ id: "1", label: "Tested word"},
		{ id: "2", label: "Your input"},
		{ id: "3", label: "The translation"},
		{ id: "4", label: ""}
	];

	const testedWords = JSON.parse(
		localStorage.getItem('vocabularyRandomList')
	);
	const testResults = JSON.parse(
		localStorage.getItem('vocabularyTestsList')
	);

	if (testedWords.length > 0 && testResults.length > 0) {
		diff = testedWords.filter((x, i) => JSON.stringify(testResults[i]) === JSON.stringify(testedWords[i]));
		percentage = (100 *parseInt(diff.length)) / testedWords.length;
	}

	const onClickBack = () => {
		props.history.push('/add');
		localStorage.removeItem('vocabularyTestsList');
	};

	return (
		<div>
			<Grid  item xs={12}>
				<Box display="flex" p={1} bgcolor="background.paper">
					<Box p={1} flexGrow={1}>
						<Button
							variant="contained"
							onClick={onClickBack}
						>
							Back
						</Button>
					</Box>
					<Box p={1}>
						{diff.length} / {testedWords.length} <br/>
						{percentage} %
					</Box>
				</Box>
			</Grid>
			<Table aria-labelledby="tableTitle" className="static-table">
			<TableHead className="table-head">
				<TableRow>
					{columns.map(row =>  (
							<TableCell
								key={row.id}
								padding="default"
							>
								{row.label.toUpperCase()}
				  		   </TableCell>
						)
					  )
					}
				</TableRow>
			</TableHead>
			<TableBody>
				{testResults.map((item, index) => {
					let testItem = testedWords[index];
					return (
						<TableRow
							hover
							tabIndex={-1}
							key={index}>
							<TableCell className="name-color" scope="row">
								{item.native}
							</TableCell>
							<TableCell>{item.foreign}</TableCell>
							<TableCell>{testItem.foreign}</TableCell>
							<TableCell>
								{ (testItem.f === item.foreign) ?
									<IconButton color="primary" edge="end" aria-label="comments">
										<CheckCircleOutlineIcon style={{color: teal[300]}} />
									</IconButton>
									: <IconButton color="secondary" edge="end" aria-label="comments">
										<CloseIcon />
									</IconButton>
								}
							</TableCell>
						</TableRow>
					)
				})}
			</TableBody>
			</Table>
		</div>
	);
};