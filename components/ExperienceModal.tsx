'use client'

import ModalShell from './ModalShell'

interface Props { onClose: () => void }

const jobs = [
  {
    company: 'AlMuqeet Systems',
    role: 'DevOps engineer',
    period: 'Dec 2025 – present',
    location: 'Srinagar, India',
    bullets: [
      'Designed and maintained CI/CD pipelines to accelerate release cycles.',
      'Deployed and configured Zabbix for infrastructure monitoring and alerting across production systems.',
      'Built observability dashboards for real-time visibility into system health.',
    ],
  },
  {
    company: 'iQuasar LLC',
    role: 'DevOps intern',
    period: 'Aug – Dec 2025',
    location: 'Remote',
    bullets: [
      'Provisioned cloud infrastructure on AWS using Terraform and Ansible.',
      'Managed containerized workloads on Kubernetes; wrote Helm charts for deployment automation.',
      'Set up a full observability stack: Prometheus for metrics, Grafana for dashboards, and Loki for log aggregation.',
      'Maintained Jenkins pipelines for automated builds and deployments.',
    ],
  },
]

const skills = [
  { group: 'CI/CD', items: ['GitHub Actions', 'Jenkins'] },
  { group: 'IaC', items: ['Terraform', 'Ansible'] },
  { group: 'Containers', items: ['Docker', 'Kubernetes'] },
  { group: 'Monitoring', items: ['Zabbix', 'Prometheus', 'Grafana', 'Loki'] },
  { group: 'Cloud', items: ['AWS'] },
  { group: 'Scripting', items: ['Bash', 'Python'] },
]

const certs = [
  { name: 'AWS Certified Cloud Practitioner', issuer: 'Amazon Web Services' },
  { name: 'Machine Learning Specialization', issuer: 'DeepLearning.AI / Coursera' },
  { name: 'Google Data Analytics Certificate', issuer: 'Google / Coursera' },
  { name: 'Google IT Automation with Python', issuer: 'Google / Coursera' },
]

export default function ExperienceModal({ onClose }: Props) {
  return (
    <ModalShell title="Experience" onClose={onClose}>
      {/* Work history */}
      <section>
        <p className="text-xs text-neutral-600 uppercase tracking-widest mb-5">Work</p>
        <div className="space-y-8">
          {jobs.map((job) => (
            <div key={job.company}>
              <div className="flex items-start justify-between gap-4 mb-1">
                <div>
                  <p className="text-sm font-medium text-neutral-200">{job.company}</p>
                  <p className="text-xs text-neutral-500 mt-0.5">{job.role} · {job.location}</p>
                </div>
                <span className="text-xs text-neutral-600 shrink-0">{job.period}</span>
              </div>
              <ul className="mt-3 space-y-1.5">
                {job.bullets.map((b, i) => (
                  <li key={i} className="flex gap-2 text-sm text-neutral-400 leading-relaxed">
                    <span className="text-accent mt-0.5 shrink-0">–</span>
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* Skills */}
      <section>
        <p className="text-xs text-neutral-600 uppercase tracking-widest mb-5">Skills</p>
        <div className="space-y-3">
          {skills.map(({ group, items }) => (
            <div key={group} className="flex gap-3 items-start">
              <span className="text-xs text-neutral-600 w-20 shrink-0 pt-0.5">{group}</span>
              <div className="flex flex-wrap gap-1.5">
                {items.map((item) => (
                  <span
                    key={item}
                    className="text-xs text-neutral-400 bg-white/5 rounded px-2 py-0.5 border border-white/5"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Certifications */}
      <section>
        <p className="text-xs text-neutral-600 uppercase tracking-widest mb-5">Certifications</p>
        <div className="space-y-3">
          {certs.map((cert) => (
            <div key={cert.name} className="flex gap-2 text-sm">
              <span className="text-accent mt-0.5 shrink-0">↗</span>
              <div>
                <p className="text-neutral-300">{cert.name}</p>
                <p className="text-xs text-neutral-600 mt-0.5">{cert.issuer}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </ModalShell>
  )
}
