"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

import styles from "./webinar.module.css";

type ContactOption = {
  displayNumber: string;
  dialNumber: string;
  whatsappHref: string;
};

type TimingCard = {
  month: string;
  accentColor: string;
  title: string;
  lead: string;
  copy: string;
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

const webinarStartAt = new Date("2026-06-07T19:00:00+05:30");
const totalSeats = 200;
const registeredSeats = 57;
const seatsRemaining = totalSeats - registeredSeats;

const timingCards: TimingCard[] = [
  {
    month: "June",
    accentColor: "#f59e0b",
    title: "Students are waiting on the re-exam",
    lead: "Waiting quietly costs time.",
    copy:
      "Every week spent waiting reduces your document preparation runway for the August intake.",
  },
  {
    month: "July",
    accentColor: "#ef6c00",
    title: "Processing pressure starts building",
    lead: "Paperwork starts stacking up.",
    copy:
      "Shortlisting, university paperwork, financial planning, and visa prep cannot be compressed overnight.",
  },
  {
    month: "August",
    accentColor: "#c0392b",
    title: "Seats move fast once the rush begins",
    lead: "Competition gets louder.",
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
    credential: "Focused on medical-pathway clarity for NEET families planning beyond the re-exam panic.",
    description:
      "Covers practical MBBS-abroad fit, long-term practice thinking, and the questions families should answer before they commit to a country.",
  },
  {
    name: "Mr. Avinash",
    role: "International admissions specialist",
    credential: "Brings 10+ years of admissions planning experience for students moving on tight intake timelines.",
    description:
      "Breaks down shortlisting, documentation, and the August-intake process so students can move before the admission rush peaks.",
  },
];

export default function WebinarLandingPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeCtaLabel, setActiveCtaLabel] = useState(
    "Book Your Free Webinar Seat Now",
  );
  const [timeLeft, setTimeLeft] = useState("");

  useEffect(() => {
    const updateCountdown = () => {
      const diff = webinarStartAt.getTime() - Date.now();

      if (diff <= 0) {
        setTimeLeft("Starting soon");
        return;
      }

      const days = Math.floor(diff / 86400000);
      const hours = Math.floor((diff % 86400000) / 3600000);
      const minutes = Math.floor((diff % 3600000) / 60000);

      setTimeLeft(`${days}d ${hours}h ${minutes}m`);
    };

    updateCountdown();

    const interval = window.setInterval(updateCountdown, 1000);

    return () => {
      window.clearInterval(interval);
    };
  }, []);

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
            <div className={styles.logoMark}>
              <Image
                src="/new-lyf-logo.webp"
                alt="New-Lyf Overseas"
                fill
                sizes="88px"
                className={styles.logoImage}
                priority
              />
            </div>
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
              Secure your August MBBS intake before the NEET re-exam rush
              begins.
            </h1>
            <p className={styles.heroSubtitle}>
              The August intake for MBBS abroad is filling up fast. Learn how
              to move before the strict 45-day documentation window closes.
            </p>
            <p className={styles.heroSupport}>
              Students waiting for the June 21 re-exam are not just waiting on
              marks. They are losing shortlist time, document runway, and early
              access to August-intake seats that serious families are already
              evaluating.
            </p>

            <div className={styles.ctaRow}>
              <button
                type="button"
                className={styles.ctaButton}
                data-webinar-cta
                data-cta-label="Hero primary CTA"
              >
                Secure my free seat
              </button>
            </div>

            <p className={styles.ctaCaption}>
              Only {seatsRemaining} of {totalSeats} seats remaining • 7th June
              • Free to attend
            </p>
          </div>

          <aside className={styles.heroPanel}>
            <div className={styles.panelBadge}>Free Live Webinar</div>
            <h2 className={styles.panelTitle}>
              Secure Your MBBS Future Abroad
            </h2>
            <p className={styles.countdownLine}>Starts in {timeLeft}</p>
            <p className={styles.seatCounter}>
              {seatsRemaining} of {totalSeats} seats remaining
            </p>

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

            <p className={styles.panelSupport}>
              Attend with your parents and get a clear next-step plan before
              the admission rush gets louder.
            </p>

            <button
              type="button"
              className={`${styles.ctaButton} ${styles.panelButton}`}
              data-webinar-cta
              data-cta-label="Hero panel CTA"
            >
              Book your free webinar seat now
            </button>
          </aside>
        </div>
      </section>

      <section className={styles.proofBarSection}>
        <div className={styles.proofBar}>
          <span>✓ 17,000+ students guided</span>
          <span>✓ Guiding aspirants since 2009</span>
          <span>✓ MBBS abroad planning before intake deadlines</span>
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
            <article
              key={item.month}
              className={styles.timelineCard}
              style={{ borderLeftColor: item.accentColor }}
            >
              <p className={styles.timelineMonth}>{item.month}</p>
              <h3>{item.title}</h3>
              <p>
                <strong>{item.lead}</strong> {item.copy}
              </p>
            </article>
          ))}
        </div>

        <div className={styles.deadlineGrid}>
          <div className={styles.deadlineStatCard}>
            <p className={styles.deadlineLabel}>Documentation runway</p>
            <p className={styles.deadlineNumber}>45+ days</p>
            <p className={styles.deadlineCopy}>
              Documentation, university approvals, and visa preparation take
              real time. You cannot rush this at the end.
            </p>
          </div>

          <div className={styles.deadlineListCard}>
            <p className={styles.urgencyLabel}>Here is what you need to know</p>
            <ul className={styles.pointList}>
              {urgencyPoints.map((point) => (
                <li key={point}>{point}</li>
              ))}
            </ul>
            <button
              type="button"
              className={`${styles.ctaButton} ${styles.inlineCta}`}
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
              <p className={styles.speakerCredential}>{speaker.credential}</p>
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
          <p className={styles.finalMeta}>
            Free live webinar • 7th June at 7 PM • Attend with parents
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
          </div>
        </div>
      </section>

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
