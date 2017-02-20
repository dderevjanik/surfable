import * as React from 'react';
import { SimpleCommand } from './../Command/SimpleCommand';
import { DummyCommand } from './../Command/DummyCommand';
import { UrlCommand } from './../Command/UrlCommand';
import { ICommand, COMMAND } from './../../interfaces/ICommand';
import { ulS } from './CommandList.style';
import { sendAction } from 'surfable-common/src/Sender';

interface IProps {
	readonly commands: ICommand[];
	readonly activeInd: number;
};

export const CommandList = (props: IProps) => (
	<ul className={ ulS }>
		{
			props.commands.map((command, i) => {
				switch(command.type) {
					case COMMAND.DUMMY: {
						return (
							<DummyCommand
								active={(props.activeInd === i) ? true : false}
								onCommandClick={() => sendAction(command.action)}
								commandInd={i}
								text={command.text}
							/>
						)
					}
					case COMMAND.SIMPLE: {
						return (
							<SimpleCommand
								active={(props.activeInd === i) ? true : false}
								category={command.cat}
								commandInd={i}
								desc={command.desc}
								imgUrl={command.imgUrl}
								key={i}
								name={command.text}
								onCommandClick={() => sendAction(command.action)}
								partialText={command.pText}
							/>
						);
					}
					case COMMAND.URL_COMMAND: {
						return (
							<UrlCommand
								active={(props.activeInd === i) ? true : false}
								onCommandClick={() => sendAction(command.action)}
								commandInd={i}
								text={command.text}
								url={command.url}
								partialText={command.pText}
								imgUrl={command.imgUrl}
							/>
						)
					}
					default: {
						throw new Error(`Undefined command type: ${command}`);
					}
				}
			})
		}
	</ul>
);
