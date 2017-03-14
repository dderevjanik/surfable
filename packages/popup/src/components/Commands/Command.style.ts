import { style } from 'typestyle';

/**
 * Apply to command
 */
export const command = style({
	cursor: 'pointer',
	color: '#CCCCCC',
	padding: '2px 8px',
	textAlign: 'left',
	lineHeight: '20px',
	overflow: 'hidden',
	textOverflow: 'ellipsis',
	whiteSpace: 'nowrap',
	$nest: {
		'&:hover': {
			background: '#2A2D2E'
		}
	}
});

/**
 * When command is highlighted
 */
export const commandHighlight = style({
	backgroundColor: '#073655',
	$nest: {
		'&:hover': {
			background: '#073655'
		}
	}
});

/**
 * Normal text
 */
export const text = style({
	textAlign: 'left'
});

/**
 * Highlighted text - used when match with search value
 */
export const textHighlight = style({
	color: '#0096FA',
	fontWeight: 'bold'
});

/**
 * Description, small text on right, used to show shortcuts
 */
export const description = style({
	fontSize: '13px',
	float: 'right'
});

/**
 * Icon's style
 */
export const icon = style({
	height: '1.1em',
	marginRight: '5px'
});

/**
 * Small text near normal text, used for urls and long description
 */
export const textSmall = style({
	color: 'grey',
	marginLeft: '5px'
});
