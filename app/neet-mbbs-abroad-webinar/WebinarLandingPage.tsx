"use client";

import Image from "next/image";
import type { ChangeEvent, FormEvent } from "react";
import { useEffect, useState } from "react";

import styles from "./webinar.module.css";

type StudentType = "Fresher" | "Repeater" | "Qualified Earlier" | "";

type TimingCard = {
  month: string;
  accentColor: string;
  title: string;
  lead: string;
  copy: string;
};

type WebinarLeadFormData = {
  fullName: string;
  email: string;
  phone: string;
  studentType: StudentType;
};

const webinarStartAt = new Date("2026-06-07T19:00:00+05:30");
const totalSeats = 200;
const registeredSeats = 57;
const seatsRemaining = totalSeats - registeredSeats;
const whatsappGroupLink =
  "https://chat.whatsapp.com/BIwQ5q2OLS3KGSZZwAzieH";
const autoPopupSessionKey = "neet-mbbs-webinar-popup-seen";

const initialLeadFormData: WebinarLeadFormData = {
  fullName: "",
  email: "",
  phone: "",
  studentType: "",
};

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
    imageSrc: "/speaker-dr-vinith.jpg",
    imageAlt: "Doctor Vinith",
    credential:
      "Focused on medical-pathway clarity for NEET families planning beyond the re-exam panic.",
    description:
      "Covers practical MBBS-abroad fit, long-term practice thinking, and the questions families should answer before they commit to a country.",
  },
  {
    name: "Mr. Avinash",
    role: "International admissions specialist",
    imageSrc: "/speaker-mr-avinash.jpg",
    imageAlt: "Mr. Avinash",
    credential:
      "Brings 10+ years of admissions planning experience for students moving on tight intake timelines.",
    description:
      "Breaks down shortlisting, documentation, and the August-intake process so students can move before the admission rush peaks.",
  },
];

const testimonials = [
  {
    name: "Ramesh K., father",
    city: "Bangalore",
    quote:
      "We started the process in May before results. By the time our son's marks came out, the university seat discussion was already moving.",
  },
  {
    name: "Anita S.",
    city: "Hyderabad",
    quote:
      "Dr. Vinith told us exactly which documents to prepare first. We were not scrambling at the last minute like other families we knew.",
  },
  {
    name: "Priya's mother",
    city: "Chennai",
    quote:
      "The biggest relief was clarity. We understood the August intake timeline early, so we could plan calmly instead of reacting in panic.",
  },
];

export default function WebinarLandingPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeCtaLabel, setActiveCtaLabel] = useState(
    "Book Your Free Webinar Seat Now",
  );
  const [timeLeft, setTimeLeft] = useState("");
  const [leadFormData, setLeadFormData] =
    useState<WebinarLeadFormData>(initialLeadFormData);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [hasSeenAutoPopup, setHasSeenAutoPopup] = useState<boolean | null>(
    null,
  );

  const closeModal = () => {
    setIsModalOpen(false);
    setIsSubmitting(false);
    setSubmitError("");
    setIsSubmitted(false);
    setLeadFormData(initialLeadFormData);
  };

  const openModal = (label: string) => {
    setActiveCtaLabel(label);
    setSubmitError("");
    setIsSubmitted(false);
    setIsModalOpen(true);
  };

  const markAutoPopupSeen = () => {
    if (typeof window === "undefined") {
      return;
    }

    window.sessionStorage.setItem(autoPopupSessionKey, "true");
    setHasSeenAutoPopup(true);
  };

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    setLeadFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleStudentTypeChange = (studentType: StudentType) => {
    setLeadFormData((prev) => ({
      ...prev,
      studentType,
    }));
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);
    setSubmitError("");

    try {
      const response = await fetch("/api/webinar-registration", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fullName: leadFormData.fullName,
          phone: leadFormData.phone,
          email: leadFormData.email,
          studentType: leadFormData.studentType,
        }),
      });

      if (!response.ok) {
        throw new Error("Submission failed");
      }

      setIsSubmitted(true);
      window.open(whatsappGroupLink, "_blank", "noopener,noreferrer");
    } catch (error) {
      console.error("Webinar registration failed", error);
      setSubmitError(
        "We could not save your registration right now. Please try again in a moment.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

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
    if (typeof window === "undefined") {
      return;
    }

    setHasSeenAutoPopup(
      window.sessionStorage.getItem(autoPopupSessionKey) === "true",
    );
  }, []);

  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        closeModal();
      }
    };

    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, []);

  useEffect(() => {
    if (typeof window === "undefined" || hasSeenAutoPopup !== false) {
      return;
    }

    const handleScroll = () => {
      const scrollThreshold = Math.max(260, window.innerHeight * 0.35);
      if (window.scrollY < scrollThreshold || isModalOpen) {
        return;
      }

      markAutoPopupSeen();
      openModal("Get the webinar link");
      window.removeEventListener("scroll", handleScroll);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [hasSeenAutoPopup, isModalOpen]);

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
            onClick={() => openModal("Header CTA")}
          >
            <span className={styles.headerButtonDesktop}>
              Book Your Free Webinar Seat Now
            </span>
            <span className={styles.headerButtonMobile}>Register Free</span>
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
                onClick={() => openModal("Hero primary CTA")}
              >
                Secure my free seat
              </button>
            </div>

            <p className={styles.ctaCaption}>
              Only {seatsRemaining} of {totalSeats} seats remaining | 7th June
              | Free to attend
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
                <p className={styles.metaValue}>
                  Doctor Vinith &amp; Mr. Avinash
                </p>
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
              onClick={() => openModal("Hero panel CTA")}
            >
              Book your free webinar seat now
            </button>
          </aside>
        </div>
      </section>

      <section className={styles.proofBarSection}>
        <div className={styles.proofBar}>
          <span>17,000+ students guided</span>
          <span>Guiding aspirants since 2009</span>
          <span>MBBS abroad planning before intake deadlines</span>
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
              onClick={() => openModal("Urgency section CTA")}
            >
              Register Now
            </button>
          </div>
        </div>
      </section>

      <section className={`${styles.section} ${styles.testimonialSection}`}>
        <div className={styles.sectionIntro}>
          <p className={styles.sectionEyebrow}>
            Families who moved early felt the difference
          </p>
          <h2 className={styles.sectionTitle}>
            Real parent and student feedback from families who planned before
            the rush.
          </h2>
          <p className={styles.sectionCopy}>
            The biggest trust signal on pages like this is simple: hearing from
            families who acted before panic took over.
          </p>
        </div>

        <div className={styles.testimonialGrid}>
          {testimonials.map((item) => (
            <article
              key={`${item.name}-${item.city}`}
              className={styles.testimonialCard}
            >
              <div className={styles.testimonialHeader}>
                <img
                  src={`https://ui-avatars.com/api/?name=${encodeURIComponent(
                    item.name,
                  )}&background=8B2020&color=fff&size=80&bold=true`}
                  alt={item.name}
                  className={styles.testimonialAvatar}
                  loading="lazy"
                />
                <div>
                  <p className={styles.testimonialName}>{item.name}</p>
                  <p className={styles.testimonialCity}>{item.city}</p>
                </div>
              </div>
              <p className={styles.testimonialQuote}>"{item.quote}"</p>
            </article>
          ))}
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
            onClick={() => openModal("Webinar details CTA")}
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
              <div className={styles.speakerCardBody}>
                <div className={styles.speakerCopy}>
                  <p className={styles.speakerRole}>{speaker.role}</p>
                  <h3 className={styles.speakerName}>{speaker.name}</h3>
                  <p className={styles.speakerCredential}>{speaker.credential}</p>
                  <p className={styles.speakerDescription}>
                    {speaker.description}
                  </p>
                </div>

                <div className={styles.speakerMedia}>
                  <div className={styles.speakerPhotoFrame}>
                    <Image
                      src={speaker.imageSrc}
                      alt={speaker.imageAlt}
                      fill
                      sizes="(max-width: 767px) 120px, 160px"
                      className={styles.speakerPhoto}
                    />
                  </div>
                </div>
              </div>
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
            Free live webinar | 7th June at 7 PM | Attend with parents
          </p>
          <div className={styles.ctaRow}>
            <button
              type="button"
              className={styles.ctaButton}
              onClick={() => openModal("Final primary CTA")}
            >
              Book My Free Spot Now
            </button>
          </div>
        </div>
      </section>

      {isModalOpen ? (
        <div
          className={`${styles.modalOverlay} ${styles.modalOverlayOpen}`}
          onClick={(event) => {
            if (event.target === event.currentTarget) {
              markAutoPopupSeen();
              closeModal();
            }
          }}
        >
          <div
            className={`${styles.modalCard} ${styles.modalCardOpen}`}
            role="dialog"
            aria-modal="true"
            aria-labelledby="webinar-modal-title"
          >
            <button
              type="button"
              className={styles.closeButton}
              onClick={() => {
                markAutoPopupSeen();
                closeModal();
              }}
              aria-label="Close modal"
            >
              X
            </button>

            {isSubmitted ? (
              <div className={styles.successState}>
                <p className={styles.modalEyebrow}>{activeCtaLabel}</p>
                <h2 id="webinar-modal-title" className={styles.modalTitle}>
                  You&apos;re registered for the webinar.
                </h2>
                <p className={styles.modalCopy}>
                  Your details have been saved. Join the WhatsApp group below to
                  receive the meeting link and updates for the session.
                </p>
                <a
                  href={whatsappGroupLink}
                  target="_blank"
                  rel="noreferrer"
                  className={styles.groupLinkButton}
                >
                  Join the WhatsApp group
                </a>
                <p className={styles.successHelper}>
                  If the group did not open automatically, use the button above.
                </p>
              </div>
            ) : (
              <>
                <p className={styles.modalEyebrow}>{activeCtaLabel}</p>
                <h2 id="webinar-modal-title" className={styles.modalTitle}>
                  Reserve your webinar seat
                </h2>
                <p className={styles.modalCopy}>
                  Fill in the form below. After you submit, we&apos;ll give you
                  the WhatsApp group link where the meeting link will be shared.
                </p>

                <form className={styles.modalForm} onSubmit={handleSubmit}>
                  <div className={styles.formField}>
                    <label htmlFor="webinar-full-name" className={styles.formLabel}>
                      Name
                    </label>
                    <input
                      id="webinar-full-name"
                      name="fullName"
                      type="text"
                      value={leadFormData.fullName}
                      onChange={handleInputChange}
                      className={styles.formInput}
                      placeholder="Enter your full name"
                      required
                    />
                  </div>

                  <div className={styles.formGrid}>
                    <div className={styles.formField}>
                      <label htmlFor="webinar-email" className={styles.formLabel}>
                        Email
                      </label>
                      <input
                        id="webinar-email"
                        name="email"
                        type="email"
                        value={leadFormData.email}
                        onChange={handleInputChange}
                        className={styles.formInput}
                        placeholder="you@example.com"
                        required
                      />
                    </div>

                    <div className={styles.formField}>
                      <label htmlFor="webinar-phone" className={styles.formLabel}>
                        Phone number
                      </label>
                      <input
                        id="webinar-phone"
                        name="phone"
                        type="tel"
                        value={leadFormData.phone}
                        onChange={handleInputChange}
                        className={styles.formInput}
                        placeholder="+91"
                        required
                      />
                    </div>
                  </div>

                  <fieldset className={styles.radioFieldset}>
                    <legend className={styles.formLabel}>You are</legend>
                    <div className={styles.radioGrid}>
                      {(
                        [
                          "Fresher",
                          "Repeater",
                          "Qualified Earlier",
                        ] as StudentType[]
                      ).map((option) => (
                        <label key={option} className={styles.radioOption}>
                          <input
                            type="radio"
                            name="studentType"
                            value={option}
                            checked={leadFormData.studentType === option}
                            onChange={() => handleStudentTypeChange(option)}
                            required
                          />
                          <span>{option}</span>
                        </label>
                      ))}
                    </div>
                  </fieldset>

                  {submitError ? (
                    <p className={styles.formError}>{submitError}</p>
                  ) : null}

                  <button
                    type="submit"
                    className={styles.ctaButton}
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Submitting..." : "Submit and get group link"}
                  </button>
                </form>
              </>
            )}
          </div>
        </div>
      ) : null}
    </main>
  );
}
