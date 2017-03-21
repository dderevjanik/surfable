import * as React from 'react';
import * as Style from './CommandList.style';
import * as StyleCommand from './../Commands/Command.style';
import { sendAction } from '../../../Sender';
import { SimpleCommand } from './../Commands/SimpleCommand';
import { DummyCommand } from './../Commands/DummyCommand';
import { UrlCommand } from './../Commands/UrlCommand';
import { QuickPanelCommand } from './../Commands/QuickPanelCommand';
import { ICommand, COMMAND } from './../../interfaces/ICommand';
import { isScrolledIntoView, scrollIntoElement, EViewState } from './../../utils/PanelSideeffects';

interface IProps {
	readonly commands: ICommand[];
	readonly activeInd: number;
}

interface IState {
	activeChanged: boolean;
}

export class CommandList extends React.Component<IProps, IState> {

	constructor(props: IProps) {
		super(props);
		this.state = {
			activeChanged: true
		};
	}

	componentWillReceiveProps(nextProps: IProps) {
		if (this.props.activeInd !== nextProps.activeInd) {
			// If we used arrows to navigate between commands
			this.setState({
				activeChanged: true
			});
		}
	}

	componentDidUpdate() {
		// After render
		if (this.state.activeChanged) {
			// If we used arrows to navigate, check if scrollview needs to scroll to command
			const commandlist = document.querySelector('.' + Style.ul) as HTMLElement;
			const activeCommand = document.querySelector('.' + StyleCommand.commandHighlight) as HTMLElement;
			const viewPosition = isScrolledIntoView(commandlist, activeCommand);
			if (viewPosition !== EViewState.INSIDE) {
				// If command is out of view, scroll into it
				scrollIntoElement(commandlist, activeCommand, viewPosition);
			}
		}
		this.state = {activeChanged: false}
	}

	render() {
		return (
			<ul className={Style.ul} ref="commandList">
				{
					this.props.commands.map((command, i) => {
						switch (command.type) {
							case COMMAND.QUICKPANEL_COMMAND: {
								return (
									<QuickPanelCommand
										key={i}
										active={(this.props.activeInd === i) ? true : false}
										onCommandClick={() => sendAction(command.action)}
										commandInd={i}
										text={command.text}
										group={command.group}
										desc={command.desc}
									/>
								);
							}
							case COMMAND.DUMMY: {
								return (
									<DummyCommand
										key={i}
										active={(this.props.activeInd === i) ? true : false}
										onCommandClick={() => sendAction(command.action)}
										commandInd={i}
										text={command.text}
									/>
								);
							}
							case COMMAND.SIMPLE: {
								return (
									<SimpleCommand
										key={i}
										active={(this.props.activeInd === i) ? true : false}
										category={command.cat}
										commandInd={i}
										desc={command.desc}
										imgUrl={command.imgUrl}
										name={command.text}
										onCommandClick={() => sendAction(command.action)}
										partialText={command.pText}
									/>
								);
							}
							case COMMAND.URL_COMMAND: {
								return (
									<UrlCommand
										key={i}
										desc={command.desc}
										active={(this.props.activeInd === i) ? true : false}
										onCommandClick={() => sendAction(command.action)}
										commandInd={i}
										text={command.text}
										url={command.url}
										partialText={command.pText}
										partialUrl={command.pUrl}
										imgUrl={command.imgUrl}
									/>
								);
							}
							default: {
								throw new Error(`Undefined command type: ${command}. Make sure that React component exists for command's type '${command}'`);
							}
						}
					})
				}
			</ul>
		);
	}
}
