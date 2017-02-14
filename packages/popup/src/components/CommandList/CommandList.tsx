import * as React from 'react';
import { Command } from './../Command/Command';
import { ICommand } from './../../interfaces/ICommand';
import { ulS } from './CommandList.style';
import { sendAction } from 'surfable-common/src/Sender';

interface IProps {
	readonly commands: ICommand[];
	readonly activeInd: number;
};

export const CommandList = (props: IProps) => (
	<ul className={ ulS }>
		{
			props.commands.map((command, i) =>
				<Command
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
			)
		}
	</ul>
);
