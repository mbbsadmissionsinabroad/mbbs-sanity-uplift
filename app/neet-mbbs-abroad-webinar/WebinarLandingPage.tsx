"use client";

import { useEffect, useState } from "react";

import styles from "./webinar.module.css";

type ContactOption = {
  displayNumber: string;
  dialNumber: string;
  whatsappHref: string;
};

const contactOptions: ContactOption[] = [
  {
    displayNumber: "+91 88490 872",
    dialNumber: "+9188490872",
    whatsappHref:
      "https://wa.me/9188490872?text=Hi%20New-Lyf%20Overseas%2C%20I%20want%20to%20register%20for%20the%20MBBS%20abroad%20webinar%20on%207th%20June%20at%207%20PM.",
  },
  {
    displayNumber: "+9343 20953",
    dialNumber: "+934320953",
    whatsappHref:
      "https://wa.me/934320953?text=Hi%20New-Lyf%20Overseas%2C%20I%20want%20to%20register%20for%20the%20MBBS%20abroad%20webinar%20on%207th%20June%20at%207%20PM.",
  },
];

const timingCards = [
  {
    month: "June",
    title: "Students are waiting on the re-exam",
    copy:
      "Every week spent waiting reduces your document preparation runway for the August intake.",
  },
  {
    month: "July",
    title: "Processing pressure starts building",
    copy:
      "Shortlisting, university paperwork, financial planning, and visa prep cannot be compressed overnight.",
  },
  {
    month: "August",
    title: "Seats move fast once the rush begins",
    copy:
      "When re-exam results arrive, thousands of families start competing for the same limited MBBS abroad seats.",
  },
];

const urgencyPoints = [
  "The August intake is moving fast: top universities do not wait for late planners.",
  "The 45-day paperwork trap is real: documents, university processing, and visa steps need time.",
  "Your current NEET qualification may already be enough to start planning today.",
];

const speakerCards = [
  {
    name: "Doctor Vinith",
    role: "Medical expert",
    description:
      "Shares realistic guidance on studying medicine abroad, long-term practice pathways, and how students should think beyond panic-driven decisions.",
  },
  {
    name: "Mr. Avinash",
    role: "International admissions specialist",
    description:
      "Brings a decade-plus of admissions experience helping students shortlist universities, plan documents, and move before the admission rush peaks.",
  },
];

export default function WebinarLandingPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeCtaLabel, setActiveCtaLabel] = useState(
    "Book Your Free Webinar Seat Now",
  );

  useEffect(() => {
    const ctaButtons = Array.from(
      document.querySelectorAll<HTMLButtonElement>("[data-webinar-cta]"),
    );

    const handleCtaClick = (event: Event) => {
      event.preventDefault();

      const button = event.currentTarget as HTMLButtonElement | null;
      const label =
        button?.getAttribute("data-cta-label") ??
        button?.textContent?.trim() ??
        "Register Now";

      setActiveCtaLabel(label);
      setIsModalOpen(true);
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsModalOpen(false);
      }
    };

    ctaButtons.forEach((button) =>
      button.addEventListener("click", handleCtaClick),
    );
    document.addEventListener("keydown", handleEscape);

    return () => {
      ctaButtons.forEach((button) =>
        button.removeEventListener("click", handleCtaClick),
      );
      document.removeEventListener("keydown", handleEscape);
    };
  }, []);

  useEffect(() => {
    document.body.style.overflow = isModalOpen ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [isModalOpen]);

  return (
    <main className={styles.pageShell}>
      <section className={styles.heroSection}>
        <div className={styles.heroGlow} />
        <header className={styles.header}>
          <div className={styles.logoLockup}>
            <div className={styles.logoMark}>NL</div>
            <div>
              <p className={styles.logoEyebrow}>Guiding aspirants since 2009</p>
              <p className={styles.logoName}>New-Lyf Overseas</p>
            </div>
          </div>

          <button
            type="button"
            className={`${styles.ctaButton} ${styles.headerButton}`}
            data-webinar-cta
            data-cta-label="Header CTA"
          >
            Book Your Free Webinar Seat Now
          </button>
        </header>

        <div className={styles.heroGrid}>
          <div className={styles.heroCopy}>
            <p className={styles.preHeader}>
              ATTENTION: NEET 2024 &amp; 2025 QUALIFIED STUDENTS
            </p>
            <h1 className={styles.heroTitle}>
              NEET Students, Stop Scrolling! Don&apos;t Let the Re-Exam Delay
              Your MBBS Dreams.
            </h1>
            <p className={styles.heroSubtitle}>
              Learn how to secure your August intake seat before the 45-day
              documentation window closes.
            </p>
            <p className={styles.heroSupport}>
              Stop Scrolling. Waiting for the NEET re-exam could cost you your
              MBBS dream. The August intake for MBBS abroad is filling up fast,
              and families who plan late lose time, seat options, and document
              flexibility.
            </p>

            <div className={styles.ctaRow}>
              <button
                type="button"
                className={styles.ctaButton}
                data-webinar-cta
                data-cta-label="Hero primary CTA"
              >
                Secure My Free Webinar Seat
              </button>
              <button
                type="button"
                className={styles.secondaryButton}
                data-webinar-cta
                data-cta-label="Hero secondary CTA"
              >
                Save My Seat
              </button>
            </div>

            <div className={styles.trustRow}>
              <span>Free live webinar</span>
              <span>7th June at 7 PM</span>
              <span>Parents should attend too</span>
            </div>
          </div>

          <aside className={styles.heroPanel}>
            <div className={styles.panelBadge}>Free Live Webinar</div>
            <h2 className={styles.panelTitle}>
              Secure Your MBBS Future Abroad
            </h2>

            <div className={styles.panelMeta}>
              <div>
                <p className={styles.metaLabel}>Date</p>
                <p className={styles.metaValue}>7th June</p>
              </div>
              <div>
                <p className={styles.metaLabel}>Time</p>
                <p className={styles.metaValue}>7:00 PM</p>
              </div>
              <div>
                <p className={styles.metaLabel}>Speakers</p>
                <p className={styles.metaValue}>Doctor Vinith &amp; Mr. Avinash</p>
              </div>
              <div>
                <p className={styles.metaLabel}>Cost</p>
                <p className={styles.metaValue}>100% Free</p>
              </div>
            </div>

            <div className={styles.panelNote}>
              <p className={styles.noteTitle}>Why this matters now</p>
              <p>
                Documentation, university approvals, and visa preparation can
                take 45+ days. If you wait for 21st June to start thinking,
                you start late.
              </p>
            </div>

            <button
              type="button"
              className={`${styles.ctaButton} ${styles.panelButton}`}
              data-webinar-cta
              data-cta-label="Hero panel CTA"
            >
              Register for the 7th June Webinar
            </button>
          </aside>
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.sectionIntro}>
          <p className={styles.sectionEyebrow}>Why you are already running late</p>
          <h2 className={styles.sectionTitle}>
            Planning late does not just cost time. It costs options.
          </h2>
          <p className={styles.sectionCopy}>
            If you are putting your future on hold to wait for the June 21st
            re-exam, you are letting the calendar make decisions for you.
          </p>
        </div>

        <div className={styles.timelineGrid}>
          {timingCards.map((item) => (
            <article key={item.month} className={styles.timelineCard}>
              <p className={styles.timelineMonth}>{item.month}</p>
              <h3>{item.title}</h3>
              <p>{item.copy}</p>
            </article>
          ))}
        </div>

        <div className={styles.urgencyPanel}>
          <div>
            <p className={styles.urgencyLabel}>Here is what you need to know</p>
            <ul className={styles.pointList}>
              {urgencyPoints.map((point) => (
                <li key={point}>{point}</li>
              ))}
            </ul>
          </div>

          <div className={styles.urgencyAction}>
            <p className={styles.urgencyStat}>45+ days</p>
            <p className={styles.urgencyText}>
              is the document runway many families underestimate.
            </p>
            <button
              type="button"
              className={styles.ctaButton}
              data-webinar-cta
              data-cta-label="Urgency section CTA"
            >
              Register Now
            </button>
          </div>
        </div>
      </section>

      <section className={`${styles.section} ${styles.webinarSection}`}>
        <div className={styles.webinarGrid}>
          <div>
            <p className={styles.sectionEyebrow}>Join our free live webinar</p>
            <h2 className={styles.sectionTitle}>
              Stop guessing and start planning with a clear admission roadmap.
            </h2>
            <p className={styles.sectionCopy}>
              This exclusive 2-hour session is designed for NEET-qualified
              students and their parents who want honest clarity on MBBS abroad
              before the August intake becomes even more competitive.
            </p>
          </div>

          <div className={styles.webinarChecklist}>
            <div className={styles.checkItem}>
              <span>01</span>
              <p>Understand whether your current score is already usable.</p>
            </div>
            <div className={styles.checkItem}>
              <span>02</span>
              <p>See how seat movement and paperwork timelines really work.</p>
            </div>
            <div className={styles.checkItem}>
              <span>03</span>
              <p>Attend with parents and ask your doubts live.</p>
            </div>
          </div>
        </div>

        <div className={styles.webinarFooterRow}>
          <div className={styles.webinarInfoCard}>
            <p className={styles.infoCardTitle}>Webinar details</p>
            <p>Date: 7th June</p>
            <p>Time: 7:00 PM</p>
            <p>Cost: 100% Free</p>
          </div>

          <button
            type="button"
            className={styles.ctaButton}
            data-webinar-cta
            data-cta-label="Webinar details CTA"
          >
            Book Your Free Webinar Seat Now
          </button>
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.sectionIntro}>
          <p className={styles.sectionEyebrow}>Learn from industry experts</p>
          <h2 className={styles.sectionTitle}>
            Trusted voices who understand both medicine and admissions.
          </h2>
        </div>

        <div className={styles.speakerGrid}>
          {speakerCards.map((speaker) => (
            <article key={speaker.name} className={styles.speakerCard}>
              <div className={styles.speakerAvatar}>
                {speaker.name
                  .split(" ")
                  .map((part) => part[0])
                  .join("")}
              </div>
              <p className={styles.speakerRole}>{speaker.role}</p>
              <h3 className={styles.speakerName}>{speaker.name}</h3>
              <p className={styles.speakerDescription}>{speaker.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className={`${styles.section} ${styles.finalSection}`}>
        <div className={styles.finalPanel}>
          <p className={styles.sectionEyebrow}>Do not wait until the rush begins</p>
          <h2 className={styles.finalTitle}>
            Once results are out, thousands of students chase the same limited
            seats.
          </h2>
          <p className={styles.finalCopy}>
            Get ahead of the crowd, clear your doubts directly with our experts,
            and secure your future now.
          </p>
          <div className={styles.ctaRow}>
            <button
              type="button"
              className={styles.ctaButton}
              data-webinar-cta
              data-cta-label="Final primary CTA"
            >
              Book My Free Spot Now
            </button>
            <button
              type="button"
              className={styles.secondaryButton}
              data-webinar-cta
              data-cta-label="Final secondary CTA"
            >
              Save My Seat
            </button>
          </div>
        </div>
      </section>

      <footer className={styles.footer}>
        <p>
          Copyright {new Date().getFullYear()} New-Lyf Overseas. All rights
          reserved.
        </p>
        <button
          type="button"
          className={styles.ctaButton}
          data-webinar-cta
          data-cta-label="Footer CTA"
        >
          Register Now
        </button>
      </footer>

      <div
        className={`${styles.modalOverlay} ${
          isModalOpen ? styles.modalOverlayOpen : ""
        }`}
        onClick={(event) => {
          if (event.target === event.currentTarget) {
            setIsModalOpen(false);
          }
        }}
      >
        <div
          className={`${styles.modalCard} ${
            isModalOpen ? styles.modalCardOpen : ""
          }`}
          role="dialog"
          aria-modal="true"
          aria-labelledby="webinar-modal-title"
        >
          <button
            type="button"
            className={styles.closeButton}
            onClick={() => setIsModalOpen(false)}
            aria-label="Close modal"
          >
            X
          </button>

          <p className={styles.modalEyebrow}>{activeCtaLabel}</p>
          <h2 id="webinar-modal-title" className={styles.modalTitle}>
            Contact us to register!
          </h2>
          <p className={styles.modalCopy}>
            Choose your preferred contact option below and our team will help
            you lock your webinar seat without leaving this page.
          </p>

          <div className={styles.contactGrid}>
            {contactOptions.map((contact) => (
              <div key={contact.displayNumber} className={styles.contactCard}>
                <p className={styles.contactLabel}>New-Lyf registration line</p>
                <p className={styles.contactNumber}>{contact.displayNumber}</p>
                <div className={styles.contactActions}>
                  <a
                    href={contact.whatsappHref}
                    target="_blank"
                    rel="noreferrer"
                    className={styles.whatsappButton}
                  >
                    WhatsApp
                  </a>
                  <a href={`tel:${contact.dialNumber}`} className={styles.callButton}>
                    Call now
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
