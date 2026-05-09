'use client'

import ModalShell from './ModalShell'

interface Props { onClose: () => void }

const projects = [
  {
    title: 'EKS CI/CD pipeline',
    tags: ['Kubernetes', 'GitHub Actions', 'AWS EKS', 'Docker', 'Helm'],
    description:
      'End-to-end deployment pipeline that builds a Docker image, pushes it to ECR, and rolls it out to an EKS cluster using Helm. Includes automated rollback on failed health checks.',
    link: 'https://github.com/thebbear7',
  },
  {
    title: 'Kubernetes observability stack',
    tags: ['Prometheus', 'Grafana', 'Loki', 'Alertmanager'],
    description:
      'Full-stack observability platform for a Kubernetes cluster: Prometheus scrapes metrics, Grafana renders dashboards, Loki aggregates logs, and Alertmanager routes critical alerts to a Slack channel.',
    link: 'https://github.com/thebbear7',
  },
  {
    title: 'CloudFront performance benchmark',
    tags: ['AWS CloudFront', 'S3', 'Bash', 'Python'],
    description:
      'Benchmarking tool that measures latency and throughput of assets served from CloudFront vs direct S3, across multiple AWS edge locations. Results published as a static HTML report.',
    link: 'https://github.com/thebbear7',
  },
]

export default function ProjectsModal({ onClose }: Props) {
  return (
    <ModalShell title="Projects" onClose={onClose}>
      <div className="space-y-8">
        {projects.map((p) => (
          <div key={p.title} className="group">
            <div className="flex items-start justify-between gap-4 mb-2">
              <h3 className="text-sm font-medium text-neutral-200">{p.title}</h3>
              <a
                href={p.link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-neutral-600 hover:text-accent transition-colors shrink-0"
                aria-label={`View ${p.title} on GitHub`}
              >
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path
                    d="M2 12L12 2M12 2H5M12 2v7"
                    stroke="currentColor"
                    strokeWidth="1.4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </a>
            </div>
            <p className="text-sm text-neutral-400 leading-relaxed mb-3">{p.description}</p>
            <div className="flex flex-wrap gap-1.5">
              {p.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-xs text-neutral-500 bg-white/5 rounded px-2 py-0.5 border border-white/5"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </ModalShell>
  )
}
