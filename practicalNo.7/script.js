/* ====================================
   JavaScript — Interactive FAQ
   Uses DOM manipulation & event listeners
   ==================================== */

// ---------- FAQ Data ----------
const faqs = [
  {
    category: "admission",
    question: "What is the admission process for new students?",
    answer:
      "New students must fill out the online application form, upload required documents (mark-sheets, ID proof, photographs), and pay the application fee. Shortlisted candidates will receive an admission offer via email. Visit the Admissions Office for document verification to confirm your seat.",
  },
  {
    category: "admission",
    question: "What documents are required for admission?",
    answer:
      "You will need: (1) Class 10 &amp; 12 mark-sheets, (2) Transfer Certificate, (3) Migration Certificate, (4) Passport-size photographs (4 copies), (5) Aadhar Card or government-issued ID, and (6) Category certificate if applicable.",
  },
  {
    category: "admission",
    question: "Can I change my branch after admission?",
    answer:
      "Branch changes are allowed after the first semester based on seat availability and your SGPA. You must apply through the Academic Office within the notified window. Priority is given in order of merit.",
  },
  {
    category: "academics",
    question: "How do I access the online learning portal?",
    answer:
      "Go to <strong>portal.college.edu</strong> and log in with your student ID and password provided during orientation. The portal hosts lecture recordings, assignments, and grades. If you face login issues, contact IT Support.",
  },
  {
    category: "academics",
    question: "What is the attendance policy?",
    answer:
      "A minimum of <strong>75% attendance</strong> is mandatory in every subject. Students falling below this threshold may be debarred from end-semester examinations. Medical leave with valid documentation can be considered for relaxation up to 10%.",
  },
  {
    category: "academics",
    question: "How can I apply for a re-evaluation of my exam?",
    answer:
      "Submit a re-evaluation request within 15 days of result declaration through the Examination Portal. Pay the prescribed fee per subject. Results of re-evaluation are typically announced within 30 days.",
  },
  {
    category: "fees",
    question: "What are the tuition fees for the current semester?",
    answer:
      "Tuition fees vary by programme. Refer to the <em>Fee Structure</em> page on the college website for exact figures. Fees can be paid online via the student portal or at the Accounts Office.",
  },
  {
    category: "fees",
    question: "Are scholarships available for meritorious students?",
    answer:
      "Yes. The college offers merit-based scholarships (top 10% of each branch), need-based financial aid, and government scholarships (SC/ST/OBC/EWS). Apply through the Scholarship section of the student portal before the deadline each semester.",
  },
  {
    category: "fees",
    question: "What is the last date for fee payment?",
    answer:
      "Fees must be paid within <strong>30 days</strong> of the semester start date. A late fee of ₹100/day is charged after the deadline. Students with pending dues will not be allowed to sit for examinations.",
  },
  {
    category: "campus",
    question: "What hostel facilities are available?",
    answer:
      "The college provides separate hostels for boys and girls with Wi-Fi, mess, laundry, and 24/7 security. Rooms are allotted on a first-come-first-served basis. Apply through the Hostel section on the student portal.",
  },
  {
    category: "campus",
    question: "How do I join a student club or society?",
    answer:
      "Visit the <strong>Student Activities</strong> page on the portal to see all active clubs (coding, robotics, drama, music, sports, etc.). Each club holds open recruitment drives at the start of every semester. You can also approach club coordinators directly.",
  },
  {
    category: "campus",
    question: "Is there a college bus service?",
    answer:
      "Yes. The college operates buses on multiple routes covering the city and surrounding areas. Route details and timings are available on the Transport section of the website. Bus passes can be obtained from the Transport Office.",
  },
  {
    category: "technical",
    question: "How do I reset my student portal password?",
    answer:
      "Click <strong>'Forgot Password'</strong> on the login page and enter your registered email. A reset link will be sent within minutes. If your email is not registered, visit the IT Help Desk with your student ID card.",
  },
  {
    category: "technical",
    question: "How can I access the campus Wi-Fi?",
    answer:
      "Connect to the <strong>CampusNet</strong> SSID and authenticate using your student credentials. The network is available across all academic blocks, the library, and hostels. For connectivity issues, email <em>itsupport@college.edu</em>.",
  },
  {
    category: "technical",
    question: "Who do I contact for technical issues with the LMS?",
    answer:
      "Email <em>itsupport@college.edu</em> or call the IT Help Desk at ext. 1234, available Mon–Sat, 9 AM – 5 PM. For urgent issues outside office hours, use the live-chat widget on the portal login page.",
  },
];

// ---------- DOM References ----------
const faqList = document.getElementById("faq-list");
const searchBox = document.getElementById("search-box");
const filterContainer = document.getElementById("category-filters");
const noResults = document.getElementById("no-results");

let activeCategory = "all";

// ---------- Render FAQ Items ----------
function renderFAQs() {
  // Build all FAQ item elements from the data array
  faqs.forEach((item, index) => {
    const faqItem = document.createElement("div");
    faqItem.classList.add("faq-item");
    faqItem.dataset.category = item.category;
    faqItem.dataset.index = index;

    faqItem.innerHTML = `
      <button class="faq-question" aria-expanded="false">
        <span>${item.question}</span>
        <span class="faq-icon">+</span>
      </button>
      <div class="faq-answer" role="region">
        <div class="faq-answer-inner">
          <span class="faq-badge">${item.category}</span>
          <p>${item.answer}</p>
        </div>
      </div>
    `;

    faqList.appendChild(faqItem);
  });
}

// ---------- Toggle Answer (DOM + Event Listener) ----------
function setupAccordion() {
  // Use event delegation on the FAQ list container
  faqList.addEventListener("click", function (e) {
    // Find the closest .faq-question button that was clicked
    const questionBtn = e.target.closest(".faq-question");
    if (!questionBtn) return;

    const faqItem = questionBtn.closest(".faq-item");

    // Close any other open item (accordion behavior)
    const currentlyOpen = faqList.querySelector(".faq-item.open");
    if (currentlyOpen && currentlyOpen !== faqItem) {
      currentlyOpen.classList.remove("open");
      currentlyOpen
        .querySelector(".faq-question")
        .setAttribute("aria-expanded", "false");
    }

    // Toggle the clicked item
    faqItem.classList.toggle("open");
    const isOpen = faqItem.classList.contains("open");
    questionBtn.setAttribute("aria-expanded", String(isOpen));
  });
}

// ---------- Search Filter ----------
function setupSearch() {
  searchBox.addEventListener("input", function () {
    filterFAQs();
  });
}

// ---------- Category Filter ----------
function setupCategoryFilter() {
  filterContainer.addEventListener("click", function (e) {
    const pill = e.target.closest(".pill");
    if (!pill) return;

    // Update active pill
    filterContainer
      .querySelector(".pill.active")
      .classList.remove("active");
    pill.classList.add("active");

    activeCategory = pill.dataset.category;
    filterFAQs();
  });
}

// ---------- Combined Filter Logic ----------
function filterFAQs() {
  const query = searchBox.value.trim().toLowerCase();
  const items = faqList.querySelectorAll(".faq-item");
  let visibleCount = 0;

  items.forEach(function (item) {
    const category = item.dataset.category;
    const questionText = item
      .querySelector(".faq-question span")
      .textContent.toLowerCase();
    const answerText = item
      .querySelector(".faq-answer-inner")
      .textContent.toLowerCase();

    const matchesCategory =
      activeCategory === "all" || category === activeCategory;
    const matchesSearch =
      query === "" ||
      questionText.includes(query) ||
      answerText.includes(query);

    if (matchesCategory && matchesSearch) {
      item.classList.remove("hidden");
      visibleCount++;
    } else {
      item.classList.add("hidden");
      // Close hidden items
      item.classList.remove("open");
    }
  });

  // Show / hide "no results" message
  noResults.hidden = visibleCount > 0;
}

// ---------- Keyboard Accessibility ----------
function setupKeyboard() {
  faqList.addEventListener("keydown", function (e) {
    if (e.key === "Enter" || e.key === " ") {
      const questionBtn = e.target.closest(".faq-question");
      if (questionBtn) {
        e.preventDefault();
        questionBtn.click();
      }
    }
  });
}

// ---------- Initialize ----------
document.addEventListener("DOMContentLoaded", function () {
  renderFAQs();
  setupAccordion();
  setupSearch();
  setupCategoryFilter();
  setupKeyboard();
});
