import { style } from 'typestyle';

export const commandS = style({
	cursor: 'pointer',
	color: '#CCCCCC',
	padding: '2px 8px',
	textAlign: 'left',
	lineHeight: '20px',
	overflow: 'hidden',
	textOverflow: 'ellipsis',
	$nest: {
		'&:hover': {
			background: '#2A2D2E'
		}
	}
});

export const commandHighlightS = style({
	backgroundColor: '#073655',
	$nest: {
		'&:hover': {
			background: '#073655'
		}
	}
});

export const textS = style({
	textAlign: 'left'
});

export const highlightS = style({
	color: '#0096FA',
	fontWeight: 'bold'
});

export const highlightCommandS = style({
	textAlign: 'left',
	color: '#0096FA'
});

export const descS = style({
	fontSize: '13px',
	float: 'right'
});

export const iconS = style({
	height: '1.1em',
	marginRight: '5px'
});

export const SSmallText = style({
	color: 'grey',
	marginLeft: '5px'
});
