# =============================================================================
# Likhith Gowda T R — Portfolio Resume Data
# Edit this file to update what the AI chatbot knows about you
# =============================================================================

RESUME_DATA = {
    "name": "Likhith Gowda T R",
    "title": "Full Stack Developer & AI/ML Engineer",
    "email": "likhithgowda88923@gmail.com",
    "phone": "+91 8892382338",
    "github": "github.com/likhith0410",
    "linkedin": "https://www.www.linkedin.com/in/likhith-gowda-t-r",
    "leetcode": "leetcode.com/Likhith_24",
    "location": "Bangalore, Karnataka, India",
    "summary": (
        "Full Stack Developer and AI/ML Engineer with hands-on experience building "
        "scalable web applications, LangChain-powered RAG pipelines, and RESTful APIs. "
        "Proficient in Python, Django, React.js, and cloud-native DevOps tooling. "
        "Skilled in NLP, vector databases, transformer models, and LLM integration. "
        "Currently pursuing B.E. in Computer Science (graduating July 2025) with a CGPA of 8.1/10."
    ),
    "skills": {
        "Languages": ["Python", "JavaScript", "SQL", "HTML", "CSS", "Shell Scripting"],
        "Frameworks": ["Django", "FastAPI", "React.js", "Django REST Framework", "Streamlit"],
        "AI / ML": ["LangChain", "RAG Pipelines", "LLM Integration", "Vector DBs (FAISS, Chroma)", "Transformers", "TF-IDF", "Cosine Similarity", "KNN"],
        "Database": ["PostgreSQL", "MongoDB", "MySQL", "SQLite"],
        "DevOps & Cloud": ["Docker", "Kubernetes", "Jenkins", "CI/CD", "AWS (EC2, S3, IAM, EKS, ECS)", "GitHub Actions", "ArgoCD", "Helm", "Terraform", "Ansible"],
        "Monitoring": ["Prometheus", "Grafana", "CloudWatch"],
        "Tools": ["Git", "GitHub", "VS Code", "Jupyter Notebook", "Google Colab", "Linux"],
    },
    "experience": [
        {
            "company": "WorkshopEdge",
            "role": "Full Stack Developer Intern",
            "period": "Feb 2026 - Present",
            "location": "Bengaluru, India",
            "bullets": [
                "Developed and integrated RESTful APIs using FastAPI and Django for authentication (OTP-based mobile/email verification), job card, invoice, and service history modules with multi-table SQL joins and JWT-based access control.",
                "Built a task management system using Django, implementing task pipeline workflows, user assignment, status tracking, comment history, and role-based task filtering.",
                "Improved frontend delivery by migrating Bootstrap from npm to CDN, fixing mobile view layout issues, and applying Bootstrap 5 CSS updates to global UI components.",
            ],
        },
        {
            "company": "Pentagon Space Pvt. Ltd",
            "role": "Python Full Stack Development Trainee",
            "period": "Aug 2025 - Jan 2026",
            "location": "Bengaluru, India",
            "bullets": [
                "Developed full-stack web applications using Python, Django, Django REST Framework, React.js, and PostgreSQL with JWT authentication, CRUD workflows, and role-based access control.",
                "Built responsive React dashboards and UI components with seamless backend integration, enabling real-time data interaction across scalable, production-ready application flows.",
                "Designed PostgreSQL schemas with query optimization, debugging and testing end-to-end application features in an Agile development environment.",
            ],
        },
    ],
    "projects": [
        {
            "name": "Smart Expense Tracker with AI Insights",
            "description": (
                "Full-stack SaaS built with React dashboards, Django REST APIs, JWT authentication, and "
                "PostgreSQL-backed expense workflows, featuring AI/ML automation. Deployed on AWS EKS with "
                "Kubernetes orchestration, Helm IaC, and zero-downtime CI/CD (GitHub Actions + ArgoCD), "
                "achieving 80% reduction in manual entry and 15-minute deployment cycles."
            ),
            "tech": ["React.js", "Django", "PostgreSQL", "AWS EKS", "Kubernetes", "Helm", "GitHub Actions", "ArgoCD"],
            "github": "github.com/likhith0410",
            "live": None,
        },
        {
            "name": "End-to-End CI/CD Pipeline for Board Game Application",
            "description": (
                "Production-grade 13-stage CI/CD pipeline using Jenkins with Maven build, SonarQube quality gates, "
                "Trivy security scans, Nexus artifact management, Docker containerization, and AWS EKS deployment "
                "with Prometheus & Grafana monitoring. Achieves fully automated deployments in 8-12 minutes."
            ),
            "tech": ["Jenkins", "Docker", "AWS EKS", "Kubernetes", "SonarQube", "Trivy", "Prometheus", "Grafana"],
            "github": "github.com/likhith0410",
            "live": None,
        },
        {
            "name": "Personal AI Advisor",
            "description": (
                "Full-stack RAG-inspired AI platform with Python/Streamlit frontend, SQLite backend, multi-format "
                "document parser (PDF, DOCX, CSV), intelligent context-aware retrieval, and Groq LLM integration. "
                "Deployed via Docker on AWS ECS Fargate with GitHub Actions CI/CD, achieving 4-minute deployment "
                "cycles, 50% faster builds, and 90% infrastructure cost reduction using serverless orchestration."
            ),
            "tech": ["Python", "Streamlit", "LangChain", "Groq LLM", "SQLite", "Docker", "AWS ECS Fargate", "GitHub Actions"],
            "github": "github.com/likhith0410",
            "live": None,
        },
        {
            "name": "AI-Driven Resume and Job Matching System",
            "description": (
                "Automated resume analysis for 200+ candidate profiles, achieving 70% reduction in recruiter "
                "screening time. Uses advanced NLP (TF-IDF, Cosine Similarity) and KNN-based algorithms for "
                "85% matching precision in job recommendations."
            ),
            "tech": ["Python", "Streamlit", "MongoDB", "TF-IDF", "Cosine Similarity", "KNN", "NLP"],
            "github": "github.com/likhith0410",
            "live": None,
        },
    ],
    "education": [
        {
            "degree": "Bachelor of Engineering in Computer Science",
            "school": "Impact College of Engineering and Applied Sciences",
            "period": "Dec 2021 - Jul 2025",
            "year": "2025",
            "gpa": "8.1/10.0",
        }
    ],
    "certifications": [
        "Full-Stack Web Development Intern - VTU / Online Program (Feb 2025 - May 2025)",
        "Machine Learning and Data Science - Kar Tech Pvt. Ltd. (Oct 2023)",
        "Python and PyQt5 - Kar Tech Pvt. Ltd.",
    ],
    "interests": [
        "Building scalable full-stack applications and backend systems with clean architecture",
        "Cloud-native development, DevOps automation, and production system deployment",
        "Reading real-world problem-solving stories in tech startups and system failures",
    ],
}


def build_system_prompt() -> str:
    r = RESUME_DATA
    exp_text = ""
    for e in r["experience"]:
        exp_text += f"\n  [{e['role']} at {e['company']}, {e['period']}]\n"
        for b in e["bullets"]:
            exp_text += f"    - {b}\n"

    proj_text = ""
    for p in r["projects"]:
        exp_text_proj = p['description'][:200] + "..." if len(p['description']) > 200 else p['description']
        proj_text += f"\n  [{p['name']}]: {exp_text_proj}\n"
        proj_text += f"    Tech: {', '.join(p['tech'])}\n"

    skills_text = ""
    for cat, items in r["skills"].items():
        skills_text += f"\n  {cat}: {', '.join(items)}"

    certs = "\n".join(f"  - {c}" for c in r["certifications"])

    return (
        f"You are an AI assistant for {r['name']}'s personal portfolio website. "
        f"Answer visitors' questions about {r['name']}'s skills, experience, projects, and background. "
        f"Be friendly, professional, and accurate. Only use the information provided below.\n\n"
        f"=== ABOUT {r['name'].upper()} ===\n"
        f"Title: {r['title']}\n"
        f"Location: {r['location']}\n"
        f"Email: {r['email']}\n"
        f"Phone: {r['phone']}\n"
        f"GitHub: {r['github']}\n"
        f"LinkedIn: {r['linkedin']}\n"
        f"LeetCode: {r['leetcode']}\n\n"
        f"SUMMARY: {r['summary']}\n\n"
        f"SKILLS:{skills_text}\n\n"
        f"WORK EXPERIENCE:{exp_text}\n"
        f"PROJECTS:{proj_text}\n"
        f"EDUCATION: {r['education'][0]['degree']} from {r['education'][0]['school']}, "
        f"graduating {r['education'][0]['year']} (CGPA: {r['education'][0]['gpa']})\n\n"
        f"CERTIFICATIONS:\n{certs}\n\n"
        f"Keep responses under 150 words unless detail is explicitly requested. "
        f"Be warm, concise, and professional. If asked something not covered, "
        f"direct them to email {r['email']}."
    )


# ── Cached system prompt (built once at startup, not on every request) ───────
_CACHED_PROMPT: str | None = None

def get_system_prompt() -> str:
    global _CACHED_PROMPT
    if _CACHED_PROMPT is None:
        _CACHED_PROMPT = build_system_prompt()
    return _CACHED_PROMPT
