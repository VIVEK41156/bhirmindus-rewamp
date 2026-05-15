export default function ProjectChapter({ project, index }) {
  return (
    <article className={`proj-chapter proj-chapter--${project.align}`}>
      <div className="proj-chapter__card" style={{ '--chapter-accent': project.accent }}>
        <span className="proj-chapter__num">{String(index + 1).padStart(2, '0')}</span>
        <p className="proj-chapter__eyebrow">{project.eyebrow}</p>
        <h2 className="proj-chapter__title">{project.title}</h2>
        {project.subtitle && <p className="proj-chapter__subtitle">{project.subtitle}</p>}

        <div className="proj-chapter__copy">
          {project.paragraphs.map((text) => (
            <p key={text.slice(0, 32)}>{text}</p>
          ))}
          {project.links?.map((link) => (
            <p key={`${link.label}-${link.href}`} className="proj-chapter__inline-link">
              {link.before}
              <a
                href={link.href}
                target={link.href.startsWith('mailto') ? undefined : '_blank'}
                rel="noopener noreferrer"
              >
                {link.label}
              </a>
              {link.after}
            </p>
          ))}
        </div>

        {project.type === 'external' && (
          <a
            className="proj-chapter__btn"
            href={project.externalUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            {project.externalLabel}
            <span aria-hidden="true">↗</span>
          </a>
        )}

        {project.externalLink && (
          <a
            className="proj-chapter__btn proj-chapter__btn--outline"
            href={project.externalLink.href}
            target="_blank"
            rel="noopener noreferrer"
          >
            {project.externalLink.label}
            <span aria-hidden="true">↗</span>
          </a>
        )}
      </div>
    </article>
  );
}
