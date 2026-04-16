import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Terms of Service',
  description: 'Terms of Service for SIMBA Voice Agents, a project of Speechify, Inc.',
  alternates: { canonical: '/terms' },
  robots: { index: true, follow: true },
};

export default function TermsPage() {
  return (
    <div className="bg-white">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <h1 className="text-4xl md:text-5xl font-black tracking-tight text-simba-black">Terms of Service</h1>
        <p className="mt-3 text-sm text-simba-gray-500">Last updated April 16, 2026</p>

        <div className="mt-8 prose prose-simba max-w-none prose-headings:tracking-tight prose-h2:mt-10 prose-h2:mb-4 prose-h3:mt-6 prose-h3:mb-2 prose-p:leading-relaxed prose-a:text-simba-blue prose-a:no-underline hover:prose-a:underline">
          <p>
            These Terms of Service (&quot;Terms&quot;) govern your access to and use of SIMBA Voice Agents
            (&quot;SIMBA&quot;), a project of Speechify, Inc. (&quot;Speechify,&quot; &quot;we,&quot; &quot;us,&quot; or
            &quot;our&quot;). The Services are provided by Speechify, Inc. References in these Terms to
            &quot;SIMBA&quot; include the website at <a href="https://simbavoice.ai">simbavoice.ai</a>, the dashboard,
            our APIs and SDKs, the agent runtime, and any related software and services we provide (collectively, the
            &quot;Services&quot;).
          </p>
          <p>
            <strong>Please read these Terms carefully.</strong> By accessing or using the Services, you agree to be
            bound by these Terms and by our{' '}
            <a href="/privacy">Privacy Policy</a>. If you do not agree, do not use the Services.
          </p>
          <p>
            <strong>
              Section 17 below contains an arbitration agreement and a class-action waiver that affect your legal
              rights. Please read it carefully.
            </strong>
          </p>

          <h2>1. The Service</h2>
          <p>
            SIMBA is a software platform that allows businesses to design, deploy, and operate AI-powered voice agents.
            The Services include real-time speech recognition, language model orchestration, text-to-speech synthesis,
            telephony integration, analytics, and related developer tools. We provide the Services on a subscription or
            usage-based basis.
          </p>
          <p>
            We may modify, expand, or discontinue features of the Services at any time. We will use reasonable efforts
            to notify customers of material changes that adversely affect a current paid subscription.
          </p>

          <h2>2. Eligibility and account registration</h2>
          <p>
            You must be at least 18 years old and capable of forming a binding contract to use the Services. If you are
            using the Services on behalf of an organization, you represent that you have the authority to bind that
            organization to these Terms.
          </p>
          <p>
            You are responsible for the security of your account credentials and for all activity that occurs under
            your account. Notify us immediately at{' '}
            <a href="mailto:security@simbavoice.ai">security@simbavoice.ai</a> if you suspect unauthorized access.
          </p>

          <h2>3. Subscriptions, fees, and billing</h2>
          <p>
            Use of paid Services requires a subscription or usage-based plan. Fees, billing periods, and any minimum
            commitments are described in your order form, the pricing page, or the dashboard at the time of
            subscription. Fees are charged in U.S. dollars unless otherwise specified and are exclusive of taxes.
          </p>
          <p>
            <strong>Subscriptions auto-renew</strong> at the end of each billing period unless canceled before renewal.
            You can cancel auto-renewal from the dashboard. Cancellation takes effect at the end of the current billing
            period; you will retain access through that period.
          </p>
          <p>
            <strong>Fees are non-refundable</strong>, except as required by applicable law or as otherwise expressly
            stated in your order form. Usage-based fees are charged based on your actual consumption and are not
            refundable.
          </p>
          <p>
            We may change our prices with at least 30 days&apos; notice. If you do not agree to a price change, you may
            cancel your subscription before the change takes effect.
          </p>

          <h2>4. Free trials and beta features</h2>
          <p>
            We may offer free trials or access to beta or experimental features (&quot;Beta Features&quot;). Beta
            Features are provided &quot;as is,&quot; without warranty, and may be modified, restricted, or discontinued
            at any time. Feedback you provide on Beta Features may be used by us without obligation.
          </p>

          <h2>5. Customer Content</h2>
          <p>
            &quot;Customer Content&quot; means any data, text, audio, transcripts, knowledge-base documents, function
            definitions, or other materials you (including your end-users) submit to or generate through the Services.
            As between you and us, you retain all rights in your Customer Content.
          </p>
          <p>
            You grant us a worldwide, non-exclusive, royalty-free license to host, store, process, transmit, display,
            and modify Customer Content solely as needed to provide the Services to you (including running your agents,
            generating transcripts, computing analytics, and providing support). We will not use your Customer Content
            to train our general-availability models without your explicit opt-in.
          </p>
          <p>
            You are responsible for your Customer Content and for ensuring that you have all necessary rights, consents,
            and authorizations to submit it and to allow us to process it as described in these Terms and the{' '}
            <a href="/privacy">Privacy Policy</a>. This includes obtaining any required call-recording consents from
            your end-users.
          </p>

          <h2>6. Acceptable use</h2>
          <p>You agree not to use the Services to:</p>
          <ul>
            <li>violate any applicable law or regulation, including telephone consumer protection laws (such as TCPA in the United States), data protection laws, healthcare regulations, financial regulations, or anti-spam laws;</li>
            <li>place or facilitate fraudulent, deceptive, or harassing calls;</li>
            <li>impersonate any person or entity in a misleading or harmful way;</li>
            <li>circumvent or exceed any quotas, rate limits, or technical restrictions;</li>
            <li>reverse engineer, decompile, or disassemble the Services, except to the extent expressly permitted by applicable law;</li>
            <li>use the Services to develop a competing product;</li>
            <li>upload or transmit malware, malicious code, or content that infringes intellectual property or violates the rights of others;</li>
            <li>use the Services in life-safety, life-critical, or emergency-response applications without prior written approval;</li>
            <li>collect or process the personal information of children under 13 except in compliance with applicable law and with parental consent; or</li>
            <li>sell, sublicense, or resell the Services without our prior written consent.</li>
          </ul>
          <p>
            We may suspend or terminate your access if we reasonably believe you have violated this section, with or
            without prior notice depending on the severity of the violation.
          </p>

          <h2>7. Disclosure to end-users</h2>
          <p>
            You are responsible for disclosing to your end-users that they are interacting with an AI-powered voice
            agent, where required by applicable law (including, in the United States, certain state-level disclosure
            requirements). You are also responsible for obtaining any required call-recording consents.
          </p>

          <h2>8. Third-party services</h2>
          <p>
            The Services may interoperate with third-party platforms (for example, Twilio, Plivo, SIP trunks, CRMs,
            helpdesks, calendar systems, and large language model providers). Your use of those third-party platforms is
            governed by the third party&apos;s own terms and privacy policies. We are not responsible for the acts or
            omissions of third parties.
          </p>

          <h2>9. Intellectual property</h2>
          <p>
            We and our licensors own all right, title, and interest in and to the Services, including all software,
            documentation, and content provided by us (excluding Customer Content). These Terms grant you a limited,
            revocable, non-exclusive, non-transferable license to use the Services in accordance with these Terms.
          </p>
          <p>
            We welcome feedback on the Services. If you provide feedback, you grant us a perpetual, irrevocable,
            royalty-free license to use that feedback for any purpose without obligation.
          </p>

          <h2>10. Privacy and data protection</h2>
          <p>
            Our handling of personal information is described in our{' '}
            <a href="/privacy">Privacy Policy</a>, which is incorporated into these Terms. If you process the personal
            information of EEA, UK, Swiss, or California data subjects through the Services, a Data Processing Addendum
            (DPA) is available on request from{' '}
            <a href="mailto:privacy@simbavoice.ai">privacy@simbavoice.ai</a>.
          </p>

          <h2>11. Confidentiality</h2>
          <p>
            Each party agrees to protect the other&apos;s confidential information using the same care it uses to
            protect its own confidential information of similar importance, and not to disclose it except to its
            personnel and advisors who need to know and are bound by similar confidentiality obligations. This
            obligation survives termination of these Terms.
          </p>

          <h2>12. Service availability and support</h2>
          <p>
            We strive to provide a reliable Service but do not guarantee that the Services will be uninterrupted,
            secure, or error-free. Service-level commitments and support response times, if any, are described in your
            order form or in a separate written service-level agreement.
          </p>

          <h2>13. Suspension and termination</h2>
          <p>We may suspend or terminate your access to the Services if:</p>
          <ul>
            <li>you fail to pay fees when due and the failure continues for 10 days after notice;</li>
            <li>you breach these Terms or our acceptable use policy;</li>
            <li>your use of the Services creates a security or legal risk to us, our customers, or the public; or</li>
            <li>required by law.</li>
          </ul>
          <p>
            You may terminate your subscription at any time as described in Section 3. On termination, your right to use
            the Services ends. You may export your Customer Content during your subscription term and for a reasonable
            period after termination, after which we may delete it as described in the Privacy Policy.
          </p>

          <h2>14. Disclaimer of warranties</h2>
          <p>
            <strong>
              The Services are provided &quot;as is&quot; and &quot;as available,&quot; without warranties of any kind,
              whether express, implied, or statutory. To the fullest extent permitted by law, we disclaim all
              warranties, including the implied warranties of merchantability, fitness for a particular purpose,
              non-infringement, and any warranty arising from a course of dealing or trade usage.
            </strong>
          </p>
          <p>
            Voice agents built using the Services rely on machine-learning models, and their outputs may contain errors
            or be unsuitable for a particular use case. You are responsible for evaluating whether the Services meet
            your needs and for monitoring your agents&apos; behavior in production.
          </p>

          <h2>15. Limitation of liability</h2>
          <p>
            <strong>
              To the fullest extent permitted by law, neither party will be liable for any indirect, incidental,
              special, consequential, exemplary, or punitive damages, or for any loss of profits, revenue, data, or
              business opportunities, arising out of or related to these Terms or the Services, even if advised of the
              possibility of such damages.
            </strong>
          </p>
          <p>
            <strong>
              Our aggregate liability for all claims arising out of or related to these Terms or the Services in any
              twelve-month period will not exceed the greater of (a) the fees you paid us in the twelve months
              preceding the event giving rise to the claim, or (b) one hundred U.S. dollars (USD 100).
            </strong>
          </p>

          <h2>16. Indemnification</h2>
          <p>
            You will defend, indemnify, and hold harmless Speechify and its affiliates, officers, directors, employees,
            and agents from and against any third-party claims, damages, liabilities, costs, and expenses (including
            reasonable attorneys&apos; fees) arising out of or related to (a) your Customer Content, (b) your use of the
            Services in violation of these Terms or applicable law, or (c) your end-users&apos; interactions with the
            agents you deploy using the Services.
          </p>

          <h2>17. Dispute resolution and arbitration</h2>
          <p>
            <strong>
              Please read this section carefully. It affects your legal rights, including your right to file a lawsuit
              in court.
            </strong>
          </p>
          <p>
            <strong>Informal resolution.</strong> Before filing any claim, you agree to first contact us at{' '}
            <a href="mailto:legal@simbavoice.ai">legal@simbavoice.ai</a> and to attempt in good faith to resolve the
            dispute informally for at least 60 days.
          </p>
          <p>
            <strong>Binding arbitration.</strong> Except for claims that may be brought in small-claims court and
            disputes about intellectual property, all disputes arising out of or related to these Terms or the Services
            will be resolved exclusively through final, binding arbitration administered by JAMS in accordance with its
            then-current rules. Arbitration will take place in Miami, Florida, or by video conference at the
            arbitrator&apos;s discretion.
          </p>
          <p>
            <strong>Class-action waiver.</strong> You and Speechify agree that each may bring claims against the other
            only in your or its individual capacity, and not as a plaintiff or class member in any purported class or
            representative proceeding. The arbitrator may not consolidate or join more than one person&apos;s claims.
          </p>
          <p>
            <strong>Opt-out.</strong> You may opt out of this arbitration agreement by sending written notice to{' '}
            <a href="mailto:legal@simbavoice.ai">legal@simbavoice.ai</a> within 30 days of first agreeing to these
            Terms. The notice must include your name, the email address associated with your account, and a clear
            statement that you wish to opt out.
          </p>

          <h2>18. Governing law and venue</h2>
          <p>
            These Terms are governed by the laws of the State of Florida, without regard to conflict-of-laws principles.
            Subject to Section 17, any dispute that is not subject to arbitration will be resolved exclusively in the
            state or federal courts located in Miami-Dade County, Florida, and you consent to personal jurisdiction
            there.
          </p>

          <h2>19. Export controls and sanctions</h2>
          <p>
            You agree to comply with all applicable export-control and economic-sanctions laws, including those of the
            United States. You represent that you are not located in, and will not provide the Services to anyone in, a
            country subject to U.S. embargo, and that you are not on any U.S. government list of restricted parties.
          </p>

          <h2>20. Changes to these Terms</h2>
          <p>
            We may update these Terms from time to time. If we make a material change, we will notify you by email or
            through the Services and update the &quot;Last updated&quot; date at the top of this page. Your continued
            use of the Services after the change takes effect constitutes acceptance of the updated Terms.
          </p>

          <h2>21. Miscellaneous</h2>
          <p>
            These Terms (together with the Privacy Policy and any order form or addendum) constitute the entire
            agreement between you and Speechify regarding the Services. If any provision of these Terms is held
            unenforceable, the remaining provisions will remain in full force. Our failure to enforce any provision is
            not a waiver of that provision. You may not assign these Terms without our prior written consent; we may
            assign them in connection with a corporate transaction.
          </p>

          <h2>22. Contact us</h2>
          <p>
            Questions about these Terms? Email{' '}
            <a href="mailto:legal@simbavoice.ai">legal@simbavoice.ai</a>.
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
