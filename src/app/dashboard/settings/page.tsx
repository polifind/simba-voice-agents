import { PageShell } from '@/components/dashboard/PageShell';
import { CheckCircleIcon } from '@heroicons/react/24/outline';

type SettingCard = {
  title: string;
  description: string;
  action: string;
};

const SETTING_CARDS: SettingCard[] = [
  {
    title: 'Conversation Initiation Client Data Webhook',
    description:
      'Configure the webhook that will be called when a new Twilio phone call or SIP trunk call conversation begins.',
    action: 'Add webhook',
  },
  {
    title: 'Workspace Secrets',
    description:
      'Create and manage secure secrets that can be accessed across your workspace.',
    action: 'Add secret',
  },
  {
    title: 'Workspace Auth Connections',
    description:
      'Create and manage authentication connections that can be used across your workspace tools.',
    action: 'Add Auth',
  },
  {
    title: 'Post-Call Webhook',
    description:
      'Select the webhook that will be called when a conversation ends. Webhooks can be managed in the settings page.',
    action: 'Create Webhook',
  },
];

export default function SettingsPage() {
  return (
    <PageShell title="Settings">
      <div className="flex items-center gap-2">
        <h1 className="text-3xl font-black tracking-tight text-simba-black">
          SimbaAgents Settings
        </h1>
        <CheckCircleIcon className="h-5 w-5 text-simba-gray-400" />
      </div>
      <p className="mt-1 text-sm text-simba-gray-600">
        Configure workspace-wide settings for SimbaAgents
      </p>

      <div className="mt-8 space-y-4 max-w-4xl">
        {SETTING_CARDS.map((card) => (
          <div
            key={card.title}
            className="rounded-2xl border border-simba-gray-200 bg-white p-6 flex items-start justify-between gap-6"
          >
            <div className="min-w-0">
              <div className="text-sm font-semibold text-simba-black">
                {card.title}
              </div>
              <p className="mt-1 text-sm text-simba-gray-600 leading-relaxed">
                {card.description}
              </p>
            </div>
            <button
              type="button"
              className="flex-shrink-0 inline-flex items-center h-9 px-4 rounded-md border border-simba-gray-200 text-sm font-medium text-simba-gray-800 hover:bg-simba-gray-50 whitespace-nowrap"
            >
              {card.action}
            </button>
          </div>
        ))}
      </div>
    </PageShell>
  );
}
