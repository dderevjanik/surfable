import { style } from 'typestyle';

export const commandS = style({
	cursor: 'pointer',
	color: '#CCCCCC',
	padding: '2px 8px',
	textAlign: 'left',
	lineHeight: '1.5em',
	overflow: 'hidden',
	textOverflow: 'ellipsis',
	display: '-webkit-box',
   '-webkit-line-clamp': '1',
   '-webkit-box-orient': 'vertical',
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
})

export const descS = style({
	fontSize: '13px',
	float: 'right'
});

export const iconS = style({
	height: '1.1em',
	marginRight: '5px'
});

export const SSmallText = style({
	color: 'grey'
});
