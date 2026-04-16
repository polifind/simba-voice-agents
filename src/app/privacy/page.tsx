import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'Privacy Policy for SIMBA Voice Agents, a project of Speechify, Inc.',
  alternates: { canonical: '/privacy' },
  robots: { index: true, follow: true },
};

export default function PrivacyPage() {
  return (
    <div className="bg-white">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <h1 className="text-4xl md:text-5xl font-black tracking-tight text-simba-black">Privacy Policy</h1>
        <p className="mt-3 text-sm text-simba-gray-500">Last updated April 16, 2026</p>

        <div className="mt-8 prose prose-simba max-w-none prose-headings:tracking-tight prose-h2:mt-10 prose-h2:mb-4 prose-h3:mt-6 prose-h3:mb-2 prose-p:leading-relaxed prose-a:text-simba-blue prose-a:no-underline hover:prose-a:underline">
          <p>
            SIMBA Voice Agents (&quot;SIMBA&quot;) is a project of Speechify, Inc. (&quot;Speechify,&quot; &quot;we,&quot; &quot;us,&quot; or &quot;our&quot;).
            This Privacy Policy describes the personal information we collect when you use SIMBA, why we collect it, how
            we use and share it, and the choices and rights you have. By accessing or using SIMBA — through{' '}
            <a href="https://simbavoice.ai">simbavoice.ai</a>, our APIs, our SDKs, or any related software, services, or
            integrations (collectively, the &quot;Services&quot;) — you consent to the practices described here.
          </p>

          <p>
            SIMBA operates as part of Speechify. References in this policy to &quot;Speechify&quot; include SIMBA. The
            legal entity responsible for the Services and the controller of personal information collected through the
            Services is Speechify, Inc., 382 NE 191st St PMB 69469, Miami, FL 33179-3899, United States.
          </p>

          <h2>1. Scope</h2>
          <p>
            This Privacy Policy applies to information we collect through your use of the SIMBA website, dashboard,
            APIs, agent runtime, telephony integrations, and any associated software. It does not apply to information
            handled by third parties whose services you choose to integrate with SIMBA (for example, your Twilio account
            or your CRM).
          </p>

          <h2>2. Our business model</h2>
          <p>
            SIMBA is a paid B2B software service. Customers pay subscription or usage-based fees for the right to deploy
            and operate AI voice agents using the platform. We do not sell your personal information or your end-users&apos;
            personal information to third parties for advertising. We do not share end-user call data with third parties
            except as needed to deliver the Services or as described below.
          </p>

          <h2>3. Information we collect</h2>

          <h3>3.1 Information you provide</h3>
          <p>When you create a SIMBA account or use the Services, you may provide us with:</p>
          <ul>
            <li>
              <strong>Account information.</strong> Your name, email address, organization, role, and password (or, if
              you sign in with Google or another identity provider, the basic profile information that provider
              shares).
            </li>
            <li>
              <strong>Billing information.</strong> Payment card details, billing address, and tax information.
              Payment card numbers are processed by our payment processor; we never store full card numbers on our own
              servers.
            </li>
            <li>
              <strong>Configuration data.</strong> Agent prompts, knowledge-base documents, function definitions,
              workspace settings, and other content you upload to configure your agents.
            </li>
            <li>
              <strong>Support communications.</strong> Messages you send to our support team, including any attachments.
            </li>
          </ul>

          <h3>3.2 Information we collect when you or your end-users use the Services</h3>
          <ul>
            <li>
              <strong>Call audio and transcripts.</strong> When your agents take or place calls, we process the audio
              stream in real time and create text transcripts. Transcripts are stored under your account so you can
              review, audit, and improve your agents. Audio recordings are stored only if you enable that option.
            </li>
            <li>
              <strong>Call metadata.</strong> Phone numbers, call duration, timestamps, agent IDs, the outcome of the
              call (e.g., resolved, escalated, voicemail), and analytics computed from the call.
            </li>
            <li>
              <strong>Tool-call logs.</strong> When your agent calls a function or external API on your behalf, we log
              the request and response so you can debug and audit agent behavior.
            </li>
            <li>
              <strong>Usage information.</strong> Pages of the dashboard you visit, features you use, requests to our
              API, and other interactions with the Services.
            </li>
          </ul>

          <h3>3.3 Information collected automatically</h3>
          <ul>
            <li>
              <strong>Log data.</strong> IP address, browser type, operating system, referring URL, pages viewed,
              and timestamps of activity on our website and dashboard.
            </li>
            <li>
              <strong>Device information.</strong> Hardware model, operating system version, locale, and unique device
              identifiers when you use mobile or desktop clients.
            </li>
            <li>
              <strong>Cookies and similar technologies.</strong> See Section 9 below.
            </li>
            <li>
              <strong>Approximate location.</strong> Derived from IP address, used for routing, regional service
              selection, and security.
            </li>
          </ul>

          <h3>3.4 Information from third parties</h3>
          <p>
            We may receive information about you from third parties, including identity providers (when you sign in
            with Google or similar services), payment processors, and analytics partners. We combine this with
            information we collect directly to operate and improve the Services.
          </p>

          <h2>4. How we use your information</h2>
          <p>We use the information we collect to:</p>
          <ul>
            <li>provide, maintain, and improve the Services;</li>
            <li>authenticate users and protect your account from unauthorized access;</li>
            <li>process payments and manage subscriptions;</li>
            <li>operate the agent runtime — including transcribing audio, generating responses, and synthesizing speech;</li>
            <li>store and surface call transcripts, analytics, and audit logs to your team;</li>
            <li>respond to support requests and communicate with you about the Services;</li>
            <li>send you product updates, newsletters, and marketing communications (you can opt out at any time);</li>
            <li>detect, investigate, and prevent fraud, abuse, security incidents, and violations of our policies; and</li>
            <li>comply with applicable laws and respond to lawful requests from public authorities.</li>
          </ul>

          <h2>5. Customer data and end-user information</h2>
          <p>
            SIMBA is a platform that lets businesses deploy voice agents that interact with their own end-users
            (callers, customers, leads). When SIMBA processes the personal information of those end-users — for example,
            transcribing what a caller said — we act as a <strong>data processor</strong> on behalf of the SIMBA customer
            (you). The SIMBA customer is the <strong>data controller</strong> for that information and is responsible for
            obtaining any necessary consents, providing required disclosures (including recording-consent notices), and
            answering data subject requests.
          </p>
          <p>
            If you are a SIMBA customer, a Data Processing Addendum (DPA) is available on request. Email{' '}
            <a href="mailto:privacy@simbavoice.ai">privacy@simbavoice.ai</a> for the current version.
          </p>
          <p>
            If you are an end-user whose data was processed by an agent built on SIMBA, please contact the business
            that operates that agent in the first instance. We will reasonably assist that business in fulfilling your
            request.
          </p>

          <h2>6. Reviewing and using customer content</h2>
          <p>
            As a rule, Speechify employees do not access your call transcripts, recordings, or knowledge-base content.
            We may access this information when you ask us to (for example, when you file a support ticket and reference
            a specific call), when we are investigating a confirmed violation of our terms, when required to respond to
            a lawful request from public authorities, or when needed to operate the Services (for example, restoring
            data after a system failure). When we do access your content for these purposes, we limit access to the
            employees who need it and log the access.
          </p>
          <p>
            We do not use your customer content (transcripts, recordings, knowledge-base documents, or function-call
            logs) to train our generally available models without your explicit opt-in. Aggregated, de-identified
            statistics derived from usage patterns may be used to improve the Services.
          </p>

          <h2>7. Sharing your information</h2>
          <p>We share information with third parties only in the limited circumstances below:</p>
          <ul>
            <li>
              <strong>Service providers.</strong> Vendors that help us operate the Services, including cloud hosting,
              payment processing, telephony providers, speech recognition and synthesis providers, large language model
              providers, customer support tooling, and analytics. These vendors are contractually required to protect
              your information and may use it only to perform services for us.
            </li>
            <li>
              <strong>With your direction.</strong> When you connect SIMBA to a third-party system (for example,
              Twilio, Salesforce, HubSpot, Zendesk, or a webhook endpoint you operate), we share data with that system
              as you have configured.
            </li>
            <li>
              <strong>Legal compliance and safety.</strong> When we believe disclosure is required to comply with a law,
              regulation, legal process, or governmental request, or to protect the rights, property, or safety of
              Speechify, our customers, or others.
            </li>
            <li>
              <strong>Corporate transactions.</strong> In connection with a merger, acquisition, financing, or sale of
              assets, subject to standard confidentiality obligations and continued protection of your information.
            </li>
            <li>
              <strong>With your explicit consent.</strong> Any other sharing not described above happens only with your
              clear permission.
            </li>
          </ul>
          <p>
            We do not sell your personal information for monetary consideration, and we do not share it with third
            parties for cross-context behavioral advertising.
          </p>

          <h2>8. International data transfers and storage</h2>
          <p>
            SIMBA is operated from the United States. By using the Services, you understand and agree that information
            we collect — including personal information of you and your end-users — may be transferred to, stored, and
            processed in the United States and other countries where our service providers operate. United States data
            protection laws may differ from those of your country.
          </p>
          <p>
            For transfers from the European Economic Area, the United Kingdom, and Switzerland, we rely on Standard
            Contractual Clauses or other appropriate transfer mechanisms.
          </p>

          <h2>9. Cookies and similar technologies</h2>
          <p>
            We use cookies and similar technologies (pixels, SDKs, local storage) to operate the website and dashboard,
            authenticate users, remember preferences, measure usage, and improve the Services. We use both first-party
            and third-party cookies. You can manage cookie preferences through your browser settings or, where required
            by law, through the consent banner on our website.
          </p>
          <p>Categories we use:</p>
          <ul>
            <li>
              <strong>Strictly necessary.</strong> Required to operate the site and authenticate you. These cannot be
              disabled.
            </li>
            <li>
              <strong>Analytics.</strong> Help us understand how the Services are used. Providers include Google
              Analytics and similar tools.
            </li>
            <li>
              <strong>Functional.</strong> Remember your preferences and settings.
            </li>
          </ul>

          <h2>10. Security</h2>
          <p>
            We use industry-standard technical and organizational measures to protect your information, including
            encryption in transit (TLS) and at rest, network segmentation, access controls, and audit logging. No
            internet-based service can guarantee absolute security; you are responsible for keeping your account
            credentials confidential and notifying us immediately of any unauthorized access.
          </p>
          <p>
            We will notify you of confirmed security incidents that materially affect the personal information we
            process for you, in accordance with applicable law and any DPA you have with us.
          </p>

          <h2>11. Data retention and deletion</h2>
          <p>
            We retain your information for as long as your account is active and as needed to provide the Services,
            comply with our legal obligations, resolve disputes, and enforce our agreements. You may delete your account
            at any time from the dashboard; doing so will trigger deletion of your customer data within a reasonable
            timeframe, subject to retention required by law or for ongoing security and audit purposes.
          </p>
          <p>
            Customers can configure call audio and transcript retention periods on a per-workspace basis through the
            dashboard. By default, audio recordings are not retained unless you enable that option.
          </p>

          <h2>12. Your rights</h2>
          <p>
            Depending on where you live, you may have rights to access, correct, delete, port, or restrict the
            processing of your personal information; to object to certain processing; and to lodge a complaint with a
            data protection authority. To exercise these rights, email{' '}
            <a href="mailto:privacy@simbavoice.ai">privacy@simbavoice.ai</a> or use the in-product tools where
            available. We will verify your identity before responding.
          </p>

          <h3>12.1 California residents</h3>
          <p>
            California residents have additional rights under the California Consumer Privacy Act (CCPA), including the
            right to know what personal information we collect, the right to request deletion, the right to correct
            inaccurate information, the right to opt out of the &quot;sale&quot; or &quot;sharing&quot; of personal
            information, and the right not to be discriminated against for exercising these rights. We do not sell or
            share personal information for cross-context behavioral advertising.
          </p>

          <h3>12.2 EEA, UK, and Swiss residents</h3>
          <p>
            If you are located in the EEA, the United Kingdom, or Switzerland, our legal bases for processing personal
            information are: performance of a contract with you, our legitimate interests in operating and improving the
            Services, your consent (where applicable), and compliance with legal obligations. You have the right to
            access, rectification, erasure, restriction, portability, and objection, and to withdraw consent at any
            time.
          </p>

          <h3>12.3 Brazil residents</h3>
          <p>
            Residents of Brazil have rights under the LGPD comparable to the CCPA and GDPR rights described above,
            including access, correction, anonymization, deletion, portability, and information about how their data
            is shared.
          </p>

          <h2>13. Children</h2>
          <p>
            SIMBA is intended for businesses and is not directed to children under 13. We do not knowingly collect
            personal information from children under 13. If you believe we have collected information from a child under
            13, contact us at <a href="mailto:privacy@simbavoice.ai">privacy@simbavoice.ai</a> and we will take
            appropriate steps.
          </p>

          <h2>14. Marketing communications</h2>
          <p>
            We may send you product announcements, security updates, and marketing communications. You can opt out of
            marketing emails at any time by clicking the unsubscribe link or by emailing{' '}
            <a href="mailto:privacy@simbavoice.ai">privacy@simbavoice.ai</a>. You will continue to receive
            transactional and account-related communications even if you unsubscribe from marketing emails.
          </p>

          <h2>15. Third-party links and integrations</h2>
          <p>
            The Services may include links to or integrations with third-party websites, applications, or services that
            we do not control. This Privacy Policy does not apply to those third parties; their own privacy policies
            do.
          </p>

          <h2>16. Changes to this Privacy Policy</h2>
          <p>
            We may update this Privacy Policy from time to time. If we make a material change, we will notify you by
            email or through the Services and update the &quot;Last updated&quot; date at the top of this page. Your
            continued use of the Services after a change becomes effective constitutes your acceptance of the updated
            policy.
          </p>

          <h2>17. Contact us</h2>
          <p>
            For any questions about this Privacy Policy or our privacy practices, contact us at{' '}
            <a href="mailto:privacy@simbavoice.ai">privacy@simbavoice.ai</a>.
          </p>
          <p>
            Speechify, Inc.<br />
            382 NE 191st St PMB 69469<br />
            Miami, FL 33179-3899<br />
            United States
          </p>
        </div>
      </div>
    </div>
  );
}
