import { ChatViewForm } from './ChatViewForm';
import { ConversationSidebar } from './ConversationSidebar';
import { Messages } from './Messages';
import { ChatProvider } from './store';
import { DEFAULT_MARKPROMPT_OPTIONS } from '../constants';
import type { MarkpromptOptions } from '../types';
import { useDefaults } from '../useDefaults';
import type { View } from '../useViews';

export interface ChatViewProps {
  activeView?: View;
  chatOptions?: MarkpromptOptions['chat'];
  debug?: boolean;
  feedbackOptions?: MarkpromptOptions['feedback'];
  onDidSelectReference?: () => void;
  projectKey: string;
  referencesOptions?: MarkpromptOptions['references'];
}

export function ChatView(props: ChatViewProps): JSX.Element {
  const { activeView, debug, projectKey } = props;

  if (!projectKey) {
    throw new Error(
      `Markprompt: a project key is required. Make sure to pass your Markprompt project key to <ChatView />.`,
    );
  }

  // we are also merging defaults in the Markprompt component, but this makes sure
  // that standalone ChatView components also have defaults as expected.
  const chatOptions = useDefaults(
    { ...props.chatOptions },
    DEFAULT_MARKPROMPT_OPTIONS.chat,
  );

  const feedbackOptions = useDefaults(
    { ...props.feedbackOptions },
    DEFAULT_MARKPROMPT_OPTIONS.feedback,
  );

  const referencesOptions = useDefaults(
    { ...props.referencesOptions },
    DEFAULT_MARKPROMPT_OPTIONS.references,
  );

  return (
    <ChatProvider
      chatOptions={chatOptions}
      debug={debug}
      projectKey={projectKey}
    >
      <div className="MarkpromptChatView">
        <ConversationSidebar />

        <div className="MarkpromptChatViewChat">
          <Messages
            projectKey={projectKey}
            feedbackOptions={feedbackOptions}
            referencesOptions={referencesOptions}
          />
          <ChatViewForm activeView={activeView} chatOptions={chatOptions} />
        </div>
      </div>
    </ChatProvider>
  );
}
