import React from "react";

/**
 * The Canadian courier and last-mile delivery agreement.
 *
 * Its own component rather than the shared terms page: this is a different
 * document, not a translation. It has its own sections, definitions and
 * schedules, and it covers Customers and Merchants in one agreement where
 * Nigeria uses two separate pages. The shared component swaps a handful of
 * jurisdiction phrases, which was the right tool only while this was pending.
 *
 * Clause 20.3 requires the version and effective date to be identified on the
 * Platform, which is why the hero carries them.
 */

const VERSION = "Version 1.0";
const EFFECTIVE = "September 26, 2026";

const Section = ({
  number,
  title,
  children,
}: {
  number: string;
  title: string;
  children: React.ReactNode;
}) => (
  <section className="border-b border-gray-200 pb-6 mb-6">
    <h2 className="text-xl font-bold text-gray-900 mb-4">
      <span className="text-[var(--color-blue-primary)]">{number}.</span> {title}
    </h2>
    <div className="space-y-3 text-gray-700 leading-relaxed">{children}</div>
  </section>
);

const Clause = ({ id, children }: { id: string; children: React.ReactNode }) => (
  <p>
    <strong className="text-gray-900">{id}</strong> {children}
  </p>
);

const Bullets = ({ items }: { items: string[] }) => (
  <ul className="list-disc ml-6 space-y-1">
    {items.map((item) => (
      <li key={item}>{item}</li>
    ))}
  </ul>
);

const Define = ({
  term,
  children,
}: {
  term: string;
  children: React.ReactNode;
}) => (
  <p>
    <strong className="text-gray-900">&ldquo;{term}&rdquo;</strong> {children}
  </p>
);

const SCHEDULE_A: [string, string][] = [
  ["Service", "Courier, logistics and last-mile delivery"],
  ["Service Area", "Canada, subject to availability"],
  [
    "Delivery Types",
    "Same-day, scheduled, e-commerce, B2B, B2C and other services offered by Vinkol",
  ],
  ["Booking", "Through the Vinkol Platform or approved commercial channel"],
  ["Delivery Confirmation", "Platform confirmation and/or Courier acceptance"],
  ["Delivery Fee", "Calculated based on applicable Vinkol pricing"],
  ["Payment", "At booking or under approved commercial payment terms"],
  ["Taxes", "Applicable taxes, including HST where applicable"],
  ["Cancellation", "Subject to applicable cancellation terms"],
  [
    "Failed Delivery",
    "Additional charges may apply where attributable to Customer/Merchant",
  ],
  [
    "Claims",
    "Generally within 72 hours of Delivery unless otherwise required by law or agreed",
  ],
  [
    "Proof of Delivery",
    "May include photo, signature, GPS/location, timestamp or electronic confirmation",
  ],
  ["Currency", "Canadian Dollars (CA$)"],
];

const SCHEDULE_B = [
  "Illegal drugs or controlled substances.",
  "Firearms, ammunition or prohibited weapons.",
  "Explosives and explosive materials.",
  "Hazardous or dangerous goods that are not properly declared, packaged and authorized.",
  "Stolen or counterfeit goods.",
  "Goods intended to facilitate illegal activity.",
  "Biological or hazardous materials.",
  "Live animals unless expressly approved.",
  "Cash or negotiable instruments unless expressly approved.",
  "Prescription medication or regulated pharmaceuticals where required authorization is absent.",
  "Cannabis, alcohol, tobacco and vaping products except where expressly enabled and legally permitted.",
  "Any product prohibited from transportation under applicable Canadian, provincial or municipal law.",
  "Any item that presents an unreasonable risk to the Courier, recipient, public, vehicle or property.",
  "Any other category designated as prohibited by Vinkol from time to time.",
];

const SCHEDULE_C = [
  "accurate customer and delivery information;",
  "accurate order information;",
  "proper product packaging;",
  "appropriate product labelling;",
  "ensuring products are legal to sell and transport;",
  "ensuring products comply with applicable consumer protection laws;",
  "making products available for pickup within the agreed timeframe;",
  "communicating special delivery requirements;",
  "addressing customer disputes relating to the underlying sale;",
  "maintaining appropriate product and commercial insurance; and",
  "paying applicable Vinkol service fees and taxes.",
];

export const CanadaTermsPage = () => (
  <main className="min-h-screen bg-[#F7F8FA]">
    <section className="bg-white border-b border-gray-100">
      <div className="max-w-4xl mx-auto px-6 md:px-20 py-14">
        <p className="text-xs font-semibold tracking-[0.2em] uppercase text-[var(--color-blue-primary)] mb-3">
          Legal
        </p>
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 tracking-tight leading-tight mb-3">
          Courier &amp; Last-Mile Delivery Services Agreement (Canada)
        </h1>
        <p className="text-gray-600 text-sm">Vinkol Group Inc.</p>
        <p className="text-gray-500 text-sm mt-1">
          {VERSION} &middot; Effective {EFFECTIVE}
        </p>
      </div>
    </section>

    <div className="max-w-4xl mx-auto px-6 md:px-20 py-12">
      <div className="bg-white rounded-2xl border border-gray-100 p-8 md:p-12">
        <p className="text-gray-700 leading-relaxed mb-8">
          This Canadian version applies to customers and business users
          registered in Canada. It is governed by the laws of the Province of
          Ontario and the federal laws of Canada applicable therein.
        </p>

        <Section number="1" title="Parties and Interpretation">
          <p>This Agreement is made between:</p>
          <p>
            <strong className="text-gray-900">Vinkol Group Inc.</strong>, a
            company incorporated in Canada, operating its courier, logistics,
            delivery and technology services under the Vinkol Logistics brand
            (&ldquo;Vinkol&rdquo;, &ldquo;we&rdquo;, &ldquo;us&rdquo;,
            &ldquo;our&rdquo;); and
          </p>
          <p>
            the individual, business, merchant, e-commerce store, organization
            or other entity that registers for or uses the Vinkol Platform and
            accepts this Agreement (&ldquo;Customer&rdquo;, &ldquo;you&rdquo;,
            &ldquo;your&rdquo;).
          </p>
          <p>For purposes of this Agreement:</p>
          <Define term="Delivery">
            means the transportation and delivery of Goods from a Pickup
            Location to a Delivery Location through the Vinkol Platform.
          </Define>
          <Define term="Goods">
            means items, products, packages, documents, groceries or other
            permitted items submitted for delivery.
          </Define>
          <Define term="Merchant">
            means a business, e-commerce store, retailer or other commercial
            customer using Vinkol to arrange deliveries to its customers.
          </Define>
          <Define term="Customer">
            means an individual or business using Vinkol to arrange a delivery,
            whether for personal or commercial purposes.
          </Define>
          <Define term="Courier">
            or &ldquo;Rider&rdquo; means an independent delivery person,
            courier, driver or other delivery service provider assigned to
            perform a Delivery.
          </Define>
          <Define term="Pickup Location">
            means the location from which the Goods are collected.
          </Define>
          <Define term="Delivery Location">
            means the address or designated location where the Goods are to be
            delivered.
          </Define>
          <Define term="Order">
            means a request submitted through the Vinkol Platform for the
            purchase, pickup, transportation or delivery of Goods or related
            services.
          </Define>
          <Define term="Delivery Fee">
            means the applicable fee charged for a Delivery, as displayed or
            otherwise communicated through the Platform.
          </Define>
          <Define term="Platform">
            means Vinkol&rsquo;s website, mobile application, software,
            technology infrastructure and related services.
          </Define>
          <Define term="Proof of Delivery">
            means information or evidence confirming the completion or attempted
            completion of a Delivery, which may include a recipient
            confirmation, electronic signature, photograph, GPS/location data,
            timestamp or other delivery record.
          </Define>
          <Define term="Business Day">
            means a day other than a Saturday, Sunday or statutory holiday in
            Ontario.
          </Define>
          <p>
            Headings are for convenience only. &ldquo;Including&rdquo; means
            &ldquo;including without limitation.&rdquo;
          </p>
        </Section>

        <Section number="2" title="The Vinkol Service">
          <Clause id="2.1">
            Vinkol provides technology-enabled courier, logistics and last-mile
            delivery services connecting customers, e-commerce businesses,
            merchants and other businesses with available delivery resources.
          </Clause>
          <Clause id="2.2">
            Depending on the service selected, Vinkol may facilitate:
          </Clause>
          <Bullets
            items={[
              "pickup and delivery of Goods;",
              "same-day or scheduled deliveries;",
              "e-commerce order fulfilment and last-mile delivery;",
              "grocery and retail deliveries;",
              "business-to-business deliveries;",
              "business-to-consumer deliveries;",
              "customer-to-customer deliveries;",
              "document and package delivery; and",
              "other logistics services made available through the Platform.",
            ]}
          />
          <Clause id="2.3">
            Vinkol may use employees, independent contractors, couriers, riders,
            drivers, logistics partners or other service providers to perform or
            facilitate Deliveries.
          </Clause>
          <Clause id="2.4">
            A Delivery request is not confirmed until Vinkol or an available
            Courier accepts the request through the Platform or otherwise
            confirms the Delivery.
          </Clause>
          <Clause id="2.5">
            Vinkol does not guarantee that a Courier will always be available,
            that a Delivery will be accepted, or that a Delivery can be
            completed within a particular timeframe where circumstances outside
            Vinkol&rsquo;s reasonable control affect the service.
          </Clause>
          <Clause id="2.6">
            Estimated pickup and delivery times are estimates only unless Vinkol
            expressly identifies a service as carrying a guaranteed delivery
            commitment.
          </Clause>
        </Section>

        <Section number="3" title="Customer and Merchant Responsibilities">
          <Clause id="3.1">
            You are responsible for providing complete and accurate information
            required to perform the Delivery, including, where applicable:
          </Clause>
          <Bullets
            items={[
              "pickup address;",
              "delivery address;",
              "recipient name;",
              "recipient contact information;",
              "package description;",
              "package quantity;",
              "package dimensions and weight;",
              "special handling instructions; and",
              "any information reasonably required for safe and lawful transportation.",
            ]}
          />
          <Clause id="3.2">
            Merchants are responsible for ensuring that Goods are properly
            packaged, labelled and ready for collection before the Courier
            arrives.
          </Clause>
          <Clause id="3.3">
            You must ensure that the Goods presented for Delivery:
          </Clause>
          <Bullets
            items={[
              "are legally permitted to be transported;",
              "are accurately described;",
              "are properly packaged;",
              "are reasonably protected against damage during ordinary transportation; and",
              "do not contain prohibited or restricted items unless Vinkol has expressly agreed in writing to transport them.",
            ]}
          />
          <Clause id="3.4">
            You must not knowingly provide inaccurate information concerning the
            contents, value, weight, dimensions or destination of Goods.
          </Clause>
          <Clause id="3.5">
            Where a Delivery requires age verification, identification,
            signature, payment collection or another special condition, you must
            clearly communicate that requirement through the Platform or before
            the Delivery is accepted.
          </Clause>
        </Section>

        <Section number="4" title="Prohibited and Restricted Goods">
          <Clause id="4.1">
            Unless expressly authorized by Vinkol in writing and transported in
            accordance with all applicable laws and regulations, the following
            Goods are prohibited:
          </Clause>
          <Bullets
            items={[
              "illegal drugs or controlled substances;",
              "firearms, ammunition and prohibited weapons;",
              "explosives or explosive materials;",
              "hazardous or dangerous substances;",
              "stolen or counterfeit goods;",
              "unlawfully obtained goods;",
              "goods intended to facilitate criminal activity;",
              "biological or hazardous materials;",
              "improperly packaged dangerous goods;",
              "items that pose an unreasonable risk to a person, vehicle or property;",
              "obscene or unlawful material;",
              "live animals, except where specifically approved;",
              "cash or negotiable instruments, except where expressly permitted;",
              "prescription medications or other regulated products where required authorization is absent; and",
              "any other goods prohibited by applicable law or Vinkol's policies.",
            ]}
          />
          <Clause id="4.2">
            Alcohol, cannabis, tobacco, vaping products, pharmaceuticals and
            other regulated products may only be transported where permitted by
            applicable federal, provincial and municipal laws and where Vinkol
            has expressly enabled the applicable service.
          </Clause>
          <Clause id="4.3">
            Vinkol may refuse, cancel, intercept or return any Delivery where it
            reasonably believes that the Goods are prohibited, unsafe,
            improperly packaged, unlawfully transported or otherwise
            inconsistent with this Agreement.
          </Clause>
          <Clause id="4.4">
            You remain responsible for the legal status and accuracy of the
            Goods you submit for Delivery.
          </Clause>
        </Section>

        <Section number="5" title="Pickup and Delivery">
          <Clause id="5.1">
            The Customer must ensure that Goods are available at the Pickup
            Location at the scheduled or estimated pickup time.
          </Clause>
          <Clause id="5.2">A Courier may refuse to collect Goods where:</Clause>
          <Bullets
            items={[
              "the Goods do not correspond with the Order;",
              "the Goods are improperly packaged;",
              "the Goods appear unsafe or prohibited;",
              "the package materially exceeds the declared dimensions or weight;",
              "required information is missing; or",
              "the Courier reasonably believes that accepting the Goods would create a safety, legal or operational risk.",
            ]}
          />
          <Clause id="5.3">
            At delivery, the Courier may request reasonable confirmation from
            the recipient, including a name, signature, electronic confirmation,
            identification or other verification where applicable.
          </Clause>
          <Clause id="5.4">
            Where the recipient is unavailable, Vinkol or the Courier may
            attempt to contact the recipient using the information provided.
          </Clause>
          <Clause id="5.5">
            Where delivery cannot reasonably be completed, Vinkol may:
          </Clause>
          <Bullets
            items={[
              "make a reasonable additional delivery attempt;",
              "return the Goods to the Pickup Location;",
              "deliver the Goods to an approved alternative location;",
              "hold the Goods temporarily; or",
              "take another reasonable action based on the circumstances.",
            ]}
          />
          <Clause id="5.6">
            Additional charges may apply where a Delivery cannot be completed
            because of inaccurate information, recipient unavailability,
            excessive waiting time, incorrect packaging or circumstances
            attributable to the Customer or Merchant.
          </Clause>
        </Section>

        <Section number="6" title="Delivery Fees and Payment">
          <Clause id="6.1">
            Delivery pricing is determined based on factors that may include:
          </Clause>
          <Bullets
            items={[
              "distance;",
              "location;",
              "package size and weight;",
              "delivery type;",
              "timing;",
              "availability of delivery resources;",
              "waiting time;",
              "number of packages;",
              "special handling requirements; and",
              "other applicable service charges.",
            ]}
          />
          <Clause id="6.2">
            The applicable Delivery Fee will generally be displayed before an
            Order is confirmed.
          </Clause>
          <Clause id="6.3">
            Payment may be collected through the Platform, by an approved
            payment method, through a Merchant account or under separately
            agreed commercial payment terms.
          </Clause>
          <Clause id="6.4">
            You authorize Vinkol and its payment service providers to charge the
            applicable fees to the payment method associated with your account.
          </Clause>
          <Clause id="6.5">
            All applicable taxes, including HST and other legally applicable
            charges, are payable in addition to the applicable service fees
            unless expressly stated otherwise.
          </Clause>
          <Clause id="6.6">
            Business accounts may be subject to invoicing and payment terms
            established by Vinkol.
          </Clause>
          <Clause id="6.7">
            Vinkol may suspend or restrict services where amounts owing remain
            unpaid after the applicable payment deadline.
          </Clause>
        </Section>

        <Section
          number="7"
          title="Cancellations, Failed Deliveries and Refunds"
        >
          <Clause id="7.1">
            You may cancel an Order before a Courier has commenced the
            applicable Delivery, subject to any cancellation fee disclosed at
            the time of booking.
          </Clause>
          <Clause id="7.2">
            Once a Courier has accepted or commenced a Delivery, cancellation
            fees may apply.
          </Clause>
          <Clause id="7.3">
            Where Vinkol is unable to complete a Delivery because of
            circumstances attributable to Vinkol, Vinkol may refund all or part
            of the applicable Delivery Fee, depending on the circumstances.
          </Clause>
          <Clause id="7.4">
            No refund is automatically payable where a Delivery fails because
            of:
          </Clause>
          <Bullets
            items={[
              "an incorrect or incomplete address;",
              "recipient unavailability;",
              "refusal by the recipient;",
              "inaccurate information provided by the Customer;",
              "prohibited Goods;",
              "inadequate packaging;",
              "failure to provide required access;",
              "unreasonable waiting time;",
              "failure to comply with delivery instructions; or",
              "another circumstance attributable to the Customer or Merchant.",
            ]}
          />
          <Clause id="7.5">
            Claims concerning missing, damaged or incorrectly delivered Goods
            should be submitted through the Platform or to Vinkol within 72
            hours of the applicable Delivery, unless a different period is
            required by law or agreed in writing.
          </Clause>
          <Clause id="7.6">
            Vinkol may require reasonable supporting information, including
            photographs, invoices, proof of value, order information and other
            documentation, to investigate a claim.
          </Clause>
        </Section>

        <Section number="8" title="Goods, Loss and Damage">
          <Clause id="8.1">
            Vinkol will use commercially reasonable measures to facilitate the
            safe transportation of Goods.
          </Clause>
          <Clause id="8.2">
            The Customer acknowledges that ordinary transportation may involve
            risks including delay, accidental damage, loss, theft or
            unsuccessful delivery.
          </Clause>
          <Clause id="8.3">
            Where Goods are lost or damaged while under Vinkol&rsquo;s control,
            Vinkol&rsquo;s responsibility will be determined in accordance with
            applicable law and any applicable service terms, declared-value
            coverage or commercial agreement.
          </Clause>
          <Clause id="8.4">
            Unless expressly agreed otherwise, Vinkol is not responsible for:
          </Clause>
          <Bullets
            items={[
              "inherent defects in Goods;",
              "inadequate or defective packaging;",
              "damage caused by the nature of the Goods;",
              "inaccurate declarations;",
              "prohibited Goods;",
              "consequential or indirect losses; or",
              "loss of business, revenue or profits resulting from a Delivery delay or failure.",
            ]}
          />
          <Clause id="8.5">
            Merchants are responsible for maintaining appropriate insurance for
            their Goods, inventory, products and business operations where
            appropriate.
          </Clause>
        </Section>

        <Section number="9" title="Proof of Delivery">
          <Clause id="9.1">
            Vinkol may collect and maintain Proof of Delivery information for
            the purpose of confirming service completion, resolving disputes,
            improving operations and protecting customers, merchants and
            delivery personnel.
          </Clause>
          <Clause id="9.2">Proof of Delivery may include:</Clause>
          <Bullets
            items={[
              "recipient confirmation;",
              "electronic signature;",
              "photograph of the delivered package;",
              "delivery timestamp;",
              "GPS or location information;",
              "Courier identification;",
              "delivery notes; or",
              "other operational records.",
            ]}
          />
          <Clause id="9.3">
            Where a delivery photograph is taken, it should generally focus on
            the Goods and delivery location rather than individuals.
          </Clause>
          <Clause id="9.4">
            You may not misuse, reproduce, publish or distribute Proof of
            Delivery information for purposes unrelated to the applicable
            Delivery, except where permitted by law or authorized by Vinkol.
          </Clause>
        </Section>

        <Section number="10" title="Customer and Merchant Accounts">
          <Clause id="10.1">
            You are responsible for maintaining accurate account information.
          </Clause>
          <Clause id="10.2">
            You must keep your login credentials secure and must promptly notify
            Vinkol if you believe your account has been compromised.
          </Clause>
          <Clause id="10.3">You must not:</Clause>
          <Bullets
            items={[
              "create an account using false information;",
              "impersonate another person or business;",
              "use another person's account without authorization;",
              "maintain multiple accounts for the purpose of circumventing Platform restrictions;",
              "manipulate delivery records;",
              "interfere with the Platform;",
              "attempt to access another user's information;",
              "scrape or extract Platform data without authorization; or",
              "use the Platform for unlawful purposes.",
            ]}
          />
          <Clause id="10.4">
            Vinkol may suspend or restrict an account where it reasonably
            suspects fraud, abuse, unauthorized access, unlawful activity or a
            material breach of this Agreement.
          </Clause>
        </Section>

        <Section number="11" title="E-Commerce and Merchant Services">
          <Clause id="11.1">
            Merchants may integrate their e-commerce operations with Vinkol for
            the purpose of fulfilling customer orders.
          </Clause>
          <Clause id="11.2">Merchants remain responsible for:</Clause>
          <Bullets
            items={[
              "accepting and processing their customer orders;",
              "product availability;",
              "product pricing;",
              "product descriptions;",
              "taxes applicable to the sale of their products;",
              "customer refunds relating to the underlying purchase;",
              "product warranties;",
              "compliance with applicable consumer protection laws; and",
              "ensuring that Goods are legally permitted to be sold and delivered.",
            ]}
          />
          <Clause id="11.3">
            Vinkol&rsquo;s responsibility is generally limited to the logistics
            and delivery services expressly accepted by Vinkol.
          </Clause>
          <Clause id="11.4">
            Vinkol is not the seller of Goods supplied by an independent
            Merchant unless expressly identified as the seller in the applicable
            transaction.
          </Clause>
          <Clause id="11.5">
            A Merchant may be required to provide Vinkol with information
            necessary to fulfil an Order, including the customer&rsquo;s name,
            delivery address, telephone number, order number and delivery
            instructions.
          </Clause>
        </Section>

        <Section number="12" title="Personal Information and Privacy">
          <Clause id="12.1">
            Each party will comply with applicable Canadian privacy and data
            protection legislation, including the Personal Information
            Protection and Electronic Documents Act (PIPEDA) where applicable
            and applicable provincial privacy legislation.
          </Clause>
          <Clause id="12.2">
            Vinkol may collect, use and disclose information reasonably required
            to:
          </Clause>
          <Bullets
            items={[
              "create and administer accounts;",
              "process Orders;",
              "facilitate Deliveries;",
              "communicate with Customers, Merchants and Couriers;",
              "process payments;",
              "provide customer support;",
              "investigate disputes;",
              "prevent fraud and abuse;",
              "improve Platform performance;",
              "comply with legal obligations; and",
              "protect the safety and security of the Vinkol network.",
            ]}
          />
          <Clause id="12.3">
            Merchants are responsible for ensuring that they have an appropriate
            legal basis and any required consent or authorization to provide
            customer information to Vinkol for delivery purposes.
          </Clause>
          <Clause id="12.4">
            Customers and Merchants must only use recipient information obtained
            through Vinkol for legitimate purposes connected with the applicable
            transaction or as otherwise permitted by law.
          </Clause>
        </Section>

        <Section number="13" title="Intellectual Property">
          <Clause id="13.1">
            Vinkol retains all rights, title and interest in its Platform,
            software, technology, trademarks, branding, systems and proprietary
            materials.
          </Clause>
          <Clause id="13.2">
            You retain ownership of your business information, product
            information, content and materials submitted to Vinkol.
          </Clause>
          <Clause id="13.3">
            By using the Platform, you grant Vinkol a non-exclusive, limited
            licence to use information and materials submitted by you to the
            extent reasonably necessary to provide, operate, improve and support
            the Services.
          </Clause>
          <Clause id="13.4">
            You may not copy, reverse engineer, reproduce, modify, distribute or
            commercially exploit Vinkol&rsquo;s Platform, technology, trademarks
            or proprietary systems without Vinkol&rsquo;s written authorization.
          </Clause>
        </Section>

        <Section number="14" title="Advertising, Branding and Marketing">
          <Clause id="14.1">
            Vinkol may display its branding on vehicles, delivery equipment,
            applications, communications and other operational materials.
          </Clause>
          <Clause id="14.2">
            Merchants may not represent that they are owned, operated or
            endorsed by Vinkol unless expressly authorized.
          </Clause>
          <Clause id="14.3">
            Vinkol may identify participating Merchants or businesses as
            customers or delivery partners in marketing materials only where
            permitted by applicable law and any applicable commercial agreement.
          </Clause>
          <Clause id="14.4">
            Neither party may use the other&rsquo;s trademarks, logos or
            branding without appropriate authorization.
          </Clause>
        </Section>

        <Section number="15" title="Service Standards and Force Majeure">
          <Clause id="15.1">
            Vinkol will use commercially reasonable efforts to provide the
            Services.
          </Clause>
          <Clause id="15.2">
            Vinkol does not guarantee uninterrupted or error-free Platform
            availability or that every Delivery request will be accepted.
          </Clause>
          <Clause id="15.3">
            Vinkol will not be responsible for delays or failures caused by
            circumstances beyond its reasonable control, including:
          </Clause>
          <Bullets
            items={[
              "severe weather;",
              "traffic incidents;",
              "road closures;",
              "natural disasters;",
              "labour disruptions;",
              "government restrictions;",
              "public emergencies;",
              "telecommunications or internet failures;",
              "payment network failures;",
              "cyber incidents;",
              "shortages of delivery resources; or",
              "other circumstances beyond Vinkol's reasonable control.",
            ]}
          />
        </Section>

        <Section number="16" title="Warranties and Liability">
          <Clause id="16.1">
            The Platform and Services are provided on an &ldquo;as
            available&rdquo; basis, subject to the express commitments contained
            in this Agreement and applicable law.
          </Clause>
          <Clause id="16.2">Vinkol does not warrant:</Clause>
          <Bullets
            items={[
              "uninterrupted Platform availability;",
              "a particular Courier being available;",
              "a particular delivery time unless expressly guaranteed;",
              "that every Delivery request will be accepted;",
              "that Goods will be delivered without delay; or",
              "any particular commercial result from using Vinkol's Services.",
            ]}
          />
          <Clause id="16.3">
            Nothing in this Agreement excludes or limits liability that cannot
            legally be excluded or limited, including liability for death or
            personal injury caused by negligence, fraud or other liability that
            cannot lawfully be restricted.
          </Clause>
          <Clause id="16.4">
            To the maximum extent permitted by law, neither party will be liable
            to the other for indirect, incidental, special or consequential
            losses, including loss of profits, revenue, business opportunities
            or goodwill.
          </Clause>
          <Clause id="16.5">
            Subject to applicable law, Vinkol&rsquo;s aggregate liability
            arising from a particular Delivery will not exceed the amount paid
            to Vinkol for that Delivery, except where a different liability
            limit is expressly established under a separate written commercial
            agreement.
          </Clause>
        </Section>

        <Section number="17" title="Indemnification">
          <Clause id="17.1">
            You agree to indemnify and hold harmless Vinkol, its affiliates,
            directors, officers, employees, contractors and service providers
            from claims, losses, damages, liabilities and reasonable costs
            arising from:
          </Clause>
          <Bullets
            items={[
              "your breach of this Agreement;",
              "your unlawful use of the Platform;",
              "prohibited or improperly declared Goods;",
              "inadequate packaging;",
              "infringement of third-party intellectual property rights;",
              "inaccurate information supplied by you;",
              "your products or Goods;",
              "your violation of applicable law; or",
              "claims arising from your relationship with your customers or recipients.",
            ]}
          />
          <Clause id="17.2">
            This clause does not apply to the extent that the relevant loss was
            caused by Vinkol&rsquo;s own negligence, wilful misconduct or other
            conduct for which Vinkol cannot lawfully require indemnification.
          </Clause>
        </Section>

        <Section number="18" title="Confidentiality">
          <Clause id="18.1">
            Each party will protect the other&rsquo;s confidential and
            non-public business information and use it only for purposes
            connected with this Agreement.
          </Clause>
          <Clause id="18.2">
            Confidential information does not include information that:
          </Clause>
          <Bullets
            items={[
              "is publicly available without breach of this Agreement;",
              "was lawfully known before disclosure;",
              "is independently developed; or",
              "must be disclosed by law or lawful governmental authority.",
            ]}
          />
        </Section>

        <Section number="19" title="Term, Suspension and Termination">
          <Clause id="19.1">
            This Agreement begins when you create an account, accept this
            Agreement or otherwise use the Vinkol Platform and continues until
            terminated.
          </Clause>
          <Clause id="19.2">
            You may close your account at any time, subject to outstanding
            Orders, payments and obligations.
          </Clause>
          <Clause id="19.3">
            Vinkol may suspend or terminate an account where:
          </Clause>
          <Bullets
            items={[
              "you materially breach this Agreement;",
              "you engage in fraud or unlawful conduct;",
              "you submit prohibited Goods;",
              "you repeatedly fail to pay amounts owing;",
              "your account creates a safety or security risk;",
              "you misuse the Platform; or",
              "termination is otherwise permitted by applicable law.",
            ]}
          />
          <Clause id="19.4">
            Where reasonably practicable, Vinkol may provide notice and an
            opportunity to remedy a breach before termination.
          </Clause>
          <Clause id="19.5">
            Vinkol may suspend an account immediately where reasonably necessary
            to protect Customers, Merchants, Couriers, the public, the Platform
            or Vinkol&rsquo;s business.
          </Clause>
          <Clause id="19.6">
            Clauses relating to payment obligations, prohibited Goods, privacy,
            intellectual property, confidentiality, liability, indemnification
            and other provisions intended by their nature to survive termination
            will continue after termination.
          </Clause>
        </Section>

        <Section number="20" title="Changes to this Agreement">
          <Clause id="20.1">
            Vinkol may update this Agreement from time to time to reflect
            changes to its Services, technology, business operations, legal
            requirements or regulatory obligations.
          </Clause>
          <Clause id="20.2">
            Where required by law, Vinkol will provide reasonable notice of
            material changes.
          </Clause>
          <Clause id="20.3">
            The applicable version number and effective date will be identified
            on the Platform.
          </Clause>
          <Clause id="20.4">
            Continued use of the Platform after the effective date of an updated
            Agreement constitutes acceptance of the updated Agreement where
            permitted by applicable law.
          </Clause>
        </Section>

        <Section number="21" title="Governing Law and General Terms">
          <Clause id="21.1">
            This Agreement is governed by the laws of the Province of Ontario
            and the federal laws of Canada applicable therein.
          </Clause>
          <Clause id="21.2">
            The parties submit to the applicable courts of Ontario for disputes
            arising from this Agreement, subject to any mandatory rights or
            jurisdiction provided by applicable law.
          </Clause>
          <Clause id="21.3">
            You may not assign this Agreement without Vinkol&rsquo;s prior
            written consent, except where permitted by law.
          </Clause>
          <Clause id="21.4">
            Vinkol may assign this Agreement to an affiliate, successor or
            purchaser of all or substantially all of its business or assets.
          </Clause>
          <Clause id="21.5">
            This Agreement, together with any applicable service terms, pricing
            terms, privacy policy and commercial agreements, constitutes the
            agreement between the parties concerning the Vinkol Services.
          </Clause>
          <Clause id="21.6">
            If any provision is found to be invalid or unenforceable, the
            remaining provisions will continue in effect.
          </Clause>
          <Clause id="21.7">
            A failure to enforce any provision of this Agreement does not
            constitute a waiver of that provision.
          </Clause>
          <Clause id="21.8">
            No person other than the parties to this Agreement and their
            permitted successors and assigns may enforce its terms, except where
            applicable law provides otherwise.
          </Clause>
        </Section>

        <Section number="A" title="Schedule A — Service and Delivery Terms">
          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-2 pr-6 font-semibold text-gray-900">
                    Item
                  </th>
                  <th className="text-left py-2 font-semibold text-gray-900">
                    Terms
                  </th>
                </tr>
              </thead>
              <tbody>
                {SCHEDULE_A.map(([item, terms]) => (
                  <tr key={item} className="border-b border-gray-100 align-top">
                    <td className="py-2 pr-6 font-medium text-gray-900 whitespace-nowrap">
                      {item}
                    </td>
                    <td className="py-2">{terms}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Section>

        <Section
          number="B"
          title="Schedule B — Prohibited and Restricted Goods"
        >
          <p>
            The following Goods may not be submitted for delivery unless
            expressly approved by Vinkol and permitted by applicable law:
          </p>
          <ol className="list-decimal ml-6 space-y-1">
            {SCHEDULE_B.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ol>
        </Section>

        <Section
          number="C"
          title="Schedule C — Merchant and E-Commerce Delivery Responsibilities"
        >
          <p>
            Merchants using Vinkol for e-commerce fulfilment are responsible
            for:
          </p>
          <Bullets items={SCHEDULE_C} />
          <p>
            Vinkol is responsible for the logistics services expressly accepted
            by Vinkol and does not assume responsibility for the
            Merchant&rsquo;s underlying sale of Goods.
          </p>
        </Section>

        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-4">
            Customer Acceptance
          </h2>
          <div className="space-y-3 text-gray-700 leading-relaxed">
            <p>
              By creating a Vinkol account, placing an Order, requesting a
              Delivery, registering as a Merchant, or otherwise using the Vinkol
              Platform, you acknowledge that:
            </p>
            <p className="border-l-2 border-[var(--color-blue-primary)] pl-4 italic">
              I have read, understood and agree to the Vinkol Logistics Courier
              &amp; Last-Mile Delivery Services Agreement (Canada), {VERSION},
              effective {EFFECTIVE}.
            </p>
            <div className="pt-4 text-sm text-gray-600">
              <p className="font-semibold text-gray-900">Vinkol Group Inc.</p>
              <p>Operating as Vinkol Logistics</p>
              <p>Canada</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  </main>
);
