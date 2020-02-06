import React,  {useState } from "react";
import Grid from "@material-ui/core/Grid";
import TextField from '@material-ui/core/TextField';
import Button from "@material-ui/core/Button";
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import Tooltip from '@material-ui/core/Tooltip';
import SaveIcon from '@material-ui/icons/Save';
import { teal } from '@material-ui/core/colors';

const styles = {
	root: {
		marginLeft: '10px',
		marginTop: '15px'
	}
};

export default (props) => {
	const list = JSON.parse(localStorage.getItem('vocabularyList'));
	const [vocabularyList, setVocabularyList ] = useState(list || []);
	const [displayAfterSaveIcon, setDisplayAfterSaveIcon] = useState(false);

	const getInitState = () => {
		return {native: '', foreign: ''}
	};
	const [values, setValues] = useState(getInitState());

	const onClickAdd = () => {
		if (values.native.length > 0 && values.foreign.length > 0) {
			setVocabularyList([...vocabularyList, {
				native: values.native ,
				foreign: values.foreign
			}]);
		}
		setValues(getInitState())
	};

	const onClickStart = () => {
		if (vocabularyList.length > 0) {
			const shuffled = vocabularyList.sort(() => 0.5 - Math.random());
			let selected = shuffled.slice(0, 20);
			localStorage.setItem('vocabularyRandomList', JSON.stringify(selected));
			props.history.push('/start');
		}
	};

	const onClickSave = () => {
		localStorage.setItem('vocabularyList', JSON.stringify(vocabularyList));
		setDisplayAfterSaveIcon(true);
	};

	const deleteFromList = (pairsIndex) => {
		const newList = vocabularyList.filter((_, index) => index !== pairsIndex);
		setVocabularyList(newList);
	};

	const handleOnChange = e => {
		const {name, value} = e.target;
		setValues({...values, [name]: value});
		setDisplayAfterSaveIcon(false);
	};

	return (
		<div className="comp-root-body">
			<form>
				<Grid  style={styles.root} item xs={12}>
					<Tooltip title="Please insert two words, one for the native language (German) in this field">
					<TextField
						label="Native (German)"
						name="native"
						value={values.native}
						onChange={handleOnChange}
						variant="outlined"
					/>
					</Tooltip>
					<Tooltip title="Please insert two words, one for the foreign language (English) in this field">
					<TextField
						label="Foreign (English)"
						name="foreign"
						style={{marginLeft:'10px'}}
						value={values.foreign}
						onChange={handleOnChange}
						variant="outlined"
					/>
					</Tooltip>
					<Tooltip title="Add new vocabulary pairs">
					<Button
						variant="contained"
						style={styles.root}
						onClick={onClickAdd}
					>
						Add
					</Button>
					</Tooltip>
					<Tooltip title="Start a Test mode which randomly chooses 20 words from the List in a random order">
					<Button
						variant="contained"
						style={styles.root}
						onClick={onClickStart}
					>
						Start a test
					</Button>
					</Tooltip>
					<IconButton
						aria-label="Delete"
						onClick={() => {
							onClickSave();
						}}
					>
						{displayAfterSaveIcon ? <SaveIcon style={{color: teal[300]}} /> : <SaveIcon />  }
					</IconButton>
				</Grid>
				<Grid item xs={12}>
					<List>
						{vocabularyList.map((pairs, index) => (
							<ListItem key={index.toString()} dense button>
									<ListItemText primary={pairs.native} />
								<ChevronRightIcon />
								<ListItemText style={{marginLeft:'10px'}} primary={pairs.foreign} />
								<ListItemSecondaryAction>
									<IconButton
										aria-label="Delete"
										onClick={() => {
											deleteFromList(index);
										}}
									>
										<DeleteIcon />
									</IconButton>
								</ListItemSecondaryAction>
							</ListItem>
						))}
					</List>
				</Grid>
			</form>
		</div>
	);
};